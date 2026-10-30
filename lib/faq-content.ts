/** Shared FAQ content for UI + FAQPage JSON-LD (AI / Google). */

export type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

export const FAQ_CATEGORIES = [
  { id: 'all', name: 'All questions', icon: 'ri-question-line' },
  { id: 'orders', name: 'Orders', icon: 'ri-shopping-bag-line' },
  { id: 'shipping', name: 'Shipping', icon: 'ri-truck-line' },
  { id: 'returns', name: 'Returns', icon: 'ri-arrow-go-back-line' },
  { id: 'payment', name: 'Payment', icon: 'ri-bank-card-line' },
  { id: 'account', name: 'Account', icon: 'ri-user-line' },
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'orders',
    question: 'How do I place an order?',
    answer:
      'Look at the products, add what you want, and checkout with your name, email, and phone. We serve Ghana only. Later, when your package is ready in Ghana, you choose pickup or delivery.',
  },
  {
    category: 'orders',
    question: 'I ordered as a guest. How do I see my bill again?',
    answer:
      'Make an account or sign in with the same email you used at checkout. Your guest bills and orders show in Order history. You can also use Track my order with your order number and email.',
  },
  {
    category: 'orders',
    question: 'Where is my order?',
    answer:
      'Sign in and open the order from your account. You will see each step from payment, through buying in China, shipping to Ghana, and ready or delivered. If you have no account yet, use Track my order.',
  },
  {
    category: 'orders',
    question: 'Can I change or cancel my order?',
    answer:
      'Message us on WhatsApp or the contact page as soon as you can, with your order number. If payment is confirmed and we have started buying, changes may not be possible.',
  },
  {
    category: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'It depends on the product and how it ships. We update your order as goods move from China to Ghana. Ask us before you pay if you want a clearer time.',
  },
  {
    category: 'shipping',
    question: 'Do you deliver to my door?',
    answer:
      'Yes, within Ghana. When your package is ready, open Deliveries in your account and choose pickup or delivery. Tell us your day and address, then we call to confirm and share any delivery cost.',
  },
  {
    category: 'shipping',
    question: 'Where do goods arrive in Ghana?',
    answer:
      'Goods come into Ghana for clearing, then become ready for pickup or delivery. Your order page shows when that stage is reached.',
  },
  {
    category: 'shipping',
    question: 'What if I miss the delivery call?',
    answer:
      'We will try again or arrange pickup. Keep your phone number correct so we can reach you.',
  },
  {
    category: 'payment',
    question: 'How can I pay?',
    answer:
      'Every order gets a clear bill with bank or MoMo details. Pay the bill, then tap I’ve paid on your order page so we can confirm and keep going.',
  },
  {
    category: 'payment',
    question: 'I paid the bill. What next?',
    answer:
      'Open your order and tap I’ve paid. That tells us to confirm the transfer. After we confirm, your order moves forward.',
  },
  {
    category: 'payment',
    question: 'Do you accept cash on delivery?',
    answer:
      'No. Pay using the bank or MoMo details on your bill before we buy and ship.',
  },
  {
    category: 'payment',
    question: 'Can I pay in parts?',
    answer:
      'For some bigger orders we may agree a plan. Message us on WhatsApp before you checkout so we can confirm what is possible.',
  },
  {
    category: 'returns',
    question: 'Can I return an item?',
    answer:
      'We handle each order case by case. Contact us with your order number and photos if something is wrong, damaged, or not what you ordered. We will tell you the next step clearly.',
  },
  {
    category: 'returns',
    question: 'What if the item is damaged?',
    answer:
      'Tell us quickly with clear photos and your order number. We review it and work out a fix with you.',
  },
  {
    category: 'account',
    question: 'Do I need an account to buy?',
    answer:
      'No. You can checkout as a guest. Making an account with the same email later lets you reopen bills, tap I’ve paid, and track orders in one place.',
  },
  {
    category: 'account',
    question: 'How do I create an account?',
    answer:
      'Go to Account, then Create account. Enter your name, phone, email, and a strong password. Agree to the terms. You can sign in right away. No email confirmation step.',
  },
  {
    category: 'account',
    question: 'I forgot my password. What do I do?',
    answer:
      'On the sign-in page, use Forgot password. We email a reset link. You can also contact us on WhatsApp with the email on the order.',
  },
];
