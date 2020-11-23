import { message } from "antd";
import moment from "moment";
import React from "react";
import {
  PaymentsDocument,
  PaymentsQuery,
  useBuildingsQuery,
  useChangeWorkingDaysMutation,
  usePaymentsQuery,
} from "../../generated/graphql";
import { WorkForcePayments } from "./Table";
import Controls from "./Controls";
import { client } from "../..";

export const Materials = () => {
  const [dates, setDates] = React.useState([
    moment().startOf("week").add(1, "days"),
    moment().endOf("week").add(1, "days"),
  ]);
  const { data: buildings } = useBuildingsQuery();
  const [
    changeWorkingDays,
    { loading: workLoading, error: workingError },
  ] = useChangeWorkingDaysMutation();
  const {
    data: payments,
    fetchMore,
    loading,
    error: paymentsError,
  } = usePaymentsQuery({
    variables: {
      buildingId: buildings?.buildings[5]?.id || "",
      endDate: dates[1].format("MM-DD-YYYY"),
      initialDate: dates[0].format("MM-DD-YYYY"),
    },
    notifyOnNetworkStatusChange: true,
  });

  const [building, setBuilding] = React.useState("");

  React.useEffect(() => {
    if (workingError || paymentsError) message.error("Algo salio mal");
  }, [workingError, paymentsError]);

  React.useEffect(() => {
    if (building !== "" && fetchMore)
      fetchMore({
        variables: {
          buildingId: building,
          endDate: dates[1].format("MM-DD-YYYY"),
          initialDate: dates[0].format("MM-DD-YYYY"),
        },
      });
  }, [building, dates, fetchMore]);

  React.useEffect(() => {
    return () => {
      client.cache.writeQuery<PaymentsQuery>({
        query: PaymentsDocument,
        data: {
          getEmployeePayments: [],
        },
      });
    };
  }, []);
  const changeDateHandler = (next = false) => {
    if (next) {
      setDates((dates) => [
        moment(dates[1]).add(1, "days"),
        moment(dates[1]).add(8, "days"),
      ]);
    } else {
      setDates((dates) => [
        moment(dates[0]).subtract(8, "days"),
        moment(dates[0]),
      ]);
    }
  };

  const changeWorkingDaysHandler = (
    paymentId: string,
    working_days: number
  ) => {
    changeWorkingDays({
      variables: {
        paymentId: paymentId,
        working_days,
      },
    });
  };

  return (
    <>
      <Controls
        building={building}
        setBuilding={(e) => setBuilding(e as string)}
        buildings={buildings}
        changeDateHandler={changeDateHandler}
        initialDate={dates[0]}
        endDate={dates[1]}
      />
      <WorkForcePayments
        changeWorkingDaysHandler={changeWorkingDaysHandler}
        loading={loading}
        payments={payments}
        workLoading={workLoading}
      />
    </>
  );
};

export default Materials;
