import { LOGIN_SUCCESS_URL } from "./common/constants";
import { getCurrentUser } from "./common/utils/getCurrentStudent";

export default async function Home() {
  await getCurrentUser({
    nullUserRedirect: "/login",
    validUserRedirect: LOGIN_SUCCESS_URL,
  });
  return null;
}
