import React from "react";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const NotFoundPage: React.FC = () => {
  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70dvh]">
      <div className="w-[40%] flex flex-col justify-center items-center bg-[#111111] py-20 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-grey-200">
          <span className="text-red-100">404 </span>- Page Not Found
        </h1>
        <p className="text-lg text-grey-400">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="flex gap-4">
          <button
            onClick={goBack}
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex gap-2 items-center"
          >
            <span>
              <IoMdArrowRoundBack />
            </span>
            Back
          </button>
          <Link href="/">
            <div
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold 
                py-2 px-4 rounded mt-4 cursor-pointer select-none flex gap-2 items-center"
            >
              <span>
                <MdHome />
              </span>
              Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
