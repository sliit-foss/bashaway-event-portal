import { useState } from "react";
import { default as Lottie } from "react-lottie";
import { twMerge } from "tailwind-merge";
import { Event, EventGridSkeleton } from "@/components/home";
import { eventFilters, eventSorts } from "@/filters";
import { useBreakpoint, useTitle } from "@/hooks";
import { useGetEventsQuery } from "@/store/api";
import { AnimatedSwitcher, Filters, NoRecords, Pagination, Sorts } from "@sliit-foss/bashaway-ui/components";
import { computeFilterQuery, computeSortQuery } from "@sliit-foss/bashaway-ui/utils";
import { default as teamwork } from "../../public/assets/animations/teamwork.json";

const gridStyles = "w-full h-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-5";

const Home = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(eventFilters));
  const [sorts, setSorts] = useState(computeSortQuery(eventSorts));

  const { data: events, isFetching, isError } = useGetEventsQuery({ filters, sorts, page });

  const { xs, sm } = useBreakpoint();

  useTitle("Home | Tech Events");

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8">
        <Filters filters={eventFilters} setFilterQuery={setFilters} styles={{ root: "[&>*:nth-child(1)]:w-full" }} />
        <Sorts sorts={eventSorts} setSortQuery={setSorts} />
      </div>
      <div className="w-full min-h-[60vh] flex flex-col gap-12 justify-between items-center">
        <AnimatedSwitcher
          show={isFetching || isError}
          component={<EventGridSkeleton className={gridStyles} />}
          className={twMerge("grow flex flex-col", !events?.data?.docs?.length && "justify-center pointer-events-none")}
          alternateComponent={
            events?.data?.docs?.length ? (
              <div className={gridStyles}>
                {events?.data?.docs?.map((event) => (
                  <Event key={`event-list-${event._id}`} event={event} />
                ))}
              </div>
            ) : (
              <>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: teamwork,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice"
                    }
                  }}
                  height={200}
                  width={sm ? 400 : xs ? 300 : 250}
                />
                <NoRecords text="No scheduled events taking place" className="mt-12 text-center" />
              </>
            )
          }
        />
        <div className="w-full flex justify-center items-center mt-6 mb-2">
          <Pagination
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
            totalPages={events?.data?.totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
