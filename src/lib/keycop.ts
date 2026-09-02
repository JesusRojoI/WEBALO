'use server';

import axios from 'axios';

export interface PaymentData {
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

const API_URL = process.env.KEYCOP_API_URL || "https://pagos.keycop.com.mx/api/v1";

async function getAuthToken() {
  console.log('=== KEYCOP AUTH ===');
  console.log('URL:', `${API_URL}/signin`);
  console.log('Email:', process.env.KEYCOP_EMAIL);
  
  try {
    const { data } = await axios.post(`${API_URL}/signin`, {
      email: process.env.KEYCOP_EMAIL,
      password: process.env.KEYCOP_PASSWORD
    });
    console.log('Auth response:', JSON.stringify(data));
    return data.authToken;
  } catch (error: any) {
    console.error('Auth error:', error.response?.status, error.response?.data || error.message);
    throw error;
  }
}

async function tokenizeCard(token: string, payment: PaymentData) {
  console.log('=== KEYCOP TOKENIZE ===');
  console.log('URL:', `${API_URL}/card/tokenizer`);
  
  const card = payment.cardData;
  const { data } = await axios.post(`${API_URL}/card/tokenizer`, {
    cardData: {
      cardNumber: card.number.replace(/\s/g, ''),
      cardholderName: card.name,
      expirationYear: card.year,
      expirationMonth: card.month
    }
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Tokenize response:', JSON.stringify(data));
  return data.cardNumberToken;
}

export async function processKeycopPayment(payment: PaymentData) {
  console.log('=== KEYCOP PAYMENT START ===');
  console.log('API_URL:', API_URL);
  
  try {
    // 1. Autenticación
    const authToken = await getAuthToken();
    console.log('Auth token obtained:', !!authToken);
    
    // 2. Tokenización (Sin el CVV)
    const cardToken = await tokenizeCard(authToken, payment);
    console.log('Card token obtained:', !!cardToken);
    
    // 3. Ejecución de la Venta
    console.log('=== KEYCOP SALE ===');
    console.log('URL:', `${API_URL}/sale`);
    
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
    
    console.log('Sale payload:', JSON.stringify(salePayload, null, 2));
    
    const { data } = await axios.post(`${API_URL}/sale`, salePayload, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('Sale response:', JSON.stringify(data));
    
    return {
      success: data.status == "APPROVED",
      orderId: data.orderId,
      reference: data.reference,
      status: data.status,
      data: data
    };
  } catch (error: any) {
    console.error('=== KEYCOP PAYMENT ERROR ===');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response data:', JSON.stringify(error.response?.data));
    console.error('Full error:', error.message);
    
    if (error.response?.status === 404) {
      console.error('ERROR 404: La URL no existe. Verifica que KEYCOP_API_URL sea correcta.');
      console.error('URL actual:', API_URL);
    }
    
    return {
      success: false,
      status: "error",
      error: error.response?.data?.message || error.response?.statusText || "Error procesando el pago"
    };
  }
}