import { Pagination as FlowbitePagination } from "flowbite-react";

const Pagination = (props) => {
  return (
    <FlowbitePagination
      {...props}
      totalPages={props.totalPages ?? 1}
      onPageChange={(newPage) => {
        props.onPageChange(newPage);
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }, 0);
      }}
      theme={{
        pages: {
          base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
          previous: {
            base: "enabled:splash after:!rounded-none rounded-l-lg border border-black/30 disabled:opacity-[0.15] bg-black py-3 px-5 leading-tight text-white transition-all duration-medium"
          },
          next: {
            base: "enabled:splash after:!rounded-none rounded-r-lg border border-black/30 disabled:opacity-[0.15] bg-black py-3 px-5 leading-tight text-white transition-all duration-medium"
          },
          selector: {
            base: "w-12 border border-black/[0.3] mx-[0.015rem] bg-white py-3 leading-tight text-black enabled:hover:bg-black/[0.05] transition-all duration-medium",
            active: "pointer-events-none bg-black text-white"
          }
        }
      }}
    />
  );
};

export default Pagination;
