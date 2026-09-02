'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';

const CompraExitosaPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Recuperar detalles de la orden desde sessionStorage
    const savedOrder = sessionStorage.getItem('lastOrder');
    if (savedOrder) {
      try {
        setOrderDetails(JSON.parse(savedOrder));
      } catch (e) {
        console.error('Error parsing order details:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('success.title')}
            </h1>
            <p className="text-white/90">
              {t('success.subtitle')}
            </p>
          </div>
          
          {/* Cuerpo */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-gray-600">
                {t('success.description')}
              </p>
            </div>
            
            {/* Detalles de la orden */}
            {orderDetails && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  {t('success.orderNumber')}: {orderDetails.transactionId}
                </h2>
                
                <div className="space-y-3">
                  {orderDetails.productos?.map((product: any, index: number) => (
  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
    <div>
      <p className="font-medium text-gray-900">
        {product.nameKey ? t(product.nameKey) : product.nombre}
      </p>
      {product.projectNumber && (
        <p className="text-xs text-gray-500">
          {t('personalized.projectNumber')}: {product.projectNumber}
        </p>
      )}
      <p className="text-sm text-gray-500">× {product.cantidad}</p>
    </div>
    <span className="font-medium">
  ${(product.precio * product.cantidad).toFixed(2)} MXN
</span>
  </div>
))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                    <span>${orderDetails.subtotal?.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.iva')}</span>
                    <span>${orderDetails.impuesto?.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-bold text-gray-900">{t('cart.total')}</span>
                    <span className="font-bold text-primary text-xl">
                      ${orderDetails.total?.toFixed(2)} MXN
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Recibo decorativo */}
            <div className="relative mb-8">
              <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-gray-300"></div>
              <div className="relative flex justify-center">
                <div className="bg-white px-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Botón */}
            <div className="text-center">
              <Link
                href="/planes/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                {t('success.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraExitosaPage;