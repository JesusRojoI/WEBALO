'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import PlanCard from '@/components/PlanCard';

const allPlans = [
  {
    id: 'quick-audit',
    nameKey: 'plans.quick_audit.name',
    price: 330.00,
    descriptionKey: 'plans.quick_audit.description',
    image: '/images/plan1.jpg',
  },
  {
    id: 'brand-launch-kit',
    nameKey: 'plans.brand_launch_kit.name',
    price: 590.00,
    descriptionKey: 'plans.brand_launch_kit.description',
    image: '/images/plan2.jpg',
  },
  {
    id: 'flow-builder',
    nameKey: 'plans.flow_builder.name',
    price: 890.00,
    descriptionKey: 'plans.flow_builder.description',
    image: '/images/plan3.jpg',
  },
  {
    id: 'smart-interface',
    nameKey: 'plans.smart_interface.name',
    price: 1290.00,
    descriptionKey: 'plans.smart_interface.description',
    image: '/images/plan4.jpg',
  },
  {
    id: 'digital-experience-pro',
    nameKey: 'plans.digital_experience_pro.name',
    price: 1890.00,
    descriptionKey: 'plans.digital_experience_pro.description',
    image: '/images/plan5.jpg',
  },
  {
    id: 'stack-starter',
    nameKey: 'plans.stack_starter.name',
    price: 3460.00,
    descriptionKey: 'plans.stack_starter.description',
    image: '/images/plan6.jpg',
  },
  {
    id: 'wirewave',
    nameKey: 'plans.wirewave.name',
    price: 5670.00,
    descriptionKey: 'plans.wirewave.description',
    image: '/images/plan7.jpg',
  },
  {
    id: 'proto-max',
    nameKey: 'plans.proto_max.name',
    price: 7950.00,
    descriptionKey: 'plans.proto_max.description',
    image: '/images/plan8.jpg',
  },
  {
    id: 'protopulse',
    nameKey: 'plans.protopulse.name',
    price: 12580.00,
    descriptionKey: 'plans.protopulse.description',
    image: '/images/plan9.jpg',
  },
  {
    id: 'iconic-stack',
    nameKey: 'plans.iconic_stack.name',
    price: 14230.00,
    descriptionKey: 'plans.iconic_stack.description',
    image: '/images/plan10.jpg',
  },
  {
    id: 'ui-orbit',
    nameKey: 'plans.ui_orbit.name',
    price: 16800.00,
    descriptionKey: 'plans.ui_orbit.description',
    image: '/images/plan11.jpg',
  },
  {
    id: 'pixel-forge',
    nameKey: 'plans.pixel_forge.name',
    price: 24740.00,
    descriptionKey: 'plans.pixel_forge.description',
    image: '/images/plan12.jpg',
  },
  {
    id: 'app-reboot',
    nameKey: 'plans.app_reboot.name',
    price: 29670.00,
    descriptionKey: 'plans.app_reboot.description',
    image: '/images/plan13.jpg',
  },
  {
    id: 'motion-spark',
    nameKey: 'plans.motion_spark.name',
    price: 35150.00,
    descriptionKey: 'plans.motion_spark.description',
    image: '/images/plan14.jpg',
  },
  {
    id: 'investor-edge',
    nameKey: 'plans.investor_edge.name',
    price: 40700.00,
    descriptionKey: 'plans.investor_edge.description',
    image: '/images/plan15.jpg',
  },
  {
    id: 'launchpad',
    nameKey: 'plans.launchpad.name',
    price: 46800.00,
    descriptionKey: 'plans.launchpad.description',
    image: '/images/plan16.jpg',
  },
];

const PlanesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Sección 1: Todos los planes */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">
            {t('plans.title')}
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            {t('plans.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allPlans.map((plan) => (
              <PlanCard key={plan.id} {...plan} redirectToCart={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección 2: Personalizado */}
      <section className="py-20 bg-gradient-to-r from-dark to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-primary font-bold mb-4 text-center">{t('custom.title')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            {t('custom.subtitle')}
          </h2>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
            <p className="text-gray-200 leading-relaxed mb-6">
              {t('custom.description')}
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-200">{t('custom.point1')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-200">{t('custom.point2')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-200">{t('custom.point3')}</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8">{t('custom.contactText')}</p>
          </div>
          
          <div className="text-center">
            <Link
              href="/product/perzonalizado/"
              className="inline-flex items-center px-8 py-4 bg-white text-dark rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              {t('custom.cta')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanesPage;