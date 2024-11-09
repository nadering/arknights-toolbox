import { DepotLinkButton, NeedLinkButton } from "@/app/_main-page";

/** 메인 페이지 */
export default function Home() {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 sm:px-2">
        <DepotLinkButton />
        <p className="leading-none font-medium text-2xl text-gray-400 text-center break-keep select-none">
          +
        </p>
        <NeedLinkButton />
      </div>
    </div>
  );
}
