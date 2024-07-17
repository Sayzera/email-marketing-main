import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    register: UseFormRegister<FieldValues>
    domains?:
    | {
        name: string;
        id: string;
        icon: string
    }[] | undefined
}

function ConversationSearch({
    domains,
    register
}: Props) {
    return (
        <div className='flex flex-col py-3'>
            <select
                {...register('domain')}
                className='px-3 py-3 text-sm border-[1px] rounded-lg mr-5'
            >
                <option disabled selected>
                    Alan Adı
                </option>

                {
                    domains?.map((domain) => (
                        <option
                            key={domain.id}
                            value={domain.id}
                        >
                            {domain.name}
                        </option>
                    ))
                }

            </select>
        </div>
    )
}

export default ConversationSearch