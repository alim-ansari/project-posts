import connectMongo from "@/app/utils/connectDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { jwtDecrypt } from "jose";
import { getUserName } from "@/app/utils/getUserName";
import Post from "@/app/models/post";
import Comment from "@/app/models/comment";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    console.log("CREATING DOCUMENT");
    console.log(data);
    const getPost = await Post.findById(data.id);
    const getComments = await Comment.find({ id: data.id });
    console.log(getComments);
    return NextResponse.json({ post: getPost, comments: getComments });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
