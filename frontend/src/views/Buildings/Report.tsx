import {
  AppstoreOutlined,
  DollarOutlined,
  LoadingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Avatar, Typography, DatePicker, Form, Input, List, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import doubleToMoney from "../../util/doubleToMoney";
import { useReportLazyQuery } from "../../generated/graphql";
//const { Option } = Select;
const { Title } = Typography;
interface props {
  closeReport: Function;
  buildingId: string;
}

const Report: React.FC<props> = ({ closeReport, buildingId }) => {
  const [form] = useForm();
  const [fetch, { data, loading, error }] = useReportLazyQuery();

  const makeReport = async () => {
    const fields = form.getFieldsValue();
    const valid = await form.validateFields();
    console.log(valid);
    fetch({
      variables: {
        buildingId,
        endDate: fields?.end_date?._d,
        initialDate: fields?.start_date?._d,
      },
    });
  };
  if (error) console.log(error);

  return (
    <Modal
      title="Reporte"
      visible
      confirmLoading={false}
      onOk={makeReport}
      onCancel={() => closeReport()}
      okButtonProps={{
        "aria-label": "Consultar",
      }}
    >
      <Form form={form} name="reports" initialValues={{ remember: true }}>
        <Input.Group compact>
          <Form.Item
            style={{ width: "48%" }}
            name="start_date"
            rules={[
              { required: true, message: "Es necesario una fecha inicio" },
            ]}
          >
            <DatePicker placeholder="Fecha final" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="end_date"
            style={{ width: "48%", marginLeft: "1rem" }}
            rules={[
              {
                required: true,
                message: "Es necesario una fecha final",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("start_date") < value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Fecha final debe de ser mayor");
                },
              }),
            ]}
          >
            <DatePicker placeholder="Fecha final" style={{ width: "100%" }} />
          </Form.Item>
        </Input.Group>
      </Form>
      {!loading ? (
        <List itemLayout="horizontal">
          <List.Item>
            <List.Item.Meta
              avatar={<AppstoreOutlined />}
              title="Material"
              description={doubleToMoney(
                data?.generateReport?.material_total || 0.0
              )}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<ToolOutlined />}
              title="Mano de Obra"
              description={doubleToMoney(
                data?.generateReport?.work_force_total || 0.0
              )}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<DollarOutlined />}
              title="Total"
              description={doubleToMoney(
                data?.generateReport?.building_total || 0.0
              )}
            />
          </List.Item>
        </List>
      ) : (
        <div
          style={{
            height: "10rem",
            textAlign: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <LoadingOutlined style={{ margin: "auto" }} />
        </div>
      )}
    </Modal>
  );
};

export default Report;
