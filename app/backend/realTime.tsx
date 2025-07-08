import { supabase } from "./supabaseClient";
import { useEffect, useRef } from "react";
import { useUI } from "~/context/UIContext";

export function useMaterialsRealtime() {
  const { materials, selectedMaterial, refreshMaterial } = useUI();
  useEffect(() => {
    const channel = supabase
      .channel("realtime:materials")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "materials" },
        (payload) => {
          refreshMaterial();
          console.log("Change received!", payload);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [materials, selectedMaterial]);
}

export function usePricesRealtime(idMaterial?: number) {
  const { refreshMaterial } = useUI();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 500; // ajustar según el ritmo de tus eventos

  useEffect(() => {
    const channel = supabase
      .channel("realtime:prices")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prices" },
        () => {
          // Reiniciar el timer con cada evento
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            refreshMaterial(idMaterial);
            timeoutRef.current = null;
          }, debounceDelay);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
}

export function useUnitsRealTime() {
  const { getUnits } = useUI();
  useEffect(() => {
    const channel = supabase
      .channel("realtime:units")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "units" },
        () => {
          console.log("ejecutando getUnits()");
          getUnits();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
export function useConfigRealTime() {
  const { selectedOpportunity, refreshOpportunity } = useUI();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { getCategorizations } = useUI();
  useEffect(() => {
    const channel = supabase.channel("realtime:categorizations_realtime");

    const tablesToListen = ["families", "categories", "subcategories"];

    tablesToListen.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          console.log(`[${table.toUpperCase()}] Evento recibido:`, payload);

          // Reiniciamos el timer
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            console.log("refrescando categorias");
            getCategorizations();
            timeoutRef.current = null;
          }, 500);
        }
      );
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedOpportunity]);
}
export function useOpportunityRealtime() {
  const { selectedOpportunity, refreshOpportunity } = useUI();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!selectedOpportunity) return;

    const channel = supabase.channel("realtime:opportunity_realtime");

    const tablesToListen = [
      "opportunities",
      "quotes",
      "details_items",
      "details_materials",
      "phases",
    ];

    tablesToListen.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          // Reiniciamos el timer
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            console.log("refrescando oportunidad");
            refreshOpportunity();
            timeoutRef.current = null;
          }, 500);
        }
      );
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedOpportunity]);
}
