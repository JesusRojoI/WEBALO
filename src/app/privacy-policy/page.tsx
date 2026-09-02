'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {t('nav.privacy')}
          </h1>
          
          <p className="text-6xl font-bold gradient-text mb-4">
            {t('legal.comingSoon')}
          </p>
          
          <p className="text-gray-600 text-lg">
            {t('legal.comingSoonDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;