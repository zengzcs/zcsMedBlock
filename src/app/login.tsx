import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit" onClick={() => signIn("credentials")}>
        Sign in
      </button>
    </form>
  );
};

export default LoginPage;
