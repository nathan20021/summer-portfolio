import * as React from "react";
import { Tags } from "@prisma/client";
import { useEffect, useState } from "react";

type TagFilterDropdownProps = {
  defaultVal: string;
  onChooseDefault: () => void;
  tags: Array<Tags>;
  onChooseTag: (id: number) => void;
  isOpen: boolean;
  currentFilterId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popUpRef: React.RefObject<HTMLDivElement>;
};

const TagFilterDropdown = ({
  defaultVal,
  onChooseDefault,
  onChooseTag,
  tags,
  isOpen,
  setIsOpen,
  popUpRef,
  currentFilterId,
}: TagFilterDropdownProps) => {
  const [currentElement, setCurrentElement] = useState<string>(defaultVal);
  useEffect(() => {
    if (currentFilterId === -1) {
      setCurrentElement(defaultVal);
    }
  }, [currentFilterId]);
  return (
    <div ref={popUpRef} className="relative w-full rounded-md min-w-[100px]">
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className="bg-[#333333] hover:bg-[#3b3b3b] py-1 px-2 rounded-t-sm w-full border-b-2 border-b-[#9b9b9b]"
      >
        {currentElement}
      </button>
      {isOpen && (
        <div className="absolute z-[100] bg-[#171717] w-full">
          <ul className="w-full flex flex-col">
            {currentFilterId !== -1 && (
              <li
                className="w-full py-1 hover:bg-[#5e5d5d] cursor-pointer flex items-center justify-center"
                onClick={() => {
                  setCurrentElement(defaultVal);
                  setIsOpen(false);
                  onChooseDefault();
                }}
              >
                {defaultVal}
              </li>
            )}
            {tags.map(
              (val) =>
                currentFilterId !== val.id && (
                  <li
                    key={val.id}
                    className="w-full py-2 hover:bg-[#5e5d5d] cursor-pointer flex items-center justify-center border-t-[0.5px] border-[#707070]"
                    onClick={() => {
                      setCurrentElement(val.name);
                      setIsOpen(false);
                      onChooseTag(val.id);
                    }}
                  >
                    {val.name}
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagFilterDropdown;
