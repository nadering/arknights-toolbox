import { redirect } from "next/navigation";

/** 404 오류가 발생하면, 메인 페이지로 리다이렉트 */
export default function NotFound() {
  redirect("/");
}