import { redirect } from "react-router-dom";
import { deleteContact } from "@/contacts";

export async function action({ params }) {
  // 👉 抛出错误
  // throw new Error("oh dang!");

  await deleteContact(params.contactId);
  return redirect("/");
}