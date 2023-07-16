import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Loading } from "../loading";

type BarChartComponentProps = {
  data: Record<string, string | number>[];
  data_key: string;
  isLoading: boolean;
};

export const BarChartComponent = ({
  data,
  data_key,
  isLoading,
}: BarChartComponentProps) => {
  if (isLoading) return <Loading />;

  if (!data) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 100,
          right: 30,
          left: 30,
          bottom: 5,
        }}
        barGap={20}
        style={{ background: "#757575" }}
      >
        <defs>
          <linearGradient
            id="colorUv"
            x1={0}
            y1={1}
            x2={0}
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#B3FC4F" />
            <stop offset="1" stopColor="#173102" />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="15 20"
          stroke="#313131"
          strokeWidth={2}
          vertical={false}
        />
        <XAxis dataKey="time" stroke="#fff" style={{ fontWeight: "bold" }} />
        <YAxis stroke="#000" unit=" C" style={{ fill: "#fff" }} />
        <Tooltip />
        <Legend
          width={200}
          wrapperStyle={{
            top: 60,
            right: 40,
            backgroundColor: "transparent",
            lineHeight: "40px",
            color: "white",
          }}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Bar
          dataKey={`${data_key}`}
          fill="url(#colorUv)"
          color="white"
          top={15}
        />
        <text
          x="100"
          y="50"
          dy={+12}
          style={{
            fontSize: 24,
            fontWeight: "bold",
            fill: "white",
            margin: "20px",
          }}
          width={200}
          textAnchor="middle"
        >
          Analytics
        </text>
      </BarChart>
    </ResponsiveContainer>
  );
};
