import {
  AppstoreOutlined,
  IdcardOutlined,
  LogoutOutlined,
  PicLeftOutlined,
  ToolOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import React from "react";
import DashBoardLayOut from "../layouts/Dashboard";
import Buildings from "../views/Buildings/Building";
import { CreateAdmin } from "../views/CreateAdmin/CreateAdmin";
import Jobs from "../views/Job/Job";
import LogOut from "../views/logout/LogOut";
import Nomina from "../views/Nomina/Nomina";
import Purchase from "../views/Purchase/Purchases";
import AppPath, { Routing } from "./Routing";

export const adminRoutes: Routing[] = [
  {
    icon: PicLeftOutlined,
    title: "Obras",
    component: Buildings,
    path: "/",
  },
  {
    icon: UserSwitchOutlined,
    title: "Agregar Admin",
    component: CreateAdmin,
    path: "/create-admin",
  },
  // {
  //   icon: TeamOutlined,
  //   title: "Agregar Empleado",
  //   component: Employee,
  //   path: "/employee",
  // },
  {
    icon: ToolOutlined,
    title: "Mano de Obra",
    component: Jobs,
    path: "/jobs",
  },
  {
    icon: AppstoreOutlined,
    title: "Materiales",
    component: Purchase,
    path: "/material",
  },
  {
    icon: IdcardOutlined,
    title: "Nomina",
    component: Nomina,
    path: "/nomina",
  },
  {
    icon: LogoutOutlined,
    title: "Salir ",
    component: LogOut,
    path: "/logout",
  },
];

const Admin: React.FC = () => (
  <AppPath Wrapper={DashBoardLayOut} routers={adminRoutes} />
);
export default Admin;
