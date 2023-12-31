"use client";
import { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

export default function Home() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({ name: "n", userName: "u", password: "p" });

  const formSubmit = async (name, userName, password) => {
    const res = await axios.post("/api/add-user", { name, userName, password });

    if (res.data.error) {
      setErr({ ...err, ...res.data });
      setTimeout(
        () => setErr({ name: "n", userName: "u", password: "p" }),
        3000
      );
    } else if (res.data.success) {
      Cookie.set("token", res.data.token);
      window.location.href = "/feed";
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-8 pb-7 text-primary">
        Project Posts
      </h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="input input-bordered input-primary w-[75vw] md:w-[45vw] lg:w-[40vw] mb-1"
      />
      <p
        className={`text-red-500 mb-2 ${
          err.name?.length <= 1 ? "invisible" : "block"
        }`}
      >
        {err.name}
      </p>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your User Name"
          className="input input-bordered input-primary w-[75vw] md:w-[45vw] lg:w-[40vw] mb-1"
        />
      </div>

      <p
        className={`text-red-500  mb-2 ${
          err.userName?.length <= 1 ? "invisible" : "block"
        }`}
      >
        {err.userName}
      </p>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
        className="input input-bordered input-primary w-[75vw] md:w-[45vw] lg:w-[40vw] mb-1"
      />
      <p
        className={`text-red-500  mb-2 ${
          err.password?.length <= 1 ? "invisible" : "block"
        }`}
      >
        {err.password}
      </p>

      <button
        className="btn btn-primary mt-3 w-[75vw] md:w-[45vw] lg:w-[40vw]"
        onClick={() => formSubmit(name, userName, password)}
      >
        Log In / Sign In
      </button>
      <div
        className="tooltip tooltip-left fixed right-2"
        data-tip={`Username Rules:\n
            1. Only contains alphanumeric characters, underscore, and dot.
            \n
            2. Underscore and dot can't be at the start or end of a username
            (e.g., '_username' / 'username_' / '.username' / 'username.').
            \n
            3. Underscore and dot can't be next to each other (e.g.,
            'user_.name').
            \n
            4. Underscore or dot can't be used multiple times in a row (e.g.,
            'user__name' / 'user..name').
            \n
            5. Number of characters must be between 2 to 40.`}
      >
        <button className="btn btn-primary text-xs p-2 md:text-2xl">ⓘ</button>
      </div>
    </main>
  );
}
