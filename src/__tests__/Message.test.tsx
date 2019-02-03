import React from "react";
import { create } from "react-test-renderer";
import Message from "../Message";

describe("Message component", () => {
  test("As a user I can see message", () => {
    const message = "Failed to fetch";
    const component = create(<Message message={message} />);
    const rootInstance = component.root;
    const messageText = rootInstance.findByProps({ className: "message-text" });
    expect(messageText.props.children).toBe("Failed to fetch");
  });
});
