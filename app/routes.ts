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
  layout("layouts/main.tsx", [
    index("routes/home.tsx"),
    route("opportunities", "routes/opportunities.tsx"),
    route("materials", "routes/materials.tsx"),
    route("settings", "routes/settings.tsx"),
    route("new-opportunity", "routes/newOpportunity.tsx"),
    route("new-material", "routes/newMaterial.tsx"),
    route("projects", "routes/projects.tsx"),
    route("daily_reports", "routes/daily_reports.tsx"),
    ...prefix("opportunity", [
      layout("layouts/opportunity.tsx", [
        route(":id/resumen", "routes/opportunity/resumen.tsx"),
        route(":id/information", "routes/opportunity/information.tsx"),
        route(":id/phases", "routes/opportunity/phases.tsx"),
        route(":id/conditions", "routes/opportunity/conditions.tsx"),
        route(":id/report", "routes/opportunity/report.tsx"),
        layout("routes/opportunity/quotes.tsx", [
          route(":id/quotes/items", "routes/opportunity/quotes/items.tsx"),
          route(
            ":id/quotes/materials",
            "routes/opportunity/quotes/materials.tsx"
          ),
        ]),
      ]),
    ]),
    ...prefix("project", [
      layout("layouts/project.tsx", [
        route(":id/resumen", "routes/project/resumen.tsx"),
        route(":id/information", "routes/project/information.tsx"),
        layout("routes/project/budget.tsx", [
          route(":id/budget/items", "routes/project/budget/items.tsx"),
          route(":id/budget/materials", "routes/project/budget/materials.tsx"),
        ]),
        route(":id/planning", "routes/project/planning.tsx"),
        route(":id/daily_reports", "routes/project/daily_reports.tsx"),
      ]),
    ]),
    ...prefix("material", [
      layout("layouts/material.tsx", [
        route(":id", "routes/material/material.tsx"),
        route(":id/prices", "routes/material/prices.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
