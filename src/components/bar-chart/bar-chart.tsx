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

type BarChartComponentProps = {
   data: Record<string, string | number>[], data_key: string, isLoading: boolean
}

export const BarChartComponent = ({ data, data_key, isLoading }: BarChartComponentProps) => {

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

