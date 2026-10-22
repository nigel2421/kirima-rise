export const OFFICIAL_PHONE = '+254 723 261 973';
export const WHATSAPP_NUMBER = '254716953637';
export const OFFICIAL_EMAIL = 'info@kirimarise.co.ke';

export function getWhatsAppUrl(locale: string, parcelInfo?: { parcelNo?: string; block?: string }): string {
  let message = '';

  if (locale === 'sw') {
    if (parcelInfo?.parcelNo) {
      message = `Hujambo Kirima Rise, ningependa kuulizia kuhusu kiwanja nambari ${parcelInfo.parcelNo}${
        parcelInfo.block ? ` katika ${parcelInfo.block}` : ''
      }. Tafadhali nijulishe hali yake ya sasa, amana inayohitajika, na jinsi ya kutoa hatimiliki.`;
    } else {
      message = 'Hujambo Kirima Rise, nawasiliana nanyi kutoka tovuti rasmi kuhusu uhalalishaji wa ardhi na ununuzi wa viwanja eneo la Njiru.';
    }
  } else {
    if (parcelInfo?.parcelNo) {
      message = `Hello Kirima Rise, I am inquiring about parcel ${parcelInfo.parcelNo}${
        parcelInfo.block ? ` in ${parcelInfo.block}` : ''
      }. Please share current availability, deposit terms, and title deed processing details.`;
    } else {
      message = 'Hello Kirima Rise, I am reaching out from the website regarding plot regularisation and purchase at Njiru.';
    }
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
