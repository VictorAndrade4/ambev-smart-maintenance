import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#008744', '#d62d20'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

interface Data {
    name: string | undefined;
    value: number | undefined; 
}

export default class PieGraphic extends PureComponent<{data : Data []}> {
    static defaultProps = {
    }

    render() {
        return (
            <PieChart width={300} height={200}>
                <Pie
                    data={this.props.data}
                    cx={150}
                    cy={80}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {this.props.data.map((entry:any, index:any) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        );
    }
}
