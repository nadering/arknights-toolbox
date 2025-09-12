import {
  DepotLinkButton,
  NeedLinkButton,
  ResultLinkButton,
} from "@/app/_main-page";

/** 메인 페이지 */
export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 sm:px-2">
        <DepotLinkButton />
        <p className="leading-none font-medium text-2xl text-gray-400 text-center break-keep select-none">
          +
        </p>
        <NeedLinkButton />
      </div>
      <p className="leading-none font-medium text-xl text-gray-400 text-center break-keep select-none">
        ↓
      </p>
      <ResultLinkButton />
      <p className="leading-tight font-light text-lg text-gray-400 text-center break-keep select-none">
        최근 업데이트: 평안한 잠꼬대 (2025-09-04 시작, 2025-09-13 반영)
      </p>
    </div>
  );
}
