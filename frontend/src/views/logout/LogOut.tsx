import React from "react";
import { useRootStore } from "../../store";
import { client } from "../../index";
const LogOut = () => {
  const { authStore } = useRootStore();
  React.useEffect(() => {
    authStore.logOut();
    client.clearStore();
  }, [authStore]);
  return <div></div>;
};

export default LogOut;
