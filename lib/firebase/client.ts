import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

import {
  getFirebaseClientConfig,
  isFirebaseClientConfigured,
} from "@/lib/firebase/env";

let firebaseApp: FirebaseApp | undefined;
let firebaseAuth: Auth | undefined;
let firebaseFirestore: Firestore | undefined;
let firebaseStorage: FirebaseStorage | undefined;

export function getFirebaseApp() {
  if (!isFirebaseClientConfigured()) {
    throw new Error(
      "Firebase client is not configured. Add your Firebase web app credentials to .env.local.",
    );
  }

  if (!firebaseApp) {
    firebaseApp = getApps().length
      ? getApp()
      : initializeApp(getFirebaseClientConfig());
  }

  return firebaseApp;
}

export function getFirebaseAuth() {
  if (!firebaseAuth) {
    firebaseAuth = getAuth(getFirebaseApp());
  }

  return firebaseAuth;
}

export function getFirebaseFirestore() {
  if (!firebaseFirestore) {
    firebaseFirestore = getFirestore(getFirebaseApp());
  }

  return firebaseFirestore;
}

export function getFirebaseStorage() {
  if (!firebaseStorage) {
    firebaseStorage = getStorage(getFirebaseApp());
  }

  return firebaseStorage;
}
