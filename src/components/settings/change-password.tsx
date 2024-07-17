"use client";
import { useChangePassword } from "@/hooks/settings/use-settings";
import React from "react";
import Section from "../section";
import FormGenerator from "../forms/form-generator";
import { Button } from "../ui/button";
import Loader from "../loader";

type Props = {};

function ChangePassword({}: Props) {
  const { register, errors, onChangePassword, loading } = useChangePassword();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section label="Şifre Değiştir" message="Şifrenizi güncelleyin." />
      </div>
      <form onSubmit={onChangePassword} className="lg:col-span-4 py-4">
        <div className="lg:w-[500px] flex flex-col gap-3">
          <FormGenerator
            register={register}
            errors={errors}
            name="password"
            label="Yeni Şifre"
            placeholder="Yeni Şifre"
            type="text"
            inputType="input"
          />

          <FormGenerator
            register={register}
            errors={errors}
            name='confirmPassword'
            label="Tekrar Şifre"
            placeholder="Tekrar Şifre"
            type="text"
            inputType="input"
          />

          <Button type="submit" className="bg-grandis text-gray-700 font-semibold
           hover:text-white
          ">
            <Loader loading={loading}>
                Şifreyi Değiştir
            </Loader>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
