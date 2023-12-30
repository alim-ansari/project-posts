"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tab from "../components/Tab";
import Add from "../components/Add";

const Page = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function loadPosts(token) {
      const res = await axios.post(
        "/api/get-all-posts",
        {},
        { headers: { token } }
      );
      setPosts(res.data.posts);
    }
    loadPosts(token);
  }, [token]);

  return (
    <div className="p-3">
      <Tab />
      <Add />
      <div className="flex flex-row flex-wrap gap-2">
        {[...posts].reverse().map((post, i) => (
          <div className="card w-96 bg-base-100 shadow-xl" key={i}>
            <div className="card-body">
              <h2 className="card-title">
                {post.name} @{post.userName}
              </h2>
              <p className="text-lg">{post.post.slice(0, 20) + "..."}</p>
              <p>
                {new Date(post.date).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/feed/" + post._id)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
