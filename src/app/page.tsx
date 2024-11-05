import { SetUserDepot } from "@/app/depot";

export default function Home() {
  return (
    <>
      <div className="w-screen h-full min-h-screen bg-dark">
        <div className="flex flex-col w-screen max-w-3xl h-full min-h-screen bg-dark px-4 py-8 mx-auto">
          <SetUserDepot />
        </div>
      </div>
    </>
  );
}
