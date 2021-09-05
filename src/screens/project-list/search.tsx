import React from "react";
import { Input, Select, Form } from "antd";

export interface IUser {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface ISearchPanelProps {
  users: IUser[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: ISearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: ISearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <Select
          value={param.personId}
          style={{ width: 120 }}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.name} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
