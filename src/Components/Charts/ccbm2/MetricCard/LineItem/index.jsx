import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      min: -10,
      max: 150,
      display: false,
    },
    x: {
      min: 1,
      max: 70,
      display: false,
    },
  },
};

export const lineData = {
  labels: Array.from({ length: 30 }, (_, i) => i + 1),
  datasets: [
    {
      // data: [
      //   3, 56, 9, 3, 12, 25, 7, 8, 15, 34, 85, 23, 100, 19, 2, 16, 45, 85, 35,
      //   98, 23, 68, 73, 49, 14, 0, 32, 1, 69, 73, 41, 8, 32,
      // ],
      data: [45, 56, 65, 47, 73, 49, 52, 64, 44, 34, 85, 63, 100, 79],
      borderColor: "rgb(109, 92, 232)",
      backgroundColor: "rgba(109, 92, 232, 0.5)",
      tension: 0.4,
    },
  ],
};

const lineShadowOpt = {
  id: "metricLine",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();

    const originalLineDraw = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = "rgba(109, 92, 232, 1)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      originalLineDraw.apply(this, arguments);
      ctx.restore();
    };
  },
};

function App() {
  return (
    <>
      <div className="container">
        <Line
          id="metricLine"
          options={options}
          data={lineData}
          plugins={[lineShadowOpt]}
          width={250}
          height={50}
        />
      </div>
    </>
  );
}

export default App;
