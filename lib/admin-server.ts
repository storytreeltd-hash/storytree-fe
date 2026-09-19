import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  parseAdminSessionValue,
} from "@/lib/admin-auth";
import { getFirebaseAdminUserEmail } from "@/lib/firebase/admin-access";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const parsed = await parseAdminSessionValue(session);

  if (!parsed) {
    return null;
  }

  let email: string | null = null;

  try {
    email = await getFirebaseAdminUserEmail(parsed.uid);
  } catch {
    // Session cookie is still valid even if Firebase Admin is unavailable.
  }

  return {
    uid: parsed.uid,
    email,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
