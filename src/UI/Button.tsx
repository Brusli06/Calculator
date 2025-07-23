import React from 'react'
import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({className, ...rest }: ButtonProps) => {
    return (
        <button className={clsx('text-white',
            'bg-gray-800',
            'hover:bg-gray-900',
            'focus:outline-none',
            'focus:ring-4',
            'focus:ring-gray-300',
            'font-medium',
            'rounded-lg',
            'text-sm',
            'px-5',
            'py-2.5',
            'me-2',
            'mb-2',
            'cursor-pointer',
            className)} {...rest}/>



        )
}