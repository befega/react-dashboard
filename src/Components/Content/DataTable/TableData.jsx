import React from "react";
import { Fragment, useState, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TableData({ dataPosts, loading }) {
  if (loading) {
    return <h2>Data Loading...</h2>;
  }

  const [checkboxRef, setCheckboxRef] = useState(null);
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [filterColumn, setFilterColumn] = useState("full_name");
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(dataPosts);

  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);

    const filtered = dataPosts.filter((person) =>
      person[filterColumn].toLowerCase().includes(searchText)
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(dataPosts);
  }, [dataPosts]);

  const handleCheckboxRef = (ref) => {
    setCheckboxRef(ref);
  };

  const toggleAll = () => {
    setSelectedPeople((prevSelectedPeople) => {
      if (prevSelectedPeople.length === filteredData.length) {
        return [];
      } else {
        return filteredData.map((person) => person.id);
      }
    });
  };

  useEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < filteredData.length;
    setChecked(
      !isIndeterminate && selectedPeople.length === filteredData.length
    );
    setIndeterminate(isIndeterminate);
    if (checkboxRef) {
      checkboxRef.indeterminate = isIndeterminate;
    }
  }, [selectedPeople, filteredData]);

  const handleFilterColumnChange = (e) => {
    setFilterColumn(e.target.value);
  };

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedPeople.length > 0 && (
                <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                  <button
                    type="button"
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Bulk edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Delete all
                  </button>
                </div>
              )}
              <div className="flex flex-row gap-5 justify-end items-center self-center">
                {/* <div className="mt-6">
                  <button
                    id="dropdownCheckboxButton"
                    data-dropdown-toggle="dropdownDefaultCheckbox"
                    className="text-gray-700 hover:bg-slate-50 font-medium ring-1 ring-slate-200 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                  >
                    Role{" "}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1 4 4 7 1"
                      />
                    </svg>
                  </button>
                  <div
                    id="dropdownDefaultCheckbox"
                    className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
                  >
                    <ul
                      className="p-4 space-y-3 text-sm text-gray-700 dark:text-gray-200 ring-1 ring-slate-200 rounded"
                      aria-labelledby="dropdownCheckboxButton"
                    >
                      {dataPosts.map((item) => (
                        <li>
                          <div className="flex items-center">
                            <input
                              id="checkbox-item-1"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 text-slate-700 bg-gray-100 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="checkbox-item-1"
                              className="ml-2 text-sm font-medium text-gray-900"
                            >
                              {item.role}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}

                <div className="w-24">
                  <label
                    htmlFor="filterColumn"
                    className="block whitespace-nowrap text-sm font-medium text-gray-700"
                  >
                    Filter by
                  </label>
                  <select
                    id="filterColumn"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={filterColumn}
                    onChange={handleFilterColumnChange}
                  >
                    <option value="full_name">Name</option>
                    <option value="title">Title</option>
                    <option value="email">Email</option>
                    <option value="role">Role</option>
                  </select>
                </div>
                <div className="w-64">
                  <label
                    htmlFor="filterText"
                    className="block text-sm font-medium text-gray-700"
                  >
                    &nbsp;
                  </label>
                  <input
                    type="text"
                    id="filterText"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={"Search"}
                    value={filterText}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        ref={(ref) => {
                          handleCheckboxRef(ref);
                        }}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredData.length > 0 ? (
                    filteredData.map((person) => (
                      <tr
                        key={person.email}
                        className={
                          selectedPeople.includes(person.id)
                            ? "bg-gray-50"
                            : undefined
                        }
                      >
                        <td className="relative px-7 sm:w-12 sm:px-6">
                          {selectedPeople.includes(person.id) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            value={person.email}
                            checked={selectedPeople.includes(person.id)}
                            onChange={(e) =>
                              setSelectedPeople((prevSelectedPeople) => {
                                if (e.target.checked) {
                                  return [...prevSelectedPeople, person.id];
                                } else {
                                  return prevSelectedPeople.filter(
                                    (p) => p !== person.id
                                  );
                                }
                              })
                            }
                          />
                        </td>
                        <td
                          className={classNames(
                            "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                            selectedPeople.includes(person.id)
                              ? "text-indigo-600"
                              : "text-gray-900"
                          )}
                        >
                          {person.full_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.role}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="bg-slate-300 text-slate-600 rounded-xl text-center text-2xl mx-auto h-12">
                          No data
                        </p>
                      </td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
