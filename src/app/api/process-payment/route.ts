import { NextResponse } from 'next/server';
import axios from 'axios';

interface PaymentData {
  amount: number;
  orderId: string;
  cardData: {
    number: string;
    name: string;
    month: string;
    year: string;
    cvv: string;
  };
  customer: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    direccion2?: string;
    ciudad: string;
    estado: string;
    pais?: string;
    cp: string;
    empresa?: string;
  };
  metadata?: {
    ip?: string;
    deviceId?: string;
    notes?: string;
  };
}

// Función para limpiar la URL base (eliminar barra final si existe)
const API_URL = (process.env.KEYCOP_API_URL || "https://pagos.keycop.com.mx/api/v1").replace(/\/+$/, '');

async function getAuthToken() {
  console.log('=== PASO 1: AUTENTICACIÓN ===');
  
  const authEndpoints = [
    `${API_URL}/signin`,
    `${API_URL}/auth/login`,
    `${API_URL}/login`,
    `${API_URL}/auth/signin`,
  ];
  
  for (const url of authEndpoints) {
    console.log('Intentando URL:', url);
    
    try {
      const { data } = await axios.post(url, {
        email: process.env.KEYCOP_EMAIL,
        password: process.env.KEYCOP_PASSWORD
      }, {
        timeout: 15000,
      });
      
      console.log('✓ Autenticación exitosa en:', url);
      console.log('Respuesta completa:', JSON.stringify(data));
      
      const token = data.authToken || data.token || data.accessToken || data.data?.authToken || data.data?.token;
      if (token) {
        return token;
      }
      
      if (typeof data === 'string') {
        return data;
      }
    } catch (error: any) {
      console.error(`Error en ${url}:`, error.response?.status, error.response?.statusText);
      if (error.response?.data) {
        console.error('Detalle:', JSON.stringify(error.response.data));
      }
    }
  }
  
  throw new Error('No se pudo autenticar en ningún endpoint');
}

async function tokenizeCard(token: string, payment: PaymentData) {
  console.log('=== PASO 2: TOKENIZACIÓN ===');
  
  const tokenizeEndpoints = [
    `${API_URL}/card/tokenizer`,
    `${API_URL}/cards/tokenize`,
    `${API_URL}/tokenize`,
    `${API_URL}/card/tokenize`,
  ];
  
  for (const url of tokenizeEndpoints) {
    console.log('Intentando URL:', url);
    
    try {
      const card = payment.cardData;
      const { data } = await axios.post(url, {
        cardData: {
          cardNumber: card.number.replace(/\s/g, ''),
          cardholderName: card.name,
          expirationYear: card.year,
          expirationMonth: card.month
        }
      }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
      
      console.log('✓ Tokenización exitosa en:', url);
      console.log('Respuesta completa:', JSON.stringify(data));
      
      const cardToken = data.cardNumberToken || data.token || data.cardToken || data.data?.cardNumberToken;
      if (cardToken) {
        return cardToken;
      }
    } catch (error: any) {
      console.error(`Error en ${url}:`, error.response?.status, error.response?.statusText);
      if (error.response?.data) {
        console.error('Detalle:', JSON.stringify(error.response.data));
      }
    }
  }
  
  throw new Error('No se pudo tokenizar la tarjeta en ningún endpoint');
}

async function executeSale(token: string, cardToken: string, payment: PaymentData) {
  console.log('=== PASO 3: VENTA ===');
  
  const saleEndpoints = [
    `${API_URL}/sale`,
    `${API_URL}/payments/sale`,
    `${API_URL}/charge`,
    `${API_URL}/payment`,
  ];
  
  const salePayload = {
    amount: Number(payment.amount),
    currency: "484",
    reference: payment.orderId,
    customerInformation: {
      firstName: payment.customer.nombre,
      lastName: payment.customer.apellido,
      email: payment.customer.email,
      phone1: payment.customer.telefono,
      address1: payment.customer.direccion,
      address2: payment.customer.direccion2 || "",
      city: payment.customer.ciudad,
      state: payment.customer.estado,
      postalCode: payment.customer.cp,
      country: payment.customer.pais || "MX",
      company: payment.customer.empresa || "",
      ip: payment.metadata?.ip || "127.0.0.1",
    },
    cardData: {
      cardNumberToken: cardToken,
      cvv: payment.cardData.cvv,
    },
  };
  
  for (const url of saleEndpoints) {
    console.log('Intentando URL:', url);
    
    try {
      const { data } = await axios.post(url, salePayload, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 30000,
      });
      
      console.log('✓ Venta exitosa en:', url);
      console.log('Respuesta completa:', JSON.stringify(data));
      
      return data;
    } catch (error: any) {
      console.error(`Error en ${url}:`, error.response?.status, error.response?.statusText);
      if (error.response?.data) {
        console.error('Detalle:', JSON.stringify(error.response.data));
      }
    }
  }
  
  throw new Error('No se pudo procesar la venta en ningún endpoint');
}

export async function POST(request: Request) {
  console.log('========================================');
  console.log('=== INICIO DE PROCESO DE PAGO ===');
  console.log('API_URL original:', process.env.KEYCOP_API_URL);
  console.log('API_URL limpia:', API_URL);
  console.log('KEYCOP_EMAIL:', process.env.KEYCOP_EMAIL);
  console.log('========================================');
  
  try {
    const payment: PaymentData = await request.json();
    console.log('Datos recibidos correctamente');
    console.log('Monto:', payment.amount);
    console.log('OrderId:', payment.orderId);

    if (!payment.amount || payment.amount <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Monto inválido' 
      }, { status: 400 });
    }

    if (!payment.cardData?.number || !payment.cardData?.cvv) {
      return NextResponse.json({ 
        success: false, 
        error: 'Datos de tarjeta incompletos' 
      }, { status: 400 });
    }

    const authToken = await getAuthToken();
    console.log('✓ Token de autenticación obtenido');
    
    const cardToken = await tokenizeCard(authToken, payment);
    console.log('✓ Token de tarjeta obtenido');
    
    const data = await executeSale(authToken, cardToken, payment);
    console.log('✓ Venta procesada');
    
    return NextResponse.json({
      success: data.status == "APPROVED",
      orderId: data.orderId,
      reference: data.reference,
      status: data.status,
      data: data
    });
  } catch (error: any) {
    console.error('=== ERROR EN PROCESO DE PAGO ===');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response data:', JSON.stringify(error.response?.data));
    console.error('Message:', error.message);
    
    return NextResponse.json({
      success: false,
      status: "error",
      error: error.response?.data?.message || error.message || "Error procesando el pago"
    }, { status: 500 });
  }
}