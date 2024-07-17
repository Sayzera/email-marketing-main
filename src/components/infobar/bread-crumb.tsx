"use client";
import useSidebar from "@/context/use-sidebar";
import React from "react";
import Loader from "../loader";
import { Switch } from "../ui/switch";

type Props = {};

export default function BreadCrumb({}: Props) {
  // WIP: set up use side bar hook for real time chat and chat bot stuff
  const {
    chatRoom,
    expand,
    loading,
    onActivteRealtime,
    onExpand,
    page,
    onSignOut,
    realtime,
  } = useSidebar();
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
        {page === "conversation" && chatRoom && (
          <Loader loading={loading} className="p-0">
            <Switch 
                defaultChecked={realtime}
                onClick={(e) => onActivteRealtime(e)}
                className="data-[state=checked]:bg-orange 
                data-[state=unchecked]:pg-peach
                "
            />
          </Loader>
        )}
      </div>

      <p className="text-gray-500 text-sm">
        {page === "settings"
          ? "Tercihlerinizi ve Entegrasyonlarınızı ayarlardan yönetiniz."
          : page == "dashboard"
          ? "Müşterilerinize gelişmiş rapor ekranı sunun"
          : page == "appointment"
          ? "Tüm randevularınızı inceleyin veya düzenleyin"
          : page == "email-marketing"
          ? "Toplu olarak müşterilerinize mail gönderin"
          : page == "integration"
          ? "Corinna-AI dan 3.parti uygulamalara bağlanın"
          : "Domain ayarlarını, chatbot ayarları, satış kayıtları, gelen sorular gibi düzenlemeri yapın"}
      </p>
    </div>
  );
}
