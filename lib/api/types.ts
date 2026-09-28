export type BillingCycle = "yearly" | "monthly";

export type RegionalPrice = {
  currency: string;
  yearly: number;
  monthly: number;
};

export type TierInfo = {
  slug: string;
  name: string;
  is_free: boolean;
  pricing: Record<string, RegionalPrice>;
};

export type User = {
  id: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type SessionResponse = {
  access_token: string;
  token_type: string;
  user: User;
};

export type Membership = {
  id: string;
  user_id: string;
  tier: string;
  status: "pending" | "active" | "expired" | "cancelled" | "payment_failed";
  amount: number;
  currency: string;
  region?: string | null;
  billing_cycle?: BillingCycle | null;
  provider?: string | null;
  started_at?: string | null;
  expires_at?: string | null;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
};

export type Payment = {
  id: string;
  user_id: string;
  membership_id?: string | null;
  provider: string;
  provider_transaction_id?: string | null;
  reference: string;
  amount: number;
  currency: string;
  status: "pending" | "successful" | "failed" | "abandoned";
  verified_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type MembershipSelectResponse = {
  membership: Membership;
  requires_payment: boolean;
  payment_reference?: string | null;
  payment_link?: string | null;
};

export type PaymentInitializeResponse = {
  reference: string;
  payment_link: string;
  provider: string;
};

export type UbuntuPass = {
  id: string;
  user_id: string;
  membership_id: string;
  wallet_id?: string | null;
  contract_address?: string | null;
  token_id?: string | null;
  transaction_hash?: string | null;
  network?: string | null;
  status: "pending" | "issuing" | "issued" | "failed";
  issued_at?: string | null;
  error?: string | null;
};

export type Wallet = {
  id: string;
  user_id: string;
  provider: string;
  provider_wallet_id?: string | null;
  wallet_address?: string | null;
  network?: string | null;
  status: string;
};

export type CommunityStatus = {
  id: string;
  user_id: string;
  circle_member_id?: string | null;
  membership_tier: string;
  community_id?: string | null;
  status: "pending" | "active" | "revoked" | "failed";
};

export type ApiErrorBody = {
  detail?: string | { msg?: string }[] | Record<string, unknown>;
  message?: string;
};
