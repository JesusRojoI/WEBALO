'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const NosotrosPage = () => {
  const { t } = useTranslation();
  const [currentGearItem, setCurrentGearItem] = useState(0);
  const [isGearPaused, setIsGearPaused] = useState(false);

  const services = [
    { title: t('services.service1'), desc: t('services.service1_desc') },
    { title: t('services.service2'), desc: t('services.service2_desc') },
    { title: t('services.service3'), desc: t('services.service3_desc') },
    { title: t('services.service4'), desc: t('services.service4_desc') },
    { title: t('services.service5'), desc: t('services.service5_desc') },
    { title: t('services.service6'), desc: t('services.service6_desc') },
  ];

  useEffect(() => {
    if (!isGearPaused) {
      const interval = setInterval(() => {
        setCurrentGearItem((prev) => (prev + 1) % services.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isGearPaused, services.length]);

  const handleGearNext = () => {
    setCurrentGearItem((prev) => (prev + 1) % services.length);
  };

  const handleGearPrev = () => {
    setCurrentGearItem((prev) => (prev - 1 + services.length) % services.length);
  };

  const workflowSteps = [
    { title: t('workflow.step1_title'), desc: t('workflow.step1_desc') },
    { title: t('workflow.step2_title'), desc: t('workflow.step2_desc') },
    { title: t('workflow.step3_title'), desc: t('workflow.step3_desc') },
    { title: t('workflow.step4_title'), desc: t('workflow.step4_desc') },
  ];

  return (
    <div className="min-h-screen">
      {/* Sección 1: Hero */}
      <section className="relative py-24 bg-gradient-to-r from-dark to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left">
              <p className="text-primary font-bold mb-4">{t('about.pageSubtitle')}</p>
              <h1 className="text-5xl font-bold mb-6">{t('about.pageTitle')}</h1>
              <p className="text-gray-300 leading-relaxed mb-8">
                {t('about.pageDescription')}
              </p>
              <Link
                href="/planes/"
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors duration-300"
              >
                {t('common.viewPlans')}
              </Link>
            </div>
            <div className="relative h-96 animate-slide-right">
              <Image
                src="/images/about-page.jpg"
                alt={t('about.pageTitle')}
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Cómo trabajamos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t('workflow.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-2xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 3: Servicios con engrane */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-circuit opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {t('services.subtitle')}
          </h2>
          <h3 className="text-2xl text-center text-gray-600 mb-12">
            {t('services.title')}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Lista de servicios */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                    currentGearItem === index
                      ? 'bg-white shadow-xl'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  onMouseEnter={() => {
                    setCurrentGearItem(index);
                    setIsGearPaused(true);
                  }}
                  onMouseLeave={() => setIsGearPaused(false)}
                >
                  <h4 className={`font-bold text-gray-900 mb-2 transition-all duration-300 ${
                    currentGearItem === index ? 'text-xl' : 'text-base'
                  }`}>
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Engrane */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-80 h-80">
                <div className={`gear-container absolute inset-0 ${isGearPaused ? 'paused' : ''}`}>
                  <div className="w-full h-full border-8 border-dashed border-primary/30 rounded-full relative">
                    {services.map((_, index) => {
                      const angle = (index * 360) / services.length;
                      const isActive = currentGearItem === index;
                      return (
                        <div
                          key={index}
                          className="absolute transition-all duration-500 ease-in-out"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg) translate(-50%, -50%) scale(${isActive ? 1.3 : 1})`,
                          }}
                        >
                          <div
                            className={`flex items-center justify-center rounded-full transition-all duration-500 ${
                              isActive
                                ? 'w-14 h-14 bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/50'
                                : 'w-10 h-10 bg-gray-300'
                            }`}
                          >
                            {/* Contenedor que contrarresta la rotación del engrane */}
                            <div className="gear-number-counter">
                              <span className={`font-bold text-white transition-all duration-300 ${
                                isActive ? 'text-xl opacity-100' : 'text-sm opacity-0'
                              }`}>
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Controles */}
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleGearPrev}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={handleGearNext}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Únete */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/join-bg.jpg"
            alt={t('join.subtitle')}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-secondary/80"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('join.title')}</h2>
          <p className="text-xl mb-8">{t('join.subtitle')}</p>
          <Link
            href="/planes/"
            className="inline-flex items-center px-8 py-4 bg-white text-dark rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            {t('join.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NosotrosPage;