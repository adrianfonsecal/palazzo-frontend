import Image from "next/image";
import InvitationPage from "./(guest)/invitacion/[uuid]/page";

export default function Home() {
  //http://localhost:8000/api/invitation/
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to Palazzo Invites</h1>
    </div>
  );
}
