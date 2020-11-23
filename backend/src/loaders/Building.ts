import DataLoader from "dataloader";
import { Building } from "../entities/Building/Building";

export const createBuildingLoader = () => {
  new DataLoader<number, Building>(async (BuildingIds) => {
    const Buildings = await Building.findByIds(BuildingIds as number[]);
    const BuildingIdToBuilding: Record<number, Building> = {};
    Buildings.forEach((u) => {
      BuildingIdToBuilding[u.id as any] = u;
    });
    console.log(BuildingIdToBuilding);
    const sortedBuildings = BuildingIds.map(
      (BuildingId) => BuildingIdToBuilding[BuildingId]
    );
    console.log(sortedBuildings);
    return sortedBuildings;
  });
};
