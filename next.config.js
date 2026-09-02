/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  env: {
    KEYCOP_EMAIL: process.env.KEYCOP_EMAIL || '',
    KEYCOP_PASSWORD: process.env.KEYCOP_PASSWORD || '',
    KEYCOP_API_URL: process.env.KEYCOP_API_URL || 'https://pagos.keycop.com.mx/api/v1',
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
    EMAIL_FROM: process.env.EMAIL_FROM || 'administracion@lumetra.mx',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'administracion@lumetra.mx',
  },
}

module.exports = nextConfig