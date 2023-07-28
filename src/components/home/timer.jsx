import Countdown from "react-countdown";

const Timer = () => {
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="flex justify-center transform scale-75 sm:scale-100">
        <div className="flex flex-col p-1  md:p-4 ">
          <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
            {days.toString().length === 1 ? "0" + days : days}
          </span>
          <div>
            <p className="font-poppins text-white text-sm text-center font-light uppercase">Days</p>
          </div>
        </div>
        <div className="flex flex-col p-1  md:p-4">
          <span className="light-sweep font-bold font-poppins text-center  text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
            {hours.toString().length === 1 ? "0" + hours : hours}
          </span>
          <div>
            <p className="font-poppins text-white text-sm text-center font-light uppercase">Hours</p>
          </div>
        </div>
        <div className="flex flex-col p-1  md:p-4">
          <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
            {minutes.toString().length === 1 ? "0" + minutes : minutes}
          </span>
          <div>
            <p className="font-poppins text-white text-sm text-center font-light uppercase">Minutes</p>
          </div>
        </div>
        <div className="flex flex-col p-1  md:p-4">
          <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
            {seconds.toString().length === 1 ? "0" + seconds : seconds}
          </span>
          <div>
            <p className="font-poppins text-white text-sm text-center font-light uppercase">Seconds</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header>
      <Countdown date={new Date(2022, 9, 1, 9, 0, 0).getTime()} renderer={renderer} />
    </header>
  );
};

export default Timer;
