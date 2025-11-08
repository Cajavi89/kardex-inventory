import { cookies } from "next/headers";

export const getCookie = async (cookieName: string) => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(cookieName)?.value;

  return cookieValue ?? undefined;
};
