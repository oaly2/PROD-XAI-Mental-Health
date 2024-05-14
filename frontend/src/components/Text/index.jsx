import React from "react";

const sizes = {
  xs: "text-[32px] font-normal md:text-3xl sm:text-[28px]",
  s: "text-5xl font-normal md:text-[44px] sm:text-[38px]",
  m: "text-6xl font-normal md:text-[56px] sm:text-[50px]",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-gray-900_01 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
