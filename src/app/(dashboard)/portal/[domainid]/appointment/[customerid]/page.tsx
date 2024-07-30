import { onDomainCustomerResponses } from '@/actions/appointment'
import React from 'react'

type Props = {
    params: {
        domainid:string
        customerid:string
    }
}

export default async function CustomerSignUpForm({params}: Props) {
    const questions = await onDomainCustomerResponses(params.customerid)
  return (
    <div>CustomerPage</div>
  )
}