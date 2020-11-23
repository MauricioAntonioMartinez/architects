import { DeleteOutlined, PicCenterOutlined } from "@ant-design/icons";
import { Button, Card, Pagination, Space, Typography } from "antd";
import React, { CSSProperties } from "react";
import {
  Building,
  useBuildingsQuery,
  useDeleteBuildingMutation,
} from "../../generated/graphql";
import AddBuilding from "./AddBuilding";
import Report from "./Report";
const { Title } = Typography;
const { Meta } = Card;
const gridStyle: CSSProperties = {
  width: "25%",
  height: "8rem",
  textAlign: "center",
  position: "relative",
};

const BuildingComponent: React.FC<{}> = () => {
  const { data } = useBuildingsQuery();
  const [updateBld, setUpdateBld] = React.useState<
    Building | null | undefined
  >();
  const [showModal, setShowModal] = React.useState(false);
  const [showReport, setShowReport] = React.useState(false);
  const [deleteBuilding] = useDeleteBuildingMutation({
    update: (cache, { data, errors }) => {
      if (errors) {
        console.log(errors);
        return;
      }
      if (data?.deleteBuilding) {
        cache.modify({
          fields: {
            buildings(bld, { readField }) {
              return bld.filter(
                (b) => readField("id", b) !== data.deleteBuilding
              );
            },
          },
        });
      }
    },
  });
  const [limit, setLimit] = React.useState(8);
  const updateHandler = (bld: Building) => {
    console.log(bld);
    setShowModal(true);
    setUpdateBld(bld);
  };

  return (
    <>
      <Button
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
        size="large"
        type="primary"
        onClick={() => {
          setUpdateBld(null);
          setShowModal(!showModal);
        }}
      >
        Agregar Obra
      </Button>

      <AddBuilding
        building={updateBld}
        showModal={showModal}
        setShowModal={() => {
          setUpdateBld(null);
          setShowModal(!setShowModal);
        }}
      />

      {showReport && (
        <Report
          closeReport={() => {
            setShowReport(false);
            setUpdateBld(null);
          }}
          buildingId={updateBld!.id}
        />
      )}

      <Card title="Mis Obras">
        {data?.buildings.map((bld, index) => {
          if (index < limit && index >= limit - 8) {
            let color = "warning";
            switch (bld.status.status) {
              case "Preliminar":
                color = "warning";
                break;
              case "Cimentación":
                color = "secondary";
                break;
              case "Estructura de concreto":
                color = "danger";
                break;
              case "Terminado":
                color = "success";
                break;
            }

            return (
              <div
                onClick={updateHandler.bind(null, bld as Building)}
                key={index}
              >
                <Card.Grid style={gridStyle}>
                  {/* <Button
                    type="text"
                    danger
                    style={{ position: "absolute", top: "10px", right: "5px" }}
                    onClick={(event) => {
                      event.stopPropagation();

                      deleteBuilding({
                        variables: {
                          buildingId: bld.id,
                        },
                      });
                    }}
                  >
                    <DeleteOutlined />
                  </Button> */}
                  <Meta
                    style={{ width: "100%" }}
                    avatar={
                      <PicCenterOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          setUpdateBld(bld as Building);
                          setShowReport(true);
                        }}
                      />
                    }
                    title={
                      <Title
                        type={
                          color as
                            | "danger"
                            | "secondary"
                            | "success"
                            | "warning"
                            | undefined
                        }
                        level={4}
                      >
                        {bld.name}
                      </Title>
                    }
                    description={
                      <Title type="secondary" level={5}>
                        {bld.status.status} - {bld.date}
                      </Title>
                    }
                  />
                </Card.Grid>
              </div>
            );
          }
          return;
        })}
      </Card>
      <div style={{ textAlign: "center", margin: "1rem" }}>
        <Pagination
          onChange={(page) => setLimit(8 * page)}
          defaultCurrent={1}
          total={Math.ceil(data?.buildings.length || 0 / 8) + 1}
          defaultPageSize={8}
        />
      </div>
      <Space align="center"></Space>
    </>
  );
};

export default BuildingComponent;
