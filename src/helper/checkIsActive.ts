import { NavItem } from "@/components/sidebar/types";

// helper para convertir cualquier tipo de URL a string
function toUrlString(url: unknown): string {
  if (typeof url === "string") return url;
  if (url instanceof URL) return url.pathname;
  if (url && typeof url === "object" && "pathname" in url) {
    return url.pathname as string;
  }
  return "";
}

// función principal
export function checkIsActive(pathname: string, item: NavItem, mainNav = false) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemUrl = toUrlString((item as any).url ?? "");

  return (
    pathname === itemUrl ||
    pathname.split("?")[0] === itemUrl ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!item?.items?.filter((i) => toUrlString((i as any).url) === pathname).length ||
    (mainNav && pathname.split("/")[1] !== "" && pathname.split("/")[1] === itemUrl.split("/")[1])
  );
}
