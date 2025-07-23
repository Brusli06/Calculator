import React from 'react'
import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Keyboard = ({className, ...rest}: ButtonProps) => {
    return (
        <button className={clsx('cursor-pointer',
            'bg-[#4a4a4a]',
            
            'rounded-lg',
            'p-3',
            className)} {...rest}
        />
    )
}