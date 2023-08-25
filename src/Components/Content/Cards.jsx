import React from "react";
import MetricChart2 from "../Charts/ccbm2";
import MetricChart3 from "../Charts/ccbm3";

export default function Cards() {
  return (
    <>
      <MetricChart2 />
      <div className="h-4" />
      <MetricChart3 />
    </>
  );
}
