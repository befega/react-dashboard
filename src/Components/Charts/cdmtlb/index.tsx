import {
  BadgeDelta,
  Button,
  Card,
  DeltaType,
  DonutChart,
  Flex,
  TabGroup,
  Tab,
  TabList,
  Bold,
  Divider,
  List,
  ListItem,
  Metric,
  Text,
  Title,
} from "@tremor/react";
import React, { useState } from "react";
import {
  PieChartOutlined,
  UnorderedListOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

interface StockData {
  name: string;
  value: number;
  performance: string;
  deltaType: DeltaType;
}

const stocks: StockData[] = [
  {
    name: "Off Running AG",
    value: 10456,
    performance: "6.1%",
    deltaType: "increase",
  },
  {
    name: "Not Normal Inc.",
    value: 5789,
    performance: "1.2%",
    deltaType: "moderateDecrease",
  },
  {
    name: "Logibling Inc.",
    value: 4367,
    performance: "2.3%",
    deltaType: "moderateIncrease",
  },
  {
    name: "Raindrop Inc.",
    value: 3421,
    performance: "0.5%",
    deltaType: "moderateDecrease",
  },
  {
    name: "Mwatch Group",
    value: 1432,
    performance: "3.4%",
    deltaType: "decrease",
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Example() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Card className="max-w-md mx-auto">
      <Flex className="space-x-8" justifyContent="between" alignItems="center">
        <Title>Overview</Title>
        <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
          <TabList variant="solid">
            <Tab icon={PieChartOutlined}>Chart</Tab>
            <Tab icon={UnorderedListOutlined}>List</Tab>
          </TabList>
        </TabGroup>
      </Flex>
      <Text className="mt-8">Portfolio value</Text>
      <Metric>$ 25,465</Metric>
      <Divider />
      <Text className="mt-8">
        <Bold>Asset Allocation</Bold>
      </Text>
      <Text>1 Asset class • 5 Holdings</Text>
      {selectedIndex === 0 ? (
        <DonutChart
          data={stocks}
          showAnimation={false}
          category="value"
          index="name"
          valueFormatter={valueFormatter}
          className="mt-6"
        />
      ) : (
        <>
          <Flex className="mt-8" justifyContent="between">
            <Text className="truncate">
              <Bold>Stocks</Bold>
            </Text>
            <Text>Since transaction</Text>
          </Flex>
          <List className="mt-4">
            {stocks.map((stock) => (
              <ListItem key={stock.name}>
                <Text>{stock.name}</Text>
                <Flex justifyContent="end" className="space-x-2">
                  <Text>
                    $ {Intl.NumberFormat("us").format(stock.value).toString()}
                  </Text>
                  <BadgeDelta deltaType={stock.deltaType} size="xs">
                    {stock.performance}
                  </BadgeDelta>
                </Flex>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Flex className="mt-6 pt-4 border-t">
        <Button
          size="xs"
          variant="light"
          icon={ArrowRightOutlined}
          iconPosition="right"
        >
          View more
        </Button>
      </Flex>
    </Card>
  );
}
