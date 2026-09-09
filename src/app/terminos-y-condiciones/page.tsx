'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TerminosYCondicionesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center">
              {t('legal.termsAndConditions.title')}
            </h1>
            <p className="text-center text-gray-600 font-medium mb-2">
              {t('legal.termsAndConditions.company')}
            </p>
            
            <div className="space-y-8 mt-8">
              {/* Sección I */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section1_title')}</h2>
                <p className="text-gray-600 leading-relaxed mb-3">{t('legal.termsAndConditions.section1_text')}</p>
                <p className="text-gray-600 leading-relaxed">{t('legal.termsAndConditions.section1_terms')}</p>
              </section>

              {/* Sección II */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section2_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.termsAndConditions.section2_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.termsAndConditions.section2_package1')}</li>
                  <li>{t('legal.termsAndConditions.section2_package2')}</li>
                  <li>{t('legal.termsAndConditions.section2_package3')}</li>
                  <li>{t('legal.termsAndConditions.section2_package4')}</li>
                  <li>{t('legal.termsAndConditions.section2_package5')}</li>
                  <li>{t('legal.termsAndConditions.section2_package6')}</li>
                  <li>{t('legal.termsAndConditions.section2_package7')}</li>
                  <li>{t('legal.termsAndConditions.section2_package8')}</li>
                  <li>{t('legal.termsAndConditions.section2_package9')}</li>
                  <li>{t('legal.termsAndConditions.section2_package10')}</li>
                  <li>{t('legal.termsAndConditions.section2_package11')}</li>
                </ul>
                <p className="text-gray-600 mt-3">{t('legal.termsAndConditions.section2_custom')}</p>
                <p className="text-gray-600 mt-3">{t('legal.termsAndConditions.section2_note')}</p>
              </section>

              {/* Sección III */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section3_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section3_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section3_1_text1')}</p>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section3_1_text2')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section3_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section3_2_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                  <li>{t('legal.termsAndConditions.section3_2_method')}</li>
                </ul>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section3_2_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section3_3_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section3_3_text1')}</p>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section3_3_text2')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section3_4_title')}</h3>
                <p className="text-gray-600">{t('legal.termsAndConditions.section3_4_text')}</p>
              </section>

              {/* Sección IV */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section4_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section4_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section4_1_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
                  <li>{t('legal.termsAndConditions.section4_1_req1')}</li>
                  <li>{t('legal.termsAndConditions.section4_1_req2')}</li>
                  <li>{t('legal.termsAndConditions.section4_1_req3')}</li>
                  <li>{t('legal.termsAndConditions.section4_1_req4')}</li>
                </ul>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section4_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section4_2_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                  <li>{t('legal.termsAndConditions.section4_2_item1')}</li>
                  <li>{t('legal.termsAndConditions.section4_2_item2')}</li>
                  <li>{t('legal.termsAndConditions.section4_2_item3')}</li>
                  <li>{t('legal.termsAndConditions.section4_2_item4')}</li>
                  <li>{t('legal.termsAndConditions.section4_2_item5')}</li>
                </ul>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section4_2_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section4_3_title')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.termsAndConditions.section4_3_item1')}</li>
                  <li>{t('legal.termsAndConditions.section4_3_item2')}</li>
                  <li>{t('legal.termsAndConditions.section4_3_item3')}</li>
                  <li>{t('legal.termsAndConditions.section4_3_item4')}</li>
                </ul>
              </section>

              {/* Sección V */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section5_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section5_1_title')}</h3>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section5_1_text')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section5_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section5_2_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.termsAndConditions.section5_2_rest1')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest2')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest3')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest4')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest5')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest6')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest7')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest8')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest9')}</li>
                  <li>{t('legal.termsAndConditions.section5_2_rest10')}</li>
                </ul>
              </section>

              {/* Sección VI */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section6_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section6_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section6_1_text')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                  <li>{t('legal.termsAndConditions.section6_1_item1')}</li>
                  <li>{t('legal.termsAndConditions.section6_1_item2')}</li>
                  <li>{t('legal.termsAndConditions.section6_1_item3')}</li>
                  <li>{t('legal.termsAndConditions.section6_1_item4')}</li>
                </ul>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section6_1_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section6_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section6_2_text')}</p>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section6_2_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section6_3_title')}</h3>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section6_3_text')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section6_4_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section6_4_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                  <li>{t('legal.termsAndConditions.section6_4_item1')}</li>
                  <li>{t('legal.termsAndConditions.section6_4_item2')}</li>
                  <li>{t('legal.termsAndConditions.section6_4_item3')}</li>
                  <li>{t('legal.termsAndConditions.section6_4_item4')}</li>
                  <li>{t('legal.termsAndConditions.section6_4_item5')}</li>
                </ul>
                <p className="text-gray-600">{t('legal.termsAndConditions.section6_4_note')}</p>
              </section>

              {/* Sección VII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section7_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section7_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section7_1_text')}</p>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section7_1_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section7_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section7_2_text')}</p>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section7_2_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section7_3_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section7_3_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                  <li>{t('legal.termsAndConditions.section7_3_proh1')}</li>
                  <li>{t('legal.termsAndConditions.section7_3_proh2')}</li>
                  <li>{t('legal.termsAndConditions.section7_3_proh3')}</li>
                  <li>{t('legal.termsAndConditions.section7_3_proh4')}</li>
                </ul>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section7_3_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section7_4_title')}</h3>
                <p className="text-gray-600">{t('legal.termsAndConditions.section7_4_text')}</p>
              </section>

              {/* Sección VIII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section8_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section8_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section8_1_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
                  <li>{t('legal.termsAndConditions.section8_1_item1')}</li>
                  <li>{t('legal.termsAndConditions.section8_1_item2')}</li>
                  <li>{t('legal.termsAndConditions.section8_1_item3')}</li>
                  <li>{t('legal.termsAndConditions.section8_1_item4')}</li>
                  <li>{t('legal.termsAndConditions.section8_1_item5')}</li>
                </ul>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section8_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section8_2_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                  <li>{t('legal.termsAndConditions.section8_2_item1')}</li>
                  <li>{t('legal.termsAndConditions.section8_2_item2')}</li>
                  <li>{t('legal.termsAndConditions.section8_2_item3')}</li>
                </ul>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section8_2_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section8_3_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section8_3_text')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.termsAndConditions.section8_3_item1')}</li>
                  <li>{t('legal.termsAndConditions.section8_3_item2')}</li>
                  <li>{t('legal.termsAndConditions.section8_3_item3')}</li>
                  <li>{t('legal.termsAndConditions.section8_3_item4')}</li>
                  <li>{t('legal.termsAndConditions.section8_3_item5')}</li>
                </ul>
              </section>

              {/* Sección IX */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section9_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section9_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section9_1_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                  <li>{t('legal.termsAndConditions.section9_1_item1')}</li>
                  <li>{t('legal.termsAndConditions.section9_1_item2')}</li>
                  <li>{t('legal.termsAndConditions.section9_1_item3')}</li>
                  <li>{t('legal.termsAndConditions.section9_1_item4')}</li>
                  <li>{t('legal.termsAndConditions.section9_1_item5')}</li>
                </ul>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section9_1_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section9_2_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section9_2_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
                  <li>{t('legal.termsAndConditions.section9_2_item1')}</li>
                  <li>{t('legal.termsAndConditions.section9_2_item2')}</li>
                  <li>{t('legal.termsAndConditions.section9_2_item3')}</li>
                  <li>{t('legal.termsAndConditions.section9_2_item4')}</li>
                  <li>{t('legal.termsAndConditions.section9_2_item5')}</li>
                  <li>{t('legal.termsAndConditions.section9_2_item6')}</li>
                  <li>{t('legal.termsAndConditions.section9_2_item7')}</li>
                  <li>{t('legal.termsAndConditions.section9_2_item8')}</li>
                </ul>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section9_3_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section9_3_text')}</p>
                <p className="text-gray-600 mb-4">{t('legal.termsAndConditions.section9_3_note')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section9_4_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section9_4_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.termsAndConditions.section9_4_item1')}</li>
                  <li>{t('legal.termsAndConditions.section9_4_item2')}</li>
                  <li>{t('legal.termsAndConditions.section9_4_item3')}</li>
                  <li>{t('legal.termsAndConditions.section9_4_item4')}</li>
                </ul>
              </section>

              {/* Sección X */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section10_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section10_text')}</p>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section10_note')}</p>
                <p className="text-gray-600">{t('legal.termsAndConditions.section10_disagreement')}</p>
              </section>

              {/* Sección XI */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section11_title')}</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section11_1_title')}</h3>
                <p className="text-gray-600 mb-3">{t('legal.termsAndConditions.section11_1_text')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section11_2_title')}</h3>
                <p className="text-gray-600 mb-3">{t('legal.termsAndConditions.section11_2_text')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section11_3_title')}</h3>
                <p className="text-gray-600 mb-3">{t('legal.termsAndConditions.section11_3_text')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section11_4_title')}</h3>
                <p className="text-gray-600 mb-3">{t('legal.termsAndConditions.section11_4_text')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.termsAndConditions.section11_5_title')}</h3>
                <p className="text-gray-600">{t('legal.termsAndConditions.section11_5_text')}</p>
              </section>

              {/* Sección XII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section12_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section12_text')}</p>
                <p className="text-gray-600 mb-3">{t('legal.termsAndConditions.section12_jurisdiction')}</p>
                <p className="text-gray-600 mb-2">{t('legal.termsAndConditions.section12_mediation_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-3">
                  <li>{t('legal.termsAndConditions.section12_mediation1')}</li>
                  <li>{t('legal.termsAndConditions.section12_mediation2')}</li>
                  <li>{t('legal.termsAndConditions.section12_mediation3')}</li>
                </ul>
                <p className="text-gray-600">{t('legal.termsAndConditions.section12_waiver')}</p>
              </section>

              {/* Sección XIII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.termsAndConditions.section13_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.termsAndConditions.section13_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-3">
                  <li>{t('legal.termsAndConditions.section13_email')}</li>
                  <li>{t('legal.termsAndConditions.section13_website')}</li>
                  <li>{t('legal.termsAndConditions.section13_address')}</li>
                </ul>
                <p className="text-gray-600">{t('legal.termsAndConditions.section13_response')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TerminosYCondicionesPage;