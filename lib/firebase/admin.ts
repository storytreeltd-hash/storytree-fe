import "server-only";

import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

import {
  getFirebaseAdminPrivateKey,
  isFirebaseAdminConfigured,
} from "@/lib/firebase/env";

let adminApp: App | undefined;
let adminAuth: Auth | undefined;
let adminFirestore: Firestore | undefined;

async function getFirebaseAdminApp() {
  if (!isFirebaseAdminConfigured()) {
    throw new Error(
      "Firebase Admin is not configured. Add your service account credentials to .env.local.",
    );
  }

  if (!adminApp) {
    const { cert, getApps, initializeApp } = await import("firebase-admin/app");

    adminApp =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: getFirebaseAdminPrivateKey(),
            }),
          });
  }

  return adminApp;
}

export async function getFirebaseAdminAuth() {
  if (!adminAuth) {
    const { getAuth } = await import("firebase-admin/auth");
    adminAuth = getAuth(await getFirebaseAdminApp());
  }

  return adminAuth;
}

export async function getFirebaseAdminFirestore() {
  if (!adminFirestore) {
    const { getFirestore } = await import("firebase-admin/firestore");
    adminFirestore = getFirestore(await getFirebaseAdminApp());
  }

  return adminFirestore;
}
