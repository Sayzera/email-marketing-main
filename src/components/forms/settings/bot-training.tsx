'use client'
import TabsMenu from "@/components/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { HELP_DESK_TABS_MENU } from "@/constants/menu";
import React from "react";
import HelpDesk from "./help-desk";
import FilterQuestions from "./filter-questions";

type Props = {
  id: string;
};

export default function BotTrainingForm({ id }: Props) {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div>
        <h2 className="font-bold text-2xl">Bot Eğitimi</h2>
        <p className="text-sm font-light">
          SSS soruları belirleyin, potansiyel müşteri bilgilerini yakalamak için
          sorular oluşturun ve botunuzu istediğiniz şekilde hareket etmesi için
          eğitin
        </p>
      </div>

      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent value="help desk" className="w-full">
          <HelpDesk id={id}  />
        </TabsContent>
        <TabsContent value="questions" className="w-full">
          <FilterQuestions  id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  );
}
