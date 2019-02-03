import React from "react";

interface IMessageProps {
  message: string;
}

const divStyle = {
  color: "red"
};

const Message: React.FunctionComponent<IMessageProps> = (
  props: IMessageProps
) => {
  return (
    <React.Fragment>
      <p className="message-text" style={divStyle}>
        {props.message}
      </p>
    </React.Fragment>
  );
};

export default Message;
