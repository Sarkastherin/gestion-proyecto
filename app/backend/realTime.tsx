import { supabase } from "./supabaseClient";
import { useEffect, useRef } from "react";
import { useUI } from "~/context/UIContext";
import { useData } from "~/context/DataContext";

export function useMaterialsAndPricesRealtime(idMaterial?: number) {
  const { refreshMaterial } = useData();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 500;

  useEffect(() => {
    const channel = supabase.channel("realtime:materials_prices");

    const tablesToListen = ["materials", "prices"];

    tablesToListen.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          console.log(`[${table.toUpperCase()}] Evento recibido:`, payload);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            refreshMaterial(idMaterial);
            timeoutRef.current = null;
          }, debounceDelay);
        }
      );
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [idMaterial]);
}
export function useUnitsRealTime() {
  const { getUnits } = useData();
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
  const { selectedOpportunity } = useData();
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
  const { selectedOpportunity, refreshOpportunity } = useData();
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
          console.log(`[${table.toUpperCase()}] Evento recibido:`, payload);
          // Reiniciamos el timer
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
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
  }, []);
}
export function useProjectRealtime() {
  const { selectedProject, refreshProject } = useData();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!selectedProject) return;
    const channel = supabase.channel("realtime:project_realtime");
    const tablesToListen = [
      "projects",
      "phases_project",
      "budget_details_items",
      "budget_details_materials"
    ];
    tablesToListen.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          console.log(`[${table.toUpperCase()}] Evento recibido:`, payload);
          // Reiniciamos el timer
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            refreshProject();
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
  }, []);
}
export function useTasksRealtime() {
  const { selectedProject, refreshProject } = useData();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!selectedProject) return;
    const channel = supabase.channel("realtime:tasks_realtime");
    const tablesToListen = [
      "tasks",
      "task_assignments"
    ];
    tablesToListen.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          console.log(`[${table.toUpperCase()}] Evento recibido:`, payload);
          // Reiniciamos el timer
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            refreshProject();
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
  }, []);
}
