import { Watch } from "react-loader-spinner";
import { useTitle } from "@/hooks";

const NotFound = () => {
  useTitle("404 | Bashaway");
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative z-50">
      <Watch
        height="110"
        width="110"
        radius="48"
        color="#0070F3"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <h1 className="text-white text-6xl font-bold mt-10">404</h1>
    </div>
  );
};

export default NotFound;
