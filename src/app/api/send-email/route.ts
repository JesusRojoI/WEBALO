import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  console.log('========================================');
  console.log('=== INICIO DE ENVÍO DE CORREO ===');
  console.log('========================================');
  
  try {
    const body = await request.json();
    console.log('Body recibido:', JSON.stringify(body, null, 2));
    
    const { to, subject, name, company, email, phone, message, type, orderData, language } = body;
    
    // Verificar API Key
    const apiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM;
    const adminEmail = process.env.ADMIN_EMAIL;
    
    console.log('=== CONFIGURACIÓN ===');
    console.log('API Key existe:', !!apiKey);
    console.log('API Key longitud:', apiKey?.length || 0);
    console.log('API Key primeros 5:', apiKey?.substring(0, 5) || 'N/A');
    console.log('Email From:', emailFrom);
    console.log('Admin Email:', adminEmail);
    
    if (!apiKey) {
      console.error('ERROR: RESEND_API_KEY no está configurada');
      return NextResponse.json({ 
        success: false, 
        error: 'RESEND_API_KEY no está configurada' 
      }, { status: 500 });
    }
    
    const resend = new Resend(apiKey);
    const isEnglish = language === 'en';
    
    console.log('Tipo de correo:', type);
    console.log('Destinatario (to):', to);
    console.log('Idioma:', language);

    if (type === 'contact') {
      console.log('=== PROCESANDO CORREO DE CONTACTO ===');
      
      const contactHTML = `
        <div style="font-family:'JetBrains Mono','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#e22787ff,#6B21A8);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'New Contact Message' : 'Nuevo mensaje de contacto'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;"><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${name}</p>
            <p><strong>${isEnglish ? 'Company:' : 'Compañía:'}</strong> ${company || 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>${isEnglish ? 'Phone:' : 'Teléfono:'}</strong> ${phone}</p>
            <p><strong>${isEnglish ? 'Message:' : 'Mensaje:'}</strong></p>
            <p style="background:#f1f5f9;padding:15px;border-radius:8px;">${message}</p>
          </div>
        </div>`;

      // Forward al admin
      console.log('1. Enviando forward al admin:', adminEmail);
      
      if (adminEmail) {
        try {
          const adminResult = await resend.emails.send({
            from: emailFrom || 'onboarding@resend.dev',
            to: adminEmail,
            subject: isEnglish ? '[FWD] New Contact Message - WEBALO' : '[FWD] Nuevo mensaje de contacto - WEBALO',
            html: contactHTML,
          });
          console.log('✓ Forward al admin enviado:', JSON.stringify(adminResult));
        } catch (adminError: any) {
          console.error('✗ Error enviando forward al admin:');
          console.error('Status:', adminError?.statusCode || adminError?.response?.status);
          console.error('Message:', adminError?.message || adminError?.response?.data);
          console.error('Full error:', JSON.stringify(adminError));
        }
      } else {
        console.warn('ADMIN_EMAIL no está configurado');
      }

      // Confirmación al cliente
      const clientHTML = `
        <div style="font-family:'JetBrains Mono','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#e22787ff,#6B21A8);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Message Received' : 'Mensaje recibido'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${name}</strong>,` : `Hola <strong>${name}</strong>,`}</p>
            <p>${isEnglish ? 'We have received your message and will contact you soon.' : 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'}</p>
            <p style="color:#6B7280;">WEBALO - info@webalo.com.mx</p>
          </div>
        </div>`;

      console.log('2. Enviando confirmación al cliente:', to);
      
      try {
        const clientResult = await resend.emails.send({
          from: emailFrom || 'onboarding@resend.dev',
          to: to,
          subject: isEnglish ? 'Message Received - WEBALO' : 'Mensaje recibido - WEBALO',
          html: clientHTML,
        });
        console.log('✓ Confirmación al cliente enviada:', JSON.stringify(clientResult));
      } catch (clientError: any) {
        console.error('✗ Error enviando confirmación al cliente:');
        console.error('Status:', clientError?.statusCode || clientError?.response?.status);
        console.error('Message:', clientError?.message || clientError?.response?.data);
        console.error('Full error:', JSON.stringify(clientError));
      }

      console.log('=== CORREO DE CONTACTO COMPLETADO ===');
      return NextResponse.json({ success: true });
    }

    // Email de confirmación de compra
    if (orderData) {
      console.log('=== PROCESANDO CORREO DE COMPRA ===');
      
      const productosHTML = orderData.productos
        .map((p: any) => `<tr><td style="padding:8px;border-bottom:1px solid rgba(226,39,135,0.2);color:#1F2937;">${p.nombre} × ${p.cantidad}</td><td style="padding:8px;border-bottom:1px solid rgba(226,39,135,0.2);text-align:right;color:#e22787ff;">$${p.precio.toFixed(2)} MXN</td></tr>`)
        .join('');

      const emailHTML = `
        <div style="font-family:'JetBrains Mono','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#e22787ff,#6B21A8);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Purchase Confirmed!' : '¡Compra confirmada!'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;">${isEnglish ? `Hello <strong style="color:#e22787ff;">${orderData.nombre}</strong>,` : `Hola <strong style="color:#e22787ff;">${orderData.nombre}</strong>,`}</p>
            <p>${isEnglish ? 'Your order has been processed successfully.' : 'Tu pedido ha sido procesado correctamente.'}</p>
            <h2 style="color:#1F2937;font-size:18px;border-bottom:2px solid #e22787ff;padding-bottom:8px;">${isEnglish ? 'Order Summary' : 'Resumen de tu pedido'}</h2>
            <table style="width:100%;border-collapse:collapse;">${productosHTML}</table>
            <div style="margin-top:20px;padding:20px;background:#fdf2f8;border-radius:8px;border:1px solid rgba(226,39,135,0.2);">
              <p><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> <span style="color:#e22787ff;">$${orderData.subtotal.toFixed(2)} MXN</span></p>
              <p><strong>${isEnglish ? 'Tax (16%):' : 'IVA (16%):'}</strong> <span style="color:#e22787ff;">$${orderData.impuesto.toFixed(2)} MXN</span></p>
              <p style="font-size:18px;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#e22787ff;">$${orderData.total.toFixed(2)} <span style="font-size:14px;">MXN</span></span></p>
            </div>
            <p style="color:#6B7280;"><strong>${isEnglish ? 'Transaction:' : 'Transacción:'}</strong> ${orderData.transactionId}</p>
            <p>${isEnglish ? 'Thank you for your purchase at' : 'Gracias por tu compra en'} <strong style="color:#e22787ff;">WEBALO</strong>.</p>
          </div>
          <div style="background:#fdf2f8;padding:20px;text-align:center;border-top:1px solid rgba(226,39,135,0.1);">
            <p style="color:#6B7280;font-size:12px;margin:0;">WEBALO - info@webalo.com.mx</p>
          </div>
        </div>`;

      console.log('1. Enviando correo de compra al cliente:', to);
      
      try {
        const clientResult = await resend.emails.send({
          from: emailFrom || 'onboarding@resend.dev',
          to: to,
          subject: isEnglish ? 'Purchase Confirmed! - WEBALO' : '¡Compra confirmada! - WEBALO',
          html: emailHTML,
        });
        console.log('✓ Correo de compra enviado al cliente:', JSON.stringify(clientResult));
      } catch (clientError: any) {
        console.error('✗ Error enviando correo de compra al cliente:');
        console.error('Status:', clientError?.statusCode || clientError?.response?.status);
        console.error('Message:', clientError?.message || clientError?.response?.data);
        console.error('Full error:', JSON.stringify(clientError));
      }

      // Forward al admin
      console.log('2. Enviando forward de compra al admin:', adminEmail);
      
      if (adminEmail) {
        try {
          const adminResult = await resend.emails.send({
            from: emailFrom || 'onboarding@resend.dev',
            to: adminEmail,
            subject: isEnglish ? `[FWD] New Purchase - ${orderData.nombre}` : `[FWD] Nueva compra - ${orderData.nombre}`,
            html: `<div style="font-family:'JetBrains Mono','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;"><div style="background:#e22787ff;padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? 'New Purchase' : 'Nueva compra'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Email:</strong> ${orderData.email}</p><p><strong>Total:</strong> <span style="color:#e22787ff;">$${orderData.total.toFixed(2)} MXN</span></p></div>${emailHTML}</div>`,
          });
          console.log('✓ Forward de compra enviado al admin:', JSON.stringify(adminResult));
        } catch (adminError: any) {
          console.error('✗ Error enviando forward de compra al admin:');
          console.error('Status:', adminError?.statusCode || adminError?.response?.status);
          console.error('Message:', adminError?.message || adminError?.response?.data);
          console.error('Full error:', JSON.stringify(adminError));
        }
      }

      console.log('=== CORREO DE COMPRA COMPLETADO ===');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('=== ERROR EN ENVÍO DE CORREO ===');
    console.error('Status:', error?.statusCode || error?.response?.status);
    console.error('Message:', error?.message || error?.response?.data);
    console.error('Full error:', JSON.stringify(error));
    
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Error desconocido' 
    }, { status: 500 });
  }
}