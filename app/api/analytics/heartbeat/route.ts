import { handleAnalyticsHeartbeat } from "@/lib/firebase/analytics-server";

export async function POST() {
  return handleAnalyticsHeartbeat();
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
