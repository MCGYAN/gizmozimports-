const WHATSAPP_NUMBER = "233209597443";
const GHANA_PHONE = "+233209597443";
const CHINA_PHONE = "+8613800138000";
const PREFILLED_MESSAGE = "Hi, I want to import a product from China";

const normalizedPhone = (value: string) => value.replace(/[^\d+]/g, "");
const normalizedDigits = (value: string) => value.replace(/\D/g, "");

export const leadConfig = {
  whatsappNumber: WHATSAPP_NUMBER,
  ghanaPhone: GHANA_PHONE,
  chinaPhone: CHINA_PHONE,
  prefilledMessage: PREFILLED_MESSAGE,
  whatsappUrl(message = PREFILLED_MESSAGE) {
    return `https://wa.me/${normalizedDigits(WHATSAPP_NUMBER)}?text=${encodeURIComponent(message)}`;
  },
  telUrl(phone = GHANA_PHONE) {
    return `tel:${normalizedPhone(phone)}`;
  },
};
