import { action, observable } from "mobx";

export type TRootStore = {
  authStore: AuthStore;
  buildingStore: BuildingStore;
};

export class RootStore implements TRootStore {
  authStore: AuthStore;
  buildingStore: BuildingStore;
  constructor() {
    this.authStore = new AuthStore(this);
    this.buildingStore = new BuildingStore(this);
  }
}

type TAuthStore = {
  authToken: string;
  role: string;
  expiryDate: Date;
};

class AuthStore implements TAuthStore {
  @observable authToken = "";
  @observable role = "";
  @observable expiryDate = new Date();
  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  setCredentials(token: string, expiresIn: number, role: string) {
    const time = Date.now() + expiresIn * 1000;
    const expiryDate = new Date(time);

    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("expiryDate", expiryDate.toString());
    sessionStorage.setItem("role", role);
    this.authToken = token;
    this.expiryDate = expiryDate;
    this.role = role;
    this.autoLogOut();
  }

  @action
  logOut() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("expiryDate");
    sessionStorage.removeItem("role");
    this.expiryDate = new Date();
    this.role = "";
    this.authToken = "";
  }

  @action
  checkCredentials() {
    this.authToken = sessionStorage.getItem("authToken") || "";
    this.expiryDate = new Date(sessionStorage?.getItem("expiryDate") || "");
    this.role = sessionStorage.getItem("role") || "";
    this.autoLogOut();
  }

  autoLogOut() {
    const time = this.expiryDate.getTime() - Date.now();

    if (time < 0) return this.logOut();
    setTimeout(() => {
      this.logOut();
    }, time);
  }
}

interface Building {
  id: string;
  name: string;
  floors: number;
}

type TBuildingStore = {
  buildings: Building[];
};
class BuildingStore implements TBuildingStore {
  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable buildings: Building[] = [];
}
