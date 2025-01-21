import ProductsTable from '@/components/products/ProductsTable'

export default async function AnalyticsPage() {

  return (
    <>
      <h2 className='text-2xl mb-4 font-bold'>List of products</h2>
      <div className='shadow-sm bg-background dark:bg-black rounded-lg p-5 border border-gray-200 dark:border-secondary'>
        <div className='flex justify-end'>
        </div>
        <div>
          <ProductsTable />
        </div>
      </div>
    </>
  )
}
