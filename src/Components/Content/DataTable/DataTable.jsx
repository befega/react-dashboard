import React from "react";
import { useEffect, useState, useRef } from "react";
import Pagination from "./Pagination";
import TableData from "./TableData";
import axios from "axios";
import Drawer from "./Drawer";

export default function DataTable() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [selectedRole, setSelectedRole] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5175/data.json");
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

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
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
          <div className="flex flex-col-2 gap-3 mt-4 justify-end items-end md:justify-center md:items-center sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={handleDrawerOpen}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
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
            </div>
          </div>
        </div>
        <TableData dataPosts={currentFilteredPosts} loading={loading} />
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
