import { useNavigate } from "react-router-dom";
import { Button, Input, toast } from "@/components/common";
import { useTitle } from "@/hooks";
import { useChangePasswordMutation } from "@/store/api";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [changePassword] = useChangePasswordMutation();

  const handleChange = async (e) => {
    e.preventDefault();
    await changePassword({
      old_password: e.target.old_password.value,
      new_password: e.target.new_password.value
    })
      .unwrap()
      .then(() => {
        toast({ title: "Password changed successfully" });
        setTimeout(() => {
          navigate("/profile");
        }, 3500);
      });
  };

  useTitle("Change Password | Bashaway");

  return (
    <div className="w-full flex flex-col justify-center items-center px-6 sm:px-16">
      <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start lg:items-center pt-14">
        <div className="w-full md:w-1/2 mb-12 md:mb-0 flex justify-center items-center">
          <img src="./assets/images/resetPassword.svg" className="w-9/12" />
        </div>
        <div className="flex flex-col w-full md:w-1/2 mr-0 md:mr-6">
          <span className="text-left text-gray-light text-3xl md:text-4xl mb-8">Change Your Password</span>
          <form className="flex flex-col items-end" onSubmit={handleChange}>
            <Input placeholder="Old Password" type="password" name="old_password" className="p-4" required />
            <Input placeholder="New Password" type="password" name="new_password" className="my-8 p-4" required />
            <Button className="h-11 w-[165px] mt-6">Change Password</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
