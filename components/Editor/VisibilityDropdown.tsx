import { BlogType } from "@prisma/client";
import React from "react";
import { RiGitRepositoryPrivateFill, RiDraftFill } from "react-icons/ri";
import { MdPublishedWithChanges } from "react-icons/md";
import useClickOutside from "../../hooks/useClickOutside";
import { MdKeyboardArrowDown } from "react-icons/md";

const formatString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const BlogTypIcon = ({ type }: { type: BlogType }) => {
  return (
    <p className="text-lg flex justify-center items-center text-[#cfcfcf]">
      {type === "PUBLISHED" && <MdPublishedWithChanges />}
      {type === "PRIVATE" && <RiGitRepositoryPrivateFill />}
      {type === "DRAFT" && <RiDraftFill />}
    </p>
  );
};

type Props = {
  options: BlogType[];
  selected: BlogType;
  setSelected: (value: string) => void;
  showArrow: boolean;
};
const DropDown = ({ options, selected, setSelected }: Props) => {
  const popUpRef = useClickOutside(() => setIsOpen(false));
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex flex-col h-full relative">
      <button
        className=" text-white border-2 border-[#3B3B3B] bg-[#3B3B3B]
            hover:border-grey-600 py-1 px-5 outline-none cursor-pointer flex 
            justify-center items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BlogTypIcon type={selected} />
        {selected === "PUBLISHED" ? "PUBLIC" : selected}
        <MdKeyboardArrowDown className={isOpen && "rotate-180"} />
      </button>
      {isOpen && (
        <div
          ref={popUpRef}
          className="absolute top-10 w-40 rounded-lg divide-y-2 divide-[#606060]"
        >
          {options.map((option, index) => (
            <button
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="pl-4 py-3 bg-[#3c3c3c] flex justify-start
                items-center w-full gap-2 cursor-pointer hover:bg-grey-800"
              key={index}
            >
              <BlogTypIcon type={option} />
              <p>{option === "PUBLISHED" ? "Public" : formatString(option)}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
