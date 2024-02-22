import React from "react";

type ButtonProps = {
  onClick: () => Promise<void> | void;
  text?: string;
  bgColor?: string;
  textColor?: string;
  Icon?: React.ReactNode;
};

export const PrimaryButton = ({
  onClick = () => {},
  text = "Default Text",
  bgColor = "#2F2F2F",
  textColor = "#F2F2F2",
  Icon = <></>,
}: ButtonProps) => {
  return (
    <button
      className={`bg-[${bgColor}] text-sm text-[${textColor}] px-2 py-1 rounded-md flex items-center justify-center gap-2`}
      onClick={onClick}
    >
      {Icon}
      <p>{text}</p>
    </button>
  );
};

export const SecondaryButton = ({
  onClick = () => {},
  text = "Default Text",
  bgColor = "#2F2F2F",
  textColor = "#F2F2F2",
  Icon = <></>,
}: ButtonProps) => {
  return (
    <button
      className={`bg-[${bgColor}] text-sm text-[${textColor}] px-2 py-1 rounded-md flex items-center justify-center gap-2`}
      onClick={onClick}
    >
      {Icon}
      <p>{text}</p>
    </button>
  );
};

export const TextButton = ({
  onClick = () => {},
  text = "Default Text",
  textColor = "#F2F2F2",
  Icon = <></>,
}: ButtonProps) => {
  return (
    <button className={`text-[${textColor}] flex`} onClick={onClick}>
      {Icon}
      <p>{text}</p>
    </button>
  );
};
