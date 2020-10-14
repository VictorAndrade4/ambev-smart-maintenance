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
            <ResponsiveContainer width={'100%'} height={'100%'}>    
                <BarChart
                    data={data}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip offset={0} isAnimationActive={false} />
                    <Legend />
                    <Bar barSize={70} dataKey="Realizados" fill="#008744" />
                    <Bar barSize={70} dataKey="Não Realizados" fill="#d62d20" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
