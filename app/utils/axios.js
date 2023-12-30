import { cookies } from "next/headers";
import { domain } from "./domain";
import axios from "axios";

const cookieStore = cookies();
let token = cookieStore.get("token")?.value;
export const caxios = axios.create({
  baseURL: domain(),
  headers: { token: token },
});
