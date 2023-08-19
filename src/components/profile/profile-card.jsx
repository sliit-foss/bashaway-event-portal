import { Scroll } from "lucide-react";
import { AnimatedSwitcher, Badge, BodyText3, Headline, Skeleton } from "@/components/common";

export const ProfileCard = ({ member }) => {
  return (
    <div className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl">
      <AnimatedSwitcher
        show={!!member}
        component={
          <div className="w-full h-full flex flex-col p-5 gap-4 rounded-2xl transition-all duration-medium card-red cursor-default">
            <Headline className="transition-all duration-medium card-red-title font-bold leading-[1.75rem]">
              {member?.name}
            </Headline>
            <span className="flex flex-col">
              <BodyText3 className="card-red-body text-start break-words font-medium">{member?.email}</BodyText3>
              <BodyText3 className="card-red-body text-start">{member?.phone}</BodyText3>
            </span>
            <Badge className="border flex self-start justify-center items-center gap-1.5 card-red-badge">
              Year {member?.academic_year}
              <Scroll className="translate-y-[-0.025rem]" size={14} />
            </Badge>
          </div>
        }
        alternateComponent={
          <Skeleton containerClassName="flex" className="flex flex-col p-5 gap-6 rounded-2xl">
            <Skeleton className="w-3/4 md:w-1/2 h-[1.5rem]" shade="dark" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-3/4 h-[1.15rem] mb-[0.11rem]" shade="dark" />
              <Skeleton className="w-1/2 h-[1.15rem]" shade="dark" />
            </div>
            <div className="self-start flex items-center gap-1.5 border-2 border-black/5 px-4 py-2 rounded-full z-50">
              <Skeleton className="w-[2.7rem] h-3 rounded-lg" shade="dark" />
              <Scroll className="translate-y-[-0.025rem]" size={14} />
            </div>
          </Skeleton>
        }
      />
    </div>
  );
};

export default ProfileCard;
