import React, { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { MessageCircle } from 'lucide-react';
import tailwindStyles from '../index.css?inline';
import supabase from '@/supabaseClient';


const Widget = ({ projectId }) => {

    const [rating, setRating] = useState(3);
    const [submitted, setSubmitted] = useState(false);

    const onSelectStar = (index) => {
        setRating(index + 1);
    }

    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            p_project_id: projectId,
            p_user_name: form.name.value,
            p_user_email: form.email.value,
            p_message: form.feedback.value,
            p_rating: rating
        };
        const { data: supabaseData, error } = await supabase.rpc('add_feedback', data);
        setSubmitted(true);
        console.log(supabaseData);
    }

    return (
        <>
            <style>{tailwindStyles}</style>
            <div className='widget fixed bottom-4 right-4 z-56'>
                {/* Widget */}
                <Popover>
                    <PopoverTrigger asChild>
                    <Button className='flex-row gap-2 font-semibold rounded-full shadow-lg hover:scale-105' ><MessageCircle className='mr-0 h-5 w-5' />Feedback</Button>
                    </PopoverTrigger>
                    <PopoverContent className='widget rounded-lg bg-card p-4 shadow-lg w-full max-w-md'>
                    <style>{tailwindStyles}</style>
                    { submitted ? 
                    (<>
                        <div className='text-md font-semibold'>Thanks for the feedback</div>
                        <p className='mt-4'>We appriciate your feedback. It helps us improve our product and provide better service to our customers</p>
                    </>) :
                    (<div>
                        <h3 className='text-lg font-bold'>Send us your feedback</h3>
                        <form className='space-y-2' onSubmit={submit}>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label htmlFor='name'>Name</Label>
                                    <Input
                                        id='name'
                                        placeholder='Enter your name'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        type='email'
                                        placeholder='Enter your email'
                                    />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='feedback'>Feedback</Label>
                                <Input
                                    id='feedback'
                                    placeholder='Enter what you think'
                                    className='min-h-[100px]'
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    {[...Array(5)].map((_, index) => (
                                        <StarIcon 
                                            key={index}
                                            className={`h-5 w-5 cursor-pointer ${
                                                rating > index ? 'fill-primary' :
                                                'fill-muted stroke-muted-foreground'
                                            }`}
                                            onClick={() => onSelectStar(index)}
                                        />
                                    ))}
                                </div>
                                <Button type='submit'>Submit</Button>
                            </div>
                        </form>
                    </div>)}
                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}

export default Widget;

const StarIcon = (props) => {   
    return (
        <svg
        {...props} 
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24" 
        viewBox="0 0 24 24"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        // className="lucide lucide-star"
        >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
};

// export default { StarIcon, Widget }