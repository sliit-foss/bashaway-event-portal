import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";
import { Button, Input, toast } from "@/components/common";
import { useTitle } from "@/hooks";
import { authApi, useAuthUserQuery, useUpdateProfileMutation } from "@/store/api";
import { getRegexPatternFromKey } from "@/utils";

const Profile = () => {
  const navigate = useNavigate();

  const { data: { data: user } = {} } = useAuthUserQuery();

  const [updateProfile] = useUpdateProfileMutation();

  const [formData, setFormData] = useState(user);

  useEffect(() => {
    const userData = { ...user };
    if (userData.members) {
      const memberCount = userData.members.length;
      for (let i = 0; i < 4 - memberCount; i++) {
        userData.members = [
          ...userData.members,
          {
            name: "",
            email: "",
            phone: "",
            academic_year: ""
          }
        ];
      }
    }
    setFormData(userData);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(user._id, {
      name: formData.name,
      university: formData.university,
      members: formData.members.filter((member) => !!member.name)
    })
      .unwrap()
      .then(() => {
        authApi.util.updateQueryData("authUser", (prev) => ({ ...prev, ...formData }));
        toast({ title: "Team details updated successfully" });
      });
  };

  useTitle("Profile | Bashaway");

  return (
    <form className="w-full h-full flex flex-col justify-center items-center p-8 md:p-12" onSubmit={handleSubmit}>
      <div className="h-full flex flex-col w-full md:w-10/12 justify-center items-center pt-20">
        <span className="text-3xl text-white font-semibold pb-12 self-start">Update Profile</span>
        <Input
          placeholder="Team Name"
          name="name"
          className={`p-4 transition duration-300 opacity-100 block mb-12`}
          value={formData.name}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value
            });
          }}
        />
        <Input
          placeholder="University"
          name="university"
          className={`p-4 transition duration-300 opacity-100 block mb-12`}
          value={formData.university}
          onChange={(e) => {
            setFormData({
              ...formData,
              university: e.target.value
            });
          }}
        />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-28">
          {formData.members?.map((member, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-5 bg-profile-card backdrop-blur-[5px] rounded-xl p-6 border border-white/10"
              >
                {Object.keys(member).map((key) => {
                  return (
                    <Input
                      key={`${key}-${index}-profile`}
                      placeholder={startCase(key)}
                      pattern={getRegexPatternFromKey(key).regex}
                      title={getRegexPatternFromKey(key).title}
                      name={key}
                      className={`p-4 transition duration-300 opacity-100 block`}
                      value={member[key]}
                      type={key === "password" || key === "email" ? key : "text"}
                      onChange={(e) => {
                        const members = [...formData.members];
                        members.splice(index, 1, {
                          ...members[index],
                          [key]: e.target.value
                        });
                        setFormData({
                          ...formData,
                          members
                        });
                      }}
                      required={!!Object.keys(formData.members[index]).find((k) => formData.members[index][k] !== "")}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="w-full mb-20 flex flex-col md:flex-row justify-end gap-6 md:gap-8">
          <Button
            className="w-full md:w-auto px-6 py-2 font-semibold sm:text-xl"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </Button>
          <Button className="w-full md:w-auto px-6 py-2 font-semibold sm:text-xl" type="submit">
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
