/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BreadCrumbs, Button, toast } from "@/components/common";
import { ProfileCard, ProfileHeader } from "@/components/profile";
import { useEffectOnce, useTitle } from "@/hooks";
import { store } from "@/store";
import { authApi, useAuthUserQuery, useUpdateProfileMutation } from "@/store/api";

const Profile = () => {
  const { data: { data: team } = {} } = useAuthUserQuery();

  const [updateProfile] = useUpdateProfileMutation();

  const [formData, setFormData] = useState(team);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(team._id, {
      name: formData.name,
      university: formData.university,
      members: formData.members.filter((member) => !!member.name)
    })
      .unwrap()
      .then(() => {
        store.dispatch(authApi.util.upsertQueryData("authUser", undefined, { data: formData }));
        toast({ title: "Team details updated successfully" });
      });
  };

  useTitle("Profile | Bashaway");

  useEffectOnce(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });

  return (
    <>
      <BreadCrumbs breadcrumbs={["Home", "Profile"]} />
      <ProfileHeader team={team} />
      <Button to="/change-password" className="my-5 font-semibold">
        Change Password
      </Button>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-start items-center gap-5 mt-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProfileCard key={`member-${index}`} member={team?.members?.[index]} />
        ))}
      </div>
    </>
  );
};

export default Profile;
