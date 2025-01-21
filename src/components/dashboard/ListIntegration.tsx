import { List } from 'lucide-react'
import CustomIcon from '../shared/CustomIcon'
import TableIntegrations from './integrations/TableIntegrations'

export default function ListIntegration() {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 flex-1 border border-gray-200 dark:border-secondary'>
            <div className='flex gap-x-2 items-center'>
                <CustomIcon
                    icon={List}
                />
                <p className='text-xl font-bold'>List of Integrations</p>
            </div>
            <TableIntegrations />
        </div>
    )
}