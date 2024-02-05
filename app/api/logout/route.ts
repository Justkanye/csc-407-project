import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/app/common/constants";

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return redirect("/login");
}
