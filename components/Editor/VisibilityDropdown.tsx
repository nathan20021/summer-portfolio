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
    <p className="text-base flex justify-center items-center">
      {type === "PUBLISHED" && <MdPublishedWithChanges />}
      {type === "PRIVATE" && <RiGitRepositoryPrivateFill />}
      {type === "DRAFT" && <RiDraftFill />}
    </p>
  );
};

type Props = {
  options: BlogType[];
  selected: BlogType;
  setSelected: (value: BlogType) => void;
  showArrow: boolean;
};
const DropDown = ({ options, selected, setSelected }: Props) => {
  const popUpRef = useClickOutside(() => setIsOpen(false));
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex flex-col h-full relative">
      <button
        className="h-full text-white border-2 border-[#3B3B3B] bg-[#3B3B3B]
            hover:border-grey-600 pl-4 outline-none cursor-pointer flex rounded-sm
            justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-2 text-sm">
          <BlogTypIcon type={selected} />
          {selected === "PUBLISHED" ? "Public" : formatString(selected)}
        </div>
        <div className="px-2 border-l-2 text-lg border-[#828282]">
          <MdKeyboardArrowDown className={isOpen ? "rotate-180" : ""} />
        </div>
      </button>
      {isOpen && (
        <div
          ref={popUpRef}
          className="absolute top-10 w-full rounded-lg divide-y-2 divide-[#606060] shadow-lg"
        >
          {options.map((option, index) => (
            <button
              onClick={() => {
                if (option !== selected) {
                  setSelected(option);
                  setIsOpen(false);
                }
              }}
              className={
                option === selected
                  ? "pl-4 py-1 bg-[#2e2e2e] flex justify-start text-sm items-center w-full gap-2 cursor-default text-grey-500"
                  : "pl-4 py-1 bg-[#3B3B3B] flex justify-start text-sm items-center w-full gap-2 hover:bg-[#4f4f4f] cursor-pointer"
              }
              key={index}
            >
              <BlogTypIcon type={option} />
              <p className="text-sm">
                {option === "PUBLISHED" ? "Public" : formatString(option)}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
