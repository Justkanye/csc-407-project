import { cookies } from "next/headers";

import { getPayloadClient } from "@/payload/getPayload";
import { AUTH_COOKIE_NAME } from "@/app/common/constants";
import { validationSchema } from "@/app/common/components/forms/LoginForm/form.constants";

export const POST = async (req: Request) => {
  try {
    const cookieStore = cookies();
    const data = await req.json();
    const validatedData = validationSchema.validateSync(data);
    const payload = await getPayloadClient();
    const { user, exp, token } = await payload.login({
      collection: "students",
      data: validatedData,
      depth: 0,
    });
    if (token)
      cookieStore.set(AUTH_COOKIE_NAME, token, {
        maxAge: exp,
        httpOnly: true,
        sameSite: true,
      });
    return Response.json({ user, success: true });
  } catch (error: any) {
    return Response.json({ success: false, error: error?.message ?? error });
  }
};
