import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@/store";
import { useAuthUserQuery, useGetSettingsQuery } from "@/store/api";
import { toggleIdentificationForm } from "@/store/reducers/ui/global";

const useIdentification = () => {
  const { data: { data: settings } = {} } = useGetSettingsQuery();
  const { data: { data: team } = {} } = useAuthUserQuery();

  const open = useSelector((store) => store.ui.global.showIdentificationForm);

  useEffect(() => {
    if (
      team &&
      team.role === "GROUP" &&
      settings?.round_breakpoint &&
      new Date() > new Date(settings?.round_breakpoint) &&
      !team.eliminated &&
      team.members.find((member) => !member.nic) &&
      !open
    ) {
      // store.dispatch(toggleIdentificationForm(true));
    }
  }, [settings, team]);
};

export default useIdentification;
