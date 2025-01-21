import SidebarRoutes from '../shared/SidebarRoutes';

export default function Sidebar() {
  return (
    <div className='h-screen dark:bg-black'>
      <div className='h-full flex flex-col border'>
        <SidebarRoutes />
      </div>
    </div>
  )
}
