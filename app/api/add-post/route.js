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

    const data = await req.json();
    // const { name, userName, password } = data;

    await connectMongo();

    const addPost = await Post.create({
      userName,
      name,
      post: data.post,
    });

    if (addPost) return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
