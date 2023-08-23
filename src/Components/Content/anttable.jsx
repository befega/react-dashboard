import React, { useState, useEffect } from "react";
import { Table, Input, Checkbox, Button } from "antd";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = dataSlice;

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = actions;

const dataLocation = window.location.origin + "/data.json";

const fetchData = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchDataStart());
      const response = await axios.get(dataLocation);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});

function Tables() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState("");
  const [filteredRole, setFilteredRole] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        { text: "Group", value: "Group" },
        { text: "Metrics", value: "Metrics" },
        { text: "Program", value: "Program" },
      ],
      onFilter: (value, record) => record.role === value,
    },
  ];

  const filteredData = data
    ? data.filter(
        (record) =>
          record.name.toLowerCase().includes(searchText.toLowerCase()) &&
          (filteredRole.length === 0 || filteredRole.includes(record.role))
      )
    : [];

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const resetFiltersAndSort = () => {
    setSearchText("");
    setFilteredRole([]);
    setPagination({ current: 1, pageSize: 10 });
  };

  return (
    <div>
      <Input.Search
        placeholder="Search Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, marginRight: 16, width: 450 }}
      />
      <Checkbox.Group
        options={["Group", "Metrics", "Program"]}
        value={filteredRole}
        onChange={(values) => setFilteredRole(values)}
        style={{ marginBottom: 16 }}
      />
      <Button
        className="bg-blue-500 text-white font-semibold items-center align-middle"
        onClick={resetFiltersAndSort}
      >
        Reset Filters{" "}
      </Button>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{
          ...pagination,
          total: filteredData.length,
        }}
        onChange={handleTableChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

function TableWrapper() {
  return (
    <Provider store={store}>
      <Tables />
    </Provider>
  );
}

export default TableWrapper;
