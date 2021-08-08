import React from "react";
import { Input, Select } from "antd";

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
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          {users.map((user) => (
            <Select.Option key={user.name} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
