import { handleAnalyticsEnd } from "@/lib/firebase/analytics-server";

export async function POST() {
  return handleAnalyticsEnd();
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
