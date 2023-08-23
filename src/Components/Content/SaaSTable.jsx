import {
  Button,
  Space,
  Table,
  Tag,
  Input,
  Checkbox,
  Popover,
  Segmented,
  Col,
  Row,
} from "antd";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SaaSTable() {
  const [posts, setPosts] = useState([]);
  const dataLocation = window.location.origin + "/data.json";
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredRole, setFilteredRole] = useState([]);
  const [filteredPriority, setFilteredPriority] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([
    "Name",
    "Title",
    "Email",
    "Role",
    "Priority",
  ]);
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(dataLocation);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  const filteredData = posts
    ? posts.filter(
        (record) =>
          record.name.toLowerCase().includes(searchText.toLowerCase()) &&
          (filteredRole.length === 0 || filteredRole.includes(record.role)) &&
          (filteredPriority.length === 0 ||
            filteredPriority.includes(record.priority))
      )
    : [];

  const clearAll = () => {
    setSearchText("");
    setFilteredRole([]);
    setSortedInfo({});
  };

  const clearRoleFilter = () => {
    setFilteredRole([]);
  };

  const clearPriorityFilter = () => {
    setFilteredPriority([]);
  };

  const clearColumnFilter = () => {
    setVisibleColumns([]);
  };

  const fillColumnFilter = () => {
    setVisibleColumns(["Name", "Title", "Email", "Role", "Priority"]);
  };

  function renderTagColor(text) {
    switch (text) {
      case "Group":
        return "gold";
      case "Metrics":
        return "red";
      case "Program":
        return "green";
      default:
        return "gray";
    }
  }

  function renderTagPriorityColor(text) {
    switch (text) {
      case "Low":
        return "green";
      case "Medium":
        return "gold";
      case "High":
        return "red";
      default:
        return "gray";
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <>{<Tag color={renderTagColor(text)}>{text.toUpperCase()}</Tag>}</>
      ),
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortOrder: sortedInfo.columnKey === "role" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => (
        <>
          {<Tag color={renderTagPriorityColor(text)}>{text.toUpperCase()}</Tag>}
        </>
      ),
      sorter: (a, b) => a.priority.localeCompare(b.priority),
      sortOrder: sortedInfo.columnKey === "priority" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
  ];

  const filColumns = columns.filter(
    (col) =>
      !["Name", "Title", "Email", "Role", "Priority"].includes(col.title) ||
      visibleColumns.includes(col.title)
  );

  return (
    <>
      <Row justify="end" align={"middle"}>
        <Col>
          {" "}
          <Input
            placeholder="Search"
            allowClear
            suffix={false}
            value={searchText}
            style={{ width: 250, marginBottom: 16 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
      </Row>
      <Row justify="start">
        <Col span={20}>
          {" "}
          <Space
            style={{
              marginBottom: 16,
            }}
          >
            <Segmented
              options={["Group", "Metrics", "Program"]}
              value={filteredRole}
              onChange={(values) => setFilteredRole(values)}
              style={{ marginRight: 30 }}
            />

            <Popover
              placement="bottom"
              content={
                <>
                  <Checkbox.Group
                    options={["Group", "Metrics", "Program"]}
                    value={filteredRole}
                    onChange={(values) => setFilteredRole(values)}
                    style={{
                      marginBottom: 16,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                  {filteredRole.length > 0 && (
                    <Button onClick={clearRoleFilter}>Clear Filter</Button>
                  )}
                </>
              }
              trigger="click"
            >
              <Button>Role Filter</Button>
            </Popover>

            <Popover
              placement="bottom"
              content={
                <>
                  <Checkbox.Group
                    options={["Low", "Medium", "High"]}
                    value={filteredPriority}
                    onChange={(values) => setFilteredPriority(values)}
                    style={{
                      marginBottom: 16,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                  {filteredPriority.length > 0 && (
                    <Button onClick={clearPriorityFilter}>Clear Filter</Button>
                  )}
                </>
              }
              trigger="click"
            >
              <Button>Priority Filter</Button>
            </Popover>

            {(filteredRole.length > 0 ||
              searchText.length > 0 ||
              sortedInfo.order != null) && (
              <Button onClick={clearAll}>Clear All Filters</Button>
            )}
          </Space>
        </Col>
        <Col span={4}>
          <Popover
            placement="bottom"
            content={
              <>
                <Checkbox.Group
                  options={["Name", "Title", "Email", "Role", "Priority"]}
                  value={visibleColumns}
                  onChange={(values) => setVisibleColumns(values)}
                  style={{
                    marginBottom: 16,
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
                {visibleColumns.length > 0 && (
                  <Button onClick={clearColumnFilter}>Clear Filter</Button>
                )}
                {visibleColumns.length === 0 && (
                  <Button onClick={fillColumnFilter}>Fill Filter</Button>
                )}
              </>
            }
            trigger="click"
          >
            <Button
              icon={<Icon icon="heroicons:adjustments-horizontal" />}
              style={{ float: "right" }}
            >
              Display
            </Button>
          </Popover>
        </Col>
      </Row>
      <Table
        columns={filColumns}
        dataSource={filteredData}
        onChange={handleChange}
      />
    </>
  );
}
