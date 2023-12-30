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

    await connectMongo();

    const getPost = await Post.findById(data.id);
    const getComments = await Comment.find({ id: data.id });

    return NextResponse.json({ post: getPost, comments: getComments });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
