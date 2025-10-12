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
      <div className="flex flex-col items-center gap-1 mt-1">
        <p className="leading-tight font-medium text-xl text-gray-400 text-center break-keep select-none">
          최근 업데이트
        </p>
        <p className="leading-tight font-light text-lg text-gray-400 text-center break-keep select-none">
          중국 서버: 평안한 잠꼬대 (2025-09-04)
        </p>
        <p className="leading-tight font-light text-lg text-gray-400 text-center break-keep select-none">
          글로벌 서버: 해리성 결합 (2025-09-16)
        </p>
        <p className="leading-tight font-light text-lg text-gray-400 text-center break-keep select-none">
          사이트 업데이트 (2025-10-13)
        </p>
      </div>
    </div>
  );
}
