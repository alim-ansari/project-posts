import connectMongo from "@/app/utils/connectDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Post from "@/app/models/post";
import { getUserName } from "@/app/utils/getUserName";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export async function POST(req, res) {
  try {
    let token = req.headers.get("token");
    const { name, userName } = getUserName(token);
    console.log(name, userName);
    const data = await req.json();
    // const { name, userName, password } = data;
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    console.log("CREATING DOCUMENT");
    console.log(data);
    const addPost = await Post.create({
      userName,
      name,
      post: data.post,
    });
    console.log(addPost);
    if (addPost) return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
