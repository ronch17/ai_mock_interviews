import Image from "next/image";
import { googleAvatar } from "@/lib/actions/general.action";

export default async function ChatAvatar() {
  const avatar = await googleAvatar();

  return (
    <Image
      src={avatar || "/ai-avatar.png"}
      alt="User Avatar"
      width={65}
      height={54}
      className="object-cover rounded-full"
    />
  );
}
