import connectMongo from "@/app/utils/connectDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Post from "@/app/models/post";
import { getUserName } from "@/app/utils/getUserName";
import Comment from "@/app/models/comment";
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
    const addcomment = await Comment.create({
      id: data.id,
      userName,
      name,
      text: data.text,
    });

    if (addcomment) {
      const getComments = await Comment.find({ id: data.id });
      return NextResponse.json({ comments: getComments });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
