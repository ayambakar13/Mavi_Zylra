/**
 * Commerce configuration. Replace this number when Zylra's production WhatsApp
 * Business number is ready. Keep the country code out of this value.
 */
export const ZYLRA_WHATSAPP_NUMBER = "8899764864";
export const ZYLRA_WHATSAPP_COUNTRY_CODE = "91";
export const ZYLRA_UPI_ID = process.env.NEXT_PUBLIC_ZYLRA_UPI_ID ?? "YOUR_UPI_ID";
export const ZYLRA_UPI_NAME = "Zylra";

export function getWhatsAppUrl(message: string) {
  const phone = `${ZYLRA_WHATSAPP_COUNTRY_CODE}${ZYLRA_WHATSAPP_NUMBER}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
