import { ProjectOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Input, Form, AutoComplete } from "antd";

import React from "react";
import {
  useMaterialSearchLazyQuery,
  useProviderSearchLazyQuery,
} from "../../generated/graphql";

interface Props {}

export const SearchFields = (props: Props) => {
  const [fetchMaterials, { data: materials }] = useMaterialSearchLazyQuery();
  const [fetchProviders, { data: providers }] = useProviderSearchLazyQuery();
  console.log(materials?.materialSearch);
  const searchHandler = (field: string, isMaterial = true) => {
    if (isMaterial) {
      fetchMaterials({ variables: { material: field } });
    } else fetchProviders({ variables: { provider: field } });
  };

  return (
    <>
      <Form.Item
        name="material"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <AutoComplete
          key="12"
          options={(materials?.materialSearch as { value: string }[]) || []}
          onSearch={searchHandler}
          placeholder="Nombre del producto / Concepto"
        />
        {/* <Input
            prefix={<ProjectOutlined className="site-form-item-icon" />}
            placeholder="Nombre del producto / Concepto"
            type="text"
          /> */}
      </Form.Item>

      <Form.Item
        name="provider"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <AutoComplete
          options={(providers?.providerSearch as { value: string }[]) || []}
          onSearch={(vla) => searchHandler(vla, false)}
          placeholder="Proveedor"
        />
        {/* <Input
            prefix={<UserSwitchOutlined className="site-form-item-icon" />}
            placeholder="Proveedor"
            type="text"
          /> */}
      </Form.Item>
    </>
  );
};
