import nodemailer from 'nodemailer';

// Helper to parse the custom measurements string e.g. "Custom (C:40\" S:18\" Sl:25\" W:34\" TL:42\" L:38\")"
function parseCustomSize(sizeStr: string) {
  if (!sizeStr || !sizeStr.startsWith("Custom (")) return null;
  try {
    const content = sizeStr.slice(8, -1);
    const parts = content.split(" ");
    const measurements: { label: string; value: string }[] = [];
    
    parts.forEach(part => {
      const [key, val] = part.split(":");
      if (key && val) {
        const cleanVal = val.replace(/"/g, '');
        if (key === 'C') measurements.push({ label: 'Chest', value: cleanVal + '"' });
        if (key === 'S') measurements.push({ label: 'Shoulder', value: cleanVal + '"' });
        if (key === 'Sl') measurements.push({ label: 'Sleeve Length', value: cleanVal + '"' });
        if (key === 'W') measurements.push({ label: 'Trouser Waist', value: cleanVal + '"' });
        if (key === 'TL') measurements.push({ label: 'Trouser Length', value: cleanVal + '"' });
        if (key === 'L') measurements.push({ label: 'Length', value: cleanVal + '"' });
      }
    });
    return measurements;
  } catch (err) {
    console.error("Failed to parse custom size string:", err);
    return null;
  }
}

// Initialize Nodemailer transporter using Gmail SMTP
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("⚠️ EMAIL_USER or EMAIL_PASS environment variables are missing. Emails will not be sent.");
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });
}

