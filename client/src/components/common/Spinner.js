import React from "react";

import spinner from "./rounded_spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{ margin: "auto", display: "block" }}
      />
    </div>
  );
};
