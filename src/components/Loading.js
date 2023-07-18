import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="loadingDiv">
      <ScaleLoader color="#2874f0" height={70} width={5} />
    </div>
  );
}
