import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getFirebaseAdminFirestore } from "@/lib/firebase/admin";
import { incrementSignupStats } from "@/lib/firebase/dashboard-stats";
import { isFirebaseAdminConfigured } from "@/lib/firebase/env";

export class DuplicateCommunityUserError extends Error {
  constructor() {
    super("This email is already registered.");
    this.name = "DuplicateCommunityUserError";
  }
}

export type CreateCommunityUserInput = {
  name: string;
  email: string;
  phone?: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createCommunityUser(input: CreateCommunityUserInput) {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Community signup is not configured.");
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const emailLower = email.toLowerCase();
  const phone = input.phone ? input.phone.trim() : "";

  if (!name) {
    throw new Error("Name is required.");
  }

  if (!email || !isValidEmail(email)) {
    throw new Error("A valid email address is required.");
  }

  const db = await getFirebaseAdminFirestore();

  const [byLowerEmail, byEmail] = await Promise.all([
    db.collection("users").where("emailLower", "==", emailLower).limit(1).get(),
    db.collection("users").where("email", "==", email).limit(1).get(),
  ]);

  if (!byLowerEmail.empty || !byEmail.empty) {
    throw new DuplicateCommunityUserError();
  }

  const docRef = await db.collection("users").add({
    name,
    email,
    emailLower,
    phone,
    source: input.source ?? "join-form",
    createdAt: FieldValue.serverTimestamp(),
  });

  await incrementSignupStats();

  return { id: docRef.id };
}

export async function isCommunityEmailTaken(email: string) {
  if (!isFirebaseAdminConfigured()) {
    return false;
  }

  const emailLower = email.trim().toLowerCase();

  if (!emailLower) {
    return false;
  }

  const db = await getFirebaseAdminFirestore();
  const snapshot = await db
    .collection("users")
    .where("emailLower", "==", emailLower)
    .limit(1)
    .get();

  return !snapshot.empty;
}
