import 'react';

declare module 'react'
{
    interface CSSProperties
    {
        '--target-x'?: string;
        '--target-y'?: string;
    }
}