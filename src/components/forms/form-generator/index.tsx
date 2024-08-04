'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { Textarea } from '@/components/ui/textarea'

type Props = {
    type: 'text' | 'email' | 'password'
    inputType: 'select' | 'input' | 'textarea'
    options?: {
        value: string;
        label: string;
        id: string;
    }[]
    label?: string;
    placeholder: string;
    register: UseFormRegister<any>
    name: string;
    errors: FieldErrors<FieldValues>
    lines?: number;
    form?: string;
    disabled?:boolean
    defaultValue?:string
}

export default function FormGenerator({
    type,
    inputType,
    options,
    label,
    placeholder,
    register,
    name,
    errors,
    lines,
    form,
    disabled=false,
    defaultValue
    
}: Props) {
    switch (inputType) {
        case 'input':
            return (
                <Label htmlFor={`input-${label}`} className='flex flex-col gap-2'>
                    {
                        label && (
                            <Label>
                            {label}
                        </Label>
                        )
                    }
                        <Input
                            id={`input-${label}`}
                            type={type}
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            form={form}
                            disabled={disabled}
                            {...register(name)}
                        />
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>
                                {
                                    message === 'Required' ? '' : message
                                }
                            </p>
                        )}
                    />
                </Label>
            )
        case 'select':
            return (
                <Label className='flex flex-col gap-2'>
                    {label && (
                        <select
                            id={`input-${label}`}
                            form={form}
                            {...register(name)}
                        >
                            {
                                options?.length &&
                                options.map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.id}
                                    >
                                        {option.label}
                                    </option>
                                ))
                            }

                        </select>
                    )}
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>
                                {
                                    message === 'Required' ? '' : message
                                }
                            </p>
                        )}
                    />
                </Label>
            )
        case 'textarea':
            return (
                <Label htmlFor={`input-${label}`} className='flex flex-col gap-2'>
                    {label && (
                        <Textarea
                          disabled={disabled}
                            id={`input-${label}`}
                            placeholder={placeholder}
                            form={form}
                            defaultValue={defaultValue}
                            {...register(name)}
                            rows={lines}
                        />
                    )}
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>
                                {
                                    message === 'Required' ? '' : message
                                }
                            </p>
                        )}
                    />
                </Label>
            )
        default:
            return <></>

    }
   
}