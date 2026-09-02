'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';

const CarritoPage = () => {
  const { t, i18n } = useTranslation();
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getIVA,
    getTotal,
    lastAddedItem,
    lastRemovedItem,
    undoRemove,
  } = useCart();

  // Función para obtener el nombre traducido del producto
  const getItemName = (item: any) => {
    if (item.nameKey) {
      return t(item.nameKey);
    }
    return item.name;
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  return (
    <div className="min-h-screen py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          {t('cart.title')}
        </h1>
        
        {/* Notificaciones */}
        {lastAddedItem && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in flex items-center justify-between">
            <p className="text-green-600">
              "{lastAddedItem}" {t('cart.added')}
            </p>
            <Link
              href="/planes/"
              className="text-primary font-medium hover:underline"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        )}
        
        {lastRemovedItem && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in flex items-center justify-between">
            <p className="text-yellow-700">
              "{lastRemovedItem.nameKey ? t(lastRemovedItem.nameKey) : lastRemovedItem.name}" {t('cart.removed')}{' '}
              <button
                onClick={undoRemove}
                className="text-primary font-medium hover:underline ml-2"
              >
                {t('cart.undo')}
              </button>
            </p>
          </div>
        )}
        
        {items.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl text-gray-500 mb-6">{t('cart.empty')}</p>
            <Link
              href="/planes/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 font-bold text-sm text-gray-600">
                <div className="col-span-2">{t('cart.product')}</div>
                <div>{t('cart.price')}</div>
                <div className="text-center">{t('common.quantity')}</div>
                <div className="text-right">{t('cart.subtotal')}</div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                    <div className="col-span-2 flex items-center space-x-4">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      {item.image && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                          <Image
                            src={item.image}
                            alt={getItemName(item)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{getItemName(item)}</p>
                        {item.isCustom && item.customDetails?.projectNumber && (
                          <p className="text-xs text-gray-500">
                            {t('personalized.projectNumber')}: {item.customDetails.projectNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-gray-900 font-medium">
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Resumen */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                {t('cart.total')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="font-medium">${getSubtotal().toFixed(2)} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.iva')}</span>
                  <span className="font-medium">${getIVA().toFixed(2)} MXN</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold text-gray-900">{t('cart.total')}</span>
                  <span className="font-bold text-primary text-xl">
                    ${getTotal().toFixed(2)} MXN
                  </span>
                </div>
              </div>
              
              <Link
                href="/checkout/"
                className="mt-8 w-full block text-center py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t('cart.checkout')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoPage;