import { DepotLinkButton } from "@/app/main-page";

/** 메인 페이지 */
export default function Home() {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col">
        <DepotLinkButton />
        <p className="hidden leading-none font-medium text-2xl text-gray-400 text-center break-keep select-none">
          +
        </p>
      </div>
    </div>
  );
}
