import Image from "next/image";

import LoginForm from "../common/components/forms/LoginForm";
import { getCurrentStudent } from "../common/utils/getCurrentStudent";
import { LOGIN_SUCCESS_URL } from "../common/constants";

export const metadata = {
  title: "Login",
};

const LoginPage = async () => {
  await getCurrentStudent({ validUserRedirect: LOGIN_SUCCESS_URL });
  return (
    <div className='flex flex-col bg-[#D8E3FF] w-screen h-screen items-center justify-center'>
      <Image alt='OAU Logo' src='/icon.png' width={89} height={82} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
