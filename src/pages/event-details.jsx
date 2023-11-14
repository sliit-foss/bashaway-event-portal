import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { default as isEmpty } from "lodash/isEmpty";
import { FAQ } from "@/components/event-details";
import { useEffectOnce, useTitle } from "@/hooks";
import { selectEventById, useGetEventByIdQuery } from "@/store/api";
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
      <div className="h-full w-full">
        <AnimatedSwitcher
          show={!isEmpty(event)}
          className="cursor-default"
          component={
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <img className="w-full" src="/assets/images/cover.png" />
              </div>
              <div className="col-span-12 lg:col-span-8 lg:mr-8 py-10 flex flex-col gap-5 sm:gap-8">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl sm:text-3xl font-bold">DevFest 2023</h2>
                  <h4 className="text-lg sm:text-xl font-light">Sri Lanka’s Largest Developer Event in 2023</h4>
                </div>
                <div className="text-white flex gap-3 sm:gap-4 flex-wrap">
                  <span className="text-xs sm:text-sm font-medium truncate bg-blue-500 py-[6px] px-3 rounded-full">
                    09 Dec 2023
                  </span>
                  <span className="text-xs sm:text-sm font-medium truncate bg-blue-500 py-[6px] px-3 rounded-full">
                    09:00AM
                  </span>
                  <span className="text-xs sm:text-sm font-medium truncate bg-blue-500 py-[6px] px-3 rounded-full">
                    Informatics Institute of Technology, 10 Trelawney Pl
                  </span>
                  <span className="text-xs sm:text-sm font-medium truncate bg-blue-500 py-[6px] px-3 rounded-full">
                    09 Dec 2023
                  </span>
                  <span className="text-xs sm:text-sm font-medium truncate bg-blue-500 py-[6px] px-3 rounded-full">
                    09 Dec 2023
                  </span>
                  <span className="text-xs sm:text-sm font-medium truncate bg-blue-500 py-[6px] px-3 rounded-full">
                    Musaeus College Auditorium, Colombo 07
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-clip">
                    <img className="w-full" src="/assets/images/gdg-logo.webp" />
                  </div>
                  <h5 className="text-lg font-semibold">GDG Sri Lanka</h5>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-xl text-blue-500 font-semibold">This event includes</h4>
                  <div className="flex flex-wrap gap-x-8 gap-y-6">
                    <span>👍🏻 Direct interaction with the instructor</span>
                    <span>🖥 Access on mobile and web</span>
                    <span>🎥 Session recording after the workshop</span>
                    <span>⌛️ 1 hour live session</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-xl text-blue-500 font-semibold">About the event</h4>
                  <div>
                    <p className="text-lg font-light">
                      DevFest Sri Lanka is Google’s annual developer conference in the country. Does this sound
                      interesting to you? Do you believe in helping others as you grow? Having trouble in debugging is
                      something that many people face. So, do you prefer to learn from professionals? Then you are just
                      at the right place.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl text-blue-500 font-semibold">Frequently Asked Questions</h4>
                    <span className="text-lg font-light">Find all your answers related to this event.</span>
                  </div>
                  <div className="flex flex-col gap-5">
                    <FAQ />
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 sm:px-5 lg:px-0 py-10 flex flex-col gap-6">
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:p-8 lg:p-4 xl:p-8 flex flex-col gap-5">
                  <div className="flex gap-3 sm:gap-8 lg:gap-3 xl:gap-8 items-center">
                    <div className="w-14 sm:w-24 lg:w-16 xl:w-24 aspect-square rounded-full bg-gray-100 overflow-clip">
                      <img className="w-full" src="/assets/images/gdg-logo.webp" />
                    </div>
                    <div className="flex flex-col sm:gap-1">
                      <h5 className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold">GDG Sri Lanka</h5>
                      <span className="font-light text-sm sm:text-base lg:text-sm xl:text-base">@GDGLK</span>
                    </div>
                  </div>
                  <p>GDG Sri Lanka is a community driven by technology enthusiasts, it’s Google supported.</p>
                </div>
              </div>
            </div>
          }
          alternateComponent={
            <Skeleton containerClassName="flex" className="flex flex-col gap-6 min-h-[45vh] rounded-2xl" />
          }
        />
      </div>
    </>
  );
}
