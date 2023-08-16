import MetricCard from "./MetricCard";
import { Icon } from "@iconify/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const stats = [
  {
    name: "High Severity",
    stat: "5",
    change: "12",
    changeType: "decrease",
  },
  {
    name: "Medium Severity",
    stat: "10",
    change: "13",
    changeType: "decrease",
  },
  {
    name: "Low Severity",
    stat: "6",
    change: "2",
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function index() {
  return (
    <div className="flex flex-row gap-6 border-2 rounded-md p-4">
      <div>
        <span className="flex flex-row justify-start items-center gap-1 font-inter font-semibold text-xl text-gray-800">
          Highest-risk Score Factors
          <Icon icon="carbon:information" color="#cfcfcf" />
        </span>
        <div className="w-fit divide-y-2 divide-solid divide-opacity-60">
          <div className="flex flex-col mt-4 gap-2 md:gap-0 lg:gap-0 md:flex-row lg:flex-row">
            <MetricCard
              title="Application Security"
              score="5"
              scoreLetter="F"
              rateNumber="0"
            />
            <MetricCard
              title="Network Security"
              score="29"
              scoreLetter="F"
              rateNumber="1"
            />
          </div>
          <div className="flex flex-col mt-4 gap-2 md:gap-0 lg:gap-0 md:flex-row lg:flex-row">
            <MetricCard
              title="DNS Health"
              score="90"
              scoreLetter="A"
              rateNumber="0"
            />
            <MetricCard
              title="Endpoint Security"
              score="90"
              scoreLetter="A"
              rateNumber="0"
            />
          </div>
        </div>
      </div>
      <div className="font-inter">
        <div className="flex flex-row justify-between">
          <span className="flex flex-row justify-start items-center gap-1 font-semibold text-xl text-gray-800">
            Issues by severity
            <Icon icon="carbon:information" color="#cfcfcf" />
          </span>
          <span className="text-md font-semibold text-[#735DCA]">
            View all issues
          </span>
        </div>

        <div className="w-fit divide-y-2 divide-solid divide-opacity-60">
          <div>
            <dl className="mt-5 grid grid-cols-1 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
              {stats.map((item) => (
                <div key={item.name} className="px-1 py-2 sm:p-6">
                  <dt className="text-base font-normal text-gray-900">
                    {item.name}
                  </dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl mr-2 font-semibold text-indigo-600">
                      {item.stat}
                    </div>
                    <div
                      className={classNames(
                        item.changeType === "increase"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800",
                        "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                      )}
                    >
                      {item.changeType === "increase" ? (
                        <ArrowUpIcon
                          className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                          aria-hidden="true"
                        />
                      )}

                      <span className="sr-only">
                        {" "}
                        {item.changeType === "increase"
                          ? "Increased"
                          : "Decreased"}{" "}
                        by{" "}
                      </span>
                      {item.change}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-row p-3 md:p-3 lg:p-3 w-full h-full min-h-[135px] bg-[#f4f0ff] tracking-tighter">
              <div className="flex flex-row w-16 justify-center align-middle text-center pt-1">
                <Icon icon="ion:list-circle-sharp" color="#735DCA" width="40" />
              </div>
              <div className="flex flex-col gap-1 antialiased mt-1">
                <span className="text-lg font-semibold ">
                  Improve your score by 11.9 points
                </span>
                <p className="text-sm font-light text-gray-900">
                  Resolve 5 issues with the biggest score impact
                </p>
                <span className="text-lg font-semibold text-[#735DCA]">
                  See most impacting issues
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
