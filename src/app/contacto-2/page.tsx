'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from '@/components/ContactForm';

const ContactoPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center mb-16 text-gray-900">
          {t('nav.contact')}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Formulario a la izquierda */}
          <div className="lg:col-span-3 order-1">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {t('contact.title')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('contact.subtitle')}
            </p>
            <ContactForm inverted={true} />
          </div>
          
          {/* Información a la derecha */}
          <div className="lg:col-span-2 order-2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {t('contact.ready')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('contact.readySub')}
            </p>
            
            <div className="space-y-6 bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t('contact.phoneLabel')}</p>
                  <p className="text-gray-600">+52 1 55 5206 2941</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t('contact.locationLabel')}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    AVENIDA INSURGENTES SUR, N°605 PISO 8, INT. 802, COLONIA NAPOLES, ALCALDIA BENITO JUÁREZ, CP. 03810, ENTIDAD FEDERATIVA CIUDAD DE MÉXICO.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t('contact.emailLabel')}</p>
                  <p className="text-gray-600">administracion@lumetra.mx</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;