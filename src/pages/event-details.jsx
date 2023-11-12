import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { default as isEmpty } from "lodash/isEmpty";
import { useEffectOnce, useTitle } from "@/hooks";
import { selectEventById, useGetEventByIdQuery } from "@/store/api";
import { getBreakpointImage } from "@/utils";
import { AnimatedSwitcher, Skeleton } from "@sliit-foss/bashaway-ui/components";

export default function EventDetails() {
  const { event_id: eventId } = useParams();

  const eventFromStore = useSelector(selectEventById(eventId));

  const { data: { data: event = eventFromStore } = {} } = useGetEventByIdQuery(eventId);

  useTitle(`${event?.name ?? "Event"} | Tech Events`);

  useEffectOnce(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });

  return (
    <>
      <div className="group h-full w-full animated-border text-border from-black/20 to-border p-5 sm:p-8 xl:p-10 rounded-3xl ">
        <AnimatedSwitcher
          show={!isEmpty(event)}
          className="cursor-default"
          component={
            <Skeleton className="rounded-2xl">
              <img className="w-full h-full z-10" src={getBreakpointImage(event?.photo_urls)} />
            </Skeleton>
          }
          alternateComponent={
            <Skeleton containerClassName="flex" className="flex flex-col gap-6 min-h-[45vh] rounded-2xl" />
          }
        />
      </div>
    </>
  );
}
