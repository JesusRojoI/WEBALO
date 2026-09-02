'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Partículas decorativas */}
      <div className="absolute inset-0 pattern-grid opacity-10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo.svg"
                alt="WEBALO"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('common.tagline')}
            </p>
          </div>

          {/* Columna 1: Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-6 font-title">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/nosotros/" className="text-gray-400 hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/planes/" className="text-gray-400 hover:text-primary transition-colors">
                  {t('nav.plans')}
                </Link>
              </li>
              <li>
                <Link href="/contacto-2/" className="text-gray-400 hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones/" className="text-gray-400 hover:text-primary transition-colors text-xs">
                  {t('nav.terms')}
                </Link>
              </li>
              <li>
                <Link href="/politica-de-reembolsos-y-devoluciones/" className="text-gray-400 hover:text-primary transition-colors text-xs">
                  {t('nav.refunds')}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy/" className="text-gray-400 hover:text-primary transition-colors text-xs">
                  {t('nav.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Contacto */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-6 font-title">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-gray-300 mb-1">{t('footer.address')}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    AVENIDA INSURGENTES SUR, N°605 PISO 8, INT. 802, COLONIA NAPOLES, ALCALDIA BENITO JUÁREZ, CP. 03810, ENTIDAD FEDERATIVA CIUDAD DE MÉXICO.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-gray-300 mb-1">{t('footer.email')}</p>
                  <p className="text-gray-400 text-xs">info@webalo.com.mx</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-gray-300 mb-1">{t('footer.phone')}</p>
                  <p className="text-gray-400 text-xs">+52 1 55 5206 2941</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ver planes */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-6 font-title">{t('footer.viewPlans')}</h3>
            <p className="text-gray-400 text-sm mb-6">{t('footer.weHavePlan')}</p>
            <Link
              href="/planes/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300 font-medium"
            >
              {t('footer.viewPlans')}
            </Link>
            <div className="flex items-center space-x-4 mt-8">
              <Image
                src="/mastercard.svg"
                alt="Mastercard"
                width={50}
                height={30}
                className="object-contain"
              />
              <Image
                src="/visa.svg"
                alt="Visa"
                width={50}
                height={30}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            {t('common.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;