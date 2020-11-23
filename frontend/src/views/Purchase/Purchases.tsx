import { EditOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input, Space, Table } from "antd";
import React from "react";
import { Purchase, usePurchasesQuery } from "../../generated/graphql";
import AddEditPurchase from "./AddEditPurchase";
const { Column } = Table;

const PAGE_SIZE = 7;

export const Purchases = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [purchase, setPurchase] = React.useState<Purchase | null>(null);
  const searchRef = React.useRef<any>();
  const { data, loading, fetchMore } = usePurchasesQuery({
    variables: {
      limit: PAGE_SIZE,
      cursor: "",
    },
    notifyOnNetworkStatusChange: true,
  });

  const purchasesLength = data?.purchases.purchases.length;

  function onChange(pagination) {
    if (pagination.current === pagination.total && data?.purchases.hasMore) {
      fetchMore({
        variables: {
          limit: pagination.current * PAGE_SIZE,
          cursor: searchRef.current.state.value,
        },
      });
    }
  }

  const handleSearch = (value: string) => {
    const timeout = setTimeout(() => {
      if (searchRef.current.state.value === value) {
        fetchMore({
          variables: {
            limit: PAGE_SIZE,
            cursor: value,
          },
        });
      } else clearTimeout(timeout);
    }, 2000);
  };

  return (
    <>
      {showModal && (
        <AddEditPurchase
          purchaseId={purchase?.id}
          showModal
          setShowModal={() => setShowModal(!setShowModal)}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      >
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setPurchase(null);
            setShowModal(!showModal);
          }}
        >
          Agregar Compra
        </Button>

        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 300 }}
          onSearch={handleSearch}
        >
          <Input.Search
            ref={searchRef}
            size="large"
            placeholder="Mis materiales ..."
            enterButton
          />
        </AutoComplete>
      </div>

      <Table
        key="table"
        pagination={{
          pageSize: PAGE_SIZE,
          total: data?.purchases.hasMore
            ? (purchasesLength || 0 / PAGE_SIZE) + 1
            : purchasesLength || 0 / PAGE_SIZE,
        }}
        dataSource={data?.purchases.purchases}
        onChange={onChange}
        loading={loading}
      >
        <Column title="No. Nota" dataIndex="note_number" key="note_number" />
        <Column
          title="Proveedor"
          dataIndex="material"
          key="provider"
          render={(m) => m?.provider?.name}
        />
        <Column
          title="Fecha de Compra"
          dataIndex="purchase_date"
          key="purchase_date"
          render={(date) => new Date(date).toLocaleDateString()}
        />
        <Column
          title="Obra"
          dataIndex="building"
          key="building"
          render={(bld) => bld.name}
        />
        <Column
          title="Etapa de la obra"
          dataIndex="building_status"
          key="building"
          render={(bld) => bld.status}
        />
        <Column
          title="Actions"
          dataIndex=""
          key="edit"
          render={(pr) => (
            <Space size="middle">
              <Button
                onClick={() => {
                  console.log(pr.id);
                  setShowModal(true);
                  setPurchase(pr);
                }}
                type="primary"
                icon={<EditOutlined />}
                size="middle"
              />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Purchases;
