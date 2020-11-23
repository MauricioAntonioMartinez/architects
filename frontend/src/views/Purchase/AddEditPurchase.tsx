import {
  DiffOutlined,
  DollarOutlined,
  ProjectOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, Input, message, Modal, Select } from "antd";
import moment from "moment";
import React from "react";
import {
  Purchase,
  PurchasesDocument,
  PurchasesQuery,
  useAddEditPurchaseMutation,
  useBuildingsQuery,
  useKindsQuery,
  usePurchaseLazyQuery,
} from "../../generated/graphql";
import { convertErrorsResponse } from "../../util/errors-form";
import dataToForm from "./fetchedValues";
import { SearchFields } from "./SearchFields";
const { Option } = Select;
const { TextArea } = Input;
interface props {
  showModal: boolean;
  setShowModal: Function;
  purchaseId?: string;
}

const AddEditPurchase: React.FC<props> = ({
  showModal,
  setShowModal,
  purchaseId,
}) => {
  const { data: buildings } = useBuildingsQuery();
  const { data: kinds } = useKindsQuery();
  const [addEditPurchase, { loading }] = useAddEditPurchaseMutation();

  const [
    fetchPurchase,
    { data, loading: loadingPurchase },
  ] = usePurchaseLazyQuery();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (purchaseId) {
      fetchPurchase({
        variables: {
          purchaseId,
        },
      });
    }
    if (data) {
      form.setFields(dataToForm(data));
    }
    return () => form.resetFields();
  }, [purchaseId, data, fetchPurchase, form]);

  const submit = async () => {
    const fields = form.getFieldsValue();

    try {
      const res = await addEditPurchase({
        variables: {
          ...fields,
          cost: +fields.cost,
          id: purchaseId ? purchaseId : null,
          isEditMode: !!purchaseId,
        },
        update: (cache, { data }) => {
          if (!data?.addEditPurchase.errors && !purchaseId) {
            const {
              purchases: { hasMore, purchases },
            } = cache.readQuery<PurchasesQuery>({
              query: PurchasesDocument,
            }) as PurchasesQuery;
            cache.writeQuery<PurchasesQuery>({
              query: PurchasesDocument,
              data: {
                purchases: {
                  hasMore,
                  purchases: [
                    data?.addEditPurchase.purchase as Purchase,
                    ...purchases,
                  ],
                },
              },
            });
          }
        },
      });
      if (res.data?.addEditPurchase.errors) {
        message.error("Ocurrió un problema al agregar el empleado");
        const errors = res.data?.addEditPurchase.errors;
        return form.setFields(convertErrorsResponse(errors));
      }

      message.success("Operación exitosa.");
      form.resetFields();
      setShowModal();
    } catch (e) {
      message.error("Algo salió mal");
      console.log(e);
    }
  };

  return (
    <Modal
      title="Comprar Material"
      visible={showModal}
      confirmLoading={loading || loadingPurchase}
      onOk={submit}
      onCancel={() => setShowModal()}
    >
      <Form form={form} name="add_job" initialValues={{ remember: true }}>
        <Input.Group compact>
          <Form.Item
            name="note_number"
            style={{ width: "48%" }}
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input
              prefix={<DiffOutlined className="site-form-item-icon" />}
              placeholder="No. Nota"
              type="text"
            />
          </Form.Item>

          <Form.Item
            name="purchaseKindId"
            style={{ marginLeft: "1rem", width: "48%" }}
            rules={[{ required: true, message: "Seleccione el tipo" }]}
          >
            <Select placeholder="Tipo de pedido">
              {kinds?.kinds.purchase_kind.map((k) => {
                return (
                  <Option key={k.id} value={+k.id}>
                    {k.kind}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Input.Group>
        <SearchFields />

        {/* <Form.Item
          name="material"
          rules={[{ required: true, message: "Este campo es requerido" }]}
        >
          <Input
            prefix={<ProjectOutlined className="site-form-item-icon" />}
            placeholder="Nombre del producto / Concepto"
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="provider"
          rules={[{ required: true, message: "Este campo es requerido" }]}
        >
          <Input
            prefix={<UserSwitchOutlined className="site-form-item-icon" />}
            placeholder="Proveedor"
            type="text"
          />
        </Form.Item> */}

        <Input.Group compact>
          <Form.Item
            style={{ width: "48%" }}
            name="cost"
            rules={[{ required: true, message: "Ingresa número valido" }]}
          >
            <Input
              prefix={<DollarOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="Costo ($)"
            />
          </Form.Item>

          <Form.Item
            name="purchase_date"
            style={{ marginLeft: "1rem", width: "48%" }}
            rules={[{ required: true, message: "Fecha requerida" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Fecha de compra"
              size="middle"
            />
          </Form.Item>
        </Input.Group>

        <Input.Group compact>
          <Form.Item
            name="statusPurchaseId"
            rules={[{ required: true, message: "Seleccione el estatus" }]}
            style={{ width: "48%" }}
          >
            <Select placeholder="Estatus del Pago">
              {kinds?.kinds.status_payment.map((py) => {
                return (
                  <Option key={py.id} value={+py.id}>
                    {py.status}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="paymentModeId"
            rules={[{ required: true, message: "Ingresa el modo de pago" }]}
            style={{ marginLeft: "1rem", width: "48%" }}
          >
            <Select placeholder="Modo de pago">
              {kinds?.kinds.payment_mode.map((mode) => {
                return (
                  <Option key={mode.id} value={+mode.id}>
                    {mode.payment}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Input.Group>

        <Input.Group compact>
          <Form.Item
            name="buildingId"
            rules={[
              { required: true, message: "Es necesario seleccionar una obra" },
            ]}
            style={{ width: "48%" }}
          >
            <Select placeholder="Obra" style={{ width: "100%" }}>
              {buildings?.buildings.map((bld) => {
                return (
                  <Option key={bld.id} value={bld.id}>
                    {bld.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="buildingStatusId"
            rules={[{ required: true, message: "Ingresa tu numero de seguro" }]}
            style={{ marginLeft: "1rem", width: "48%" }}
          >
            <Select placeholder="Status de la obra">
              {kinds?.kinds.building_status.map((st) => {
                return (
                  <Option key={st.id} value={+st.id}>
                    {st.status}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Input.Group>

        <Form.Item name="observations">
          <TextArea rows={4} placeholder="Observaciones ..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditPurchase;
