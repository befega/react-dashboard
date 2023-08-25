import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    name: "Total Subscribers",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: EnvelopeOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Click Rate",
    stat: "24.57%",
    icon: CursorArrowRaysIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

const clients = [
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 2,
    name: "SavvyCal",
    imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
    lastInvoice: {
      date: "January 22, 2023",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "Reform",
    imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const HomePage = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
        {/* Stats #1 */}
        <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                  <p
                    className={classNames(
                      item.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600",
                      "ml-2 flex items-baseline text-sm font-semibold"
                    )}
                  >
                    {item.changeType === "increase" ? (
                      <ArrowUpIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowDownIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-red-500"
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
                  </p>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View all
                        <span className="sr-only"> {item.name} stats</span>
                      </a>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {/* Recent Client */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
            >
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <img
                      src={client.imageUrl}
                      alt={client.name}
                      className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                    />
                    <div className="text-sm font-medium leading-6 text-gray-900">
                      {client.name}
                    </div>
                    <Menu as="div" className="relative ml-auto">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                View
                                <span className="sr-only">, {client.name}</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                Edit
                                <span className="sr-only">, {client.name}</span>
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">Last invoice</dt>
                      <dd className="text-gray-700">
                        <time dateTime={client.lastInvoice.dateTime}>
                          {client.lastInvoice.date}
                        </time>
                      </dd>
                    </div>
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">Amount</dt>
                      <dd className="flex items-start gap-x-2">
                        <div className="font-medium text-gray-900">
                          {client.lastInvoice.amount}
                        </div>
                        <div
                          className={classNames(
                            statuses[client.lastInvoice.status],
                            "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                          )}
                        >
                          {client.lastInvoice.status}
                        </div>
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="w-96 h-96 p-6 bg-white rounded-xl shadow flex-col justify-start items-center gap-8 inline-flex">
            <div className="self-stretch h-96 flex-col justify-start items-start gap-5 flex">
              <div className="w-96 h-64 px-11 py-8 rounded-lg justify-center items-center inline-flex">
                <div className="w-80 h-48 relative bg-gradient-to-br from-white to-white rounded-2xl shadow border border-white backdrop-blur-md flex-col justify-start items-start flex">
                  <div className="text-white text-base font-semibold">
                    Untitled.
                  </div>
                  <div className="w-5 h-6 relative" />
                  <div className="text-white text-xs font-semibold uppercase tracking-wide">
                    OLIVIA RHYE
                  </div>
                  <div className="text-right text-white text-xs font-semibold tracking-wide">
                    06/24
                  </div>
                  <div className="w-11 h-8 px-2 pt-1.5 pb-2 bg-white bg-opacity-10 rounded justify-center items-center inline-flex">
                    <div className="w-7 h-4 relative">
                      <img
                        className="w-7 h-4 left-0 top-0 absolute opacity-50"
                        src="https://via.placeholder.com/30x18"
                      />
                      <img
                        className="w-3.5 h-4 left-[14.91px] top-0 absolute opacity-50"
                        src="https://via.placeholder.com/15x18"
                      />
                      <img
                        className="w-1.5 h-3.5 left-[11.73px] top-[2.13px] absolute"
                        src="https://via.placeholder.com/6x14"
                      />
                    </div>
                  </div>
                  <div className="text-white text-base font-semibold tracking-widest">
                    1234 1234 1234 1234
                  </div>
                </div>
              </div>
              <div className="self-stretch h-14 flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch text-gray-900 text-lg font-medium leading-7">
                  Update payment method
                </div>
                <div className="self-stretch text-gray-500 text-sm font-normal leading-tight">
                  Update your card details.
                </div>
              </div>
              <div className="self-stretch h-40 flex-col justify-start items-end gap-4 flex">
                <div className="self-stretch justify-start items-start gap-4 inline-flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="self-stretch h-16 flex-col justify-start items-start gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium leading-tight">
                        Name on card
                      </div>
                      <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                        <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                          <div className="grow shrink basis-0 text-gray-900 text-base font-normal leading-normal">
                            Olivia Rhye
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-28 flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="self-stretch h-16 flex-col justify-start items-start gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium leading-tight">
                        Expiry
                      </div>
                      <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                        <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                          <div className="grow shrink basis-0">
                            <span className="text-gray-900 text-base font-normal leading-normal">
                              06
                            </span>
                            <span className="text-gray-300 text-base font-normal leading-normal">
                              {" "}
                              /{" "}
                            </span>
                            <span className="text-gray-900 text-base font-normal leading-normal">
                              2024
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-4 inline-flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="self-stretch h-16 flex-col justify-start items-start gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium leading-tight">
                        Card number
                      </div>
                      <div className="self-stretch pl-2.5 pr-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                        <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                          <div className="w-8 h-6 px-1.5 py-1.5 bg-white rounded border border-gray-100 justify-center items-center flex">
                            <div className="w-6 h-3.5 relative">
                              <img
                                className="w-6 h-3.5 left-0 top-0 absolute"
                                src="https://via.placeholder.com/22x13"
                              />
                              <img
                                className="w-3 h-3.5 left-[11.18px] top-0 absolute"
                                src="https://via.placeholder.com/11x13"
                              />
                              <img
                                className="w-1 h-2.5 left-[8.80px] top-[1.60px] absolute"
                                src="https://via.placeholder.com/5x10"
                              />
                            </div>
                          </div>
                          <div className="grow shrink basis-0 text-gray-900 text-base font-normal leading-normal">
                            1234 1234 1234 1234
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-28 flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="self-stretch h-16 flex-col justify-start items-start gap-1.5 flex">
                      <div className="text-slate-700 text-sm font-medium leading-tight">
                        CVV
                      </div>
                      <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                        <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                          <div className="grow shrink basis-0 text-gray-900 text-base font-normal leading-normal">
                            •••
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-3 inline-flex">
              <div className="grow shrink basis-0 h-11 px-4 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-center items-center gap-2 flex">
                <div className="text-slate-700 text-base font-semibold leading-normal">
                  Cancel
                </div>
              </div>
              <div className="grow shrink basis-0 h-11 px-4 py-2.5 bg-violet-500 rounded-lg shadow border border-violet-500 justify-center items-center gap-2 flex">
                <div className="text-white text-base font-semibold leading-normal">
                  Confirm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
