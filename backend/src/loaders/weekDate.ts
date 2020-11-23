import DataLoader from "dataloader";
import { WeekDate } from "../entities/index";

export const createWeekDateLoader = () =>
  new DataLoader<number, WeekDate>(async (WeekDateIds) => {
    const weekDates = await WeekDate.findByIds(WeekDateIds as number[]);
    const weekDateIdToWeekDate: Record<number, WeekDate> = {};
    weekDates.forEach((u) => {
      weekDateIdToWeekDate[u.id as any] = u;
    });
    console.log(weekDateIdToWeekDate);
    const sortedWeekDates = WeekDateIds.map(
      (WeekDateId) => weekDateIdToWeekDate[WeekDateId]
    );

    return sortedWeekDates;
  });
