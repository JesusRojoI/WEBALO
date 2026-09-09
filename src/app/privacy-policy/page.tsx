'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center">
              {t('legal.privacyPolicy.title')}
            </h1>
            <p className="text-center text-gray-600 font-medium mb-2">
              {t('legal.privacyPolicy.company')}
            </p>
            
            <div className="space-y-8 mt-8">
              {/* Introducción */}
              <p className="text-gray-600 leading-relaxed">
                {t('legal.privacyPolicy.intro1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('legal.privacyPolicy.intro2')}
              </p>

              {/* Sección I */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section1_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.privacyPolicy.section1_intro')}</p>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.privacyPolicy.section1_a')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
                  <li>{t('legal.privacyPolicy.section1_a_item1')}</li>
                  <li>{t('legal.privacyPolicy.section1_a_item2')}</li>
                  <li>{t('legal.privacyPolicy.section1_a_item3')}</li>
                  <li>{t('legal.privacyPolicy.section1_a_item4')}</li>
                  <li>{t('legal.privacyPolicy.section1_a_item5')}</li>
                </ul>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.privacyPolicy.section1_b')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
                  <li>{t('legal.privacyPolicy.section1_b_item1')}</li>
                  <li>{t('legal.privacyPolicy.section1_b_item2')}</li>
                  <li>{t('legal.privacyPolicy.section1_b_item3')}</li>
                  <li>{t('legal.privacyPolicy.section1_b_item4')}</li>
                </ul>
                
                <h3 className="font-bold text-gray-900 mb-2">{t('legal.privacyPolicy.section1_c')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section1_c_item1')}</li>
                  <li>{t('legal.privacyPolicy.section1_c_item2')}</li>
                  <li>{t('legal.privacyPolicy.section1_c_item3')}</li>
                  <li>{t('legal.privacyPolicy.section1_c_item4')}</li>
                  <li>{t('legal.privacyPolicy.section1_c_item5')}</li>
                </ul>
                
                <p className="text-gray-600 mt-3">{t('legal.privacyPolicy.section1_note')}</p>
              </section>

              {/* Sección II */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section2_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.privacyPolicy.section2_intro')}</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section2_primary1')}</li>
                  <li>{t('legal.privacyPolicy.section2_primary2')}</li>
                  <li>{t('legal.privacyPolicy.section2_primary3')}</li>
                  <li>{t('legal.privacyPolicy.section2_primary4')}</li>
                  <li>{t('legal.privacyPolicy.section2_primary5')}</li>
                  <li>{t('legal.privacyPolicy.section2_primary6')}</li>
                </ol>
                
                <p className="text-gray-600 mt-4 mb-2">{t('legal.privacyPolicy.section2_secondary_intro')}</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section2_secondary1')}</li>
                  <li>{t('legal.privacyPolicy.section2_secondary2')}</li>
                  <li>{t('legal.privacyPolicy.section2_secondary3')}</li>
                  <li>{t('legal.privacyPolicy.section2_secondary4')}</li>
                </ol>
                
                <p className="text-gray-600 mt-4">{t('legal.privacyPolicy.section2_optout')}</p>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section2_note')}</p>
              </section>

              {/* Sección III */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section3_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section3_intro')}</p>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section3_providers_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section3_providers1')}</li>
                  <li>{t('legal.privacyPolicy.section3_providers2')}</li>
                  <li>{t('legal.privacyPolicy.section3_providers3')}</li>
                  <li>{t('legal.privacyPolicy.section3_providers4')}</li>
                </ul>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section3_providers_note')}</p>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section3_authorities')}</p>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section3_no_sale')}</p>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section3_legal')}</p>
              </section>

              {/* Sección IV */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section4_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section4_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section4_item1')}</li>
                  <li>{t('legal.privacyPolicy.section4_item2')}</li>
                  <li>{t('legal.privacyPolicy.section4_item3')}</li>
                  <li>{t('legal.privacyPolicy.section4_item4')}</li>
                </ul>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section4_note')}</p>
              </section>

              {/* Sección V */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section5_title')}</h2>
                <p className="text-gray-600">{t('legal.privacyPolicy.section5_text')}</p>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section5_note')}</p>
              </section>

              {/* Sección VI */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section6_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section6_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section6_right1')}</li>
                  <li>{t('legal.privacyPolicy.section6_right2')}</li>
                  <li>{t('legal.privacyPolicy.section6_right3')}</li>
                  <li>{t('legal.privacyPolicy.section6_right4')}</li>
                </ul>
                <p className="text-gray-600 mt-3">{t('legal.privacyPolicy.section6_revoke')}</p>
                
                <h3 className="font-bold text-gray-900 mt-4 mb-2">{t('legal.privacyPolicy.section6_1_title')}</h3>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section6_1_intro')}</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section6_1_req1')}</li>
                  <li>{t('legal.privacyPolicy.section6_1_req2')}</li>
                  <li>{t('legal.privacyPolicy.section6_1_req3')}</li>
                  <li>{t('legal.privacyPolicy.section6_1_req4')}</li>
                  <li>{t('legal.privacyPolicy.section6_1_req5')}</li>
                  <li>{t('legal.privacyPolicy.section6_1_req6')}</li>
                </ol>
                <p className="text-gray-600 mt-3">{t('legal.privacyPolicy.section6_1_response')}</p>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section6_1_extension')}</p>
              </section>

              {/* Sección VII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section7_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section7_text')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section7_method')}</li>
                </ul>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section7_note')}</p>
              </section>

              {/* Sección VIII */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section8_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section8_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section8_item1')}</li>
                  <li>{t('legal.privacyPolicy.section8_item2')}</li>
                  <li>{t('legal.privacyPolicy.section8_item3')}</li>
                </ul>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section8_note')}</p>
              </section>

              {/* Sección IX */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section9_title')}</h2>
                <p className="text-gray-600 mb-2">{t('legal.privacyPolicy.section9_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section9_item1')}</li>
                  <li>{t('legal.privacyPolicy.section9_item2')}</li>
                  <li>{t('legal.privacyPolicy.section9_item3')}</li>
                </ul>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section9_note')}</p>
                <p className="text-gray-600 mt-2">{t('legal.privacyPolicy.section9_acceptance')}</p>
              </section>

              {/* Sección X */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{t('legal.privacyPolicy.section10_title')}</h2>
                <p className="text-gray-600 mb-3">{t('legal.privacyPolicy.section10_intro')}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>{t('legal.privacyPolicy.section10_email')}</li>
                  <li>{t('legal.privacyPolicy.section10_address')}</li>
                  <li>{t('legal.privacyPolicy.section10_website')}</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;