"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Post = () => {
  const token = Cookies.get("token");
  const [text, setText] = useState("");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const id = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    console.log(id);

    async function loadPosts() {
      const res = await axios.post(
        `/api/get-post-by-id`,
        { id: id },
        { headers: { token } }
      );
      setPost(res.data.post);
      setComments(res.data.comments);
    }
    loadPosts();
  }, [token]);
  const submitForm = async (text) => {
    const req = await axios.post(
      "/api/add-comment",
      { text, id: post?._id },
      { headers: { token } }
    );
    console.log(req.data);
    setText("");
    setComments(req.data.comments);
  };
  return (
    <div className="m-4">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            {post?.name} @{post?.userName}
          </h2>
          <p>{post?.post}</p>
          <div className="card-actions justify-end">
            {new Date(post?.date).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </div>
        </div>
      </div>
      <h2 className="text-center text-3xl font-bold my-4">Comments</h2>
      <div className="mt-6 mb-6 w-full flex justify-between">
        <input
          type="text"
          placeholder="Comment Something..."
          className="input input-bordered input-primary w-[72vw]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn w-[20vw] btn-accent"
          onClick={async (e) => {
            e.preventDefault();
            await submitForm(text);
          }}
        >
          Submit
        </button>
      </div>
      {[...comments].reverse().map((comment, i) => (
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
  );
};

export default Post;
