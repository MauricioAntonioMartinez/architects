import { EditOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input, Space, Table } from "antd";
import React from "react";
import { Job, useGetJobsQuery } from "../../generated/graphql";
import AddJob from "./AddJob";
const { Column } = Table;

const PAGE_SIZE = 7;

export const Employee = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [updatedJob, setUpdatedJob] = React.useState<Job | null>(null);
  const searchRef = React.useRef<any>();
  const { data, loading, fetchMore } = useGetJobsQuery({
    variables: {
      limit: PAGE_SIZE,
      cursor: "",
    },
    notifyOnNetworkStatusChange: true,
  });

  const jobsLength = data?.getJobs.jobs.length;

  function onChange(pagination, filters, sorter, extra) {
    if (pagination.current === pagination.total && data?.getJobs.hasMore) {
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

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  return (
    <>
      {showModal && (
        <AddJob
          jobId={updatedJob?.id}
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
            setUpdatedJob(null);
            setShowModal(!showModal);
          }}
        >
          Agregar Trabajo
        </Button>

        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 300 }}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search
            ref={searchRef}
            size="large"
            placeholder="Busca  trabajos"
            enterButton
          />
        </AutoComplete>
      </div>

      <Table
        key="table"
        pagination={{
          pageSize: PAGE_SIZE,
          total: data?.getJobs.hasMore
            ? (jobsLength || 0 / PAGE_SIZE) + 1
            : jobsLength || 0 / PAGE_SIZE,
        }}
        dataSource={data?.getJobs.jobs}
        onChange={onChange}
        loading={loading}
      >
        <Column
          title="Nombre"
          dataIndex="employee"
          key="employee"
          render={(emp) => emp.name}
        />
        <Column title="Puesto" dataIndex="job" key="job" />
        <Column
          title="No. Seguro"
          dataIndex="employee"
          key="heal_plan"
          render={(em) => em.heal_plan}
        />
        <Column
          title="Obra"
          dataIndex="building"
          key="building"
          render={(bld) => bld.name}
        />
        <Column
          title="Actions"
          dataIndex=""
          key="edit"
          render={(jb) => (
            <Space size="middle">
              <Button
                onClick={() => {
                  console.log(jb.id);
                  setShowModal(true);
                  setUpdatedJob(jb);
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

export default Employee;
