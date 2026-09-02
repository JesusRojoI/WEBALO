'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const PersonalizadoPage = () => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    projectNumber: '',
    email: '',
    phone: '',
    amount: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Validar número de proyecto
    if (!formData.projectNumber.trim()) {
      newErrors.projectNumber = t('personalized.projectNumberRequired');
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = t('personalized.emailRequired');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = t('personalized.emailInvalid');
      }
    }
    
    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = t('personalized.phoneRequired');
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = t('personalized.phoneInvalid');
    }
    
    // Validar monto
    if (!formData.amount.trim()) {
      newErrors.amount = t('personalized.amountRequired');
    } else {
      const amountRegex = /^\d+(\.\d{1,2})?$/;
      if (!amountRegex.test(formData.amount) || parseFloat(formData.amount) <= 0) {
        newErrors.amount = t('personalized.amountInvalid');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === 'amount') {
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const amount = parseFloat(formData.amount);
   const customItem = {
  id: `custom-${Date.now()}-${formData.projectNumber}`,
  name: 'Plan Personalizado',
  nameKey: 'custom.cta', // Clave de traducción
  price: amount,
  image: '/images/plan5.jpg',
  isCustom: true,
  customDetails: {
    projectNumber: formData.projectNumber,
    email: formData.email,
    phone: formData.phone,
    amount: amount,
  },
};
    
    addItem(customItem);
    setShowSuccess(true);
    
    setTimeout(() => {
      router.push('/carrito/');
    }, 1500);
  };

  return (
    <div className="min-h-screen py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Imagen alusiva - 40% */}
          <div className="lg:col-span-2 relative h-64 lg:h-auto rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/plan5.jpg"
              alt={t('personalized.title')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent flex items-end p-6">
              <h1 className="text-3xl font-bold text-white">
                {t('personalized.title')}
              </h1>
            </div>
          </div>
          
          {/* Formulario - 60% */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 h-full">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('personalized.projectNumber')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="projectNumber"
                      value={formData.projectNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.projectNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                      placeholder="PROY-001"
                    />
                    {errors.projectNumber && (
                      <p className="text-red-500 text-xs mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {errors.projectNumber}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('personalized.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                      placeholder="email@ejemplo.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('personalized.phone')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                      placeholder="5512345678"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('personalized.amount')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                      placeholder="100.09"
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {errors.amount}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">{t('personalized.finalTotal')}</p>
                      <p className="text-2xl font-bold gradient-text">
                        ${formData.amount ? parseFloat(formData.amount).toFixed(2) : '0.00'} MXN
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{t('personalized.taxText')}</p>
                      <p className="text-sm text-gray-600">
                        {t('cart.iva')}: ${formData.amount ? (parseFloat(formData.amount) * 0.16).toFixed(2) : '0.00'} MXN
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {t('personalized.addToCart')}
                </button>
              </form>
              
              {showSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                  <p className="text-green-600 font-medium text-center">
                    {t('cart.added')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizadoPage;