-- ============================================================
-- PLATAFORMA 3BE — MIGRACIÓN INICIAL
-- Multi-Tenancy, Diagnóstico Anónimo, Formación y RLS
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 1. TABLA TENANTS
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  nit text unique,
  dominio text,
  logo_url text,
  plan text check (plan in ('free','starter','pro','enterprise')) default 'starter',
  max_colaboradores int default 10,
  activo boolean default true,
  fecha_inicio timestamptz,
  fecha_fin timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- 2. TABLA PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid references public.tenants(id) on delete set null,
  email text not null unique,
  nombre text not null,
  rol text not null check (rol in ('superadmin','admin_tenant','rrhh','directivo','colaborador','cliente_b2c')) default 'cliente_b2c',
  avatar_url text,
  telefono text,
  activo boolean default true,
  ultimo_acceso timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);
create index if not exists idx_profiles_tenant on public.profiles(tenant_id);
create index if not exists idx_profiles_email on public.profiles(email);

-- 3. TABLA ROLES_PERMISOS
create table if not exists public.roles_permisos (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  rol text not null,
  permiso text not null,
  created_at timestamptz default now()
);

-- 4. TABLA INVITACIONES
create table if not exists public.invitaciones (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  email text not null,
  rol text not null default 'colaborador',
  token text unique not null default encode(gen_random_bytes(24), 'hex'),
  estado text check (estado in ('pendiente','aceptada','expirada')) default 'pendiente',
  enviada_por uuid references public.profiles(id),
  expira_en timestamptz default now() + interval '7 days',
  created_at timestamptz default now()
);

-- 5. TABLA TALLERES
create table if not exists public.talleres (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  titulo text not null,
  descripcion text,
  nivel text check (nivel in ('basico','intermedio','avanzado')) default 'basico',
  es_premium boolean default false,
  precio_cop numeric(12,2) default 0,
  precio_empresa_cop numeric(12,2) default 0,
  imagen_url text,
  duracion_total_min int default 0,
  num_lecciones int default 0,
  activo boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. TABLA LECCIONES
create table if not exists public.lecciones (
  id uuid primary key default gen_random_uuid(),
  taller_id uuid references public.talleres(id) on delete cascade,
  numero int not null,
  titulo text not null,
  descripcion text,
  tipo text check (tipo in ('video','ejercicio','lectura','check')) default 'video',
  video_url text,
  duracion_min int default 0,
  contenido_texto text,
  preguntas_ejercicio jsonb,
  created_at timestamptz default now()
);

-- 7. TABLA VIDEOS_STORAGE
create table if not exists public.videos_storage (
  id uuid primary key default gen_random_uuid(),
  leccion_id uuid references public.lecciones(id) on delete cascade,
  storage_path text not null,
  duracion_seg int default 0,
  formato text default 'mp4',
  tamano_bytes bigint,
  es_premium boolean default false,
  created_at timestamptz default now()
);

-- 8. TABLA PROGRESO_USUARIO
create table if not exists public.progreso_usuario (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  leccion_id uuid references public.lecciones(id) on delete cascade,
  visto boolean default false,
  visto_en timestamptz,
  tiempo_seg int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint uq_progreso_user_leccion unique (user_id, leccion_id)
);

-- 9. TABLA NOTAS_USUARIO
create table if not exists public.notas_usuario (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  leccion_id uuid references public.lecciones(id) on delete cascade,
  texto text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. TABLA PRODUCTOS
create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  taller_id uuid references public.talleres(id) on delete set null,
  nombre text not null,
  descripcion text,
  tipo text check (tipo in ('taller_individual','paquete','suscripcion')) default 'taller_individual',
  precio_b2c_cop numeric(12,2) default 0,
  precio_b2b_cop numeric(12,2) default 0,
  activo boolean default true,
  created_at timestamptz default now()
);

-- 11. TABLA ORDENES
create table if not exists public.ordenes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  producto_id uuid references public.productos(id) on delete set null,
  cantidad int default 1,
  monto_total_cop numeric(12,2) not null default 0,
  estado text check (estado in ('pendiente','pagada','cancelada','reembolsada')) default 'pendiente',
  metodo_pago text,
  referencia_pasarela text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12. TABLA PAGOS
create table if not exists public.pagos (
  id uuid primary key default gen_random_uuid(),
  orden_id uuid references public.ordenes(id) on delete cascade,
  pasarela text not null,
  transaccion_id text,
  monto_cop numeric(12,2) not null,
  estado text check (estado in ('iniciado','aprobado','rechazado','reembolsado')) default 'iniciado',
  respuesta_raw jsonb,
  created_at timestamptz default now()
);

-- 13. TABLA FACTURAS
create table if not exists public.facturas (
  id uuid primary key default gen_random_uuid(),
  orden_id uuid references public.ordenes(id) on delete cascade,
  tenant_id uuid references public.tenants(id) on delete set null,
  numero_factura text unique not null,
  monto_cop numeric(12,2) not null,
  pdf_url text,
  dian_cufe text,
  created_at timestamptz default now()
);

-- 14. TABLA LICENCIAS
create table if not exists public.licencias (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  taller_id uuid references public.talleres(id) on delete cascade,
  cantidad int default 1,
  usadas int default 0,
  origen text check (origen in ('compra','asignacion','demo')) default 'compra',
  orden_id uuid references public.ordenes(id) on delete set null,
  fecha_inicio timestamptz,
  fecha_fin timestamptz,
  activa boolean default true,
  created_at timestamptz default now()
);

-- 15. TABLA TESTS_FRECUENCIA
create table if not exists public.tests_frecuencia (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  tenant_id uuid references public.tenants(id) on delete set null,
  respuestas jsonb not null,
  puntaje_z1 int,
  puntaje_z2 int,
  puntaje_z3 int,
  puntaje_z4 int,
  puntaje_z5 int,
  puntaje_z6 int,
  zona_predominante text,
  zona_nombre text,
  zona_color text,
  timestamp timestamptz default now()
);

-- 16. TABLA EMOCIONES_HISTORIAL
create table if not exists public.emociones_historial (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  emocion_nombre text not null,
  emocion_frecuencia int not null,
  emocion_color text,
  timestamp timestamptz default now()
);

-- 17. TABLA ENCUESTAS_BIENESTAR
create table if not exists public.encuestas_bienestar (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  titulo text not null,
  descripcion text,
  preguntas jsonb not null,
  activa boolean default true,
  fecha_inicio timestamptz,
  fecha_fin timestamptz,
  created_at timestamptz default now()
);

-- 18. TABLA RESPUESTAS_ENCUESTAS (100% Anónimo: sin user_id)
create table if not exists public.respuestas_encuestas (
  id uuid primary key default gen_random_uuid(),
  encuesta_id uuid references public.encuestas_bienestar(id) on delete cascade,
  tenant_id uuid references public.tenants(id) on delete cascade,
  hash_anonimo text not null,
  respuestas jsonb not null,
  puntaje_total int,
  timestamp timestamptz default now()
);

-- 19. TABLA COMENTARIOS_ANONIMOS (Buzón Anónimo: sin user_id)
create table if not exists public.comentarios_anonimos (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  texto text not null,
  categoria text,
  timestamp timestamptz default now()
);

-- 20. TABLA INDICADORES_SNAPSHOT
create table if not exists public.indicadores_snapshot (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  periodo text not null,
  kpis jsonb not null,
  num_respuestas int default 0,
  fecha_calculo timestamptz default now()
);

-- 21. TABLA AUDITORIA_ACCESOS
create table if not exists public.auditoria_accesos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  accion text not null,
  entidad text,
  entidad_id uuid,
  ip inet,
  user_agent text,
  timestamp timestamptz default now()
);

