/** Official Gizmoz Trades payment accounts for electronic invoices */

export type BankAccount = {
  holder: string;
  bank: string;
  accountNumber: string;
  branch?: string;
  /** Name registered on the wallet / account (MoMo, etc.) */
  registeredName?: string;
  channel?: 'bank' | 'momo';
};

// TODO(gizmoz): replace placeholders with the real Gizmoz Trades bank and MoMo accounts before taking payments.
export const STORE_BANK_ACCOUNTS: BankAccount[] = [
  {
    holder: 'Gizmoz Trades',
    bank: 'Bank account (to be added)',
    accountNumber: 'Pending',
    channel: 'bank',
  },
  {
    holder: 'Gizmoz Trades',
    bank: 'MTN MoMo (to be added)',
    accountNumber: 'Pending',
    registeredName: 'Gizmoz Trades',
    channel: 'momo',
  },
];

export const STORE_INVOICE_ISSUER = {
  brand: 'GIZMOZ TRADES',
  legalName: 'Gizmoz Trades',
  contactName: 'Customer Support',
  addressLines: ['Accra', 'Greater Accra Region', 'Ghana'],
  phones: ['+233 20 959 7443'],
  email: 'support@gizmoztrades.com',
};
