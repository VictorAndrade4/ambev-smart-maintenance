import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const COLORS = ['#008744','#F4B400', '#d62d20'];

const RADIAN = Math.PI / 180;

const processedData = ({initialDate, endDate, data}:any) =>{

}

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



export default class MachinePieGraphic extends PureComponent<{data : any, initialDate:string, endDate: string }> {
    
    render() {
        const {data} = this.props;
        const {initialDate} = this.props;
        const {endDate} = this.props;

        return (
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
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
                    <Tooltip offset={0} isAnimationActive={false} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
