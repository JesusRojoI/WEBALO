'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import PlanCard from '@/components/PlanCard';
import ContactForm from '@/components/ContactForm';

const plans = [
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
];

const HomePage = () => {
  const { t } = useTranslation();
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-section') || '0');
            setVisibleSections(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const accordionContent = [
    {
      title: t('offer.tab1_title'),
      level: t('offer.tab1_level'),
      descriptions: [t('offer.tab1_desc1'), t('offer.tab1_desc2'), t('offer.tab1_desc3')],
      progress: 60,
    },
    {
      title: t('offer.tab2_title'),
      level: t('offer.tab2_level'),
      descriptions: [t('offer.tab1_desc1'), t('offer.tab1_desc2'), t('offer.tab1_desc3')],
      progress: 70,
    },
    {
      title: t('offer.tab3_title'),
      level: t('offer.tab3_level'),
      descriptions: [t('offer.tab1_desc1'), t('offer.tab1_desc2'), t('offer.tab1_desc3')],
      progress: 65,
    },
    {
      title: t('offer.tab4_title'),
      level: t('offer.tab4_level'),
      descriptions: [t('offer.tab1_desc1'), t('offer.tab1_desc2'), t('offer.tab1_desc3')],
      progress: 50,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Sección 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/70"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="animate-fade-in">
            <p className="text-xl mb-4 font-title">{t('hero.welcome')}</p>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text font-title">
              WEBALO
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {t('hero.description')}
            </p>
            <Link
              href="/planes/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t('hero.cta')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección 2: Sobre nosotros */}
      <section className="py-20 bg-white" data-section="1">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left">
              <p className="text-primary font-bold mb-4">{t('about.title')}</p>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{t('about.subtitle')}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t('about.description')}
              </p>
              <Link
                href="/nosotros/"
                className="inline-flex items-center px-6 py-3 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                {t('about.cta')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="relative h-96 animate-slide-right">
              <Image
                src="/images/about.jpg"
                alt={t('about.subtitle')}
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: ¿Por qué elegir WEBALO? */}
      <section className="py-20 bg-gray-50 pattern-grid" data-section="2">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {t('why.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            {t('why.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[t('why.point1'), t('why.point2'), t('why.point3'), t('why.point4')].map((point, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-default"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:opacity-0 group-hover:scale-0">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed transition-all duration-300 group-hover:text-lg group-hover:font-medium group-hover:text-gray-900">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: Cómo trabajamos */}
      <section className="py-20 bg-dark text-white relative overflow-hidden" data-section="3">
        <div className="absolute inset-0 pattern-circuit opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
        
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-16">
            {t('workflow.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('workflow.step1_title'), desc: t('workflow.step1_desc'), icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { title: t('workflow.step2_title'), desc: t('workflow.step2_desc'), icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { title: t('workflow.step3_title'), desc: t('workflow.step3_desc'), icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
              { title: t('workflow.step4_title'), desc: t('workflow.step4_desc'), icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/10 group-hover:text-primary/20 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 5: Nuestros planes */}
      <section className="py-20 bg-white" data-section="4">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {t('plans.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            {t('plans.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección 6: Personalizado */}
      <section className="py-20 bg-gradient-to-r from-dark to-secondary text-white relative overflow-hidden" data-section="5">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className={`relative max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${
          visibleSections.includes(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-primary font-bold mb-4">{t('custom.title')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('custom.subtitle')}
          </h2>
          <Link
            href="/product/perzonalizado/"
            className="inline-flex items-center px-8 py-4 bg-white text-dark rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            {t('custom.cta')}
          </Link>
        </div>
      </section>

      {/* Sección 7: Nuestra oferta con acordeón */}
      <section className="py-20 bg-gray-50 pattern-grid" data-section="6">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.includes(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {t('offer.title')}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {(t('offer.tags', { returnObjects: true }) as string[]).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md hover:shadow-lg transition-shadow cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              {accordionContent.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveAccordion(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeAccordion === index
                      ? 'bg-white shadow-xl'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold text-gray-900 transition-all duration-300 ${
                        activeAccordion === index ? 'text-xl' : 'text-base'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm text-gray-500 transition-all duration-300 ${
                        activeAccordion === index ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-10'
                      }`}>
                        {item.level}
                      </p>
                    </div>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 ${
                        activeAccordion === index ? 'rotate-180 text-primary' : 'text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl animate-fade-in" key={activeAccordion}>
              {accordionContent[activeAccordion].descriptions.map((desc, index) => (
                <p key={index} className="text-gray-600 leading-relaxed mb-4">
                  {desc}
                </p>
              ))}
              
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {t('offer.skill_improvement')}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {accordionContent[activeAccordion].progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="progress-bar h-2.5 rounded-full"
                    style={{ width: `${accordionContent[activeAccordion].progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 8: Contacto */}
      <section className="py-20 bg-white relative overflow-hidden" data-section="7">
        <div className="absolute inset-0 pattern-grid opacity-5"></div>
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.includes(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {t('contact.ready')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('contact.readySub')}
              </p>
              
              <div className="space-y-6">
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
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{t('contact.locationLabel')}</p>
                    <p className="text-gray-600 text-sm">
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
                    <p className="text-gray-600">info@webalo.com.mx</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('contact.title')}
              </h3>
              <p className="text-gray-600 mb-8">
                {t('contact.subtitle')}
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;