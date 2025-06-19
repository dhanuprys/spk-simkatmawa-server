import { cn } from '@/lib/utils';
import React from 'react';

interface SafeWidthProps {
    children: React.ReactNode;
    className?: string;
}

export default function SafeWidth({ children, className }: SafeWidthProps) {
    return <div className={cn('mx-auto max-w-[80rem] px-4', className)}>{children}</div>;
}
