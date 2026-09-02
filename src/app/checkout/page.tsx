'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

// Claves de países (snake_case)
const countryKeys = [
  'mexico', 'united_states', 'canada', 'spain', 'argentina', 'brazil', 'chile', 'colombia',
  'peru', 'ecuador', 'venezuela', 'uruguay', 'paraguay', 'bolivia', 'costa_rica', 'panama',
  'guatemala', 'honduras', 'el_salvador', 'nicaragua', 'cuba', 'dominican_republic', 'puerto_rico',
  'france', 'germany', 'italy', 'portugal', 'united_kingdom', 'ireland', 'netherlands', 'belgium',
  'switzerland', 'austria', 'sweden', 'norway', 'denmark', 'finland', 'poland', 'russia', 'china',
  'japan', 'south_korea', 'india', 'australia', 'new_zealand', 'south_africa', 'egypt', 'morocco',
  'israel', 'turkey', 'greece', 'czech_republic', 'hungary', 'romania', 'ukraine', 'thailand',
  'vietnam', 'malaysia', 'singapore', 'indonesia', 'philippines'
];

// Claves de estados (snake_case)
const stateKeys = [
  'aguascalientes', 'baja_california', 'baja_california_sur', 'campeche', 'chiapas', 'chihuahua',
  'ciudad_de_mexico', 'coahuila', 'colima', 'durango', 'guanajuato', 'guerrero', 'hidalgo',
  'jalisco', 'mexico_state', 'michoacan', 'morelos', 'nayarit', 'nuevo_leon', 'oaxaca', 'puebla',
  'queretaro', 'quintana_roo', 'san_luis_potosi', 'sinaloa', 'sonora', 'tabasco', 'tamaulipas',
  'tlaxcala', 'veracruz', 'yucatan', 'zacatecas'
];

