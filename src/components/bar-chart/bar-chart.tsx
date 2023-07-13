import React from 'react';
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
} from 'recharts';
import { Loading } from '../loading';

// const data = [
//   {
//     time: 'Page A',
//     temperature_mean: 4000,
//   },
//   {
//     time: 'Page B',
//     temperature_mean: -3000,
//   },
//   {
//     time: 'Page C',
//     temperature_mean: -2000,
//   },
//   {
//     time: 'Page D',
//     temperature_mean: 2780,
//   },
//   {
//     time: 'Page E',
//     temperature_mean: -1890,
//   },
//   {
//     time: 'Page F',
//     temperature_mean: 2390,
//   },
//   {
//     time: 'Page G',
//     temperature_mean: 3490,
//   },
// ];

export const BarChartComponent = ({ data, data_key, isLoading }: {data: any[], data_key: string, isLoading: boolean}) => {

   if (isLoading) return <Loading />;

   if (!data) return null;
   
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey={`${data_key}`} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

