import { Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import stylesGraphsByEquip from "../../styles/graphsByEquip";

export default class Example extends PureComponent<{ data: any, field:any }> {
  render() {
    let getName = (x: any) => {
      return x ? x.name.slice(8, x.name.length) : "";
    };
    const CustomTooltip = ({ active, payload, label }: any) => {
      const classes = stylesGraphsByEquip();

      if (active && payload && payload.length) {
        let done = Object.entries(payload[0].payload.done);
        let wait = Object.entries(payload[0].payload.wait);
        return (
          <div className={classes.customTooltip}>
            <p className={classes.label}>{`${label}`}</p>
            {done.map((d) => {
              return wait.map((w) => {
                if (d[0] == w[0] && w[1] !== 0) {
                  return (
                    <p className={classes.desc} key={label}>{`${d[0]}: ${
                      d[1] !== 0 ? d[1] : 0
                    }/${w[1]}`}</p>
                  );
                }
              });
            })}
          </div>
        );
      }
      return null;
    };
    return (
      <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom align='center'>Detalhamento de checks por equipamento - {this.props.field}</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={this.props.data}>
            <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
            <XAxis
              dataKey={getName}
              dy={80}
              dx={-10}
              interval={0}
              height={170}
              angle={-90}
            />
            <Bar
              barSize={50}
              dataKey="done.realizados"
              label={{ position: "top" }}
            >
              {this.props.data &&
                this.props.data.map((entry: any, index: number) => (
                  <Cell
                    cursor="pointer"
                    fill="#259A3D"
                    key={`realizados-${index}`}
                  />
                ))}
            </Bar>
            <Bar
              barSize={50}
              dataKey="wait.previstos"
              label={{ position: "top" }}
              fill={"#4c85f4"}
            >
              {this.props.data &&
                this.props.data.map((entry: any, index: number) => (
                  <Cell
                    cursor="pointer"
                    fill={"#4c85f4"}
                    key={`previstos-${index}`}
                  />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
}
