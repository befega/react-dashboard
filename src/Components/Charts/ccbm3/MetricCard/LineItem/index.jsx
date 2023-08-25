import { LineChart, Line, ResponsiveContainer } from "recharts";

function App({ outData }) {
  const data = Array.from(outData);

  return (
    <>
      <div className="container w-[270px]">
        <LineChart width={130} height={50} data={data}>
          <Line
            type="monotone"
            dataKey={(data) => data}
            dot={false}
            stroke="#8884d8"
            strokeWidth={2}
            style={{
              filter: "drop-shadow( 0px 0px 4px rgba(109, 92, 232, 1))",
            }}
          />
        </LineChart>
      </div>
    </>
  );
}

export default App;
