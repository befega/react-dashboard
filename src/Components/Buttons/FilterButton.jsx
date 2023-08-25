import React, { useState } from "react";
import { Button, Popover, Divider, Typography, Row, Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function FilterButton(props) {
  const valueData = Array.from(props.value);
  const optionsData = Array.from(props.options);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = optionsData
    ? optionsData.filter((record) =>
        record.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleCheckboxChange = (event) => {
    const checkedValue = event.target.value;
    const updatedValues = valueData.includes(checkedValue)
      ? valueData.filter((item) => item !== checkedValue)
      : [...valueData, checkedValue];

    props.handleFilterChange(updatedValues);
  };

  return (
    <>
      <Popover
        content={
          <>
            <div className="flex flex-col gap-y-1">
              <Row justify="end" align={"middle"}>
                <Col>
                  <Input
                    placeholder={props.title}
                    allowClear
                    value={searchText}
                    prefix={<SearchOutlined style={{ opacity: 0.33 }} />}
                    className="rounded-md outline-none ring-0 border-none"
                    style={{ width: 160 }}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Divider style={{ margin: 0 }} orientation={"center"} />
                </Col>
              </Row>
              {filteredOptions.map((item, index) => (
                <div class="w-40">
                  <div className="inline-flex items-center hover:bg-gray-100 w-full rounded">
                    <label
                      class="relative flex cursor-pointer items-center rounded-full p-2"
                      htmlFor={index}
                    >
                      <input
                        id={index}
                        type="checkbox"
                        key={index}
                        value={item}
                        checked={valueData.includes(item)}
                        onChange={handleCheckboxChange}
                        class="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none ring-0 focus:ring-0 rounded-sm before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10"
                      />
                    </label>
                    <label
                      class="mt-px cursor-pointer block p- select-none font-light text-gray-800"
                      htmlFor={index}
                    >
                      {item}
                    </label>
                  </div>
                </div>
              ))}
              {props.value.length > 0 && (
                <Row justify="end" align={"middle"}>
                  <Col>
                    <Divider style={{ margin: 0 }} orientation={"center"} />
                    <Button
                      size={"normal"}
                      style={{ width: 160, border: "none", marginTop: "3px" }}
                      className="hover:bg-slate-100"
                      onClick={props.clearFilter}
                    >
                      Clear Filter
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </>
        }
        placement="bottomLeft"
        trigger="click"
      >
        <Button type="dashed">
          {props.title}
          {props.value.length > 0 && (
            <>
              <div className="flex flex-row justify-center items-center">
                <Divider type="vertical" />
                {props.value.length > 0
                  ? valueData.map((item, index) =>
                      props.value.length > 0 && index > 1 ? (
                        <Typography.Text key={index} code>
                          {props.value.length}
                          {" selected"}
                        </Typography.Text>
                      ) : props.value.length < 3 && index < 2 ? (
                        <Typography.Text key={index} code>
                          {item}
                        </Typography.Text>
                      ) : undefined
                    )
                  : undefined}
              </div>
            </>
          )}
        </Button>
      </Popover>
    </>
  );
}
