import { useNavigate } from "react-router-dom";
import { Button, Input, toast } from "@/components/common";
import { useTitle } from "@/hooks";
import { useRequestPasswordResetCodeMutation } from "@/store/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [requestPasswordResetCode] = useRequestPasswordResetCodeMutation();

  const handleForm = async (e) => {
    e.preventDefault();
    await requestPasswordResetCode({
      email: e.target.email.value
    })
      .unwrap()
      .then(() => {
        toast({ title: "An email has been sent with a link to reset your password" });
        setTimeout(() => {
          navigate("/");
        }, 3500);
      });
  };

  useTitle("Reset Password | Bashaway");

  return (
    <div className="w-full flex items-center justify-center px-6 sm:px-16">
      <img
        src="./assets/images/forgotPassword.svg"
        alt="Forgot Password"
        className="absolute opacity-30 z-0 px-2 md:sticky md:h-[500px] md:w-[500px] md:opacity-100 md:flex-1"
      />
      <div className="flex flex-col mx-0 sm:mx-6 z-50 md:flex-1 md:ml-10">
        <span className="text-white font-medium text-3xl tracking-[-0.04em]">Forgot Password?</span>
        <p className="text-white font-light tracking-tight text-lg w-11/12 mt-8 mb-[47px] sm:w-full">
          Please enter your registration email address. We&apos;ll send instructions to help reset your password.
        </p>
        <form onSubmit={handleForm} className="md:items-end md:flex md:flex-col">
          <Input
            className="w-full sm:h-12 lg:h-16 p-4 text-gray-100"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <Button type="submit" className="w-[130px] h-11 mt-14">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
