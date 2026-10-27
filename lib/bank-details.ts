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

export const STORE_BANK_ACCOUNTS: BankAccount[] = [
  {
    holder: 'Celestian Laryea',
    bank: 'GCB',
    accountNumber: '1341010154121',
    channel: 'bank',
  },
  {
    holder: 'FELICIA NAA DEISA LARYEA',
    bank: 'MTN',
    accountNumber: '0555085242',
    registeredName: 'FELICIA NAA DEISA LARYEA',
    channel: 'momo',
  },
];

export const STORE_INVOICE_ISSUER = {
  brand: 'GIZMOZ TRADES',
  legalName: 'Gizmoz Trades',
  contactName: 'Customer Support',
  addressLines: ['Accra', 'Greater Accra Region', 'Ghana'],
  phones: ['+233 54 023 7911'],
  email: 'support@gizmoztrades.com',
};
