import React from "react";
import { IUser } from "./search";

interface IProject {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface IList {
  list: IProject[];
  users: IUser[];
}

export const List = ({ list, users }: IList) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/*<td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>*/}
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};