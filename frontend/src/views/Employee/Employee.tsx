// import {
//   HomeOutlined,
//   PhoneOutlined,
//   SafetyOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Button, Form, Input, message } from "antd";
// import React from "react";
// //import { useAddEmployeeMutation } from "../../generated/graphql";
// import { convertErrorsResponse } from "../../util/errors-form";

// const Employee: React.FC = () => {
//   //const [addEmployee, { loading, data }] = useAddEmployeeMutation();

//   const [form] = Form.useForm();
//   const onFinish = async (values) => {
//     try {
//       const res = await addEmployee({
//         variables: {
//           INE: values.INE,
//           address: values.address,
//           heal_plan: values.heal_plan,
//           name: values.name,
//           phone: values.phone,
//         },
//       });
//       console.log(res);
//       if (res.data?.addEmployee.errors) {
//         message.error("No se pudo agregar al empleado.");
//         const errors = res.data?.addEmployee.errors;
//         form.setFields(convertErrorsResponse(errors));
//       } else {
//         message.success("Empleado Agregado Exitosamente.");
//         form.resetFields();
//       }
//     } catch (e) {
//       message.error("Algo salió mal");
//       console.log(e);
//     }
//   };
//   console.log(data);

//   return (
//     <Form
//       form={form}
//       name="normal_login"
//       className="login-form"
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//       style={{ width: "500px", margin: "auto" }}
//     >
//       <Form.Item
//         name="name"
//         rules={[{ required: true, message: "Ingresa tu nombre" }]}
//       >
//         <Input
//           prefix={<UserOutlined className="site-form-item-icon" />}
//           placeholder="Nombre Completo"
//         />
//       </Form.Item>
//       <Form.Item
//         name="phone"
//         rules={[{ required: true, message: "Ingresa tu numero telefónico" }]}
//       >
//         <Input
//           prefix={<PhoneOutlined className="site-form-item-icon" />}
//           placeholder="Teléfono"
//           type="number"
//         />
//       </Form.Item>
//       <Form.Item
//         name="heal_plan"
//         rules={[{ required: true, message: "Ingresa tu numero de seguro" }]}
//       >
//         <Input
//           prefix={<SafetyOutlined className="site-form-item-icon" />}
//           placeholder="Seguro"
//         />
//       </Form.Item>
//       <Form.Item
//         name="address"
//         rules={[{ required: true, message: "Ingresa una dirección" }]}
//       >
//         <Input
//           prefix={<HomeOutlined className="site-form-item-icon" />}
//           type="text"
//           placeholder="Dirección"
//         />
//       </Form.Item>
//       <Form.Item
//         name="INE"
//         rules={[{ required: true, message: "Ingresa una dirección" }]}
//       >
//         <Input
//           prefix={<HomeOutlined className="site-form-item-icon" />}
//           type="text"
//           placeholder="INE"
//         />
//       </Form.Item>

//       <Form.Item>
//         <Button
//           type="primary"
//           htmlType="submit"
//           className="login-form-button"
//           block
//           disabled={loading}
//         >
//           Agregar Empleado
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

export default {};
