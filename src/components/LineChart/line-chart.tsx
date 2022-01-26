import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { AreaChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Line, ResponsiveContainer } from 'recharts';
import Tokens from 'styles/tokens.json';

import styles from './line-chart.module.css';

type Tick = ((props: any) => React.ReactElement<SVGElement>);

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

const formatYAxis = (tickItem: number) => tickItem.toFixed(3);

export const Chart = () => {
  const CustomizedYTick: Tick = useCallback(({ fill, height, orientation, stroke, payload: { value }, type, width, x, y, index }) => {
    if (Number.parseInt(index) !== 0)
      return (
        <text
          orientation={orientation}
          width={width}
          height={height}
          type={type}
          x={x}
          y={y + 15}
          stroke={stroke}
          fill={Tokens.white}
          className="recharts-text recharts-cartesian-axis-tick-value"
          textAnchor='end'>
          <tspan dx="0.5em" dy="0.355em" className={styles.YTick}>{formatYAxis(value)}</tspan>
        </text>
      )
    return <></>;
  }, []);

  const CustomizedXTick: Tick = useCallback(({ height, orientation, stroke, payload: { value }, textAnchor, type, width, x, y, ...rest }) => (
    <text
      orientation={orientation}
      width={width}
      height={height}
      type={type}
      x={x}
      y={y + 15}
      stroke={stroke}
      fill={Tokens.white}
      className="recharts-text recharts-cartesian-axis-tick-value"
      textAnchor={textAnchor}>
      <tspan className={styles.XTick}>{formatXAxis(value)}</tspan>
    </text>
  ), []);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%">
        <AreaChart data={data}
          margin={{ top: 10, right: -60, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={Tokens.primary} stopOpacity={0.6} />
              <stop offset="95%" stopColor={Tokens.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal vertical={false} stroke={Tokens.neutral} />
          <Tooltip />
          <Area
            type="linear"
            dataKey="price"
            stroke={Tokens.primary}
            fillOpacity={1}
            fill="url(#colorPv)" />
          <XAxis
            dataKey="time"
            // tickFormatter is needed because the engine automatically calculates the number of ticks basing on the length of the string values
            tickFormatter={formatXAxis}
            tick={CustomizedXTick}
            stroke={Tokens.neutral}
            padding={{ right: Tokens.space * 3 }}
          />
          <YAxis
            interval="preserveStartEnd"
            orientation="right"
            domain={['dataMin', 'dataMax']}
            axisLine={false}
            tickLine={false}
            tickMargin={-1.33 * Tokens.space}
            tickFormatter={formatYAxis}
            tick={CustomizedYTick}
            stroke={Tokens.neutral}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
};