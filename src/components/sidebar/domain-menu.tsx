"use client";
import { useDomain } from "@/hooks/sidebar/use-domain";
import { cn } from "@/lib/utils";
import React from "react";
import AppDrawer from "../drawer";
import Loader from "../loader";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import FormGenerator from "../forms/form-generator";
import UploadButton from "../upload-button";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  min?: boolean;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

export default function DomainMenu({ min, domains }: Props) {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain();

  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">Alan Adları</p>}
        <AppDrawer
          description="Sohbet botunuzu entegre etmek için alan adınızı ekleyiniz."
          title="İşletmenizin alan adını ekleyin"
          onOpen={
            <div className="cursor-pointer text-gray-500 roundede-full border-2">
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
             className="mt-3 w-6/12 flex flex-col gap-3"
             onSubmit={onAddDomain}
            > 
            <FormGenerator
              inputType="input"
              register={register}
              label="Alan Adı"
              name='domain'
              errors={errors}
              placeholder="my@domain.com"
              type="text"
            />

            <UploadButton
              register={register}
              label="Alan Adı İkonu"
              errors={errors}
            />

            <Button 
             type="submit"
             className="w-full"
            >
              Alan adı ekle
            </Button>

            </form>
          </Loader>
        </AppDrawer>
      </div>

      <div className="flex flex-col gap-1 text-ironside font-medium">
            {
              domains && 
                domains?.map((domain) => (
                  <Link 
                    href={`/settings/${domain.name.split('.')[0]}`}
                    key={domain.id}
                    className={cn('flex gap-3 items-center  hover:bg-white rounded-lg transition duration-100 ease-in-out cursor-pointer',
                        !min ? 'p-2' : 'py-2',
                        min ? 'justify-center' : 'justify-start',
                        domain.name.split('.')[0] === isDomain && 'bg-white'

                    )}>
                      <Image 
                        src={`https://ucarecdn.com/${domain.icon}/`}
                        
                        alt="logo"
                        height={20}
                        width={20}
                      />
                      {!min && <p className="text-sm">{domain.name}</p>}
                    </Link>
                ))
            }
      </div>
    </div>
  );
}
