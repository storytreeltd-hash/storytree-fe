import "server-only";

import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import { isAllowedAdminEmail } from "@/lib/admin-auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/env";

export type VerifiedAdminUser = {
  uid: string;
  email: string;
};

export async function verifyFirebaseAdminIdToken(
  idToken: string,
): Promise<VerifiedAdminUser> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin is not configured.");
  }

  const auth = await getFirebaseAdminAuth();
  const decoded = await auth.verifyIdToken(idToken);
  const email = decoded.email?.trim().toLowerCase();

  if (!email) {
    throw new Error("Authenticated user does not have an email address.");
  }

  const isAdminClaim = decoded.admin === true;
  if (!isAdminClaim && !isAllowedAdminEmail(email)) {
    throw new Error("This account is not authorized for admin access.");
  }

  return {
    uid: decoded.uid,
    email,
  };
}

export async function getFirebaseAdminUserEmail(uid: string) {
  const auth = await getFirebaseAdminAuth();
  const user = await auth.getUser(uid);
  return user.email?.trim().toLowerCase() ?? null;
}
