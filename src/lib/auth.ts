import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOptions";

export async function getAuthSession() {
  return await getServerSession(authOptions);
}