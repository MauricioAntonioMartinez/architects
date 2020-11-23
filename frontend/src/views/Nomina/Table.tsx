import { Input, Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";
import { Payment, PaymentsQuery } from "../../generated/graphql";

interface Props {
  changeWorkingDaysHandler: (id: string, target: number) => void;
  loading: boolean;
  workLoading: boolean;
  payments?: PaymentsQuery;
}

export const WorkForcePayments = ({
  changeWorkingDaysHandler,
  loading,
  payments,
  workLoading,
}: Props) => {
  return (
    <Table
      loading={loading || workLoading}
      dataSource={payments?.getEmployeePayments || []}
      style={{ width: "50rem", margin: "auto" }}
    >
      <Column
        title="Nombre"
        key="name"
        render={(e: Payment) => {
          return e?.job?.employee?.name;
        }}
      />
      <Column
        title="Sueldo"
        key="salary"
        align="right"
        render={(e: Payment) => {
          return `$${e?.job?.salary}`;
        }}
      />

      <Column
        align="center"
        title="Dias Trabajados"
        key="working_days"
        render={(e: Payment) => {
          return (
            <Input
              style={{ width: "30%", marginRight: "auto" }}
              defaultValue={e?.working_days}
              type="number"
              onChange={(event) =>
                changeWorkingDaysHandler(e?.id, +event.target.value)
              }
            />
          );
        }}
      />
    </Table>
  );
};
