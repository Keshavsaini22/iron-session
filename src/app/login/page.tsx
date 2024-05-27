import { redirect } from "next/navigation";
import { getSession } from "../actions";
import LoginForm from "@/components/loginform/page";

const LoginPage = async () => {
  const session = await getSession();

  if (session!.isLoggedIn) {
    redirect("/");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage