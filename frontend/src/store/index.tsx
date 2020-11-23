import React, { createContext } from "react";
import { RootStore } from "./Root";

type rootStoreType = RootStore;

export const StoreContext = createContext<rootStoreType>(new RootStore());

export const useRootStore = () => React.useContext(StoreContext);
