export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole =
  | 'superadmin'
  | 'admin_tenant'
  | 'rrhh'
  | 'directivo'
  | 'colaborador'
  | 'cliente_b2c'

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.18'
  }
  public: {
    Tables: {
      auditoria_accesos: {
        Row: {
          accion: string
          entidad: string | null
          entidad_id: string | null
          id: string
          ip: unknown | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          accion: string
          entidad?: string | null
          entidad_id?: string | null
          id?: string
          ip?: unknown | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          accion?: string
          entidad?: string | null
          entidad_id?: string | null
          id?: string
          ip?: unknown | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'auditoria_accesos_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      comentarios_anonimos: {
        Row: {
          categoria: string | null
          id: string
          tenant_id: string | null
          texto: string
          timestamp: string | null
        }
        Insert: {
          categoria?: string | null
          id?: string
          tenant_id?: string | null
          texto: string
          timestamp?: string | null
        }
        Update: {
          categoria?: string | null
          id?: string
          tenant_id?: string | null
          texto?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'comentarios_anonimos_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      emociones_historial: {
        Row: {
          emocion_color: string | null
          emocion_frecuencia: number
          emocion_nombre: string
          id: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          emocion_color?: string | null
          emocion_frecuencia: number
          emocion_nombre: string
          id?: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          emocion_color?: string | null
          emocion_frecuencia?: number
          emocion_nombre?: string
          id?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'emociones_historial_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      encuestas_bienestar: {
        Row: {
          activa: boolean | null
          created_at: string | null
          descripcion: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
          preguntas: Json
          tenant_id: string
          titulo: string
        }
        Insert: {
          activa?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          preguntas: Json
          tenant_id: string
          titulo: string
        }
        Update: {
          activa?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          preguntas?: Json
          tenant_id?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: 'encuestas_bienestar_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      facturas: {
        Row: {
          created_at: string | null
          dian_cufe: string | null
          id: string
          monto_cop: number
          numero_factura: string
          orden_id: string | null
          pdf_url: string | null
          tenant_id: string | null
        }
        Insert: {
          created_at?: string | null
          dian_cufe?: string | null
          id?: string
          monto_cop: number
          numero_factura: string
          orden_id?: string | null
          pdf_url?: string | null
          tenant_id?: string | null
        }
        Update: {
          created_at?: string | null
          dian_cufe?: string | null
          id?: string
          monto_cop?: number
          numero_factura?: string
          orden_id?: string | null
          pdf_url?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'facturas_orden_id_fkey'
            columns: ['orden_id']
            isOneToOne: false
            referencedRelation: 'ordenes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'facturas_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      indicadores_snapshot: {
        Row: {
          fecha_calculo: string | null
          id: string
          kpis: Json
          num_respuestas: number | null
          periodo: string
          tenant_id: string | null
        }
        Insert: {
          fecha_calculo?: string | null
          id?: string
          kpis: Json
          num_respuestas?: number | null
          periodo: string
          tenant_id?: string | null
        }
        Update: {
          fecha_calculo?: string | null
          id?: string
          kpis?: Json
          num_respuestas?: number | null
          periodo?: string
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'indicadores_snapshot_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      invitaciones: {
        Row: {
          created_at: string | null
          email: string
          enviada_por: string | null
          estado: string | null
          expira_en: string | null
          id: string
          rol: string
          tenant_id: string | null
          token: string
        }
        Insert: {
          created_at?: string | null
          email: string
          enviada_por?: string | null
          estado?: string | null
          expira_en?: string | null
          id?: string
          rol?: string
          tenant_id?: string | null
          token?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          enviada_por?: string | null
          estado?: string | null
          expira_en?: string | null
          id?: string
          rol?: string
          tenant_id?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invitaciones_enviada_por_fkey'
            columns: ['enviada_por']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invitaciones_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      lecciones: {
        Row: {
          contenido_texto: string | null
          created_at: string | null
          descripcion: string | null
          duracion_min: number | null
          id: string
          numero: number
          preguntas_ejercicio: Json | null
          taller_id: string | null
          tipo: string | null
          titulo: string
          video_url: string | null
        }
        Insert: {
          contenido_texto?: string | null
          created_at?: string | null
          descripcion?: string | null
          duracion_min?: number | null
          id?: string
          numero: number
          preguntas_ejercicio?: Json | null
          taller_id?: string | null
          tipo?: string | null
          titulo: string
          video_url?: string | null
        }
        Update: {
          contenido_texto?: string | null
          created_at?: string | null
          descripcion?: string | null
          duracion_min?: number | null
          id?: string
          numero?: number
          preguntas_ejercicio?: Json | null
          taller_id?: string | null
          tipo?: string | null
          titulo?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lecciones_taller_id_fkey'
            columns: ['taller_id']
            isOneToOne: false
            referencedRelation: 'talleres'
            referencedColumns: ['id']
          },
        ]
      }
      licencias: {
        Row: {
          activa: boolean | null
          cantidad: number | null
          created_at: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
          orden_id: string | null
          origen: string | null
          taller_id: string | null
          tenant_id: string | null
          usadas: number | null
          user_id: string | null
        }
        Insert: {
          activa?: boolean | null
          cantidad?: number | null
          created_at?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          orden_id?: string | null
          origen?: string | null
          taller_id?: string | null
          tenant_id?: string | null
          usadas?: number | null
          user_id?: string | null
        }
        Update: {
          activa?: boolean | null
          cantidad?: number | null
          created_at?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          orden_id?: string | null
          origen?: string | null
          taller_id?: string | null
          tenant_id?: string | null
          usadas?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'licencias_orden_id_fkey'
            columns: ['orden_id']
            isOneToOne: false
            referencedRelation: 'ordenes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'licencias_taller_id_fkey'
            columns: ['taller_id']
            isOneToOne: false
            referencedRelation: 'talleres'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'licencias_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'licencias_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      notas_usuario: {
        Row: {
          created_at: string | null
          id: string
          leccion_id: string | null
          texto: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          leccion_id?: string | null
          texto: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          leccion_id?: string | null
          texto?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'notas_usuario_leccion_id_fkey'
            columns: ['leccion_id']
            isOneToOne: false
            referencedRelation: 'lecciones'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notas_usuario_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      ordenes: {
        Row: {
          cantidad: number | null
          created_at: string | null
          estado: string | null
          id: string
          metodo_pago: string | null
          monto_total_cop: number
          producto_id: string | null
          referencia_pasarela: string | null
          tenant_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cantidad?: number | null
          created_at?: string | null
          estado?: string | null
          id?: string
          metodo_pago?: string | null
          monto_total_cop?: number
          producto_id?: string | null
          referencia_pasarela?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cantidad?: number | null
          created_at?: string | null
          estado?: string | null
          id?: string
          metodo_pago?: string | null
          monto_total_cop?: number
          producto_id?: string | null
          referencia_pasarela?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'ordenes_producto_id_fkey'
            columns: ['producto_id']
            isOneToOne: false
            referencedRelation: 'productos'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'ordenes_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'ordenes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      pagos: {
        Row: {
          created_at: string | null
          estado: string | null
          id: string
          monto_cop: number
          orden_id: string | null
          pasarela: string
          respuesta_raw: Json | null
          transaccion_id: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: string | null
          id?: string
          monto_cop: number
          orden_id?: string | null
          pasarela: string
          respuesta_raw?: Json | null
          transaccion_id?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: string | null
          id?: string
          monto_cop?: number
          orden_id?: string | null
          pasarela?: string
          respuesta_raw?: Json | null
          transaccion_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'pagos_orden_id_fkey'
            columns: ['orden_id']
            isOneToOne: false
            referencedRelation: 'ordenes'
            referencedColumns: ['id']
          },
        ]
      }
      productos: {
        Row: {
          activo: boolean | null
          created_at: string | null
          descripcion: string | null
          id: string
          nombre: string
          precio_b2b_cop: number | null
          precio_b2c_cop: number | null
          taller_id: string | null
          tipo: string | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre: string
          precio_b2b_cop?: number | null
          precio_b2c_cop?: number | null
          taller_id?: string | null
          tipo?: string | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre?: string
          precio_b2b_cop?: number | null
          precio_b2c_cop?: number | null
          taller_id?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'productos_taller_id_fkey'
            columns: ['taller_id']
            isOneToOne: false
            referencedRelation: 'talleres'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          activo: boolean | null
          avatar_url: string | null
          created_at: string | null
          deleted_at: string | null
          email: string
          id: string
          nombre: string
          rol: UserRole
          telefono: string | null
          tenant_id: string | null
          ultimo_acceso: string | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email: string
          id: string
          nombre: string
          rol?: UserRole
          telefono?: string | null
          tenant_id?: string | null
          ultimo_acceso?: string | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string
          id?: string
          nombre?: string
          rol?: UserRole
          telefono?: string | null
          tenant_id?: string | null
          ultimo_acceso?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      progreso_usuario: {
        Row: {
          created_at: string | null
          id: string
          leccion_id: string | null
          tiempo_seg: number | null
          updated_at: string | null
          user_id: string | null
          visto: boolean | null
          visto_en: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          leccion_id?: string | null
          tiempo_seg?: number | null
          updated_at?: string | null
          user_id?: string | null
          visto?: boolean | null
          visto_en?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          leccion_id?: string | null
          tiempo_seg?: number | null
          updated_at?: string | null
          user_id?: string | null
          visto?: boolean | null
          visto_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'progreso_usuario_leccion_id_fkey'
            columns: ['leccion_id']
            isOneToOne: false
            referencedRelation: 'lecciones'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'progreso_usuario_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      respuestas_encuestas: {
        Row: {
          encuesta_id: string | null
          hash_anonimo: string
          id: string
          puntaje_total: number | null
          respuestas: Json
          tenant_id: string | null
          timestamp: string | null
        }
        Insert: {
          encuesta_id?: string | null
          hash_anonimo: string
          id?: string
          puntaje_total?: number | null
          respuestas: Json
          tenant_id?: string | null
          timestamp?: string | null
        }
        Update: {
          encuesta_id?: string | null
          hash_anonimo?: string
          id?: string
          puntaje_total?: number | null
          respuestas?: Json
          tenant_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'respuestas_encuestas_encuesta_id_fkey'
            columns: ['encuesta_id']
            isOneToOne: false
            referencedRelation: 'encuestas_bienestar'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'respuestas_encuestas_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      roles_permisos: {
        Row: {
          created_at: string | null
          id: string
          permiso: string
          rol: string
          tenant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          permiso: string
          rol: string
          tenant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permiso?: string
          rol?: string
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'roles_permisos_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
      talleres: {
        Row: {
          activo: boolean | null
          codigo: string
          created_at: string | null
          descripcion: string | null
          duracion_total_min: number | null
          es_premium: boolean | null
          id: string
          imagen_url: string | null
          nivel: string | null
          num_lecciones: number | null
          precio_cop: number | null
          precio_empresa_cop: number | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          codigo: string
          created_at?: string | null
          descripcion?: string | null
          duracion_total_min?: number | null
          es_premium?: boolean | null
          id?: string
          imagen_url?: string | null
          nivel?: string | null
          num_lecciones?: number | null
          precio_cop?: number | null
          precio_empresa_cop?: number | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          codigo?: string
          created_at?: string | null
          descripcion?: string | null
          duracion_total_min?: number | null
          es_premium?: boolean | null
          id?: string
          imagen_url?: string | null
          nivel?: string | null
          num_lecciones?: number | null
          precio_cop?: number | null
          precio_empresa_cop?: number | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tenants: {
        Row: {
          activo: boolean | null
          created_at: string | null
          deleted_at: string | null
          dominio: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
          logo_url: string | null
          max_colaboradores: number | null
          nit: string | null
          nombre: string
          plan: string | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string | null
          deleted_at?: string | null
          dominio?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          logo_url?: string | null
          max_colaboradores?: number | null
          nit?: string | null
          nombre: string
          plan?: string | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string | null
          deleted_at?: string | null
          dominio?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          logo_url?: string | null
          max_colaboradores?: number | null
          nit?: string | null
          nombre?: string
          plan?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tests_frecuencia: {
        Row: {
          id: string
          puntaje_z1: number | null
          puntaje_z2: number | null
          puntaje_z3: number | null
          puntaje_z4: number | null
          puntaje_z5: number | null
          puntaje_z6: number | null
          respuestas: Json
          tenant_id: string | null
          timestamp: string | null
          user_id: string
          zona_color: string | null
          zona_nombre: string | null
          zona_predominante: string | null
        }
        Insert: {
          id?: string
          puntaje_z1?: number | null
          puntaje_z2?: number | null
          puntaje_z3?: number | null
          puntaje_z4?: number | null
          puntaje_z5?: number | null
          puntaje_z6?: number | null
          respuestas: Json
          tenant_id?: string | null
          timestamp?: string | null
          user_id: string
          zona_color?: string | null
          zona_nombre?: string | null
          zona_predominante?: string | null
        }
        Update: {
          id?: string
          puntaje_z1?: number | null
          puntaje_z2?: number | null
          puntaje_z3?: number | null
          puntaje_z4?: number | null
          puntaje_z5?: number | null
          puntaje_z6?: number | null
          respuestas?: Json
          tenant_id?: string | null
          timestamp?: string | null
          user_id?: string
          zona_color?: string | null
          zona_nombre?: string | null
          zona_predominante?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tests_frecuencia_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tests_frecuencia_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      videos_storage: {
        Row: {
          created_at: string | null
          duracion_seg: number | null
          es_premium: boolean | null
          formato: string | null
          id: string
          leccion_id: string | null
          storage_path: string
          tamano_bytes: number | null
        }
        Insert: {
          created_at?: string | null
          duracion_seg?: number | null
          es_premium?: boolean | null
          formato?: string | null
          id?: string
          leccion_id?: string | null
          storage_path: string
          tamano_bytes?: number | null
        }
        Update: {
          created_at?: string | null
          duracion_seg?: number | null
          es_premium?: boolean | null
          formato?: string | null
          id?: string
          leccion_id?: string | null
          storage_path?: string
          tamano_bytes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'videos_storage_leccion_id_fkey'
            columns: ['leccion_id']
            isOneToOne: false
            referencedRelation: 'lecciones'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      mv_indicadores_tenant: {
        Row: {
          clima_promedio: number | null
          comunicacion: number | null
          manejo_conflictos: number | null
          periodo: string | null
          proposito: number | null
          reconocimiento: number | null
          seguridad_psicologica: number | null
          tenant_id: string | null
          total_respuestas: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'respuestas_encuestas_tenant_id_fkey'
            columns: ['tenant_id']
            isOneToOne: false
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Functions: {
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      get_indicadores_agregados: {
        Args: { p_periodo?: string; p_tenant_id: string }
        Returns: {
          clima: number
          num_respuestas: number
          participacion: number
          zonas: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
