import React from "react";
import Image from "next/image";
import { BlogType } from "@prisma/client";
import { useRouter } from "next/router";

type Props = {
  updatedAt: string;
  blogType: BlogType;
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  onPublish?: () => Promise<void>;
  isPublishing?: boolean;
  onUnPublish?: () => Promise<void>;
  isUnPublishing?: boolean;
  fileName?: string;
  setFileName?: (name: string) => void;
  openModal: () => void;
};

const Loader = () => (
  <svg
    aria-hidden="true"
    className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
const ControlTopBar = ({
  updatedAt,
  blogType,
  onSave,
  onPublish,
  onUnPublish,
  isSaving = false,
  isPublishing = false,
  isUnPublishing = false,
  fileName,
  setFileName,
  openModal,
}: Props) => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between items-center py-4 px-10 bg-grey-900 gap-12">
      <div className="flex gap-2 w-[50%]">
        <div
          className="hover:cursor-pointer"
          id="logo"
          onClick={() => {
            onSave();
            router.push("/admin/editor");
          }}
        >
          <Image
            width={50}
            height={50}
            src="/viz-logo-no-grad.png"
            style={{
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          id="title-and-last-edited-status-container"
          className="flex flex-col w-full"
        >
          <div id="title" className="w-full">
            <input
              className="text-xl font-semibold bg-grey-900 caret-white indent-2 
                outline-0 w-full"
              type="text"
              placeholder="Untitled"
              value={fileName === "Untitled" ? "" : fileName}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
            />
          </div>
          <div id="last-edited-status">
            <p className="text-xs text-grey-400 indent-[9px]">
              Last saved: {updatedAt}
            </p>
          </div>
        </div>
      </div>
      <div id="button-group" className="space-x-4 flex">
        <button
          className="border-2 border-[#3B3B3B] px-5 py-1 rounded-sm text-[white] 
                    hover:cursor-pointer bg-[#3B3B3B] hover:bg-grey-700"
          onClick={onSave || void 0}
        >
          {!isSaving ? (
            <p>Save</p>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <p>Saving </p>
              <Loader />
            </div>
          )}
        </button>
        <button
          className="border-2 border-[#3B3B3B] px-5 py-1 rounded-sm text-[white] 
                    hover:cursor-pointer bg-[#3B3B3B] hover:bg-grey-700"
          onClick={() => openModal()}
        >
          Metadata
        </button>

        {blogType === "DRAFT" ? (
          <button
            className="border-2 border-[#007bff] bg-[#007bff] px-5 py-1 rounded-sm text-white 
            hover:bg-[#3793f0] hover:border-[#3793f0] hover:cursor-pointer font-semibold"
            onClick={onPublish || void 0}
          >
            Publish
          </button>
        ) : (
          <button
            className="border-2 border-[#b04730] bg-[#b04730] px-5 py-1 rounded-sm text-white 
            hover:bg-[#a95744] hover:border-[#a95744] hover:cursor-pointer"
            onClick={onUnPublish || void 0}
          >
            Unpublish
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlTopBar;
