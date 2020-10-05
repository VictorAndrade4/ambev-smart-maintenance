import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Data {
    name: string | undefined;
    Realizados: string | undefined;
    'Não Realizados': string | undefined; 
}

export default class BarGraphic extends PureComponent<{data:Data[]}> {
    
    render() {
        const {data} = this.props;
        return (
            <ResponsiveContainer>    
                <BarChart
                    width={300}
                    height={200}
                    data={data}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar barSize={60} dataKey="Realizados" fill="#008744" />
                    <Bar barSize={60} dataKey="Não Realizados" fill="#d62d20" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
