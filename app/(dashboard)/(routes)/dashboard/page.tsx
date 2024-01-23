"use client";

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';


const tools = [
    {
        label: "Email generator",
        icon: MessageSquare,
        href: "/email-generator",
        color: "text-violet-500",
        bgColor : "bg-violet-500/10",
        
    }

]

export default function DashboardPage() {

    const router = useRouter()
    return (
        <div>
            <div className='mb-8 space-y-4'>
                <h2 className='text-2xl md:text-4xl font-bold text-center'>
                    Generate your emails
                </h2>
                <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
                  Use our AI assistant to generate awesome emails!

                </p>
                <div className='px-4 md:px-20 lg:px-32 space-y-4'>
                    {tools.map((tool) => (
                        <Card key={tool.href}
                            onClick={() => router.push(tool.href)}
                            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                        >
                            <div className='flex items-center gap-x-4'>
                                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                    <tool.icon className={cn('w-8 h-8', tool.color)} />

                                </div>
                                <div className='font-semibold'>
                                    {tool.label}
                                </div>

                            </div>
                            <ArrowRight className='w-5 h-5' />
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    )
}
