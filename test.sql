

CREATE TABLE public.categories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text NOT NULL UNIQUE,
  id_family bigint,
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT category_id_family_fkey FOREIGN KEY (id_family) REFERENCES public.families(id)
);
CREATE TABLE public.details_items (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id_phase bigint NOT NULL,
  type USER-DEFINED NOT NULL,
  item text NOT NULL,
  quantity double precision NOT NULL,
  unit_cost double precision NOT NULL,
  notes text,
  observations text,
  id_quote bigint NOT NULL,
  CONSTRAINT details_items_pkey PRIMARY KEY (id),
  CONSTRAINT details_items_id_quote_fkey FOREIGN KEY (id_quote) REFERENCES public.quotes(id),
  CONSTRAINT details_id_phase_fkey FOREIGN KEY (id_phase) REFERENCES public.phases(id)
);
CREATE TABLE public.details_materials (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id_phase bigint NOT NULL,
  type text NOT NULL DEFAULT ''::text,
  id_material bigint NOT NULL,
  quantity double precision,
  id_price bigint NOT NULL,
  notes text,
  observations text,
  id_quote bigint,
  CONSTRAINT details_materials_pkey PRIMARY KEY (id),
  CONSTRAINT details_materials_id_price_fkey FOREIGN KEY (id_price) REFERENCES public.prices(id),
  CONSTRAINT details_materials_id_material_fkey FOREIGN KEY (id_material) REFERENCES public.materials(id),
  CONSTRAINT details_materials_id_phase_fkey FOREIGN KEY (id_phase) REFERENCES public.phases(id),
  CONSTRAINT details_materials_id_quote_fkey FOREIGN KEY (id_quote) REFERENCES public.quotes(id)
);
CREATE TABLE public.families (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text NOT NULL UNIQUE,
  CONSTRAINT families_pkey PRIMARY KEY (id)
);

CREATE TABLE public.materials (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id_subcategory bigint NOT NULL,
  description text NOT NULL UNIQUE,
  id_unit bigint,
  weight double precision,
  attribute jsonb,
  applycation text,
  active boolean DEFAULT true,
  CONSTRAINT materials_pkey PRIMARY KEY (id),
  CONSTRAINT materials_id_unit_fkey FOREIGN KEY (id_unit) REFERENCES public.units(id),
  CONSTRAINT materials_id_subcategory_fkey FOREIGN KEY (id_subcategory) REFERENCES public.subcategories(id)
);

CREATE TABLE public.opportunities (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  scope text,
  id_client bigint NOT NULL,
  loss_reason text,
  status text NOT NULL DEFAULT 'Nuevo'::text,
  created_by text,
  history_data jsonb,
  CONSTRAINT opportunities_pkey PRIMARY KEY (id),
  CONSTRAINT opportunities_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_name)
);
CREATE TABLE public.phases (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  id_opportunity bigint NOT NULL,
  history_data jsonb,
  CONSTRAINT phases_pkey PRIMARY KEY (id),
  CONSTRAINT phases_id_opportunity_fkey FOREIGN KEY (id_opportunity) REFERENCES public.opportunities(id)
);
CREATE TABLE public.prices (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id_material bigint NOT NULL,
  id_supplier bigint NOT NULL,
  price double precision NOT NULL,
  default boolean NOT NULL,
  date date,
  CONSTRAINT prices_pkey PRIMARY KEY (id),
  CONSTRAINT prices_id_material_fkey FOREIGN KEY (id_material) REFERENCES public.materials(id)
);
CREATE TABLE public.profit_margins (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id_quote bigint NOT NULL,
  materials double precision DEFAULT '0'::double precision,
  labor double precision DEFAULT '0'::double precision,
  subcontracting double precision DEFAULT '0'::double precision,
  others double precision DEFAULT '0'::double precision,
  general double precision DEFAULT '0'::double precision,
  id_opportunity bigint,
  CONSTRAINT profit_margins_pkey PRIMARY KEY (id),
  CONSTRAINT profit_margins_id_quote_fkey FOREIGN KEY (id_quote) REFERENCES public.quotes(id)
);
CREATE TABLE public.quotes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id_opportunity bigint NOT NULL,
  method_payment text,
  validity date,
  delivery_time text,
  guarantee text,
  status text NOT NULL DEFAULT 'Abierta'::text,
  active boolean NOT NULL DEFAULT true,
  estimated_start_date date,
  history_data jsonb,
  notes text,
  materials double precision DEFAULT '0'::double precision,
  labor double precision DEFAULT '0'::double precision,
  subcontracting double precision DEFAULT '0'::double precision,
  others double precision DEFAULT '0'::double precision,
  general double precision DEFAULT '0'::double precision,
  CONSTRAINT quotes_pkey PRIMARY KEY (id),
  CONSTRAINT quotations_id_opportunity_fkey FOREIGN KEY (id_opportunity) REFERENCES public.opportunities(id)
);
CREATE TABLE public.subcategories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text NOT NULL,
  id_category bigint,
  CONSTRAINT subcategories_pkey PRIMARY KEY (id),
  CONSTRAINT subcategory_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.categories(id)
);
CREATE TABLE public.units (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text NOT NULL UNIQUE,
  abbreviation text NOT NULL UNIQUE,
  CONSTRAINT units_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id_user uuid NOT NULL UNIQUE,
  name text,
  last_name text,
  roll text NOT NULL DEFAULT 'estandar'::text,
  user_name text NOT NULL UNIQUE,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_user_fkey FOREIGN KEY (id_user) REFERENCES auth.users(id)
);