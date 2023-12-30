"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Search = () => {
  const token = Cookies.get("token");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (!input) {
        setPosts([]);
        setComments([]);
        setLoading(false);
      } else {
        const res = await axios.post(
          "/api/get-search",
          { input: input },
          { headers: { token } }
        );
        if (res.data) setLoading(false);
        console.log(res.data);
        setPosts(res.data.posts);
        setComments(res.data.comments);
      }
    }
    getData();
  }, [input, token]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  return (
    <div className="p-3">
      <input
        type="text"
        placeholder="Search all Posts and Comments"
        className="input input-bordered input-primary w-full"
        onChange={(e) => setInput(e.target.value)}
        autoFocus={true}
      />
      {!loading ? (
        input ? (
          <div>
            <div className="text-3xl text-center m-4">
              {posts?.length > 0 && input.length > 0
                ? "All Posts Found"
                : "No Post Found"}
            </div>
            {posts.map((post, i) => (
              <div className="card w-full bg-base-100 shadow-xl mb-3" key={i}>
                <div className="card-body">
                  <h2 className="card-title">
                    {post.name} @{post.userName}
                  </h2>
                  <p className="text-lg">{post.post.slice(0, 20) + "..."}</p>
                  <p>
                    {new Date(post?.date).toLocaleString("en-IN", {
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
            <div className="text-3xl text-center m-4">
              {comments?.length > 0 && input.length > 0
                ? "All Comments Found"
                : "No Comment Found"}
            </div>
            {comments.map((comment, i) => (
              <div className="card w-full mb-3 bg-base-100 shadow-xl" key={i}>
                <div className="card-body">
                  <h2 className="card-title">
                    {comment?.name} @{comment?.userName}
                  </h2>
                  <p>{comment?.text}</p>
                  <div className="card-actions justify-end">
                    {new Date(comment.date).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )
      ) : (
        <div className="h-[50vw] justify-center flex items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default Search;
