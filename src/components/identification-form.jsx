import { useEffect, useState } from "react";
import { Paperclip } from "lucide-react";
import { useSelector } from "react-redux";
import { uploadIdCard } from "@/services";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.find(({ nic, meal_preference, gender }, index) => !nic || !idFiles[index] || !meal_preference || !gender)
    ) {
      return toast({ variant: "destructive", title: "Please make sure that all required fields are filled" });
    }
    const members = await Promise.all(
      formData.map(async (member, index) => {
        if (idFiles[index]) {
          member["student_id_url"] = await uploadIdCard(team.name, member.name, idFiles[index]);
        }
        return member;
      })
    );
    await updateProfile({
      id: team._id,
      data: { members }
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
      const newFiles = [...prev];
      newFiles[index] = e.target.files[0];
      return newFiles;
    });
  };

  const onChange = (e, index) => {
    const newFormData = JSON.parse(JSON.stringify(formData));
    newFormData[index][e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const partiallyFilled = team?.members?.some((m) => m.nic);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <AlertDialogContent
        className="max-h-[100vh] overflow-y-auto z-[200]"
        overlayClassName="bg-white/80 backdrop-blur-md z-[200]"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AlertDialogHeader>
            <AlertDialogTitle>Hello there!</AlertDialogTitle>
            <AlertDialogDescription>
              {partiallyFilled
                ? `Looks like you've strengthened your battlion. Before we can allow your team to compete further please confirm the identity of your new members by filling what's missing below.`
                : `Congratulations on making it to the final round of Bashaway 2023. However, before you can compete further,
              please fill in the following details.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Accordion type="single" defaultValue={`member-${team?.members?.findIndex((m) => !m.nic)}`} collapsible>
            {formData?.map((member, index) => (
              <AccordionItem key={index} value={`member-${index}`}>
                <AccordionTrigger>{member.name}</AccordionTrigger>
                <AccordionContent containerClassName="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row gap-3">
                    <Dropdown
                      filterkey="meal_preference"
                      label="Meal Preference *"
                      options={mealPreference.options}
                      className="sm:h-14"
                      value={formData[index].meal_preference}
                      onChange={(e) => onChange(e, index)}
                    />
                    <Dropdown
                      filterkey="gender"
                      label="Gender *"
                      options={gender.options}
                      className="sm:h-14"
                      contentClassName="max-h-[8.5rem] overflow-y-auto invisible-scroll"
                      value={formData[index].gender}
                      onChange={(e) => onChange(e, index)}
                    />
                  </div>
                  <Input
                    placeholder="NIC *"
                    name="nic"
                    value={formData[index].nic}
                    className="sm:h-14"
                    onChange={(e) => onChange(e, index)}
                  />
                  <Input
                    placeholder="University ID (both sides) *"
                    name="student_id_url"
                    value={idFiles[index] ? idFiles[index].name : formData[index].student_id_url}
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
