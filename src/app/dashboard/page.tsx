import CardSummary from '@/components/dashboard/CardSummary';
import CategoriesDistribution from '@/components/dashboard/CategoriesDistribution';
import ListIntegration from '@/components/dashboard/ListIntegration';
import SalesDistributor from '@/components/dashboard/SalesHistory';
import { BookOpenCheck, UsersRound, Waypoints } from 'lucide-react';

export default function DashboardPage() {

  return (
    <div>
      <h2 className='text-2xl mb-4 font-bold'>Dashboard</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20'>
        <CardSummary
          icon={UsersRound}
          total='210'
          average={16.67}
          title="Last month's sales"
          tooltipText='See all of the sales details'
        />
        <CardSummary
          icon={Waypoints}
          total='$107,000'
          average={12.5}
          title='Total Revenue'
          tooltipText='See all of the revenue summary'
        />
        <CardSummary
          icon={BookOpenCheck}
          total='$185,089'
          average={79}
          title='Potential Lost Revenue'
          tooltipText='See details about lost revenue'
        />

      </div>
      <div className='grid grid-cols-1 xl:grid-cols-2 mt-12 md:gap-x-10'>
        <SalesDistributor />
        <CategoriesDistribution />
      </div>
      <div className='flex flex-col xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center'>
        <ListIntegration />
      </div>
    </div>
  )
}
