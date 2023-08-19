import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/common";

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className="w-full flex flex-wrap items-center gap-2.5 pointer-events-none">
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={index}>
          <Badge
            key={index}
            className={`opacity-100 border-black/10 text-black font-medium ${
              index === breadcrumbs.length - 1 ? "opacity-50" : ""
            }`}
          >
            {breadcrumb}
          </Badge>
          {index !== breadcrumbs.length - 1 && <ChevronRight className="w-6 h-6" />}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
