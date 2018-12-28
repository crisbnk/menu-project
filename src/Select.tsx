import React from "react";
import { IDish } from "./interfaces";

interface ISelectProps {
  name: string;
  title: string;
  list: IDish[];
  handleChange(event: React.SyntheticEvent): void;
  id: string;
}

const Select: React.FunctionComponent<ISelectProps> = (props: ISelectProps) => {
  return (
    <select
      className={`${props.name}-list`}
      name={`${props.name}-list`}
      id={props.id}
      onChange={props.handleChange}
    >
      <option value="">{props.title}</option>
      {props.list.map((el: IDish) => (
        <option key={el.id} value={el.name}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
