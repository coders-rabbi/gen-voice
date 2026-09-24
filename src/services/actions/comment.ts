"use server";

import { revalidatePath } from "next/cache";
import { createComment } from "@/services/comments";
import { TCommentPyaload } from "@/types/comment.type";
export const createCommentAction = async (
  token: string,
  payload: TCommentPyaload,
  path: string,
) => {
  const res = await createComment(token as string, payload);

  if (res?.success) {
    revalidatePath(path);
  }

  return res;
};
