import { UserDepotSetter } from "@/app/depot/user-depot";

export default function Home() {
  return (
    <>
      <div className="w-screen h-full min-h-screen bg-dark">
        <div className="flex flex-col w-screen max-w-3xl h-full min-h-screen bg-dark py-16 mx-auto">
          <UserDepotSetter />
        </div>
      </div>
    </>
  );
}
