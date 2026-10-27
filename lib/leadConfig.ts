const WHATSAPP_NUMBER = '233540237911';
const GHANA_PHONE = '+233540237911';
const PREFILLED_MESSAGE = 'Hi, I want to import a product from China';

const normalizedPhone = (value: string) => value.replace(/[^\d+]/g, '');
const normalizedDigits = (value: string) => value.replace(/\D/g, '');

export const leadConfig = {
  whatsappNumber: WHATSAPP_NUMBER,
  ghanaPhone: GHANA_PHONE,
  prefilledMessage: PREFILLED_MESSAGE,
  whatsappUrl(message = PREFILLED_MESSAGE) {
    return `https://wa.me/${normalizedDigits(WHATSAPP_NUMBER)}?text=${encodeURIComponent(message)}`;
  },
  telUrl(phone = GHANA_PHONE) {
    return `tel:${normalizedPhone(phone)}`;
  },
};
