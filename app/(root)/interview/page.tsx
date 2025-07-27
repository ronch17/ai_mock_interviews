import React from "react";
import Agent from "@/components/ui/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { googleAvatar } from "@/lib/actions/general.action";

const Page = async () => {
  const user = await getCurrentUser();
  const avatar = await googleAvatar();

  return (
    <>
      <h3>Interview Generation</h3>

      <Agent
        userName={user?.name}
        userId={user?.id}
        avatar={avatar}
        type="generate"
      />
    </>
  );
};
export default Page;
