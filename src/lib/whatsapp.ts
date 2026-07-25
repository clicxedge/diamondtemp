// PLACEHOLDER — replace with JKP Jewellers' real WhatsApp business number before going live.
export const WHATSAPP_PHONE = "910000000000";

export function waLink(context: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(context)}`;
}
