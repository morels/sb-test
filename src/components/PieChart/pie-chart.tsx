import React, { ReactNode, useCallback, useMemo } from 'react';
import {
  Cell,
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

const COLORS = ['#ccf3e8', '#13e5bf', '#364053', '#9373ff'];

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

  const data = useMemo(() => [
    {
      name: "Stacked",
      value: rawData["chsbStackedPercentage"],
    },
    {
      name: "In Yield",
      value: rawData["chsbInYieldPercentage"],
    },
    {
      name: "Burned",
      value: rawData["totalSupplyBurnedPercentage"],
    },
    {
      name: "Circulating supply",
      value: 100 - rawData["chsbStackedPercentage"] - rawData["chsbInYieldPercentage"] - rawData["totalSupplyBurnedPercentage"]
    },
  ], [rawData]);

  return (
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
      <ResponsiveContainer width="100%" aspect={CHART_ASPECT_RATIO}>
        <PieChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#01c38d" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#01c38d" stopOpacity={0} />
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
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign='middle'
            align='right'
            layout='vertical'
            iconSize={ICON_SIZE}
            iconType="circle"
            content={renderCusomizedLegend}
            wrapperStyle={{ right: 0 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
};