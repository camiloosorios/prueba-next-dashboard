'use client'
import { TrendingUp } from 'lucide-react';
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const data = [
    { year: '2016', newCustomers: 2000, oldCustomers: 3000 },
    { year: '2017', newCustomers: 1300, oldCustomers: 1800 },
    { year: '2018', newCustomers: 7200, oldCustomers: 1200 },
    { year: '2019', newCustomers: 3500, oldCustomers: 2500 },
    { year: '2020', newCustomers: 4800, oldCustomers: 1300 },
    { year: '2021', newCustomers: 3500, oldCustomers: 2500 },
    { year: '2022', newCustomers: 3700, oldCustomers: 3500 },
    { year: '2023', newCustomers: 5000, oldCustomers: 3700 },
    { year: '2024', newCustomers: 6500, oldCustomers: 4000 },
];


export default function GraphicSubscriber() {
    return (
        <div className='mt-5'>
            <p className='text-2xl mb-3'>24.479</p>
            <div className='flex gap-x-5 mb-5'>
                <div className='flex items center gap-2 px-3 text-md bg-[#16C8C7] text-white rounded-xl w-fit'>
                    8,5%
                    <TrendingUp strokeWidth={1} className='w-4 h-4' />
                </div>
                <p className='text-slate-500'>+432 increased</p>
            </div>
            <div className='h-[350px]'>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart
                        width={730}
                        height={250}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id='colorUv' x1={0} y1={0} y2={1}>
                                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id='colorPv' x1={0} y1={0} y2={1}>
                                <stop offset='5%' stopColor='#88ca9d' stopOpacity={0.8} />
                                <stop offset='95%' stopColor='#88ca9d' stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='year' />
                        <YAxis />
                        <Tooltip />
                        <Area type='monotone' dataKey='newCustomers' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
                        <Area type='monotone' dataKey='oldCustomers' stroke='#82ca9d' fillOpacity={1} fill='url(#colorPv)' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
