import { useSelector } from "react-redux";
import { store } from "@/store";
import { authApi, useAuthUserQuery, useUpdateProfileMutation } from "@/store/api";
import { toggleAddMemberDialog } from "@/store/reducers/ui/profile";
import { getRegexPatternFromKey } from "@/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  toast
} from "@sliit-foss/bashaway-ui/components";

const close = () => store.dispatch(toggleAddMemberDialog(false));

const AddMemberDialog = () => {
  const { showAddMemberDialog: open } = useSelector((store) => store.ui.profile);

  const { data: { data: team } = {} } = useAuthUserQuery();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({
      id: team._id,
      data: {
        members: [
          ...team.members,
          {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            academic_year: e.target.academic_year.value
          }
        ]
      }
    })
      .unwrap()
      .then((data) => {
        store.dispatch(authApi.util.upsertQueryData("authUser", undefined, { data: data?.data }));
        close();
        toast({ title: "Member added successfully" });
      });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <AlertDialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AlertDialogHeader>
            <AlertDialogTitle>Add teammate</AlertDialogTitle>
          </AlertDialogHeader>
          <Input placeholder="Name *" name="name" required className="sm:h-14" />
          <Input placeholder="Email *" type="email" name="email" required className="sm:h-14" />
          <Input
            placeholder="Mobile *"
            name="phone"
            pattern={getRegexPatternFromKey("phone").regex}
            title={getRegexPatternFromKey("phone").title}
            required
            className="sm:h-14"
          />
          <Input
            placeholder="Academic year *"
            name="academic_year"
            pattern={getRegexPatternFromKey("academic_year").regex}
            title={getRegexPatternFromKey("academic_year").title}
            required
            className="sm:h-14"
          />
          <AlertDialogFooter className="mt-4">
            <Button type="submit" loading={isLoading}>
              Add
            </Button>
            <Button variant="secondary" type="button" onClick={close}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddMemberDialog;
