'use client'
import { useAppStore } from '@/store/store';
import { Percent } from 'lucide-react';
import { useEffect } from 'react';
import {
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import CustomIcon from '../shared/CustomIcon';

export default function CategoriesDistribution() {

    const loadInitialData = useAppStore(state => state.loadInitialData);
    const products = useAppStore(state => state.products);

    useEffect(() => {
        if (!products.length) {
            loadInitialData();
        }
    }, []);


    const categoryColors = {
        "electronics": "#8884D8",
        "jewelery": "#c4dbd7",
        "men's clothing": "#FFBB28",
        "women's clothing": "#FF8042"
    };

    const categoriesDistribution = products.reduce((acc: { [key: string]: { name: string, value: number, fill: string } }, product) => {
        const category = product.category as keyof typeof categoryColors;
        if (!acc[category]) {
            acc[category] = { name: category, value: 0, fill: categoryColors[category] };
        }
        acc[category].value += 1;
        return acc;
    }, {});

    const data = Object.values(categoriesDistribution);

    return (
        <div className='mt-10 xl:mt-0 shadow-sm bg-background dark:bg-black rounded-lg p-5 border border-gray-200 dark:border-secondary flex flex-col justify-between'>
            <div className='flex gap-x-2 items-center mb-4'>
                <CustomIcon icon={Percent} />
                <p className='text-xl font-bold text-center'>Product Category Distribution</p>
            </div>
            <div className='w-full h-[300px] lg:h-[400px] md:h-[350px] p-5'>
                <ResponsiveContainer aspect={1} maxHeight={300}>
                    <PieChart>
                        <Pie
                            dataKey='value'
                            data={data}
                            outerRadius={88}
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
