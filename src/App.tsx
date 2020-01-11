import React, { useRef } from "react";
import { Table, ConfigProvider } from "antd";
import { TableProps } from "antd/lib/table/Table";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, HttpLink, gql as gqlo } from "apollo-boost";
import fetch from "node-fetch";
import gql from "graphql-tag.macro";

const q = gqlo`
  query {
    dataSource {
      name
      age
      id
      gender
    }
  }
`;
console.log(q);
console.log(
  q ===
    gqlo`
      query {
        dataSource {
          name
          age
          id
          gender
        }
      }
    `
);

const App: React.FC = () => {
  console.log('app render');
  
  const config = useRef({
    query: gql`
      query {
        dataSource {
          name
          age
          id
          gender
        }
      }
    `
  });
  const { data, loading } = useQuery(config.current.query);
  const cfg: TableProps<any> = {
    columns: [
      { dataIndex: "name", title: "姓名", width: 2000 },
      { dataIndex: "age", title: "年龄" },
      { dataIndex: "gender", title: "性别", fixed: "right", width: 200 }
    ],
    tableLayout: "auto",
    bordered: true,
    scroll: { x: true },
    size: "middle",
    rowKey: "id"
  };
  return (
    <Table loading={loading} {...cfg} dataSource={data && data.dataSource} />
  );
};

export default () => {
  return (
    <ApolloProvider
      client={
        new ApolloClient({
          ssrMode: true,
          ssrForceFetchDelay: 100,
          cache: new InMemoryCache(),
          link: new HttpLink({
            uri: "http://localhost:3030/graphql",
            fetch: fetch as any
          })
        })
      }
    >
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  );
};
