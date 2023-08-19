import { Link, useNavigate } from "react-router-dom";
import { Button, Caption, Input, Subtitle, Title } from "@/components/common";
import { useTitle } from "@/hooks";
import { useLoginMutation } from "@/store/api";

const Login = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({
      email: e.target.email.value,
      password: e.target.password.value
    })
      .unwrap()
      .then(() => navigate("/"));
  };

  useTitle("Login | Bashaway");

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center">
      <form className="w-full max-w-form flex flex-col items-center gap-5" onSubmit={handleLogin}>
        <div className="flex flex-col items-center gap-3 md:gap-2 mb-6 pointer-events-none">
          <Title>Welcome back</Title>
          <Subtitle>Please enter your details to continue</Subtitle>
        </div>
        <Input placeholder="Email" type="email" name="email" required />
        <Input placeholder="Password" type="password" name="password" required />
        <Link to="/forgot-password">
          <Caption className="underline link">Forgot Password?</Caption>
        </Link>
        <Button className="w-full h-14 sm:h-16 text-[20px]" loading={isLoading}>
          Login
        </Button>
        <span>
          <Caption className="text-black/40 mr-1.5">Don&apos;t have an account?</Caption>
          <Link to="/register">
            <Caption className="link">Sign up here</Caption>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;