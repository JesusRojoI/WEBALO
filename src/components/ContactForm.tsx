'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface ContactFormProps {
  inverted?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ inverted = false }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = t('contact.nameRequired');
    } else if (formData.name.trim().length < 3) {
      newErrors.name = t('contact.nameRequired');
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = t('contact.emailRequired');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = t('contact.emailInvalid');
      }
    }
    
    // Validar teléfono (opcional pero si se ingresa debe ser válido)
    if (formData.phone.trim()) {
      if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = t('contact.phoneInvalid');
      }
    }
    
    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = t('contact.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.messageInvalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await axios.post('/api/send-email', {
        to: formData.email,
        subject: t('contact.title'),
        name: formData.name,
        company: '',
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: 'contact',
        language: i18n.language,
      });
      
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${inverted ? 'order-2' : 'order-1'}`}>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.formName')}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
            placeholder={t('contact.formName')}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.formEmail')}
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
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.formPhone')}
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
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {errors.phone}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.formMessage')}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none`}
            placeholder={t('contact.formMessage')}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {errors.message}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('common.loading') : t('contact.formSubmit')}
        </button>
        
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-600 font-medium">{t('contact.successMessage')}</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 font-medium">{t('contact.errorMessage')}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;