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
    await connectMongo();

    const getAllPosts = await Post.find({});

    return NextResponse.json({ posts: getAllPosts });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
