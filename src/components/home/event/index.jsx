import { useMemo } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { default as ReactMarkdown } from "react-markdown";
import { Link } from "react-router-dom";
import { default as moment } from "moment-timezone";
import { twMerge } from "tailwind-merge";
import { eventColor } from "@/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@sliit-foss/bashaway-ui/components";
import { Body3, Footnote } from "@sliit-foss/bashaway-ui/typography";

export { default as EventGridSkeleton } from "./skeleton";

export const Event = ({ event }) => {
  const cardStyles = useMemo(() => eventColor(event), [event]);

  const SubmitIcon = event.ticket?.utilized ? CheckCircle2 : XCircle;

  return (
    <Link
      to={`/events/${event._id}`}
      className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl"
    >
      <div
        className={twMerge(
          "w-full h-full flex flex-col p-5 gap-6 rounded-2xl transition-all duration-medium",
          cardStyles
        )}
      >
        <div className="title flex justify-between gap-5">
          <Body3 className="font-bold transition-all duration-medium">{event.name}</Body3>
          <div className="w-7">
            <Tooltip>
              <TooltipTrigger>
                <SubmitIcon className="w-[1.35rem] h-[1.35rem] mt-[3px] md:mt-1 sm:w-6 sm:h-6 opacity-90" />
              </TooltipTrigger>
              <TooltipContent className="border-transparent px-[1.28rem] py-[0.41rem] font-semibold bg-black text-white rounded-full">
                {event.ticket ? (event.ticket.utilized ? "Attended" : "Not Attended") : "Not Registered"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <ReactMarkdown className="markdown [&>p]:font-semibold line-clamp-3">{event.description}</ReactMarkdown>
        <div className="flex flex-wrap gap-3 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg [&>span]:transition-all [&>span]:duration-medium">
          <Footnote>{moment(event.event_date).format("Do MMM @ hh:mm A")}</Footnote>
          <Footnote>{event.settings.payments.enabled ? "PAID" : "FREE"}</Footnote>
          {event.tags?.length && <Footnote>{event.tags?.join(", ")}</Footnote>}
        </div>
      </div>
    </Link>
  );
};

export default Event;
