import React, { useState } from "react";
import { PulseLoader } from "react-spinners";

const Loading = () => {
  // Local state for loading and color
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#FC4747");

  // Style overrides for the spinner
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="text-center">
      <PulseLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
