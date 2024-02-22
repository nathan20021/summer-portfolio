import React from "react";

type DropDownMenuItemProps = {
  onClick: () => void;
  Icon: React.ReactNode;
  text: string;
};

type DropDownMenuProps = {
  trigger: React.ReactNode;
  menuItemProps: DropDownMenuItemProps[];
};

const DropDownMenu = ({ trigger, menuItemProps }: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="z-[100] relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <ul className="absolute top-0 left-10">
          {menuItemProps.map((prop, index) => {
            return (
              <li key={index}>
                <button onClick={prop.onClick} className="flex">
                  <div>{prop.Icon}</div>
                  <div>{prop.text}</div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
