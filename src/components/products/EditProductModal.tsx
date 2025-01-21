import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/store';
import { Product } from '@/types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type EditProductModalProps = {
    product: Product;
};

export function EditProductModal({ product }: EditProductModalProps) {
    const [formData, setFormData] = useState<Product>(product);
    const [previewImage, setPreviewImage] = useState<string>(product.image);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const products = useAppStore(state => state.products);
    const categories = useAppStore(state => state.categories);
    const setProducts = useAppStore(state => state.setProducts)

    useEffect(() => {
        setHasErrors(Object.values(formData).includes('') || !formData.title || !formData.price || !formData.description);
    }, [formData]);

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            setPreviewImage(imageUrl);
            setFormData(prev => ({
                ...prev,
                image: imageUrl,
            }));
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (hasErrors) return;
        const newProducts = products.map(p => p.id === product.id ? formData : p);
        setProducts(newProducts);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleCategoryChange = (category: string) => {
        setFormData((prev) => ({
            ...prev,
            category,
        }));
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className='text-sm cursor-default hover:bg-gray-100 dark:hover:bg-secondary p-2 w-full inline-block rounded-md'>
                    Edit Product
                </span>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]' aria-describedby='edit'>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        Make changes to the product here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='title' className='text-right'>
                            Title
                        </Label>
                        <Input
                            id='title'
                            value={formData.title}
                            className='col-span-3'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='price' className='text-right'>
                            Price
                        </Label>
                        <Input
                            id='price'
                            value={formData.price}
                            className='col-span-3'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='description' className='text-right'>
                            Description
                        </Label>
                        <Textarea
                            id='description'
                            value={formData.description}
                            className='col-span-3'
                            rows={5}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='description' className='text-right'>
                            Category
                        </Label>
                        <Select value={formData.category} onValueChange={handleCategoryChange}>
                            <SelectTrigger className='w-[280px]'>
                                <SelectValue placeholder='Select a category' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='image' className='text-right'>
                            Image
                        </Label>
                        <div className='col-span-3 space-y-2'>
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt='Preview'
                                    className='h-56 object-cover rounded-md mx-auto'
                                />
                            )}
                            <Input
                                id='image'
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>
                </div>
                {hasErrors && (
                    <p className='font-italic text-red-700 text-sm text-center mb-5'>All fields are required</p>
                )}
                <DialogFooter>
                    <Button type='button' onClick={handleSubmit} disabled={hasErrors}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
