import React from "react";
import Metric from "./LineItem";
import {
  IconHexagonFilled,
  IconCircleArrowUpRightFilled,
} from "@tabler/icons-react";

const card = () => {
  return (
    <>
      <div className="flex flex-col m-10 border-2 w-80 h-40 p-4 border-cyan-400">
        <h3 className="font-mono text-md text-neutral-600">
          Application Security
        </h3>
        <div className="flex flex-col justify-start">
          <div className="flex flex-row gap-2 w-26 h-14 justify-start justify-items-center">
            <span className="text-lg text-black ">5</span>
            <IconHexagonFilled color="red" size={24} />
          </div>
          <div className="flex flex-row gap-2 w-26 h-14 justify-start">
            <IconCircleArrowUpRightFilled color="green" size={24} />
            <span className="text-lg text-black ">0</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default card;
