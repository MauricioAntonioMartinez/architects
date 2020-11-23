import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, DatePicker, Select } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { BuildingsQuery } from "../../generated/graphql";
const { RangePicker } = DatePicker;
const { Option } = Select;
interface Props {
  changeDateHandler: (_?: boolean) => void;
  setBuilding: (_?: string) => void;
  initialDate: moment.Moment;
  endDate: moment.Moment;
  buildings?: BuildingsQuery;
  building: string;
}

const Controls = ({
  changeDateHandler,
  endDate,
  initialDate,
  buildings,
  setBuilding,
  building,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem auto ",
        width: "50rem",
      }}
    >
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title level={2} type="success" style={{ textAlign: "center" }}>
          Selecciona la semana
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => changeDateHandler()}
          />
          <RangePicker disabled value={[initialDate, endDate]} />
          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={() => changeDateHandler(true)}
          />
        </div>
      </div>
      <Select
        placeholder="Selecciona una obra"
        style={{ width: "40%", marginLeft: "1.5rem" }}
        onSelect={(buildingId) => setBuilding(buildingId)}
        value={building}
      >
        {buildings?.buildings.map((bld) => {
          return (
            <Option key={bld.id} value={bld.id}>
              {bld.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default Controls;
