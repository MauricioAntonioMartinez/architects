import React from "react";

import { LogIn } from "../views/LogIn/LogIn";
import HomeLayOut from "../layouts/Home";
import { Routing } from "./Routing";
import AppPath from "./Routing";

export const homeRoutes: Routing[] = [
  {
    icon: "",
    component: LogIn,
    path: "/",
  },
];

const Home: React.FC = () => (
  <AppPath Wrapper={HomeLayOut} routers={homeRoutes} />
);

export default Home;
