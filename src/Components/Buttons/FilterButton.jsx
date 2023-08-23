import React from "react";
import { Button, Checkbox, Popover, Divider, Typography } from "antd";

export default function FilterButton(props) {
  return (
    <>
      <Popover
        placement="bottom"
        content={
          <>
            <Checkbox.Group
              options={props.options}
              value={props.value}
              onChange={props.onChange}
              style={{
                marginBottom: 16,
                display: "flex",
                flexDirection: "column",
              }}
            />
            {props.value.length > 0 && (
              <Button type="dashed" size={"small"} onClick={props.clearFilter}>
                Clear Filter
              </Button>
            )}
          </>
        }
        trigger="click"
      >
        <Button type="dashed">
          {props.title}
          {props.value.length > 0 && (
            <>
              <div className="flex flex-row justify-center items-center">
                <Divider type="vertical" />
                {props.value.length > 0
                  ? props.value.map((item, index) =>
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
