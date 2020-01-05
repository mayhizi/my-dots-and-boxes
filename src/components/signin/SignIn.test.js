import React from "react";
import { shallow, mount } from "enzyme";
import SignIn from "./SignIn.component";

// test("renders learn react link", () => {
//   const wrapper = render(<SignIn />);
//   expect(wrapper).toMatchSnapshot();
// });
describe("<SignIn />", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
  });
  it("it should contain an input", () => {
    const wrapper = shallow(<SignIn />);
    // const instance = wrapper.getInstance()
    // expect(getByTestId(wrapper.container, "input")).toContain("input")
    expect(wrapper.find("input")).toHaveLength(1);
  });
  it("it should contain a button", () => {
    const wrapper = shallow(<SignIn />);
    // const instance = wrapper.getInstance()
    // expect(getByTestId(wrapper.container, "input")).toContain("input")
    console.log(wrapper.find("button"));
    expect(wrapper.find("button")).toHaveLength(1);
  });
  it("it should show an error text when button clicked and input is empty", () => {
    const wrapper = mount(<SignIn />);
    console.log("text", wrapper.text());
    wrapper.find("input").simulate("change", { target: { value: "" } });

    wrapper.find("button").simulate("click");
    console.log("text", wrapper.text());

    expect(wrapper.text()).toContain("not empty");
  });
});
