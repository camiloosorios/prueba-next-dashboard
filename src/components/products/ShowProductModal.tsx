import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Product } from '@/types';


type ShowProductModalProps = {
    product: Product;
};

export default function ShowProductModal({ product }: ShowProductModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className='text-sm cursor-default hover:bg-gray-100 dark:hover:bg-secondary p-2 w-full inline-block rounded-md'>
                    Show Product
                </span>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]' aria-describedby='show'>
                <DialogHeader>
                    <DialogTitle>Product information</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='title' className='text-right'>
                            Title
                        </Label>
                        <p className='col-span-3 rounded-xl border border-gray-200 dark:border-secondary p-2'>{product.title}</p>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='price' className='text-right'>
                            Price
                        </Label>
                        <p className='col-span-3 rounded-xl border border-gray-200 dark:border-secondary p-2'>{product.price}</p>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='description' className='text-right'>
                            Description
                        </Label>
                        <div className='h-52 xl:h-full col-span-3 rounded-xl border border-gray-200 dark:border-secondary p-2 overflow-scroll xl:overflow-hidden'>
                            {product.description}
                        </div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='category' className='text-right'>
                            Category
                        </Label>
                        <p className='col-span-3 rounded-xl border border-gray-200 dark:border-secondary p-2'>{product.category}</p>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='image' className='text-right'>
                            Image
                        </Label>
                        <div className='col-span-3 space-y-2'>
                            <img
                                src={product.image}
                                alt='Preview'
                                className='h-56 object-cover rounded-md mx-auto'
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
