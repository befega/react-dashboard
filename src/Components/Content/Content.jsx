import Stats from "./Stats";
import ChartPie from "../Charts/cpld";
import DropChart from "../Charts/cdl";
import MetricChart from "../Charts/ccbm";
import MetricChart2 from "../Charts/ccbm2";
import ChartTabMetric from "../Charts/cdmtlb";

import { MembersTable } from "../DataTables/MemberTable";

export const Content = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
        {/* <Stats /> */}
        <div className="flex flex-col gap-3 m-4 md:flex-row lg:flex-row">
          <ChartPie />
          <ChartTabMetric />
        </div>
        <div className="flex flex-col gap-3 m-4 md:flex-row lg:flex-row">
          <DropChart />
          <MetricChart />
        </div>
        <MetricChart2 />

        {/* <MembersTable /> */}
      </div>
    </>
  );
};
