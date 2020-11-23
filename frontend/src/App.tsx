import { message } from "antd";
import { observer } from "mobx-react-lite";
import React, { Suspense } from "react";
import "./App.css";
import AdminRoutes from "./routes/admin.routes";
import HomeRoutes from "./routes/home.routes";
import { useRootStore } from "./store/index";

const App: React.FC = () => {
  const { authStore } = useRootStore();
  let Tree;
  React.useEffect(() => {
    if (authStore.authToken !== "") message.success("Inicio de sesión exitoso");
    else authStore.checkCredentials();
  }, [authStore]);
  if (authStore.authToken) {
    Tree = AdminRoutes;
  } else {
    Tree = HomeRoutes;
  }

  return (
    <Suspense fallback={<div>Loading ... </div>}>
      <Tree />
    </Suspense>
  );
};

export default observer(App);
