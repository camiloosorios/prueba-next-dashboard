import { BarChart } from 'lucide-react'
import CustomIcon from '../shared/CustomIcon'
import GraphicSubscriber from './sales/GraphicSubscriber'


export default function SalesHistory() {
  return (
    <div className='h-fit'>
      <div className='shadow-sm bg-background dark:bg-black rounded-lg p-5 border border-gray-200 dark:border-secondary'>
        <div className='flex gap-2'>
          <CustomIcon
            icon={BarChart}
          />
          <p className='text-xl font-bold'>Sales History</p>
        </div>
        <GraphicSubscriber />
      </div>
    </div>
  )
}
