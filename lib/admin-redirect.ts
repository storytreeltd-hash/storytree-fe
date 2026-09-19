export function getSafeAdminRedirect(from: string | null) {
  if (
    !from ||
    !from.startsWith("/admin/") ||
    from.includes("..") ||
    from === "/admin/login"
  ) {
    return "/admin/dashboard";
  }

  return from;
}
