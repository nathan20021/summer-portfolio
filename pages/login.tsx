import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";

const login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col w-screen h-[80vh] justify-center items-center text-2xl z-20">
      {session ? (
        <div className="px-20 py-10 bg-[#333333] z-50">
          <h1 className="text-white font-bold z-50 pb-6">
            🗿🗿 Welcome back Master Nathan 🗿🗿
          </h1>
          <div className="flex gap-3">
            <button
              className="bg-[#2e7c9e] hover:bg-[#47849f] px-3 py-1 rounded-sm text-lg"
              onClick={() => {
                window.open("/admin/dashboard", "_blank");
              }}
            >
              Dash Board
            </button>
            <button
              className="bg-[#2e7c9e] hover:bg-[#47849f] px-3 py-1 rounded-sm text-lg"
              onClick={() => {
                window.open("/admin/editor", "_blank");
              }}
            >
              Blog Editor
            </button>
            <button
              className="bg-[#9c2c2c] hover:bg-[#9b4444] px-3 py-1 rounded-sm text-lg"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            className="bg-[#2e7c9e] hover:bg-[#47849f] px-3 py-1 rounded-sm text-lg z-50"
            onClick={() => {
              router.push("/api/auth/signin");
            }}
          >
            Sign In
          </button>
          <h2 className=" mt-10 bg-silver/10 py-3 px-6 backdrop-blur-md">
            You are not supposed to be here 😡
          </h2>
        </>
      )}
    </div>
  );
};

export default login;
