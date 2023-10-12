import { useEffect, useState } from "react";
import { Paperclip } from "lucide-react";
import { useSelector } from "react-redux";
import { store } from "@/store";
import { authApi, useAuthUserQuery, useUpdateProfileMutation } from "@/store/api";
import { toggleIdentificationForm } from "@/store/reducers/ui/global";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dropdown,
  Input,
  toast
} from "@sliit-foss/bashaway-ui/components";
import { gender, mealPreference } from "@sliit-foss/bashaway-ui/constants";

const close = () => store.dispatch(toggleIdentificationForm(false));

const IdentificationForm = () => {
  const open = useSelector((store) => store.ui.global.showIdentificationForm);

  const { data: { data: team } = {} } = useAuthUserQuery();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState(team?.members);
  const [idFiles, setIdFiles] = useState([]);

  useEffect(() => {
    if (team) setFormData(team.members);
  }, [team]);

  const handleSubmit = async () => {
    await updateProfile({
      id: team._id,
      data: {
        members: formData
      }
    })
      .unwrap()
      .then((data) => {
        store.dispatch(authApi.util.upsertQueryData("authUser", undefined, { data: data?.data }));
        close();
        toast({ title: "Details recorded successfully" });
      });
  };

  const onFileChange = (e, index) => {
    setIdFiles((prev) => {
      const newFiles = JSON.parse(JSON.stringify(prev));
      newFiles[index] = e.target.files[0];
      return newFiles;
    });
  };

  const onChange = (e, index) => {
    const newFormData = JSON.parse(JSON.stringify(formData));
    newFormData[index][e.target.name] = e.target.value;
    setFormData(newFormData);
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
            <AlertDialogTitle>Hello there!</AlertDialogTitle>
            <AlertDialogDescription>
              Congratulations on being selected to the final round of Bashaway 2023. However, before you can continue to
              use this platform to compete further, please fill in the following details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Accordion type="single" collapsible>
            {formData?.map((member, index) => (
              <AccordionItem key={index} value={`member-${index}`}>
                <AccordionTrigger>{member.name}</AccordionTrigger>
                <AccordionContent containerClassName="flex flex-col gap-3">
                  <Input
                    placeholder="NIC *"
                    name="nic"
                    required
                    className="sm:h-14"
                    onChange={(e) => onChange(e, index)}
                  />
                  <div className="flex flex-col md:flex-row gap-3">
                    <Dropdown
                      filterkey="gender"
                      label="Gender *"
                      options={gender.options}
                      className="sm:h-14"
                      value={formData[index].gender}
                      onChange={(e) => onChange(e, index)}
                    />
                    <Dropdown
                      filterkey="meal_preference"
                      label="Meal Preference *"
                      options={mealPreference.options}
                      className="sm:h-14"
                      value={formData[index].meal_preference}
                      onChange={(e) => onChange(e, index)}
                    />
                  </div>
                  <Input
                    placeholder="University ID (both sides) *"
                    name="student_id_url"
                    value={idFiles[index] ? idFiles[index].name : formData.student_id_url}
                    required
                    className="sm:h-14 cursor-pointer"
                    onClick={() => document.getElementById(`id-upload-${index}`).click()}
                    suffixIcon={<Paperclip className="text-gray-400 pointer-events-none" size={21} />}
                    readOnly
                  />
                  <input
                    id={`id-upload-${index}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => onFileChange(e, index)}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <AlertDialogFooter className="mt-4">
            <Button type="submit" loading={isLoading}>
              Submit and continue
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IdentificationForm;
