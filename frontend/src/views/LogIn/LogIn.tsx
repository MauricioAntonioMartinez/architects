import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { useLoginUserMutation } from "../../generated/graphql";
import { useRootStore } from "../../store/index";
import { convertErrorsResponse } from "../../util/errors-form";
interface Props {}

export const LogIn: React.FC = observer((props: Props) => {
  const [logInMutation, { loading }] = useLoginUserMutation();
  const { authStore } = useRootStore();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const res = await logInMutation({
        variables: { email: values.email, password: values.password },
      });
      console.log(res);
      if (res.data?.loginUser.errors) {
        message.error("Algo salió mal");
        const errors = res.data?.loginUser.errors;
        form.setFields(convertErrorsResponse(errors));
      }
      if (res.data?.loginUser?.credentials) {
        const { token, expiresIn, role } = res.data.loginUser.credentials;
        authStore.setCredentials(token, expiresIn, role as any);
      }
    } catch (e) {
      message.error("Algo salió mal");
      console.log(e);
    }
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
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
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
});