const CheckoutPage = () => {
  const { t, i18n } = useTranslation();
  const { items, getSubtotal, getIVA, getTotal, clearCart } = useCart();
  const router = useRouter();
  
  // Bandera para evitar redirección cuando se limpia el carrito después de una compra exitosa
  const isPurchaseComplete = useRef(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'mexico',
    street: '',
    apartment: '',
    city: '',
    state: 'ciudad_de_mexico',
    zip: '',
    phone: '',
    email: '',
    notes: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    // Solo redirigir a /carrito/ si el carrito está vacío Y no estamos en proceso de compra exitosa
    if (items.length === 0 && !isPurchaseComplete.current) {
      router.push('/carrito/');
    }
  }, [items, router]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = t('checkout.firstName');
    if (!formData.lastName.trim()) newErrors.lastName = t('checkout.lastName');
    if (!formData.street.trim()) newErrors.street = t('checkout.streetAddress');
    if (!formData.city.trim()) newErrors.city = t('checkout.city');
    if (!/^\d{5}$/.test(formData.zip)) newErrors.zip = t('checkout.zip');
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = t('checkout.phone');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = t('checkout.email');
    
    if (!formData.cardName.trim()) newErrors.cardName = t('checkout.cardName');
    
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumberClean)) newErrors.cardNumber = t('checkout.cardNumber');
    
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(formData.cardExpiry)) newErrors.cardExpiry = t('checkout.cardExpiry');
    
    if (!/^\d{3,4}$/.test(formData.cardCvc)) newErrors.cardCvc = t('checkout.cardCvc');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone' || name === 'zip') {
      const numericValue = value.replace(/\D/g, '');
      const maxLength = name === 'phone' ? 10 : 5;
      setFormData(prev => ({ ...prev, [name]: numericValue.slice(0, maxLength) }));
    } else if (name === 'cardNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 16);
      const formatted = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cardExpiry') {
      const numericValue = value.replace(/\D/g, '').slice(0, 4);
      let formatted = numericValue;
      if (numericValue.length > 2) {
        formatted = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cardCvc') {
      const numericValue = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsProcessing(true);
    setPaymentError('');
    
    try {
      const [month, year] = formData.cardExpiry.split('/');
      const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
      
      const paymentData = {
        amount: getTotal(),
        orderId: `ORDER-${Date.now()}`,
        cardData: {
          number: cardNumberClean,
          name: formData.cardName,
          month: month,
          year: `20${year}`,
          cvv: formData.cardCvc,
        },
        customer: {
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          telefono: formData.phone,
          direccion: formData.street,
          direccion2: formData.apartment || '',
          ciudad: formData.city,
          estado: t(`checkout.states.${formData.state}`),
          pais: t(`checkout.countries.${formData.country}`),
          cp: formData.zip,
          empresa: formData.company || '',
        },
        metadata: {
          notes: formData.notes,
        },
      };
      
      console.log('Enviando pago a Keycop...');
      const paymentResponse = await axios.post('/api/process-payment', paymentData);
      console.log('Respuesta de Keycop:', JSON.stringify(paymentResponse.data));
      
      if (paymentResponse.data.success) {
        console.log('✓ Pago exitoso, preparando datos de la orden...');
        
        // Activar bandera ANTES de limpiar el carrito
        isPurchaseComplete.current = true;
        
        const orderData = {
          nombre: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          productos: items.map(item => ({
            nombre: item.nameKey ? t(item.nameKey) : item.name,
            nameKey: item.nameKey,
            cantidad: item.quantity,
            precio: item.price,
            projectNumber: item.customDetails?.projectNumber,
          })),
          subtotal: getSubtotal(),
          impuesto: getIVA(),
          total: getTotal(),
          transactionId: paymentResponse.data.orderId || paymentResponse.data.reference || `TRANS-${Date.now()}`,
          descuento: 0,
          cupon: null,
        };
        
        console.log('Datos de la orden:', JSON.stringify(orderData));
        
        // Guardar orden en sessionStorage
        try {
          sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
          console.log('✓ Orden guardada en sessionStorage');
        } catch (storageError) {
          console.error('Error guardando en sessionStorage:', storageError);
        }
        
        // Enviar correo
        try {
          console.log('Enviando correo de confirmación...');
          const emailResponse = await axios.post('/api/send-email', {
            to: formData.email,
            type: 'purchase',
            orderData,
            language: i18n.language,
          });
          console.log('Respuesta del correo:', JSON.stringify(emailResponse.data));
        } catch (emailError) {
          console.error('Error enviando correo:', emailError);
        }
        
        // Limpiar carrito (la bandera evita la redirección a /carrito/)
        console.log('Limpiando carrito...');
        clearCart();
        
        // Redirigir a compra exitosa
        console.log('Redirigiendo a /compra-exitosa/');
        router.push('/compra-exitosa/');
      } else {
        console.error('✗ Pago rechazado:', paymentResponse.data.error);
        setPaymentError(paymentResponse.data.error || t('error'));
      }
    } catch (error: any) {
      console.error('=== ERROR EN EL PROCESO DE COMPRA ===');
      console.error('Error completo:', error);
      console.error('Mensaje:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', JSON.stringify(error.response.data));
      }
      setPaymentError(error.response?.data?.error || error.message || t('error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          {t('checkout.title')}
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario de facturación */}
            <div className="lg:col-span-2 space-y-8">
              {/* Detalles de facturación */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                  {t('checkout.billingDetails')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.firstName')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.lastName')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.companyName')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.country')}
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    {countryKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`checkout.countries.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.streetAddress')}
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder={t('checkout.streetPlaceholder')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.street ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                  />
                  {errors.street && (
                    <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                  )}
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.apartment')}
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder={t('checkout.apartment')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.state')}
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      {stateKeys.map((key) => (
                        <option key={key} value={key}>
                          {t(`checkout.states.${key}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.zip')}
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.zip ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              {/* Información adicional */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                  {t('checkout.additionalInfo')}
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.orderNotes')}
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('checkout.notesPlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  />
                </div>
              </div>
              
              {/* Datos de tarjeta */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center justify-between">
                  <span>{t('checkout.cardDetails')}</span>
                  <Image src="/keycop.png" alt="Keycop" width={80} height={30} className="object-contain" />
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.cardName')}
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.cardNumber')}
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.cardExpiry')}
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.cardExpiry && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.cardCvc')}
                    </label>
                    <input
                      type="password"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      placeholder="123"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.cardCvc ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                    />
                    {errors.cardCvc && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>
                    )}
                  </div>
                </div>
                
                <p className="mt-6 text-sm text-gray-500">
                  {t('checkout.privacyNoticePrefix')}{' '}
                  <Link
                    href="/privacy-policy/"
                    className="text-primary hover:underline font-medium"
                  >
                    {t('nav.privacy')}
                  </Link>
                </p>
              </div>
            </div>
            
            {/* Resumen del pedido */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                  {t('checkout.yourOrder')}
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.nameKey ? t(item.nameKey) : item.name}
                        </p>
                        {item.isCustom && item.customDetails?.projectNumber && (
                          <p className="text-xs text-gray-500">
                            {t('personalized.projectNumber')}: {item.customDetails.projectNumber}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">× {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)} MXN
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                    <span>${getSubtotal().toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.iva')}</span>
                    <span>${getIVA().toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-bold text-gray-900">{t('cart.total')}</span>
                    <span className="font-bold text-primary text-xl">
                      ${getTotal().toFixed(2)} MXN
                    </span>
                  </div>
                </div>
              </div>
              
              {paymentError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-center">{paymentError}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? t('common.loading') : t('checkout.placeOrder')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;