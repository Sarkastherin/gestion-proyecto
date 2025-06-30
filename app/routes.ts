import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  route("login", "routes/login.tsx"),
  layout("layouts/main.tsx", [
    index("routes/home.tsx"),
    route("opportunities", "routes/opportunities.tsx"),
    route("materials", "routes/materials.tsx"),
    route("settings", "routes/settings.tsx"),
    route("new-opportunity", "routes/newOpportunity.tsx"),
    route("new-material", "routes/newMaterial.tsx"),
    ...prefix("opportunity", [
      layout("layouts/opportunity.tsx", [
        route(":id/resumen", "routes/opportunity/resumen.tsx"),
        route(":id/information", "routes/opportunity/information.tsx"),
        route(":id/phases","routes/opportunity/phases.tsx"),
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
    ...prefix("material", [
      layout("layouts/material.tsx", [
        route(":id", "routes/material/material.tsx"),
        route(":id/prices", "routes/material/prices.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
