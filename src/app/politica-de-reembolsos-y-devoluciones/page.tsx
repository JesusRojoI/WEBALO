'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PoliticaReembolsosPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center">
              {t('legal.refundPolicy.title')}
            </h1>
            <p className="text-center text-gray-600 font-medium mb-2">
              {t('legal.refundPolicy.company')}
            </p>
            
            <div className="space-y-8 mt-8">
              {/* Introducción */}
              <p className="text-gray-600 leading-relaxed">
                {t('legal.refundPolicy.intro')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('legal.refundPolicy.integral_part')}
              </p>

              {/* Sección I */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section1_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.refundPolicy.section1_intro')}</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t('legal.refundPolicy.section1_item1')}</li>
                  <li>{t('legal.refundPolicy.section1_item2')}</li>
                  <li>{t('legal.refundPolicy.section1_item3')}</li>
                </ul>
                <p className="text-gray-600 mt-3">{t('legal.refundPolicy.section1_note')}</p>
              </section>

              {/* Sección II */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section2_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.refundPolicy.section2_intro')}</p>
                <p className="text-gray-600 mb-3">{t('legal.refundPolicy.section2_email')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.refundPolicy.section2_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section2_1_text')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section2_1_item1')}</li>
                  <li>{t('legal.refundPolicy.section2_1_item2')}</li>
                  <li>{t('legal.refundPolicy.section2_1_item3')}</li>
                </ul>
                
                <h3 className="font-bold text-gray-900 mt-4 mb-2">{t('legal.refundPolicy.section2_2_title')}</h3>
                <p className="text-gray-600">{t('legal.refundPolicy.section2_2_text')}</p>
              </section>

              {/* Sección III */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section3_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.refundPolicy.section3_intro')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.refundPolicy.section3_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section3_1_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section3_1_item1')}</li>
                  <li>{t('legal.refundPolicy.section3_1_item2')}</li>
                  <li>{t('legal.refundPolicy.section3_1_item3')}</li>
                  <li>{t('legal.refundPolicy.section3_1_item4')}</li>
                  <li>{t('legal.refundPolicy.section3_1_item5')}</li>
                  <li>{t('legal.refundPolicy.section3_1_item6')}</li>
                </ul>
                
                <h3 className="font-bold text-gray-900 mt-4 mb-2">{t('legal.refundPolicy.section3_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section3_2_text')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section3_2_item1')}</li>
                  <li>{t('legal.refundPolicy.section3_2_item2')}</li>
                  <li>{t('legal.refundPolicy.section3_2_item3')}</li>
                  <li>{t('legal.refundPolicy.section3_2_item4')}</li>
                </ul>
                <p className="text-gray-600 mt-2 font-medium">{t('legal.refundPolicy.section3_2_note1')}</p>
                <p className="text-gray-600">{t('legal.refundPolicy.section3_2_note2')}</p>
                
                <h3 className="font-bold text-gray-900 mt-4 mb-2">{t('legal.refundPolicy.section3_3_title')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section3_3_item1')}</li>
                  <li>{t('legal.refundPolicy.section3_3_item2')}</li>
                  <li>{t('legal.refundPolicy.section3_3_item3')}</li>
                </ul>
              </section>

              {/* Sección IV */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section4_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section4_intro')}</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section4_item1')}</li>
                  <li>{t('legal.refundPolicy.section4_item2')}</li>
                </ol>
                <p className="text-gray-600 mt-3 mb-2">{t('legal.refundPolicy.section4_note')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section4_note_item1')}</li>
                  <li>{t('legal.refundPolicy.section4_note_item2')}</li>
                  <li>{t('legal.refundPolicy.section4_note_item3')}</li>
                </ul>
              </section>

              {/* Sección V */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section5_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section5_text')}</p>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section5_note')}</p>
                <p className="font-medium text-gray-900 mb-2">{t('legal.refundPolicy.section5_no_title')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section5_no_item1')}</li>
                  <li>{t('legal.refundPolicy.section5_no_item2')}</li>
                  <li>{t('legal.refundPolicy.section5_no_item3')}</li>
                  <li>{t('legal.refundPolicy.section5_no_item4')}</li>
                </ul>
              </section>

              {/* Sección VI */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section6_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section6_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section6_item1')}</li>
                  <li>{t('legal.refundPolicy.section6_item2')}</li>
                  <li>{t('legal.refundPolicy.section6_item3')}</li>
                  <li>{t('legal.refundPolicy.section6_item4')}</li>
                </ul>
                <p className="text-gray-600 mt-2">{t('legal.refundPolicy.section6_note')}</p>
                <p className="font-medium text-gray-900 mt-3 mb-2">{t('legal.refundPolicy.section6_consequences_title')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section6_consequence1')}</li>
                  <li>{t('legal.refundPolicy.section6_consequence2')}</li>
                  <li>{t('legal.refundPolicy.section6_consequence3')}</li>
                </ul>
              </section>

              {/* Sección VII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section7_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section7_intro')}</p>
                <p className="font-medium text-gray-900 mb-2">{t('legal.refundPolicy.section7_including')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section7_include1')}</li>
                  <li>{t('legal.refundPolicy.section7_include2')}</li>
                  <li>{t('legal.refundPolicy.section7_include3')}</li>
                  <li>{t('legal.refundPolicy.section7_include4')}</li>
                  <li>{t('legal.refundPolicy.section7_include5')}</li>
                </ul>
                <p className="text-gray-600 mt-3">{t('legal.refundPolicy.section7_note1')}</p>
                <p className="text-gray-600 mt-2">{t('legal.refundPolicy.section7_note2')}</p>
                <p className="text-gray-600 mt-2">{t('legal.refundPolicy.section7_note3')}</p>
              </section>

              {/* Sección VIII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section8_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section8_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.refundPolicy.section8_item1')}</li>
                  <li>{t('legal.refundPolicy.section8_item2')}</li>
                  <li>{t('legal.refundPolicy.section8_item3')}</li>
                  <li>{t('legal.refundPolicy.section8_item4')}</li>
                  <li>{t('legal.refundPolicy.section8_item5')}</li>
                </ul>
                <p className="text-gray-600 mt-2 font-medium">{t('legal.refundPolicy.section8_note')}</p>
              </section>

              {/* Sección IX */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section9_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section9_text')}</p>
                <p className="text-gray-600 mb-2">{t('legal.refundPolicy.section9_note')}</p>
                <p className="text-gray-600">{t('legal.refundPolicy.section9_acceptance')}</p>
              </section>

              {/* Sección X */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.refundPolicy.section10_title')}</h2>
                <p className="text-gray-600">{t('legal.refundPolicy.section10_text')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaReembolsosPage;