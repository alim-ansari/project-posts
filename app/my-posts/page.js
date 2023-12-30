import React from "react";
import PostForm from "../components/PostForm";
import { cookies } from "next/headers";
import Tab from "../components/Tab";
import Add from "../components/Add";
import axios from "axios";
import { domain } from "../utils/domain";

async function loadPosts(token) {
  const res = await axios.post(
    `${domain()}/api/get-posts`,
    {},
    { headers: { token: token } }
  );
  return res.data.posts;
}

const Route = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const posts = await loadPosts(token);
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
