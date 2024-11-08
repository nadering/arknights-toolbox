import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 h-12 flex flex-row justify-between items-center px-4">
      <Link
        href="/"
        className="leading-none font-semibold text-2xl text-gray-400 text-center break-keep px-1 translate-y-2
          hover:text-white hover:animate-[vibration-down-8px_1s_infinite]"
      >
        Arknights-Toolbox
      </Link>
    </header>
  );
}
