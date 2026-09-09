'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
  id: string;
  nameKey: string;
  price: number;
  descriptionKey: string;
  image: string;
  redirectToCart?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  id,
  nameKey,
  price,
  descriptionKey,
  image,
  redirectToCart = false,
}) => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id,
      name: t(nameKey),
      price,
      image,
    });
    
    if (redirectToCart) {
      router.push('/carrito/');
    }
  };

  return (
    <div className="plan-card bg-white rounded-2xl shadow-lg overflow-hidden hover-lift">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={t(nameKey)}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-xl font-bold font-title">
            {t(nameKey)}
          </h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <span className="text-3xl font-bold gradient-text">
            ${price.toFixed(2)} MXN
          </span>
          <span className="text-gray-500 text-sm ml-2">
            + {t('cart.iva')}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {t(descriptionKey)}
        </p>
        
        <button
          onClick={handleAddToCart}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {t('common.addToCart')}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;