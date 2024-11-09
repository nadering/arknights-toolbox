import Image from "next/image";
import Link from "next/link";

/** 필요 재료 설정 페이지로 라우팅하는 버튼 컴포넌트 */
export default function NeedLinkButton() {
  return (
    <Link
      className="grow flex flex-row justify-center items-center gap-6 p-4 rounded-xl sm:flex-col sm:gap-4 hover:bg-gray-800 hover:bg-opacity-15"
      href="/need"
    >
      <div className="relative w-16 aspect-square sm:w-24">
        <Image
          className="[filter:brightness(100%)_invert(100%)]"
          src="/images/others/person-new.png"
          alt="need-link"
          fill
          sizes="20vw"
          priority
        />
      </div>
      <div className="w-[180px] flex flex-col items-center gap-1 translate-y-[4px]">
        <p className="leading-none font-semibold text-2xl text-white text-center break-keep">
          필요 재료 설정
        </p>
        <p className="leading-tight text-center text-gray-500 break-keep">
          정예화, 스킬 마스터리, 모듈
        </p>
      </div>
    </Link>
  );
};