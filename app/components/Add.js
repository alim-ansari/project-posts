"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Add = () => {
  const token = Cookies.get("token");
  const router = useRouter();
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
      <button
        className="btn btn-primary fixed bottom-3 right-3 z-50"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add Post
      </button>
    </>
  );
};

export default Add;
