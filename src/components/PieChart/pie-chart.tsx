import React, { ReactNode, useCallback, useMemo } from 'react';
import { useMedia } from 'react-use';
import {
  Cell,
  Layer,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Surface,
  Symbols,
  Text
} from 'recharts';
import { Props as LegendProps } from 'recharts/types/component/DefaultLegendContent';
import { Metrics } from 'src/metrics';

import Tokens from 'styles/tokens.json';

const AREA_HEIGHT = 161;
const AREA_WIDTH = 334;
const CHART_ASPECT_RATIO = AREA_WIDTH / AREA_HEIGHT;
const ICON_SIZE = 16;

type Props = {
  data: Metrics;
};

export const Chart: React.FC<Props> = ({ data: rawData }) => {
  const renderCusomizedLegend = useCallback<(props: LegendProps) => ReactNode>((props) => {
    const { payload: items } = props;
    return (
      <ul className="recharts-customized-legend" style={{ padding: 0, margin: 0, textAlign: "left" }}>
        {
          items && items.map((item, i) => {
            const { color, type, value } = item;
            return (
              <li
                key={`${i}`}
                className={`recharts-legend-item legend-item-${i}`}
                style={{ display: "block", marginRight: 10, marginTop: 14 }}>
                <Surface width={ICON_SIZE} height={ICON_SIZE} viewBox={{ x: 0, y: 0, width: ICON_SIZE, height: ICON_SIZE }}
                  style={{ display: "inline-block", verticalAlign: "middle", marginRight: 4 }}>
                  <Symbols cx={ICON_SIZE / 2} cy={ICON_SIZE / 2} type="circle" size={ICON_SIZE} fill={color} sizeType="diameter" />
                </Surface>
                <Text style={{ fontSize: 18, color: "#8f96a1" }} >{value}</Text>
              </li >
            )
          }
          )
        }
      </ul >
    )
  }, []);

  const renderCustomizedLabel = useCallback((props) => {
    // Maths inspired by https://github.com/recharts/recharts/issues/490#issuecomment-498274850
    const RADIAN = Math.PI / 180;
    const diffAngle = props.endAngle - props.startAngle;
    const delta = ((360 - diffAngle) / 15) - 1;
    const radius = props.innerRadius + (props.outerRadius - props.innerRadius);
    const x = props.cx + (radius + delta) * Math.cos(-props.midAngle * RADIAN);
    const y = props.cy + (radius + delta) * Math.sin(-props.midAngle * RADIAN);
    return (
      <Layer>
        <Text
          cx={props.cx}
          cy={props.cy}
          fill={Tokens.neutral}
          stroke={props.stroke}
          name={props.name}
          id={props.id}
          x={x}
          y={y}
          dominantBaseline="central"
          className="recharts-text recharts-pie-label-text"
          textAnchor={x > props.cx ? 'start' : 'end'}
        >
          {props.name}
        </Text>
      </Layer>
    );
  }, []);


  const data = useMemo(() => [
    {
      name: "Stacked",
      value: rawData["chsbStackedPercentage"],
      id: 'stacked',
    },
    {
      name: "In Yield",
      value: rawData["chsbInYieldPercentage"],
      id: 'yield',
    },
    {
      name: "Burned",
      value: rawData["totalSupplyBurnedPercentage"],
      id: 'burned',
    },
    {
      name: "Circulating supply",
      value: 100 - rawData["chsbStackedPercentage"] - rawData["chsbInYieldPercentage"] - rawData["totalSupplyBurnedPercentage"],
      id: 'circulating',
    },
  ], [rawData]);

  const isDesktop = useMedia(`(min-width: 1240px)`);

  return (
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
      <ResponsiveContainer
        width="100%"
        aspect={isDesktop ? undefined : CHART_ASPECT_RATIO}
        debounce={250}
      >
        <PieChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="circulating-gradient" >
              <stop offset="0%" stopColor="#CCF3E8" />
              <stop offset="100%" stopColor="#93fcde" />
            </linearGradient>
            <linearGradient id="stacked-gradient" >
              <stop offset="0%" stopColor="#13E5BF" />
              <stop offset="100%" stopColor="#01C38D" />
            </linearGradient>
            <linearGradient id="burned-gradient" >
              <stop offset="0%" stopColor="#364053" />
              <stop offset="100%" stopColor="#191E29" />
            </linearGradient>
            <linearGradient id="yield-gradient" >
              <stop offset="0%" stopColor="#9373FF" />
              <stop offset="100%" stopColor="#5A3FFF" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            labelLine={false}
            fill="#8884d8"
            label={isDesktop ? renderCustomizedLabel : undefined}
            legendType='circle'
          >
            {data.map(({ id }, index) => (
              <Cell key={`cell-${index}`} fill={`url(#${id}-gradient)`} />
            ))}
          </Pie>
          {!isDesktop && <Legend
            verticalAlign='middle'
            align='right'
            layout='vertical'
            iconSize={ICON_SIZE}
            iconType="circle"
            content={renderCusomizedLegend}
            wrapperStyle={{ right: 0 }}
          />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
};