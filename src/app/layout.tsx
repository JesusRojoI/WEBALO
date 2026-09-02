import type { Metadata } from 'next';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'WEBALO - Desarrollo Web Fullstack',
  description: 'Tu puerta de entrada al emocionante mundo del desarrollo web Fullstack con Python.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <I18nProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}