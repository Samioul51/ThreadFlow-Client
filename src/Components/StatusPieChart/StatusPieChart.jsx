import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const colors = ["#22c55e", "#3b82f6", "#ef4444"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null)
        return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={14}
            fontWeight="bold"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const StatusPieChart = ({ data }) => {

    const isEmpty = !data || data.length === 0 || data.every(item => item.value === 0);

    return (
        <div className='w-full flex flex-col justify-center my-10' style={{ maxWidth: 300 }}>
            {
                isEmpty ?
                    <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                        <p className='font-playfair text-2xl text-center font-bold text-gray-500'>NO DATA FOUND!</p>
                    </div>
                    :
                    <>
                        <ResponsiveContainer width="100%" aspect={1}>
                            <PieChart width={250} height={250}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={110}
                                    dataKey="value"
                                    label={renderCustomizedLabel}
                                    labelLine={false}
                                >
                                    {data.map((_, index) => (
                                        <Cell key={index} fill={colors[index % colors.length]}>

                                        </Cell>
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col md:flex-row md:justify-center md:items-start items-center mt-4 gap-4">
                            {data.map((entry, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div
                                        style={{
                                            width: 16,
                                            height: 16,
                                            backgroundColor: colors[index % colors.length],
                                        }}
                                    ></div>
                                    <span className="text-sm">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
            }


        </div>
    );
};

export default StatusPieChart;