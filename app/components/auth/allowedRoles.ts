import type { Roles } from "~/context/AuthContext";
export const ALLOWED_MATERIALS: Roles[] = ["administrador", "dueño", "coordinador"];
export const ALLOWED_NEW_MATERIAL: Roles[] = ["administrador", "dueño"];
export const ALLOWED_NEW_OPPORTUNITY: Roles[] = ["administrador", "dueño", "coordinador"];
export const ALLOWED_OPPORTUNITIES: Roles[] = ["administrador", "dueño", "coordinador"];
export const ALLOWED_REPORTS_EMPLOYEES: Roles[] = ["administrador", "dueño"];
export const ALLOWED_SETTINGS: Roles[] = ["administrador", "dueño", "coordinador"];
export const ALLOWED_PROJECTS: Roles[] = ["administrador", "dueño", "supervisor", "coordinador"];
export const ALLOWED_RRHH: Roles[] = ["administrador", "dueño"];
