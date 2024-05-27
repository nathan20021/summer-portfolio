import * as React from "react";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";

type AnalyticsCardProps = {
  stats: number;
  title: string;
  popUpComponent?: React.ReactNode | null;
};

const AnalyticCard = ({
  stats,
  title,
  popUpComponent = null,
}: AnalyticsCardProps) => {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPopUp(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <button
      className="bg-[#333] px-14 py-4 text-center rounded-md"
      onClick={() =>
        !showPopUp && popUpComponent !== null ? setShowPopUp(true) : void 0
      }
    >
      <h1 className="text-4xl font-bold py-3 text-[#d6f3df]">{stats}</h1>
      <h1 className="text-base text-[#ffffff]">{title}</h1>
      {showPopUp && (
        <div className="z-40 absolute top-0 left-0 w-screen h-screen bg-[#000] bg-opacity-90 flex justify-center items-center cursor-default">
          <button
            className="absolute right-[5%] top-[10%] text-3xl"
            onClick={() => setShowPopUp(false)}
          >
            <GiCancel />
          </button>
          <div className="z-50 w-[80%] max-w-[961px] h-[80%] flex flex-col justify-start items-center bg-[#1a1a1a] rounded-xl p-4 overflow-y-scroll">
            <h1 className="my-10 text-xl border-b-2 pb-2">{title}</h1>
            <div className="w-full mb-5">{popUpComponent}</div>
          </div>
        </div>
      )}
    </button>
  );
};

export default AnalyticCard;
