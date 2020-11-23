import { CalendarFilled } from "@ant-design/icons";
import { DatePicker, Form, Input, message, Modal, Select } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import {
  Building,
  BuildingsDocument,
  BuildingsQuery,
  useAddBuildingMutation,
  useUpdateBuildingMutation,
} from "../../generated/graphql";
import { convertErrorsResponse } from "../../util/errors-form";
const { Option } = Select;
interface props {
  showModal: boolean;
  building?: Building | null;
  setShowModal: Function;
}

const AddBuilding: React.FC<props> = ({
  showModal,
  setShowModal,
  building,
}) => {
  const [addBuilding, { loading }] = useAddBuildingMutation();
  const [updateBuilding] = useUpdateBuildingMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (building)
      form.setFields([
        { name: "name", value: building.name },
        { name: "date", value: moment(building.date) },
        { name: "status", value: building.status.status },
      ]);
    return () => form.resetFields();
  }, [building, form]);

  const submit = async () => {
    const { name, date, status } = form.getFieldsValue();

    try {
      const newBuilding = {
        date: date._d,
        name,
        status,
      };
      if (!building) {
        const res = await addBuilding({
          variables: {
            ...newBuilding,
          },
          update(cache, { data }) {
            if (!data?.addBuilding.errors) {
              const newBuilding = {
                ...data?.addBuilding.building,
                date: new Date(data!.addBuilding.building!.date).toDateString(),
              };
              cache.modify({
                fields: {
                  buildings(bld = []) {
                    cache.writeQuery<BuildingsQuery>({
                      query: BuildingsDocument,
                      data: {
                        buildings: [newBuilding, ...bld],
                      },
                    });
                    return [newBuilding, ...bld];
                  },
                },
              });
            }
          },
        });
        if (res.data?.addBuilding.errors) {
          message.error("Ocurrió un problema al agregar la obra.");
          const errors = res.data?.addBuilding.errors;
          return form.setFields(convertErrorsResponse(errors));
        }
      } else {
        const res = await updateBuilding({
          variables: {
            ...newBuilding,
            id: building.id,
          },
          update(cache, { data }) {
            if (!data?.updateBuilding.errors) {
              const newBuilding = {
                ...data?.updateBuilding.building,
                date: new Date(
                  data!.updateBuilding.building!.date
                ).toDateString(),
              };
              cache.modify({
                fields: {
                  buildings(bld = []) {
                    cache.writeQuery<BuildingsQuery>({
                      query: BuildingsDocument,
                      data: {
                        buildings: bld.map((bld) => {
                          if (bld.id === data!.updateBuilding.building!.id)
                            return newBuilding;
                          return bld;
                        }),
                      },
                    });
                    return bld.map((bld) => {
                      if (bld.id === data!.updateBuilding.building!.id)
                        return newBuilding;
                      return bld;
                    });
                  },
                },
              });
            }
          },
        });
        if (res.data?.updateBuilding.errors) {
          message.error("Ocurrió un problema al actualizar la obra.");
          const errors = res.data?.updateBuilding.errors;
          return form.setFields(convertErrorsResponse(errors));
        }
      }

      message.success("Operación Exitosa");
      form.resetFields();
      setShowModal();
    } catch (e) {
      message.error("Algo salió mal");
      console.log(e);
    }
  };

  return (
    <Modal
      title="Agregar Obra"
      visible={showModal}
      confirmLoading={loading}
      onOk={submit}
      onCancel={() => setShowModal()}
    >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Nombre de la obra requerido" }]}
        >
          <Input
            prefix={<CalendarFilled className="site-form-item-icon" />}
            placeholder="Ingresa el nombre del obra"
          />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Fecha requerida" }]}
        >
          <DatePicker size="middle" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="status"
          rules={[{ required: true, message: "Ingresa tu numero de seguro" }]}
        >
          <Select
            placeholder="Selecciona el status de la obra"
            style={{ width: "100%" }}
          >
            <Option value="Preliminar">Preliminar</Option>
            <Option value="Cimentación">Cimentación</Option>
            <Option value="Estructura de concreto">
              Estructura de concreto
            </Option>
            <Option value="Terminado">Terminado</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBuilding;
