import React from "react";
import CustomButtonContainer from "./custom-button.styles";
const CustomButton = ({ children, ...props }) => {
  console.log("Las propiedades son : ");
  console.log(props);
  return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;
};

export default CustomButton;
