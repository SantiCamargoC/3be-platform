# 3be — Plataforma Web de Bienestar, Formación & Diagnóstico Anónimo

Sistema web multi-tenant diseñado para transformar la cultura organizacional y el liderazgo corporativo mediante tres pilares:
1. **Diagnóstico Anónimo Hawkins:** Test de 50 preguntas calibrado en el *Mapa de la Consciencia* (Dr. David R. Hawkins) con 6 zonas energéticas.
2. **Formación Consciente Audiovisual:** 3 talleres prácticos (24 lecciones) con toma de notas privadas y seguimiento de progreso.
3. **Analítica de Bienestar para RRHH:** Dashboard en tiempo real con Recharts (Radar, Comparativo Antes/Después, KPIs y buzón anónimo disociado).

---

## 🎨 Identidad Visual y Tokens de Marca

- **Paleta de Colores:**
  - Navy Principal: `#0A1F44`
  - Naranja Acción: `#FF6B35` / `#E86A0C`
  - Teal Sabiduría: `#00B4D8` / `#20748F`
  - Petrol Profundo: `#043146`
  - Sky: `#8FCBE5`
  - Ámbar (Umbral): `#FEB62C`
  - Superficie / Fondo: `#F8F9FA` / `#FBF6EF`
  - Tinta / Texto: `#0A1526`
- **Tipografías:**
  - `Sora`: Títulos y números destacados (display).
  - `Inter`: Cuerpo, textos y tablas de datos (sans).
  - `Space Mono`: Etiquetas, zonas Hawkins y badges de estado (monospace).
- **Símbolo Triquetra:** Renderizado vectorial en `components/shared/Triquetra.tsx`.

---

## 🏗️ Arquitectura del Proyecto

```bash
3be-platform/
├── app/
│   ├── (auth)/                     # Rutas de autenticación
│   │   ├── login/                  # Inicio de sesión con demo shortcuts
│   │   ├── register/               # Registro de nueva empresa
│   │   └── invite/                 # Aceptación de invitación de colaboradores
│   ├── (dashboard)/                # Rutas protegidas por rol con layout común
│   │   ├── layout.tsx              # Shell con Sidebar y Topbar dinámicos
│   │   ├── admin/                  # Superadmin global de 3be
│   │   ├── empresa/                # Admin de Empresa, RRHH y Directivos
│   │   │   ├── indicadores/        # Panel de analítica Recharts (Radar, Barras)
│   │   │   ├── licencias/          # Asignación de cupos e invitaciones
│   │   │   ├── facturacion/        # Comprobantes y datos de facturación
│   │   │   └── buzon/              # Buzón anónimo (sin user_id)
│   │   ├── colaborador/            # Portal del Colaborador
│   │   │   ├── diagnostico/        # Test interactivo Hawkins de 50 preguntas
│   │   │   ├── formacion/          # Aula virtual con lecciones y bloc de notas
│   │   │   └── progreso/           # Resumen de avance personal
│   │   └── b2c/                    # Cliente individual
│   │       └── mis-talleres/       # Talleres comprados individualmente
│   ├── (public)/
│   │   ├── catalogo/               # Catálogo interactivo (precios B2B y B2C)
│   │   └── checkout/               # Pasarela de pago con PSE / Tarjeta
│   ├── api/
│   │   ├── webhooks/               # Webhooks de pasarela (Wompi, PayU)
│   │   └── rpc/                    # Consumo de funciones seguras Supabase RPC
│   ├── globals.css                 # Tokens de tema Tailwind
│   ├── layout.tsx                  # Layout raíz con Google Fonts (Sora, Inter, Space Mono)
│   ├── page.tsx                    # Landing page oficial
│   └── providers.tsx               # Context provider para roles y estado
├── components/
│   ├── charts/                     # KpiCard, RadarChart, EvolutionChart
│   ├── layout/                     # Sidebar, Header, Footer
│   ├── shared/                     # Logo3be, Triquetra
│   └── ui/                         # Button, Card, Input, Badge
├── lib/
│   ├── data/                       # workshops.ts, hawkins-questions.ts
│   ├── supabase/                   # client.ts, server.ts, middleware.ts
│   └── utils.ts                    # cn, formatCOP, formatPercent
├── middleware.ts                   # Middleware global de sesión y protección
├── supabase/
│   ├── migrations/                 # Migración SQL de 21 tablas, RLS y triggers
│   └── functions/                  # Edge Functions (checkout, webhook, generate-signed-url)
├── types/
│   └── database.ts                 # Tipos TypeScript sincronizados con Supabase
├── .env.local.example              # Plantilla de variables de entorno
└── package.json
```

---

## 🚀 Puesta en Marcha Local

### 1. Clonar e instalar dependencias
```bash
git clone <tu-repositorio>
cd 3be-platform
npm install
```

### 2. Configurar variables de entorno
Copia `.env.local.example` a `.env.local`:
```bash
cp .env.local.example .env.local
```

Configura tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://bkklwmhrggxrmqxeqjna.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_publica
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_privada
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Levantar el entorno de desarrollo
```bash
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000).

---

## 🔒 Seguridad, Anonimato y Multi-tenancy

1. **Aislamiento por Tenant (RLS):**
   - Todas las tablas con datos empresariales tienen la columna `tenant_id`.
   - Las políticas RLS restringen la lectura y escritura al `tenant_id` contenido en el JWT del usuario autenticado, o perfil `superadmin`.
2. **Anonimato en Diagnóstico y Buzón:**
   - La tabla `respuestas_encuestas` **no posee `user_id`**; utiliza `hash_anonimo` irreversible para validar que una persona no responda dos veces sin revelar quién es.
   - La tabla `comentarios_anonimos` **no posee `user_id`**.
   - Los reportes de RRHH exigen un umbral mínimo de $\ge 5$ respuestas antes de permitir visualización agregada mediante la función RPC `get_indicadores_agregados`.
3. **Cumplimiento Legal:**
   - Alineado con la **Ley 1581 de 2012** (Protección de Datos Personales en Colombia).

---

## 🚢 Despliegue en Vercel y GitHub

1. **Subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: arquitectura inicial plataforma 3be"
   git branch -M main
   git remote add origin https://github.com/usuario/3be-platform.git
   git push -u origin main
   ```

2. **Desplegar en Vercel:**
   - Conecta el repositorio de GitHub en el panel de Vercel.
   - En **Environment Variables**, añade:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL` (la URL de producción asignada por Vercel)
   - El comando de build por defecto `npm run build` compilará la aplicación automáticamente sin configuraciones adicionales.
