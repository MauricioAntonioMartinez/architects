import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useCreateUserMutation } from "../../generated/graphql";
import { convertErrorsResponse } from "../../util/errors-form";

export const CreateAdmin: React.FC<{}> = () => {
  const [createUserMutation, { loading }] = useCreateUserMutation();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const response = await createUserMutation({
      variables: { email: values.email, password: values.password },
    });
    if (response.data?.createUser.errors) {
      message.error("Ocurrió un error");
      form.setFields(convertErrorsResponse(response.data?.createUser.errors));
    } else {
      form.resetFields();
      message.success("Agregado exitosamente");
    }
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ width: "500px", margin: "auto" }}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Ingresa un correo electrónico" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Ingresa una contraseña" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item
        name="passwordConfirm"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Las contraseñas deben de coincidir.");
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirma la contraseña"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          disabled={loading}
        >
          Agregar Administrador
        </Button>
      </Form.Item>
    </Form>
  );
};
