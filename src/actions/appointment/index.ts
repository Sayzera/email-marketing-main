'use server';

import { client } from "@/lib/prisma";

export const onDomainCustomerResponses = async (customerId: string) => {
  try {
    const customerQuestions = await client.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });

    if (customerQuestions) {
      return customerQuestions;
    }
  } catch (error) {
    console.log(error);
  }
};
