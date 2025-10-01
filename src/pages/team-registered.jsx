import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks";
import { Button } from "@sliit-foss/bashaway-ui/components";
import { Caption, Footnote, Title } from "@sliit-foss/bashaway-ui/typography";

const TeamRegistered = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [showLoginButton, setShowLoginButton] = useState(false);

  useTitle("Team Registered | Bashaway 2025");

  useEffect(() => {
    console.log("TeamRegistered component mounted");
    return () => console.log("TeamRegistered component unmounted");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowLoginButton(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleJoinWhatsApp = () => {
    window.open("https://chat.whatsapp.com/HKpbmAUuPCj77c0F5VyZ3D?mode=ems_copy_t", "_blank");
  };

  const handleAlreadyJoined = () => {
    navigate("/login");
  };

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center">
      <div className="w-full max-w-form flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-4 mb-6">
          <Title>You&apos;re almost done!</Title>
          <Footnote className="text-gray-600 max-w-md">
            Join the Delegates WhatsApp group to stay updated with the latest information and connect with other
            participants.
          </Footnote>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button onClick={handleJoinWhatsApp} className="w-full h-14 sm:h-16 text-[20px]">
            Join the Delegates WhatsApp Group
          </Button>

          {showLoginButton ? (
            <Button onClick={handleAlreadyJoined} variant="outline" className="w-full h-14 sm:h-16 text-[20px]">
              I Already Joined
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Caption className="text-gray-500">Login option will be available in {countdown} seconds</Caption>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamRegistered;
