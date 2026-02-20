import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  route("login", "routes/login.tsx"),
  route("unauthorized", "routes/unauthorizedPage.tsx"),
  route("dev-pdf", "routes/dev-pdf.tsx"),
  layout("layouts/main.tsx", [
    index("routes/home.tsx"),
    ...prefix("rrhh", [
      index("routes/rrhh/home.tsx"),
      route("reports_assistance", "routes/rrhh/reports_assistance.tsx"),
      route("liquidation_report", "routes/rrhh/liquidation_report.tsx"),
      route("consolidated_hours_per_worker", "routes/rrhh/consolidated_hours_per_worker.tsx"),
      route("consolidated_hours_per_project", "routes/rrhh/consolidated_hours_per_project.tsx"),
      route("consolidated_hours_per_worker/pdf", "routes/rrhh/consolidated_hours_per_worker_pdf.tsx"),
      route("consolidated_hours_per_project/pdf", "routes/rrhh/consolidated_hours_per_project_pdf.tsx"),
    ]),
    ...prefix("opportunities", [
      index("routes/opportunities/home.tsx"),
      route("new-opportunity", "routes/opportunities/new-opportunity.tsx"),
      layout("layouts/opportunity.tsx", [
        route(":id/resumen", "routes/opportunities/resumen.tsx"),
        route(":id/information", "routes/opportunities/information.tsx"),
        route(":id/phases", "routes/opportunities/phases.tsx"),
        route(":id/conditions", "routes/opportunities/conditions.tsx"),
        route(":id/report", "routes/opportunities/report.tsx"),
        layout("routes/opportunities/quotes.tsx", [
          route(":id/quotes/items", "routes/opportunities/quotes/items.tsx"),
          route(
            ":id/quotes/materials",
            "routes/opportunities/quotes/materials.tsx",
          ),
        ]),
      ]),
    ]),
    ...prefix("projects", [
      index("routes/projects/home.tsx"),
      route("new-daily-report", "routes/projects/new-daily-report.tsx"),
      layout("layouts/project.tsx", [
        route(":id/resumen", "routes/projects/resumen.tsx"),
        route(":id/information", "routes/projects/information.tsx"),
        layout("routes/projects/budget.tsx", [
          route(":id/budget/items", "routes/projects/budget/items.tsx"),
          route(":id/budget/materials", "routes/projects/budget/materials.tsx"),
        ]),
        route(":id/planning", "routes/projects/planning.tsx"),
        route(":id/daily_reports", "routes/projects/daily_reports.tsx"),
      ]),
    ]),
    ...prefix("materials", [
      index("routes/materials/home.tsx"),
      route("new-material", "routes/materials/new-material.tsx"),
      layout("layouts/material.tsx", [
        route(":id", "routes/materials/material.tsx"),
        route(":id/prices", "routes/materials/prices.tsx"),
      ]),
    ]),
    ...prefix("settings", [
      index("routes/settings/home.tsx"),
      route("generals", "routes/settings/generals.tsx"),
      route("calendar", "routes/settings/calendar.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
