import { apiFetch, apiV1Path } from "@/lib/api/client";
import { storeSession } from "@/lib/api/session";
import type {
  BillingCycle,
  CommunityStatus,
  Membership,
  MembershipSelectResponse,
  Payment,
  PaymentInitializeResponse,
  SessionResponse,
  TierInfo,
  UbuntuPass,
  User,
  Wallet,
} from "@/lib/api/types";

export async function createSession(input: {
  email: string;
  name?: string;
  phone?: string;
}): Promise<SessionResponse> {
  const session = await apiFetch<SessionResponse>(
    apiV1Path("/auth/session"),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    { auth: false },
  );
  storeSession(session);
  return session;
}

export async function getCurrentUser(): Promise<User> {
  return apiFetch<User>(apiV1Path("/users/me"));
}

export async function listMembershipTiers(): Promise<TierInfo[]> {
  return apiFetch<TierInfo[]>(apiV1Path("/memberships"), undefined, {
    auth: false,
  });
}

export async function getMyMembership(): Promise<Membership> {
  return apiFetch<Membership>(apiV1Path("/memberships/me"));
}

export async function selectMembership(input: {
  tier: string;
  region: string;
  cycle: BillingCycle;
  auto_renew?: boolean;
}): Promise<MembershipSelectResponse> {
  return apiFetch<MembershipSelectResponse>(apiV1Path("/memberships/select"), {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function cancelAutoRenew(): Promise<Membership> {
  return apiFetch<Membership>(apiV1Path("/memberships/auto-renew/cancel"), {
    method: "POST",
  });
}

export async function initializePayment(input: {
  tier: string;
  region: string;
  cycle: BillingCycle;
  auto_renew: boolean;
  redirect_url: string;
}): Promise<PaymentInitializeResponse> {
  return apiFetch<PaymentInitializeResponse>(apiV1Path("/payments/initialize"), {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getPayment(reference: string): Promise<Payment> {
  return apiFetch<Payment>(
    apiV1Path(`/payments/${encodeURIComponent(reference)}`),
  );
}

export async function listUbuntuPasses(): Promise<UbuntuPass[]> {
  return apiFetch<UbuntuPass[]>(apiV1Path("/ubuntu-pass"));
}

export async function getWallet(): Promise<Wallet> {
  return apiFetch<Wallet>(apiV1Path("/wallet"));
}

export async function getCommunityStatus(): Promise<CommunityStatus> {
  return apiFetch<CommunityStatus>(apiV1Path("/community/status"));
}