export async function sendOrderEmailsAction(order: {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  paymentMethod: string;
  paymentReference: string;
  totalAmount: number;
  shippingFee: number;
  items: any[];
}) {
  const transporter = getTransporter();
  if (!transporter) return { success: false, error: "Transporter not configured" };

  const isPaystack = order.paymentMethod === 'paystack';
  const paymentMethodLabel = isPaystack ? 'Paid (via Paystack)' : 'Pending (WhatsApp Confirmation)';

  // Build order items HTML list
  let itemsHtml = '';
  order.items.forEach(item => {
    const customSizeDetails = parseCustomSize(item.size);
    let sizeDetailsHtml = '';
    
    if (customSizeDetails) {
      sizeDetailsHtml = `
        <div style="margin-top: 4px; padding: 6px 10px; background-color: #f9f9f9; border-left: 2px solid #b89047; font-size: 11px; color: #555; border-radius: 4px;">
          <strong>Bespoke Dimensions:</strong><br/>
          ${customSizeDetails.map(m => `${m.label}: ${m.value}`).join(' | ')}
        </div>
      `;
    } else {
      sizeDetailsHtml = `<span style="font-size: 11px; color: #777;">Size: <strong>${item.size}</strong></span>`;
    }

    itemsHtml += `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 0; vertical-align: top;">
          <span style="font-weight: 600; color: #0a0a0a; font-size: 14px;">${item.name}</span><br/>
          ${sizeDetailsHtml}
        </td>
        <td style="padding: 12px 0; text-align: center; vertical-align: top; color: #555; font-size: 14px;">x${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; vertical-align: top; font-weight: 600; color: #0a0a0a; font-size: 14px;">₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `;
  });

  // Common Header & Styling (Frankie Styles Luxury Theme)
  const baseStyle = `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  `;

  const headerLogoHtml = `
    <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b89047;">
      <h1 style="color: #ffffff; font-family: 'Bodoni MT', 'Didot', 'Playfair Display', serif; font-weight: 300; letter-spacing: 6px; margin: 0; font-size: 24px; text-transform: uppercase;">
        Frankie <span style="color: #b89047; font-weight: 400;">Styles</span>
      </h1>
      <p style="color: #888888; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: 600;">
        ATELIER • NATIVE LUXURY
      </p>
    </div>
  `;

  // 1. SHOPPER EMAIL CONTENT
  const shopperHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Frankie Styles Order Confirmation</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0a0a0a; margin-top: 0; margin-bottom: 20px;">
            Order Confirmation
          </h2>
          <p style="font-size: 14px; color: #555; margin-bottom: 24px;">
            Dear ${order.name},<br/><br/>
            Thank you for choosing Frankie Styles. We have successfully received your request. Your bespoke native wear order is now registered under reference <strong>${order.paymentReference}</strong>.
          </p>

          <div style="background-color: #fdfaf4; border: 1px solid #f3ebd6; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: left;">
            <h4 style="color: #b89047; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">What Happens Next?</h4>
            <p style="font-size: 12.5px; color: #666; margin: 0; line-height: 1.5;">
              Our tailoring team will review your order details and contact you via <strong>Phone/WhatsApp</strong> within 24 hours to confirm fabric availability, verify sizing details, or schedule physical/virtual fitting sessions.
            </p>
          </div>

          <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #0a0a0a; padding-bottom: 8px; margin-bottom: 15px; color: #0a0a0a;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="border-bottom: 1px solid #eee; font-size: 11px; text-transform: uppercase; color: #999; letter-spacing: 1px;">
                <th style="padding-bottom: 8px; text-align: left;">Item</th>
                <th style="padding-bottom: 8px; text-align: center; width: 60px;">Qty</th>
                <th style="padding-bottom: 8px; text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <table style="width: 100%; margin-top: 10px; font-size: 13px; border-collapse: collapse; color: #555;">
            <tr>
              <td style="padding: 4px 0; text-align: left;">Subtotal</td>
              <td style="padding: 4px 0; text-align: right; font-weight: 500;">₦${(order.totalAmount - order.shippingFee).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; text-align: left;">Shipping</td>
              <td style="padding: 4px 0; text-align: right; font-weight: 500;">${order.shippingFee === 0 ? "FREE" : `₦${order.shippingFee.toLocaleString()}`}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0 0 0; text-align: left; font-size: 15px; font-weight: 700; color: #0a0a0a;">Total</td>
              <td style="padding: 12px 0 0 0; text-align: right; font-size: 15px; font-weight: 700; color: #b89047;">₦${order.totalAmount.toLocaleString()}</td>
            </tr>
          </table>

          <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #0a0a0a; padding-bottom: 8px; margin-top: 40px; margin-bottom: 15px; color: #0a0a0a;">Delivery Address</h3>
          <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">
            <strong>Recipient:</strong> ${order.name}<br/>
            <strong>Contact:</strong> ${order.phone}<br/>
            <strong>Address:</strong> ${order.address}, ${order.city}, ${order.state} State, Nigeria
          </p>
        </div>

        <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
          <p style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #444;">Frankie Styles Atelier</p>
          <p style="margin: 0 0 5px 0;">Lekki Phase 1, Lagos, Nigeria</p>
          <p style="margin: 0;">Need help? Email us at <a href="mailto:frankiestyles4u@gmail.com" style="color: #b89047; text-decoration: none;">frankiestyles4u@gmail.com</a> or WhatsApp <a href="https://wa.me/2348066913548" style="color: #b89047; text-decoration: none;">+234 806 691 3548</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. ADMIN EMAIL CONTENT
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Atelier Alert: New Order Received</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px;">
          <div style="padding: 10px 15px; background-color: #e8f5e9; border-left: 4px solid #4caf50; color: #2e7d32; font-size: 13px; font-weight: 600; margin-bottom: 25px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
            Atelier Alert: New Order Created Successfully
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13.5px; color: #333;">
            <tr style="border-bottom: 1px solid #f5f5f5;">
              <td style="padding: 10px 0; font-weight: 600; color: #777; width: 150px;">Customer Name</td>
              <td style="padding: 10px 0; font-weight: 700; color: #0a0a0a;">${order.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f5;">
              <td style="padding: 10px 0; font-weight: 600; color: #777;">Customer Email</td>
              <td style="padding: 10px 0; font-weight: 500;"><a href="mailto:${order.email}" style="color: #b89047; text-decoration: none;">${order.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f5;">
              <td style="padding: 10px 0; font-weight: 600; color: #777;">Phone (WhatsApp)</td>
              <td style="padding: 10px 0; font-weight: 700; color: #0a0a0a;"><a href="https://wa.me/${order.phone.replace(/[^0-9]/g, '')}" style="color: #b89047; text-decoration: none;">${order.phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f5;">
              <td style="padding: 10px 0; font-weight: 600; color: #777;">Order Total</td>
              <td style="padding: 10px 0; font-weight: 700; color: #b89047; font-size: 15px;">₦${order.totalAmount.toLocaleString()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f5;">
              <td style="padding: 10px 0; font-weight: 600; color: #777;">Payment Method</td>
              <td style="padding: 10px 0; font-weight: 600;">${paymentMethodLabel}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f5;">
              <td style="padding: 10px 0; font-weight: 600; color: #777;">Reference Code</td>
              <td style="padding: 10px 0; font-family: monospace; font-weight: bold;">${order.paymentReference}</td>
            </tr>
          </table>

          <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #0a0a0a; padding-bottom: 8px; margin-bottom: 15px; color: #0a0a0a;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="border-bottom: 1px solid #eee; font-size: 11px; text-transform: uppercase; color: #999; letter-spacing: 1px;">
                <th style="padding-bottom: 8px; text-align: left;">Item</th>
                <th style="padding-bottom: 8px; text-align: center; width: 60px;">Qty</th>
                <th style="padding-bottom: 8px; text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #0a0a0a; padding-bottom: 8px; margin-bottom: 15px; color: #0a0a0a;">Shipping Info</h3>
          <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">
            <strong>Street:</strong> ${order.address}<br/>
            <strong>City/Area:</strong> ${order.city}<br/>
            <strong>State:</strong> ${order.state} State, Nigeria
          </p>

          <div style="margin-top: 40px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin" style="background-color: #0a0a0a; border: 1px solid #b89047; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px; display: inline-block;">
              Open Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send the Emails concurrently
  try {
    const shopperPromise = transporter.sendMail({
      from: `"Frankie Styles Atelier" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: `Order Confirmation - ${order.paymentReference}`,
      html: shopperHtml
    });

    const adminPromise = transporter.sendMail({
      from: `"Frankie Styles Atelier Notification" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // sends to the admin mailbox
      subject: `Atelier Alert: New Order ${order.paymentReference} - ₦${order.totalAmount.toLocaleString()}`,
      html: adminHtml
    });

    await Promise.all([shopperPromise, adminPromise]);
    console.log(`✉️ Order confirmation emails dispatched successfully for order ${order.paymentReference}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer failed to send order confirmation emails:", error);
    return { success: false, error };
  }
}

export async function sendPaymentConfirmationEmailAction(order: {
  name: string;
  email: string;
  paymentReference: string;
  totalAmount: number;
  shippingFee: number;
  items: any[];
}) {
  const transporter = getTransporter();
  if (!transporter) return { success: false, error: "Transporter not configured" };

  let itemsHtml = '';
  order.items.forEach(item => {
    const customSizeDetails = parseCustomSize(item.size);
    let sizeDetailsHtml = '';
    
    if (customSizeDetails) {
      sizeDetailsHtml = `
        <div style="margin-top: 4px; padding: 6px 10px; background-color: #f9f9f9; border-left: 2px solid #b89047; font-size: 11px; color: #555; border-radius: 4px;">
          <strong>Bespoke Dimensions:</strong><br/>
          ${customSizeDetails.map(m => `${m.label}: ${m.value}`).join(' | ')}
        </div>
      `;
    } else {
      sizeDetailsHtml = `<span style="font-size: 11px; color: #777;">Size: <strong>${item.size}</strong></span>`;
    }

    itemsHtml += `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 0; vertical-align: top;">
          <span style="font-weight: 600; color: #0a0a0a; font-size: 14px;">${item.name}</span><br/>
          ${sizeDetailsHtml}
        </td>
        <td style="padding: 12px 0; text-align: center; vertical-align: top; color: #555; font-size: 14px;">x${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; vertical-align: top; font-weight: 600; color: #0a0a0a; font-size: 14px;">₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `;
  });

  const baseStyle = `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  `;

  const headerLogoHtml = `
    <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b89047;">
      <h1 style="color: #ffffff; font-family: 'Bodoni MT', 'Didot', 'Playfair Display', serif; font-weight: 300; letter-spacing: 6px; margin: 0; font-size: 24px; text-transform: uppercase;">
        Frankie <span style="color: #b89047; font-weight: 400;">Styles</span>
      </h1>
      <p style="color: #888888; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: 600;">
        ATELIER • NATIVE LUXURY
      </p>
    </div>
  `;

  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Confirmed - Frankie Styles</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #2e7d32; margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            ✓ Payment Confirmed
          </h2>
          
          <p style="font-size: 14px; color: #555; margin-bottom: 24px;">
            Dear ${order.name},<br/><br/>
            We are pleased to inform you that your payment of <strong>₦${order.totalAmount.toLocaleString()}</strong> for order <strong>${order.paymentReference}</strong> has been successfully confirmed.
          </p>

          <div style="background-color: #f4faf4; border: 1px solid #dceddc; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: left;">
            <h4 style="color: #2e7d32; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Production Status: Active</h4>
            <p style="font-size: 12.5px; color: #555; margin: 0; line-height: 1.5;">
              Our master tailors have begun crafting your bespoke native wear according to your measurements. We will notify you via email/WhatsApp once your garments are completed and ready for dispatch.
            </p>
          </div>

          <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #0a0a0a; padding-bottom: 8px; margin-bottom: 15px; color: #0a0a0a;">Order Receipt</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="border-bottom: 1px solid #eee; font-size: 11px; text-transform: uppercase; color: #999; letter-spacing: 1px;">
                <th style="padding-bottom: 8px; text-align: left;">Item</th>
                <th style="padding-bottom: 8px; text-align: center; width: 60px;">Qty</th>
                <th style="padding-bottom: 8px; text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <table style="width: 100%; margin-top: 10px; font-size: 13px; border-collapse: collapse; color: #555;">
            <tr>
              <td style="padding: 4px 0; text-align: left;">Subtotal</td>
              <td style="padding: 4px 0; text-align: right; font-weight: 500;">₦${(order.totalAmount - order.shippingFee).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; text-align: left;">Shipping</td>
              <td style="padding: 4px 0; text-align: right; font-weight: 500;">${order.shippingFee === 0 ? "FREE" : `₦${order.shippingFee.toLocaleString()}`}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0 0 0; text-align: left; font-size: 15px; font-weight: 700; color: #0a0a0a;">Total Paid</td>
              <td style="padding: 12px 0 0 0; text-align: right; font-size: 15px; font-weight: 700; color: #2e7d32;">₦${order.totalAmount.toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
          <p style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #444;">Frankie Styles Atelier</p>
          <p style="margin: 0 0 5px 0;">Lekki Phase 1, Lagos, Nigeria</p>
          <p style="margin: 0;">Need help? Email us at <a href="mailto:frankiestyles4u@gmail.com" style="color: #b89047; text-decoration: none;">frankiestyles4u@gmail.com</a> or WhatsApp <a href="https://wa.me/2348066913548" style="color: #b89047; text-decoration: none;">+234 806 691 3548</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Frankie Styles Atelier" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: `Payment Confirmed - Order ${order.paymentReference}`,
      html: confirmationHtml
    });
    console.log(`✉️ Payment confirmation email dispatched successfully to ${order.email} for order ${order.paymentReference}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer failed to send payment confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendOrderDeliveredEmailAction(order: {
  name: string;
  email: string;
  paymentReference: string;
  totalAmount: number;
  shippingFee: number;
  items: any[];
}) {
  const transporter = getTransporter();
  if (!transporter) return { success: false, error: "Transporter not configured" };

  let itemsHtml = '';
  order.items.forEach(item => {
    const customSizeDetails = parseCustomSize(item.size);
    let sizeDetailsHtml = '';
    
    if (customSizeDetails) {
      sizeDetailsHtml = `
        <div style="margin-top: 4px; padding: 6px 10px; background-color: #f9f9f9; border-left: 2px solid #b89047; font-size: 11px; color: #555; border-radius: 4px;">
          <strong>Bespoke Dimensions:</strong><br/>
          ${customSizeDetails.map(m => `${m.label}: ${m.value}`).join(' | ')}
        </div>
      `;
    } else {
      sizeDetailsHtml = `<span style="font-size: 11px; color: #777;">Size: <strong>${item.size}</strong></span>`;
    }

    itemsHtml += `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 0; vertical-align: top;">
          <span style="font-weight: 600; color: #0a0a0a; font-size: 14px;">${item.name}</span><br/>
          ${sizeDetailsHtml}
        </td>
        <td style="padding: 12px 0; text-align: center; vertical-align: top; color: #555; font-size: 14px;">x${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; vertical-align: top; font-weight: 600; color: #0a0a0a; font-size: 14px;">₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `;
  });

  const baseStyle = `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  `;

  const headerLogoHtml = `
    <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b89047;">
      <h1 style="color: #ffffff; font-family: 'Bodoni MT', 'Didot', 'Playfair Display', serif; font-weight: 300; letter-spacing: 6px; margin: 0; font-size: 24px; text-transform: uppercase;">
        Frankie <span style="color: #b89047; font-weight: 400;">Styles</span>
      </h1>
      <p style="color: #888888; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: 600;">
        ATELIER • NATIVE LUXURY
      </p>
    </div>
  `;

  const deliveredHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Delivered - Frankie Styles</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #b89047; margin-top: 0; margin-bottom: 20px;">
            ✦ Order Delivered
          </h2>
          
          <p style="font-size: 14px; color: #555; margin-bottom: 24px;">
            Dear ${order.name},<br/><br/>
            We are thrilled to inform you that your Frankie Styles order <strong>${order.paymentReference}</strong> has been successfully delivered! We hope your new bespoke wear fits beautifully.
          </p>

          <div style="background-color: #fcfcfc; border: 1px solid #eee; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: left;">
            <h4 style="color: #0a0a0a; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Alterations & Adjustments</h4>
            <p style="font-size: 12.5px; color: #666; margin: 0; line-height: 1.5;">
              To guarantee a perfect fit, we provide <strong>complimentary sizing adjustments</strong> within 7 days of delivery. If you need any micro-adjustments, please contact us on WhatsApp or visit our Lekki showroom.
            </p>
          </div>

          <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #0a0a0a; padding-bottom: 8px; margin-bottom: 15px; color: #0a0a0a;">Delivered Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="border-bottom: 1px solid #eee; font-size: 11px; text-transform: uppercase; color: #999; letter-spacing: 1px;">
                <th style="padding-bottom: 8px; text-align: left;">Item</th>
                <th style="padding-bottom: 8px; text-align: center; width: 60px;">Qty</th>
                <th style="padding-bottom: 8px; text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>

        <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
          <p style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #444;">Frankie Styles Atelier</p>
          <p style="margin: 0 0 5px 0;">Lekki Phase 1, Lagos, Nigeria</p>
          <p style="margin: 0;">Need help? Email us at <a href="mailto:frankiestyles4u@gmail.com" style="color: #b89047; text-decoration: none;">frankiestyles4u@gmail.com</a> or WhatsApp <a href="https://wa.me/2348066913548" style="color: #b89047; text-decoration: none;">+234 806 691 3548</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Frankie Styles Atelier" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: `Order Delivered - ${order.paymentReference}`,
      html: deliveredHtml
    });
    console.log(`✉️ Order delivered email dispatched successfully to ${order.email} for order ${order.paymentReference}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer failed to send order delivered email:", error);
    return { success: false, error };
  }
}

export async function sendOrderCancelledEmailAction(order: {
  name: string;
  email: string;
  paymentReference: string;
  totalAmount: number;
  shippingFee: number;
  items: any[];
}) {
  const transporter = getTransporter();
  if (!transporter) return { success: false, error: "Transporter not configured" };

  const baseStyle = `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  `;

  const headerLogoHtml = `
    <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b89047;">
      <h1 style="color: #ffffff; font-family: 'Bodoni MT', 'Didot', 'Playfair Display', serif; font-weight: 300; letter-spacing: 6px; margin: 0; font-size: 24px; text-transform: uppercase;">
        Frankie <span style="color: #b89047; font-weight: 400;">Styles</span>
      </h1>
      <p style="color: #888888; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: 600;">
        ATELIER • NATIVE LUXURY
      </p>
    </div>
  `;

  const cancelledHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Cancelled - Frankie Styles</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #c62828; margin-top: 0; margin-bottom: 20px;">
            Order Cancelled
          </h2>
          
          <p style="font-size: 14px; color: #555; margin-bottom: 24px;">
            Dear ${order.name},<br/><br/>
            This email is to confirm that your order <strong>${order.paymentReference}</strong> has been cancelled.
          </p>

          <div style="background-color: #ffebee; border: 1px solid #ffcdd2; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: left;">
            <h4 style="color: #c62828; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Need Assistance?</h4>
            <p style="font-size: 12.5px; color: #c62828; margin: 0; line-height: 1.5; font-weight: 500;">
              If you did not request this cancellation or would like to reactivate your custom order, please contact our support team on WhatsApp immediately.
            </p>
          </div>
        </div>

        <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
          <p style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #444;">Frankie Styles Atelier</p>
          <p style="margin: 0 0 5px 0;">Lekki Phase 1, Lagos, Nigeria</p>
          <p style="margin: 0;">Need help? Email us at <a href="mailto:frankiestyles4u@gmail.com" style="color: #b89047; text-decoration: none;">frankiestyles4u@gmail.com</a> or WhatsApp <a href="https://wa.me/2348066913548" style="color: #b89047; text-decoration: none;">+234 806 691 3548</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Frankie Styles Atelier" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: `Order Cancelled - ${order.paymentReference}`,
      html: cancelledHtml
    });
    console.log(`✉️ Order cancelled email dispatched successfully to ${order.email} for order ${order.paymentReference}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer failed to send order cancelled email:", error);
    return { success: false, error };
  }
}

export async function sendOrderStatusUpdateEmailAction(order: {
  name: string;
  email: string;
  paymentReference: string;
  totalAmount: number;
  shippingFee: number;
  items: any[];
  status: string;
}) {
  if (order.status === 'paid') {
    return sendPaymentConfirmationEmailAction(order);
  }
  if (order.status === 'delivered') {
    return sendOrderDeliveredEmailAction(order);
  }
  if (order.status === 'cancelled') {
    return sendOrderCancelledEmailAction(order);
  }
  return { success: true };
}

export async function sendConsultationEmailsAction(consultation: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  notes?: string | null;
}) {
  const transporter = getTransporter();
  if (!transporter) return { success: false, error: "Transporter not configured" };

  const baseStyle = `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  `;

  const headerLogoHtml = `
    <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b89047;">
      <h1 style="color: #ffffff; font-family: 'Bodoni MT', 'Didot', 'Playfair Display', serif; font-weight: 300; letter-spacing: 6px; margin: 0; font-size: 24px; text-transform: uppercase;">
        Frankie <span style="color: #b89047; font-weight: 400;">Styles</span>
      </h1>
      <p style="color: #888888; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: 600;">
        ATELIER • NATIVE LUXURY
      </p>
    </div>
  `;

  const shopperHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Consultation Requested - Frankie Styles</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #b89047; margin-top: 0; margin-bottom: 20px;">
            ✦ Private Consultation Request
          </h2>
          
          <p style="font-size: 14px; color: #555; margin-bottom: 24px;">
            Dear ${consultation.name},<br/><br/>
            Thank you for requesting a private styling consultation at Frankie Styles. We are excited to assist you in designing and crafting your bespoke native wear.
          </p>

          <div style="background-color: #fcfcfc; border: 1px solid #eee; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: left;">
            <h4 style="color: #0a0a0a; margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #eee; padding-bottom: 6px;">Requested Details</h4>
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;">
              <strong>Bespoke Service:</strong> ${consultation.service}
            </p>
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;">
              <strong>Preferred Date:</strong> ${consultation.date}
            </p>
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;">
              <strong>Phone Number:</strong> ${consultation.phone}
            </p>
            ${consultation.notes ? `
              <p style="font-size: 13px; color: #444; margin: 8px 0 0 0; padding-top: 8px; border-top: 1px dashed #eee;">
                <strong>Special Notes:</strong><br/>
                <span style="color: #666; font-style: italic;">${consultation.notes}</span>
              </p>
            ` : ''}
          </div>

          <p style="font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 0;">
            A representative from our Lekki atelier will contact you via phone or WhatsApp within the next 24 hours to confirm your booking, discuss fabric options, and align on timeslots.
          </p>
        </div>

        <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
          <p style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #444;">Frankie Styles Atelier</p>
          <p style="margin: 0 0 5px 0;">12b Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
          <p style="margin: 0;">Need help? Email us at <a href="mailto:frankiestyles4u@gmail.com" style="color: #b89047; text-decoration: none;">frankiestyles4u@gmail.com</a> or WhatsApp <a href="https://wa.me/2348066913548" style="color: #b89047; text-decoration: none;">+234 806 691 3548</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Consultation Booking Request - Frankie Styles</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #b89047; margin-top: 0; margin-bottom: 20px;">
            New Booking Request
          </h2>
          
          <p style="font-size: 14px; color: #555; margin-bottom: 24px;">
            A new private styling consultation has been requested via the website:
          </p>

          <div style="background-color: #fcfcfc; border: 1px solid #eee; padding: 20px; border-radius: 8px; text-align: left;">
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;"><strong>Client Name:</strong> ${consultation.name}</p>
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;"><strong>Email:</strong> ${consultation.email}</p>
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;"><strong>Phone (WhatsApp):</strong> ${consultation.phone}</p>
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;"><strong>Requested Date:</strong> ${consultation.date}</p>
            <p style="font-size: 13px; color: #444; margin: 0 0 8px 0;"><strong>Service Selected:</strong> ${consultation.service}</p>
            <p style="font-size: 13px; color: #444; margin: 8px 0 0 0; padding-top: 8px; border-top: 1px dashed #eee;">
              <strong>Special Notes:</strong><br/>
              <span style="color: #666;">${consultation.notes || 'None'}</span>
            </p>
          </div>
        </div>

        <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
          <p style="margin: 0; font-weight: 600; text-transform: uppercase;">Frankie Styles Control Panel</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Frankie Styles Atelier" <${process.env.EMAIL_USER}>`,
      to: consultation.email,
      subject: `Consultation Requested - ${consultation.service}`,
      html: shopperHtml
    });

    await transporter.sendMail({
      from: `"Frankie Styles System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER || "frankiestyles4u@gmail.com",
      subject: `[Booking Request] ${consultation.name} - ${consultation.service}`,
      html: adminHtml
    });

    console.log(`✉️ Consultation booking confirmation emails sent for ${consultation.email}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Nodemailer failed to send consultation booking emails:", error);
    return { success: false, error };
  }
}

export async function sendNewsletterBroadcastAction(subject: string, htmlBody: string, subscriberEmails: string[]) {
  const transporter = getTransporter();
  if (!transporter) return { success: false, error: "Transporter not configured" };

  const baseStyle = `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  `;

  const headerLogoHtml = `
    <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b89047;">
      <h1 style="color: #ffffff; font-family: 'Bodoni MT', 'Didot', 'Playfair Display', serif; font-weight: 300; letter-spacing: 6px; margin: 0; font-size: 24px; text-transform: uppercase;">
        Frankie <span style="color: #b89047; font-weight: 400;">Styles</span>
      </h1>
      <p style="color: #888888; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: 600;">
        ATELIER • NATIVE LUXURY
      </p>
    </div>
  `;

  let successCount = 0;
  let failCount = 0;
  let lastError: any = null;

  const sendPromises = subscriberEmails.map(async (email) => {
    const newsletterHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
      </head>
      <body style="${baseStyle}">
        <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          ${headerLogoHtml}
          
          <div style="padding: 40px 30px;">
            ${htmlBody}
          </div>

          <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
            <p style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #444;">Frankie Styles Atelier</p>
            <p style="margin: 0 0 5px 0;">12b Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
            <p style="margin: 0 0 15px 0;">Need help? Email us at <a href="mailto:frankiestyles4u@gmail.com" style="color: #b89047; text-decoration: none;">frankiestyles4u@gmail.com</a> or WhatsApp <a href="https://wa.me/2348066913548" style="color: #b89047; text-decoration: none;">+234 806 691 3548</a></p>
            <p style="margin: 0; color: #aaa; font-size: 10px;">You are receiving this because you subscribed to the Frankie Styles mailing list.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: `"Frankie Styles Atelier" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: newsletterHtml
      });
      successCount++;
    } catch (err) {
      failCount++;
      lastError = err;
      console.error(`❌ Failed to send newsletter to ${email}:`, err);
    }
  });

  await Promise.allSettled(sendPromises);

  console.log(`✉️ Newsletter campaign broadcasted. Success: ${successCount}, Failed: ${failCount}`);

  if (successCount > 0) {
    return { success: true, count: successCount };
  } else {
    return { success: false, error: lastError ? lastError.message : "Failed to dispatch newsletter emails." };
  }
}

export async function sendNewsletterWelcomeEmailAction(email: string) {
  const transporter = getTransporter();
  if (!transporter) return { success: false, error: "Transporter not configured" };

  const baseStyle = `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  `;

  const headerLogoHtml = `
    <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b89047;">
      <h1 style="color: #ffffff; font-family: 'Bodoni MT', 'Didot', 'Playfair Display', serif; font-weight: 300; letter-spacing: 6px; margin: 0; font-size: 24px; text-transform: uppercase;">
        Frankie <span style="color: #b89047; font-weight: 400;">Styles</span>
      </h1>
      <p style="color: #888888; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: 600;">
        ATELIER • NATIVE LUXURY
      </p>
    </div>
  `;

  const welcomeHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Frankie Styles</title>
    </head>
    <body style="${baseStyle}">
      <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        ${headerLogoHtml}
        
        <div style="padding: 40px 30px; text-align: center;">
          <h2 style="font-size: 20px; font-weight: 300; text-transform: uppercase; letter-spacing: 2px; color: #0a0a0a; margin-top: 0; margin-bottom: 10px;">
            Welcome to the Circle
          </h2>
          <div style="width: 40px; height: 1px; background-color: #b89047; margin: 0 auto 25px auto;"></div>
          
          <p style="font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 30px; text-align: left;">
            Thank you for subscribing to the Frankie Styles mailing list. You are now part of an exclusive circle of gentlemen who appreciate the fine art of bespoke native wear.
          </p>

          <p style="font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 30px; text-align: left;">
            As a subscriber, you will receive exclusive updates about:
          </p>
          <ul style="padding-left: 20px; margin: 10px 0 30px 0; text-align: left; list-style-type: square; color: #b89047; font-size: 14px;">
            <li style="margin-bottom: 8px;"><span style="color: #555;">Private preview alerts for new collections</span></li>
            <li style="margin-bottom: 8px;"><span style="color: #555;">VIP booking availability at our Lekki showroom</span></li>
            <li style="margin-bottom: 8px;"><span style="color: #555;">Style tips, traditional garment care, and tailoring insights</span></li>
          </ul>

          <div style="margin: 35px 0;">
            <a href="https://frankiestyles.com/shop" style="background-color: #0a0a0a; color: #ffffff; text-decoration: none; padding: 15px 35px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px; display: inline-block;">
              Browse the Catalog
            </a>
          </div>
        </div>

        <div style="background-color: #f7f7f7; padding: 25px 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
          <p style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #444;">Frankie Styles Atelier</p>
          <p style="margin: 0 0 5px 0;">12b Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
          <p style="margin: 0 0 15px 0;">Need help? Email us at <a href="mailto:frankiestyles4u@gmail.com" style="color: #b89047; text-decoration: none;">frankiestyles4u@gmail.com</a> or WhatsApp <a href="https://wa.me/2348066913548" style="color: #b89047; text-decoration: none;">+234 806 691 3548</a></p>
          <p style="margin: 0; color: #aaa; font-size: 10px;">You are receiving this because you subscribed to the Frankie Styles mailing list.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Frankie Styles Atelier" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Frankie Styles Atelier",
      html: welcomeHtml
    });
    console.log(`✉️ Newsletter welcome email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Nodemailer failed to send welcome email to ${email}:`, error);
    return { success: false, error };
  }
}
