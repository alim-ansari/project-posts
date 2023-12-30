"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Tab = () => {
  const router = useRouter();
  const [tab, setTab] = useState("");
  useEffect(() => {
    if (
      window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      ) == "feed"
    ) {
      setTab("feed");
    } else if (
      window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      ) == "my-posts"
    ) {
      setTab("post");
    }
  }, []);
  return (
    <>
      <div role="tablist" className="tabs tabs-boxed mb-4">
        <a
          role="tab"
          className={`tab ${tab == "feed" ? "tab-active" : ""}`}
          onClick={() => router.push("/feed")}
        >
          Feed
        </a>
        <a
          role="tab"
          className={`tab ${tab == "post" ? "tab-active" : ""}`}
          onClick={() => router.push("/my-posts")}
        >
          My Posts
        </a>
      </div>
      <input
        type="text"
        placeholder="Search all Posts and Comments"
        className="input input-bordered input-primary w-full mb-4"
        onClick={() => router.push("/search")}
      />
    </>
  );
};

export default Tab;
