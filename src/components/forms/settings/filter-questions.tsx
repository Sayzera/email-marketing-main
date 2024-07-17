"use client";
import Section from "@/components/section";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useFilterQuestions, useHelpDesk } from "@/hooks/settings/use-settings";
import React from "react";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import Accordion from "@/components/accordion";

type Props = {
  id: string;
};

export default function FilterQuestions({ id }: Props) {
  const { register, errors, onAddFilterQuestions, isQuestions, loading } =
  useFilterQuestions(id);

  console.log(isQuestions)
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form onSubmit={onAddFilterQuestions} className="flex flex-col gap-6 mt-10">
          <div className="flex flex-col gap-3">
            <Section label="Soru" message="Sorunuzu yazın" />
          </div>

          <FormGenerator
            inputType="input"
            register={register}
            errors={errors}
            form="filter-question-form"
            name="question"
            placeholder="Sorunuzu yazınız"
            type="text"
            label="Sorunuzu yazınız"
          />

          <div className="flex flex-col gap-3">
            <Section label="Cevap" message="Cevabınızı yazın" />
          </div>
          <FormGenerator
            inputType="textarea"
            register={register}
            errors={errors}
            form="filter-question-form"
            name="answered"
            placeholder="Cevabınızı yazınız"
            type="text"
            label="Cevabınızı yazınız"
            lines={5}
          />

          <Button
            type="submit"
            className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            Kaydet
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {
            isQuestions?.length ?
            isQuestions.map((question) => (
              <p 
              
              key={question.id}
              className="font-bold"
              >
                {question.question}
              </p>
            )) : (
              <CardDescription>
                Soru bulunamadı
              </CardDescription>
            )
          }
        </Loader>
      </CardContent>
    </Card>
  );
}
