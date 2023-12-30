"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PostForm = ({ nopost, posts, token }) => {
  const router = useRouter();
  console.log(posts);
  const [post, setPost] = useState("");
  const submitForm = async (post) => {
    const req = await axios.post(
      "/api/add-post",
      { post },
      { headers: { token } }
    );
    console.log(req.data);
    if (req.data.success) window.location.href = "/feed";
  };
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-2">Create New Post</h3>
          <textarea
            className="textarea textarea-primary w-full"
            placeholder="Bio"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div
                className="btn me-2 btn-accent"
                onClick={async (e) => {
                  e.preventDefault();
                  await submitForm(post);
                }}
              >
                Submit
              </div>
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {nopost ? (
        <>
          <div className="flex justify-center items-center min-h-[70vw]">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-center text-2xl">
                  No Posts Created So Far
                </h2>
                <div className="card-actions justify-center">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Add One
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row flex-wrap">
            {posts.map((post, i) => (
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
        </>
      )}
    </>
  );
};

export default PostForm;
