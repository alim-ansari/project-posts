import connectMongo from "@/app/utils/connectDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { jwtDecrypt } from "jose";
import { getUserName } from "@/app/utils/getUserName";
import Post from "@/app/models/post";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export async function POST(req, res) {
  try {
    let token = req.headers.get("token");
    const { userName } = getUserName(token);
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    console.log("CREATING DOCUMENT");
    const getUserPosts = await Post.find({ userName: userName });
    console.log(getUserPosts);
    return NextResponse.json({ posts: getUserPosts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
