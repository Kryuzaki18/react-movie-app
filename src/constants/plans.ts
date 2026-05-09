export interface Plan {
  value: string;
  label: string;
}

export const PLANS: Plan[] = [
  { value: 'basic',    label: 'Basic — Lorem ipsum (Free)'              },
  { value: 'standard', label: 'Standard — Dolor sit amet ($9.99/mo)'   },
  { value: 'premium',  label: 'Premium — Consectetur ($14.99/mo)'      },
];

export const SIGNUP_FEATURES: string[] = [
  'Unlimited lorem ipsum streaming',
  'Dolor sit amet in HD & 4K',
  'Consectetur adipiscing on all devices',
  'Sed do eiusmod offline downloads',
];
