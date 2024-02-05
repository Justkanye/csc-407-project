import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "../constants";
import { Student } from "@/payload/payload-types";

export const getCurrentStudent = async (args?: {
  nullUserRedirect?: string;
  validUserRedirect?: string;
}): Promise<{
  student: Student;
  token: string | undefined;
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {};
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  const meUserReq = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL ?? ""}/api/students/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  const {
    user: student,
  }: {
    user: Student;
  } = await meUserReq.json();

  if (validUserRedirect && meUserReq.ok && student) {
    redirect(validUserRedirect);
  }

  if (nullUserRedirect && (!meUserReq.ok || !student)) {
    redirect(nullUserRedirect);
  }

  return {
    student,
    token,
  };
};
