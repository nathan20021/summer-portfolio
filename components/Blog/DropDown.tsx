import * as React from "react";
import {
  useState,
  useEffect,
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";

type TagFilterDropdownProps = {
  defaultVal: string;
  items: string[];
  onChooseItem: (item: string) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  popUpRef: RefObject<HTMLDivElement>;
};

const Dropdown = ({
  defaultVal,
  items,
  onChooseItem,
  isOpen,
  setIsOpen,
  popUpRef,
}: TagFilterDropdownProps) => {
  const [currentElement, setCurrentElement] = useState<string>(defaultVal);
  useEffect(() => {
    setCurrentElement(defaultVal);
  }, [defaultVal]);
  return (
    <div ref={popUpRef} className="relative w-full rounded-md min-w-[100px]">
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className="bg-[#333333] hover:bg-[#3b3b3b] py-1 px-2 rounded-t-sm w-full border-b-2 border-b-[#9b9b9b]"
      >
        {currentElement}
      </button>
      {isOpen && (
        <div className="absolute z-[100] bg-[#202020] w-full shadow-lg shadow-[#161616]">
          <ul className="w-full flex flex-col">
            {items.map((item, index) => (
              <li
                key={index}
                className="w-full py-2 hover:bg-[#5e5d5d] cursor-pointer flex items-center justify-start pl-3 border-t-[0.5px] border-[#707070]"
                onClick={() => {
                  setCurrentElement(item);
                  setIsOpen(false);
                  onChooseItem(item);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
