import React from "react";
import { Icon } from "@iconify/react";
import LineMetric from "./LineItem";

export default function index(props) {
  return (
    <>
      <div className="grid grid-rows-2 w-60 p-2 text-black rounded-lg shadow-lg md:shadow-none lg:shadow-none">
        <div className="flex w-full h-8 justify-start p-2 items-center font-inter">
          <span>{props.title}</span>
        </div>
        <div className="">
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-2 grid-rows-2 w-24 h-12 text-center">
              <div className="">{props.score}</div>
              <div className="flex flex-1 items-center justify-center ">
                <Icon
                  className="absolute"
                  icon="mdi:hexagon"
                  color="#d41e11"
                  width="28"
                />
                <span className="relative text-white">{props.scoreLetter}</span>
              </div>
              <div className="flex flex-1 items-center justify-center ">
                <Icon
                  className="absolute"
                  icon="mdi:circle"
                  width="28"
                  color=""
                />
                <span className="relative text-white">
                  {props.rateNumber == 0 ? (
                    <Icon
                      className="rotate-145"
                      icon="ion:remove-circle"
                      width="30"
                      color="#ddd"
                    />
                  ) : (
                    <Icon
                      className="rotate-145"
                      icon="ion:arrow-up"
                      width="16"
                      color="#00dd33"
                    />
                  )}
                </span>
              </div>
              <div className="">{props.rateNumber}</div>
            </div>
            <div className="flex w-full h-full justify-center items-center">
              <div className="relative ml-28">
                <LineMetric />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
