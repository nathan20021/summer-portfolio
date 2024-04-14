import _ from "lodash";
import React from "react";
import { FrontEndBlogPost } from "../../pages/admin/editor/[blogId]";
import { FaCheck } from "react-icons/fa";
import { Tags } from "@prisma/client";
import DropDown from "./VisibilityDropdown";
import { RxCross2 } from "react-icons/rx";
import BlogCard from "./BlogCardPreview";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import config from "../../config.json";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSaveMetaData: (
    imageURL: string | null,
    selectedTagIds: Tags[]
  ) => Promise<void>;
  setEditedBlogData: (data: FrontEndBlogPost) => void;
  editedBlogData: FrontEndBlogPost;
  currentBlogData: FrontEndBlogPost;
  currentTags: Tags[];
  allTags: Tags[];
};

const titleToURL = (title: string) => title.toLowerCase().split(" ").join("-");

const Modal = ({
  isOpen,
  onClose,
  editedBlogData,
  currentBlogData,
  onSaveMetaData,
  setEditedBlogData,
  currentTags,
  allTags,
}: Props) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isUpdateDisabled = _.isEqual(currentBlogData, editedBlogData);
  const [selectedTags, setSelectedTags] = React.useState<Tags[]>(currentTags);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [coverImageFile, setCoverImageFile] = React.useState<File | null>(null);
  const blogDataCoverImageFileName = decodeURIComponent(
    editedBlogData.cover || ""
  )
    .split("/")
    .pop();
  return (
    <>
      {isOpen && (
        <div className="absolute top-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black bg-opacity-70">
          <div className="overflow-auto overscroll-none h-[90%] w-[580px] bg-primary flex justify-center items-center">
            <div className="w-[90%] h-[90%]">
              <div id="form-container" className="flex flex-col">
                <h1 className="text-center text-xl font-semibold underline underline-offset-2">
                  Blog Metadata
                </h1>
                <div className="w-full flex justify-between">
                  <div className="w-[65%] flex flex-col">
                    <p className="text-base mt-5 mb-1  after:ml-[0.2rem] after:content-['*'] after:text-blue-100">
                      Title
                    </p>
                    <input
                      className="py-2 px-3 text-sm rounded-sm outline-none cursor-text"
                      type="text"
                      id="title"
                      value={editedBlogData.title}
                      onChange={(e) =>
                        setEditedBlogData({
                          ...editedBlogData,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-[30%] flex flex-col">
                    <p className="text-base mt-5 mb-1  after:ml-[0.2rem] after:content-['*'] after:text-blue-100">
                      Visibility
                    </p>
                    <DropDown
                      showArrow={true}
                      options={["DRAFT", "PUBLISHED", "PRIVATE"]}
                      selected={editedBlogData.type}
                      setSelected={(type) => {
                        setEditedBlogData({
                          ...editedBlogData,
                          type,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-full h-full flex mt-5 gap-[5%]">
                  <div className="w-[50%] flex flex-col">
                    <p className="text-base mb-1  after:ml-[0.2rem] after:content-['*'] after:text-blue-100">
                      Public URL
                    </p>
                    <div className="flex">
                      <input
                        className="py-1 px-3 text-sm rounded-sm outline-none cursor-text flex-1 placeholder:text-grey-700"
                        type="text"
                        id="slug-URL"
                        placeholder={titleToURL(editedBlogData.title)}
                        value={editedBlogData.url}
                        onChange={(e) =>
                          setEditedBlogData({
                            ...editedBlogData,
                            url: e.target.value,
                          })
                        }
                      />
                      <div className="w-9 h-9 flex ml-2 justify-center items-center">
                        <button
                          disabled={editedBlogData.url !== ""}
                          onClick={() => {
                            setEditedBlogData({
                              ...editedBlogData,
                              url: titleToURL(editedBlogData.title),
                            });
                          }}
                          className="bg-[#007bff] disabled:bg-[#2d2d2d] disabled:text-[#6d6c6c] disabled:cursor-not-allowed 
                        rounded-sm text-xs aspect-square h-[90%] flex justify-center items-center"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] h-full flex flex-col">
                    <div className="flex items-center gap-1 ">
                      <p className="text-base after:ml-[0.2rem] after:content-['*'] after:text-blue-100">
                        Cover Image
                      </p>
                      <p className="text-xs text-grey-600">740x493 (1.5)</p>
                    </div>
                    <div className="flex">
                      {!editedBlogData.cover && !coverImageFile ? (
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                          className="w-full text-sm px-4 py-1 h-9 border-[0.5px] rounded-sm
                          border-grey-600 hover:border-grey-500 hover:bg-grey-900"
                        >
                          +
                        </button>
                      ) : (
                        <div
                          className="w-full text-sm pl-4 pr-3 py-1 h-9 border-[0.5px] rounded-sm divide-x-2 divide-[#828282]
                           bg-[#3b3b3b] border-[#3b3b3b] flex justify-center items-center"
                        >
                          <p className="text-ellipsis flex-1 line-clamp-1 overflow-hidden">
                            {coverImageFile?.name ||
                              blogDataCoverImageFileName ||
                              ""}
                          </p>
                          <button
                            className="pl-2 ml-2"
                            onClick={() => {
                              if (fileInputRef.current) {
                                // @ts-ignore
                                fileInputRef.current.value = null;
                              }
                              setCoverImageFile(null);
                              setEditedBlogData({
                                ...editedBlogData,
                                cover: null,
                              });
                            }}
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        id="cover-picker"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            setCoverImageFile(e.target.files[0]);
                            setEditedBlogData({
                              ...editedBlogData,
                              cover: URL.createObjectURL(e.target.files[0]),
                            });
                          }
                        }}
                        className="w-full hidden"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-base mt-5 mb-1 after:ml-[0.2rem] after:content-['*'] after:text-blue-100">
                  Description
                </p>
                <textarea
                  className="py-3 px-3 text-sm rounded-sm outline-none cursor-text h-24 min-h-[3rem] max-h-40"
                  id="description"
                  placeholder="Short description of the blog"
                  value={editedBlogData.description}
                  onChange={(e) =>
                    setEditedBlogData({
                      ...editedBlogData,
                      description: e.target.value,
                    })
                  }
                />
                <div className="flex mt-5 justify-start gap-[10%]">
                  <div
                    id="read-time-container"
                    className="flex gap-1 items-center"
                  >
                    <p className="underline underline-offset-4">Read Time:</p>
                    <input
                      className="rounded-sm h-7 px-3 py-1 w-14 bg-grey-800 outline-none bg-opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      value={editedBlogData.readTime}
                      onChange={(e) => {
                        setEditedBlogData({
                          ...editedBlogData,
                          readTime: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div id="views container" className="flex gap-1 items-center">
                    <p className="underline underline-offset-4">Views:</p>
                    <input
                      className="rounded-sm h-7 px-3 py-1 w-14 bg-grey-800 outline-none bg-opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      value={editedBlogData.views}
                      onChange={(e) => {
                        setEditedBlogData({
                          ...editedBlogData,
                          views: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div
                    id="is-featured-container"
                    className="flex gap-2 items-center"
                  >
                    <p className="underline underline-offset-4">Featured</p>
                    <input
                      checked={editedBlogData.featured}
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer"
                      onChange={() => {
                        setEditedBlogData({
                          ...editedBlogData,
                          featured: !editedBlogData.featured,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <div className="absolute top-[50%] h-[0.5px] w-full bg-white"></div>
                <div className="my-5 flex justify-center">
                  <h1 className=" text-center bg-primary z-10 px-5">Tags</h1>
                </div>
              </div>
              <div id="tag-container" className="flex flex-wrap gap-3">
                {allTags.map((tag, index) => (
                  <div
                    key={index}
                    className={
                      selectedTags.map((t) => t.id).includes(tag.id)
                        ? "select-none bg-[#007bff] hover:bg-[#3793f0] px-5 py-1 text-xs rounded-full cursor-pointer"
                        : "select-none bg-grey-800 px-5 py-1 text-xs rounded-full cursor-pointer hover:bg-grey-600"
                    }
                    onClick={() => {
                      if (selectedTags.map((t) => t.id).includes(tag.id)) {
                        setSelectedTags((prev) =>
                          prev.filter((prevTag) => prevTag.id !== tag.id)
                        );
                      } else {
                        if (selectedTags.length <= 2) {
                          setSelectedTags((prevTag) => [...prevTag, tag]);
                        }
                      }
                    }}
                  >
                    # {tag.name}
                  </div>
                ))}
                <div className="select-none bg-grey-800 px-5 flex items-center text-xs rounded-full cursor-pointer hover:bg-grey-600">
                  <BsThreeDots />
                </div>
              </div>
              <div className="relative w-full">
                <div className="absolute top-[50%] h-[0.5px] w-full bg-white"></div>
                <div className="my-5 flex justify-center">
                  <h1 className=" text-center bg-primary z-10 px-5">Preview</h1>
                </div>
              </div>
              <div className="flex">
                <BlogCard
                  metaData={{
                    ...editedBlogData,
                    tags: selectedTags,
                    read_time: editedBlogData.readTime,
                    published_at: editedBlogData.updatedAt,
                    file_name: editedBlogData.title,
                    cover: editedBlogData.cover,
                    url: editedBlogData.url,
                  }}
                  currentMetadata={{
                    ...currentBlogData,
                    tags: selectedTags,
                    read_time: currentBlogData.readTime,
                    published_at: currentBlogData.updatedAt,
                    file_name: currentBlogData.title,
                    cover: currentBlogData.cover,
                    url: currentBlogData.url,
                  }}
                />
              </div>
              <div
                id="button-group"
                className="flex gap-2 w-full justify-end mt-10 pb-5"
              >
                <button
                  className="text-sm px-4 py-1 border-[0.5px] rounded-sm border-grey-600 hover:border-grey-500 hover:bg-grey-900"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  className={
                    isUpdateDisabled
                      ? "text-sm px-4 py-1 border-[0.5px] rounded-sm border-grey-600 bg-grey-600 text-grey-300 cursor-not-allowed"
                      : "text-sm px-4 py-1 border-[0.5px] rounded-sm border-[#007bff] bg-[#007bff] hover:bg-[#3793f0] hover:border-[#3793f0]"
                  }
                  onClick={async () => {
                    let imageURL: string | null = editedBlogData.cover;
                    if (coverImageFile) {
                      await axios.post(
                        "/api/s3-blog-folder/create-empty-folder",
                        {
                          bucketName: config.S3_BUCKET,
                          folderName: `PUBLIC/${currentBlogData.id}/COVER`,
                        }
                      );
                      const uri = `PUBLIC/${
                        currentBlogData.id
                      }/COVER/${encodeURI(coverImageFile.name)}`;

                      const presignedURL = await axios.get(
                        `/api/s3-blog-file/presigned-url?bucketName=${config.S3_BUCKET}&fileName=${uri}`
                      );
                      const res = await axios.put(
                        presignedURL.data.s3Response,
                        coverImageFile,
                        {
                          headers: {
                            "Content-Type": coverImageFile.type,
                            "Allow-Cross-Origin-Access": "*",
                          },
                        }
                      );
                      if (res.status === 200) {
                        console.log(res);
                        imageURL = `https://${config.S3_BUCKET_ENDPOINT}/${uri}`;
                      }
                    }
                    await onSaveMetaData(imageURL, selectedTags);
                    setCoverImageFile(null);
                  }}
                >
                  {currentBlogData.type === editedBlogData.type
                    ? "Update"
                    : currentBlogData.type === "DRAFT"
                    ? "Publish"
                    : editedBlogData.type === "DRAFT"
                    ? "Unpublish"
                    : currentBlogData.type === "PUBLISHED" &&
                      editedBlogData.type === "PRIVATE"
                    ? "Make Private"
                    : "Make Public"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
