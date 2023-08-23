import React from "react";
import { useEffect, useState, useRef } from "react";
import Pagination from "./Pagination";
import TableData from "./TableData";
import axios from "axios";
import Drawer from "./Drawer";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DataTable() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [selectedRole, setSelectedRole] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dataLocation = window.location.origin + "/data.json";

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(dataLocation);
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filterByRole = () => {
    if (selectedRole === "All") {
      return posts;
    }
    return posts.filter((post) => post.role === selectedRole);
  };

  const handleRoleChange = (selectedRoles) => {
    setSelectedRoles(selectedRoles);
    setCurrentPage(1);
  };

  const filteredPosts = filterByRole();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFilteredPosts = filteredPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  const roleOptions = [...new Set(posts.map((post) => post.role))];

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Users
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-4 justify-end items-end md:justify-center md:items-center sm:ml-16 sm:mt-0 sm:flex-none">
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              {" "}
              <button
                onClick={handleDrawerOpen}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add user
              </button>
            </div>
            {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <select
                onChange={handleRoleChange}
                value={selectedRole}
                className="block rounded-md border border-gray-300 w-30 h-10 text-sm font-semibold text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none"
              >
                <option value="All">All Roles</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Popover className="relative text-gray-700 hover:bg-slate-50 font-medium ring-1 ring-slate-200 rounded-lg text-sm px-3 py-1">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={
                        "grid grid-cols-2 justify-center items-center text-center"
                      }
                    >
                      Role{" "}
                      <ChevronDownIcon
                        className={
                          open
                            ? "rotate-180 transform transition-all"
                            : "transition-all"
                        }
                      />
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 mt-3 -translate-x-1/2 transform px-4">
                      <div className="grid grid-cols-1">
                        {roleOptions.map((item, index) => (
                          <div className="flex items-center p-2 bg-slate-400 w-full">
                            <input
                              key={index}
                              id={index}
                              type="checkbox"
                              value={item}
                              checked={selectedRole.includes(item)}
                              onChange={handleRoleChange}
                              className="w-4 h-4 text-slate-700 bg-gray-100 border-gray-300 rounded"
                            />
                            <label
                              key={index}
                              htmlFor={index}
                              className="ml-2 text-sm font-medium text-gray-900"
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
        <TableData
          dataPosts={currentFilteredPosts}
          rawData={roleOptions}
          loading={loading}
          roleChange={selectedRole}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={currentPage}
        />
        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
      </div>
    </>
  );
}
