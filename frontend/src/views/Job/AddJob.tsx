import {
  CalendarFilled,
  HomeOutlined,
  IdcardOutlined,
  MoneyCollectOutlined,
  PhoneOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import {
  AddJobMutationVariables,
  GetJobsDocument,
  GetJobsQuery,
  Job,
  useAddJobMutation,
  useBuildingsQuery,
  useEditJobMutation,
  useJobLazyQuery,
} from "../../generated/graphql";
import { convertErrorsResponse } from "../../util/errors-form";
const { Option } = Select;
const { TextArea } = Input;
interface props {
  showModal: boolean;
  setShowModal: Function;
  jobId: string | undefined;
}

const AddJob: React.FC<props> = ({ showModal, setShowModal, jobId }) => {
  const { data: buildings } = useBuildingsQuery();
  const [addJob, { loading }] = useAddJobMutation();
  const [updatedJob, { loading: loadingEdit }] = useEditJobMutation();
  const [fetchJob, { data, loading: loadingJob }] = useJobLazyQuery();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (jobId) {
      fetchJob({
        variables: {
          id: jobId,
        },
      });
    }
    if (data) {
      form.setFields([
        {
          name: "INE",
          value: data.getJob?.employee.INE,
        },
        {
          name: "name",
          value: data.getJob?.employee.name,
        },
        {
          name: "phone",
          value: data.getJob?.employee.phone,
        },
        {
          name: "heal_plan",
          value: data.getJob?.employee.heal_plan,
        },
        {
          name: "address",
          value: data.getJob?.employee.address,
        },
        {
          name: "salary",
          value: data.getJob?.salary,
        },
        {
          name: "isActive",
          value: data.getJob?.isActive,
        },
        {
          name: "nomina",
          value: data.getJob?.nomina,
        },
        {
          name: "job",
          value: data.getJob?.job,
        },
        {
          name: "observations",
          value: data.getJob?.observations,
        },
      ]);
    }
    return () => form.resetFields();
  }, [jobId, data, form, fetchJob]);

  const submit = async (e) => {
    const fields = form.getFieldsValue() as AddJobMutationVariables;
    console.log(form.getFieldsValue());
    try {
      if (!jobId) {
        const res = await addJob({
          variables: {
            ...fields,
            salary: +fields.salary,
          },
          update: (cache, { data }) => {
            if (!data?.addJob.errors) {
              const jobs = cache.readQuery<GetJobsQuery>({
                query: GetJobsDocument,
              });
              cache.writeQuery<GetJobsQuery>({
                query: GetJobsDocument,
                data: {
                  getJobs: {
                    hasMore: jobs!.getJobs.hasMore,
                    jobs: [
                      { ...data!.addJob.job } as Job,
                      ...jobs!.getJobs.jobs,
                    ],
                  },
                },
              });
            }
          },
        });

        if (res.data?.addJob.errors) {
          message.error("Ocurrió un problema al agregar el empleado");
          const errors = res.data?.addJob.errors;
          return form.setFields(convertErrorsResponse(errors));
        }
      } else if (data?.getJob?.building.id) {
        const res = await updatedJob({
          variables: {
            ...fields,
            buildingId: data.getJob.building.id,
            salary: +fields.salary,
            employeeId: data.getJob.employee.id,
            jobId: data.getJob.id,
          },
        });
        if (res.data?.editJob.errors) {
          message.error("Ocurrió un problema al actualizar el empleado");
          const errors = res.data?.editJob.errors;
          return form.setFields(convertErrorsResponse(errors));
        }
      } else throw new Error("Something went wrong");

      message.success("Operación exitosa.");
      form.resetFields();
      setShowModal();
    } catch (e) {
      console.log(e);
      message.error("Algo salió mal");
    }
  };

  return (
    <Modal
      title="Agregar Trabajo"
      visible={showModal}
      confirmLoading={loading || loadingEdit || loadingEdit || loadingJob}
      onOk={submit}
      onCancel={() => setShowModal()}
    >
      <Form form={form} name="add_job" initialValues={{ remember: true }}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Ingresa tu nombre" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Nombre Completo"
          />
        </Form.Item>
        <Input.Group compact>
          <Form.Item
            name="phone"
            style={{ width: "48%" }}
            rules={[
              { required: true, message: "Ingresa tu numero telefónico" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Teléfono"
              type="number"
            />
          </Form.Item>

          <Form.Item
            style={{ marginLeft: "1rem", width: "48%" }}
            name="heal_plan"
            rules={[{ required: true, message: "Ingresa tu numero de seguro" }]}
          >
            <Input
              prefix={<SafetyOutlined className="site-form-item-icon" />}
              placeholder="Seguro"
            />
          </Form.Item>
        </Input.Group>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Ingresa una dirección" }]}
        >
          <Input
            prefix={<HomeOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Dirección"
          />
        </Form.Item>
        <Form.Item
          name="INE"
          rules={[{ required: true, message: "Ingresa una dirección" }]}
        >
          <Input
            prefix={<IdcardOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="INE"
          />
        </Form.Item>
        <Form.Item
          name="nomina"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Input
            prefix={<CalendarFilled className="site-form-item-icon" />}
            placeholder="Ingresa la nomina"
            type="text"
          />
        </Form.Item>

        <Input.Group compact>
          <Form.Item
            name="salary"
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ width: "38%" }}
          >
            <Input
              prefix={<MoneyCollectOutlined className="site-form-item-icon" />}
              placeholder="Ingresa el salario"
              type="number"
            />
          </Form.Item>

          <Form.Item
            name="job"
            style={{ width: "38%", marginLeft: "0.5rem" }}
            rules={[
              { required: true, message: "Es necesario seleccionar una obra" },
            ]}
          >
            <Select
              placeholder="Selecciona el puesto"
              style={{ width: "100%" }}
            >
              <Option value="job1">job1</Option>
              <Option value="job2">job2</Option>
              <Option value="job3">job3</Option>
              <Option value="job4">job4</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="isActive"
            valuePropName="checked"
            style={{ width: "18%", marginLeft: "0.5rem" }}
          >
            <Checkbox>Activo</Checkbox>
          </Form.Item>
        </Input.Group>
        {!jobId && (
          <Form.Item
            name="buildingId"
            rules={[
              { required: true, message: "Es necesario seleccionar una obra" },
            ]}
          >
            <Select placeholder="Selecciona una obra" style={{ width: "100%" }}>
              {buildings?.buildings.map((bld) => {
                return (
                  <Option key={bld.id} value={bld.id}>
                    {bld.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}

        <Form.Item name="observations">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddJob;
