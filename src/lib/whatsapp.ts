const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999999999';

export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductEnquiryURL(productName: string, price: number, template?: string): string {
  const message = template ?? `Hello! I'm interested in *${productName}* priced at ₹${price.toLocaleString('en-IN')}. Could you share more details?`;
  return buildWhatsAppURL(message);
}

export function buildTryOnEnquiryURL(productName: string): string {
  const message = `Hello! I just tried on *${productName}* using your virtual try-on and I love it! Could you help me with pricing and availability?`;
  return buildWhatsAppURL(message);
}
