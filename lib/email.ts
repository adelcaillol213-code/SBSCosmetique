import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail({
  to,
  name,
  orderId,
  items,
  total,
}: {
  to: string;
  name: string;
  orderId: number;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}) {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${(item.price * item.quantity).toFixed(2)} €</td>
      </tr>
    `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmation de commande</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      
      <div style="text-align: center; padding: 30px 0;">
        <h1 style="font-size: 28px; font-weight: bold; color: #111;">LuxeShop</h1>
      </div>

      <div style="background: #f9f9f9; border-radius: 16px; padding: 30px; margin-bottom: 24px;">
        <h2 style="font-size: 22px; margin: 0 0 8px;">Merci pour votre commande ! 🎉</h2>
        <p style="color: #666; margin: 0;">Bonjour ${name}, votre commande a bien été confirmée.</p>
      </div>

      <div style="background: white; border: 1px solid #eee; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 16px; font-size: 16px; color: #111;">
          Commande #${orderId}
        </h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 12px; text-align: left; font-size: 13px; color: #666;">Produit</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; color: #666;">Qté</th>
              <th style="padding: 12px; text-align: right; font-size: 13px; color: #666;">Prix</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 16px 12px; font-weight: bold; font-size: 16px;">Total</td>
              <td style="padding: 16px 12px; font-weight: bold; font-size: 16px; text-align: right;">${total.toFixed(2)} €</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style="background: #f0f9ff; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 16px;">Prochaines étapes</h3>
        <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 2;">
          <li>Préparation de votre commande (1-2 jours)</li>
          <li>Expédition sous 3-5 jours ouvrés</li>
          <li>Livraison à votre adresse</li>
        </ul>
      </div>

      <div style="text-align: center; padding: 20px 0; color: #999; font-size: 13px;">
        <p>© 2026 LuxeShop — Tous droits réservés</p>
        <p>Des questions ? Contactez-nous à support@luxeshop.fr</p>
      </div>

    </body>
    </html>
  `;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to,
    subject: `✅ Confirmation de votre commande #${orderId} — LuxeShop`,
    html,
  });
}

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      
      <div style="text-align: center; padding: 30px 0;">
        <h1 style="font-size: 28px; font-weight: bold; color: #111;">LuxeShop</h1>
      </div>

      <div style="background: #f9f9f9; border-radius: 16px; padding: 30px; margin-bottom: 24px; text-align: center;">
        <h2 style="font-size: 24px; margin: 0 0 12px;">Bienvenue ${name} ! 🎉</h2>
        <p style="color: #666; margin: 0 0 24px;">Votre compte a été créé avec succès.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop" 
           style="display: inline-block; background: #111; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600;">
          Découvrir la boutique
        </a>
      </div>

      <div style="background: white; border: 1px solid #eee; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 16px;">Ce qui vous attend :</h3>
        <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 2.2;">
          <li>🛍️ Plus de 12 produits premium</li>
          <li>🚚 Livraison gratuite dès 50€</li>
          <li>↩️ Retours gratuits sous 30 jours</li>
          <li>🔒 Paiement 100% sécurisé</li>
        </ul>
      </div>

      <div style="text-align: center; padding: 20px 0; color: #999; font-size: 13px;">
        <p>© 2026 LuxeShop — Tous droits réservés</p>
      </div>

    </body>
    </html>
  `;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to,
    subject: `👋 Bienvenue sur LuxeShop, ${name} !`,
    html,
  });
}