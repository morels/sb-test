import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { AreaChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Line } from 'recharts';

const data = [
  {
    price: 1.126,
    time: "2021-05-16T01:17:00.000Z"
  },
  {
    price: 1.127,
    time: "2021-05-16T01:18:00.000Z"
  },
  {
    price: 1.125,
    time: "2021-05-16T01:19:00.000Z"
  },
  {
    price: 1.126,
    time: "2021-05-16T01:20:00.000Z"
  },
  {
    price: 1.122,
    time: "2021-05-16T01:21:00.000Z"
  },
  {
    price: 1.126,
    time: "2021-05-16T01:22:00.000Z"
  },
  {
    price: 1.125,
    time: "2021-05-16T01:23:00.000Z"
  },
];

const formatXAxis = (tickItem: string) => moment(tickItem).format('HH:mm');

export const Chart = () => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const div = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);


  const CustomizedTick = ({ fill, height, orientation, stroke, payload: { value }, textAnchor, type, width, x, y }) => (
    <text
      orientation={orientation}
      width={width}
      height={height}
      type={type}
      x={x}
      y={y + 15}
      stroke={stroke}
      fill={fill}
      className="recharts-text recharts-cartesian-axis-tick-value"
      textAnchor={textAnchor}>
      <tspan dy="0.355em">{value}</tspan>
    </text>
  );

  // <g class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"><g class="recharts-cartesian-axis-ticks"><g class="recharts-layer recharts-cartesian-axis-tick"><text orientation="right" width="60" height="360" type="number" x="808" y="370" stroke="none" fill="#666" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="start"><tspan x="808" dy="0.355em">1.122</tspan></text></g><g class="recharts-layer recharts-cartesian-axis-tick"><text orientation="right" width="60" height="360" type="number" x="808" y="262.00000000000955" stroke="none" fill="#666" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="start"><tspan x="808" dy="0.355em">1.1235</tspan></text></g><g class="recharts-layer recharts-cartesian-axis-tick"><text orientation="right" width="60" height="360" type="number" x="808" y="154.0000000000032" stroke="none" fill="#666" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="start"><tspan x="808" dy="0.355em">1.125</tspan></text></g><g class="recharts-layer recharts-cartesian-axis-tick"><text orientation="right" width="60" height="360" type="number" x="808" y="10" stroke="none" fill="#666" class="recharts-text recharts-cartesian-axis-tick-value" text-anchor="start"><tspan x="808" dy="0.355em">1.127</tspan></text></g></g></g>
  return (
    <div style={{ width: "100%", height: "400px" }} ref={div}>
      {height && width && <AreaChart height={height} width={width} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#01c38d" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#01c38d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal vertical={false} />
        <XAxis dataKey="time" tickFormatter={formatXAxis} />
        <YAxis
          interval="preserveStartEnd"
          orientation="right"
          domain={['dataMin', 'dataMax']}
          axisLine={false}
          tickLine={false}
          tickMargin={-50}
          tick={CustomizedTick}
        />
        <Tooltip />
        <Area type="linear" dataKey="price" stroke="#20C38D" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>}
    </div>
  )
};