-- ============================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, nombre, rol)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'rol', 'cliente_b2c')
  )
  on conflict (id) do update set
    email = excluded.email,
    nombre = coalesce(excluded.nombre, profiles.nombre);
  return new;
end;
$$;

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims jsonb;
  v_tenant_id uuid;
  v_rol text;
begin
  select tenant_id, rol into v_tenant_id, v_rol
  from public.profiles
  where id = (event->>'user_id')::uuid;

  claims := event->'claims';
  if v_tenant_id is not null then
    claims := jsonb_set(claims, '{tenant_id}', to_jsonb(v_tenant_id::text));
  end if;
  claims := jsonb_set(claims, '{rol}', to_jsonb(coalesce(v_rol, 'cliente_b2c')));

  event := jsonb_set(event, '{claims}', claims);
  return event;
end;
$$;

create or replace function public.get_indicadores_agregados(
  p_tenant_id uuid,
  p_periodo text default null
)
returns table (
  clima numeric,
  participacion numeric,
  num_respuestas bigint,
  zonas jsonb
)
language plpgsql
security definer
as $$
declare
  v_max_colaboradores int;
begin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid()
      and tenant_id = p_tenant_id
      and rol in ('admin_tenant','rrhh','directivo','superadmin')
  ) then
    raise exception 'Acceso denegado: permisos insuficientes';
  end if;

  select coalesce(max_colaboradores, 1) into v_max_colaboradores
  from public.tenants
  where id = p_tenant_id;

  return query
  select
    round(avg(coalesce((r.respuestas->>'clima')::numeric, (r.respuestas->>'puntaje')::numeric, 75)), 1) as clima,
    round(count(distinct r.hash_anonimo)::numeric / nullif(v_max_colaboradores, 0) * 100, 1) as participacion,
    count(*) as num_respuestas,
    jsonb_build_object(
      'respuestas_totales', count(*),
      'ultimas_fechas', jsonb_agg(r.timestamp)
    ) as zonas
  from public.respuestas_encuestas r
  where r.tenant_id = p_tenant_id
    and (p_periodo is null or to_char(r.timestamp, 'YYYY-MM') = p_periodo)
  having count(*) >= 5;
end;
$$;

-- ============================================================
-- VISTA MATERIALIZADA
-- ============================================================
create materialized view if not exists public.mv_indicadores_tenant as
select
  tenant_id,
  to_char(timestamp, 'YYYY-MM') as periodo,
  count(*) as total_respuestas,
  round(avg((respuestas->>'clima')::numeric), 1) as clima_promedio,
  round(avg((respuestas->>'seguridad_psicologica')::numeric), 1) as seguridad_psicologica,
  round(avg((respuestas->>'comunicacion')::numeric), 1) as comunicacion,
  round(avg((respuestas->>'proposito')::numeric), 1) as proposito,
  round(avg((respuestas->>'reconocimiento')::numeric), 1) as reconocimiento,
  round(avg((respuestas->>'manejo_conflictos')::numeric), 1) as manejo_conflictos
from public.respuestas_encuestas
group by tenant_id, to_char(timestamp, 'YYYY-MM');

create unique index if not exists idx_mv_indicadores on public.mv_indicadores_tenant (tenant_id, periodo);
