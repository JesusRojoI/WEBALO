'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setIsLangOpen(false);
  };

  const currentLang = i18n.language || 'es';
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center group h-full">
            <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="WEBALO"
                width={96}
                height={96}
                className="object-contain"
                style={{ display: 'block' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 h-full">
            <Link
              href="/"
              className="text-white hover:text-pink-400 transition-colors duration-300 font-medium"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/nosotros/"
              className="text-white hover:text-pink-400 transition-colors duration-300 font-medium"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/planes/"
              className="text-white hover:text-pink-400 transition-colors duration-300 font-medium"
            >
              {t('nav.plans')}
            </Link>
            <Link
              href="/contacto-2/"
              className="text-white hover:text-pink-400 transition-colors duration-300 font-medium"
            >
              {t('nav.contact')}
            </Link>

            {/* Language Selector */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white"
              >
                <span className="font-bold">{currentLang.toUpperCase()}</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 animate-fade-in">
                  <button
                    onClick={() => changeLanguage('es')}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">🇲🇽</span>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Español</p>
                      <p className="text-xs text-gray-500">ES</p>
                    </div>
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">🇺🇸</span>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">English</p>
                      <p className="text-xs text-gray-500">EN</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon with counter */}
            <Link
              href="/carrito/"
              className="relative p-2 text-white hover:text-pink-400 transition-colors flex items-center"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white flex items-center"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark border-t border-white/10 animate-fade-in">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-white hover:text-pink-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/nosotros/"
              className="block text-white hover:text-pink-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/planes/"
              className="block text-white hover:text-pink-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.plans')}
            </Link>
            <Link
              href="/contacto-2/"
              className="block text-white hover:text-pink-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <Link
              href="/carrito/"
              className="block text-white hover:text-pink-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('cart.title')} ({cartCount})
            </Link>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <button
                onClick={() => changeLanguage('es')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentLang === 'es' ? 'bg-primary text-white' : 'text-white hover:bg-white/10'
                }`}
              >
                🇲🇽 ES
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentLang === 'en' ? 'bg-primary text-white' : 'text-white hover:bg-white/10'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;