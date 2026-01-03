import Image from "next/image";
import InvitationPage from "./(guest)/invitacion/[uuid]/page";

export default function Home() {
  return (
    <InvitationPage params={{ uuid: "sample-uuid-for-testing" }} />
  );
}
