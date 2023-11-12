import { AddMemberDialog, ProfileCard, ProfileHeader } from "@/components/profile";
import { useEffectOnce, useTitle } from "@/hooks";
import { useAuthUserQuery } from "@/store/api";
import { BreadCrumbs, Button } from "@sliit-foss/bashaway-ui/components";

const Profile = () => {
  const { data: { data: team } = {}, isLoading } = useAuthUserQuery();

  useTitle("Profile | Tech Events");

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
          <ProfileCard key={`member-${index}`} member={team?.members?.[index]} loading={isLoading} />
        ))}
      </div>
      <AddMemberDialog />
    </>
  );
};

export default Profile;
