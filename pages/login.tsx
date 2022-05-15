import * as React from "react";
// import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const login = () => {
  //   const [userName, setUserName] = useState("");
  //   const [password, setPassword] = useState("");

  const { data: session } = useSession();

  //   const onFormSubmit = (e: any) => {
  //     e.preventDefault();
  //     if (!session) {
  //       signIn();
  //     }
  //   };

  return (
    <div className="flex w-screen h-[80vh] justify-center items-center text-2xl z-20">
      <div className="form z-20 bg-black/90 p-20">
        {session && (
          <>
            <h1>You are logged In</h1>
            <button onClick={() => signOut()}>Signout here</button>
          </>
        )}

        {!session && (
          <button
            onClick={() => {
              signIn("github");
            }}
          >
            {" "}
            Sign in
          </button>
        )}

        {/* <form className="z-20 flex flex-col gap-5" onSubmit={onFormSubmit}>
          <h1 className="font-bold text-center">Login</h1>
          <div className="input-container">
            <label>Username: </label>
            <input
              type="text"
              name="uname"
              value={userName}
              required
              className="text-black text-sm px-4 py-1"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="input-container w-full">
            <label>Password : </label>
            <input
              type="password"
              name="pass"
              value={password}
              required
              className="text-black text-sm px-4 py-1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default login;
