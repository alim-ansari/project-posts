import React from "react";
import { caxios } from "../utils/axios";
import PostForm from "../components/PostForm";
import { cookies } from "next/headers";
import Tab from "../components/Tab";
import Add from "../components/Add";

async function loadPosts() {
  const res = await caxios.post(`/api/get-posts`, {});
  return res.data.posts;
}

const Route = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const posts = await loadPosts();
  console.log(posts);
  return (
    <div className="p-3">
      <Tab />
      <Add />
      {posts.length == 0 ? (
        <PostForm nopost={true} posts={posts} token={token} />
      ) : (
        <div>
          <PostForm nopost={false} posts={posts} token={token} />
        </div>
      )}
    </div>
  );
};

export default Route;
