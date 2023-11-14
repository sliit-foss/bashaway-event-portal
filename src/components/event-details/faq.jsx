import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [closed, setClosed] = useState(true);
  const pRef = useRef(null);

  return (
    <div className="bg-slate-50 rounded-2xl px-5 py-4 flex gap-4 justify-between border border-slate-100">
      <div>
        <h6 className="text-lg font-medium">What are the prerequisites for joining this workshop?</h6>
        <div
          style={{ height: closed ? "0px" : `${pRef.current.clientHeight}px` }}
          className="overflow-clip transition-all duration-500 ease-in-out"
        >
          <p ref={pRef}>Anyone can</p>
        </div>
      </div>
      <div>
        <button onClick={() => setClosed((prev) => !prev)}>
          <ChevronDown className={`${closed ? "rotate-0" : "-rotate-180"} transition-all duration-500`} />
        </button>
      </div>
    </div>
  );
}
