import { Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";

const login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col w-screen h-[80vh] justify-center items-center text-2xl z-20">
      {session ? (
        <div className="transition-opacity px-20 py-10 bg-white/30 hover:bg-white/40 z-50">
          <h1 className="text-black font-bold z-50">
            🗿🗿 Welcome back Master Nathan 🗿🗿
          </h1>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                router.push("/blogs")
                window.open("/admin/dashboard", "_ blank");
              }}
            >
              Dash Board
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            router.push("/api/auth/signin");
          }}
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default login;
