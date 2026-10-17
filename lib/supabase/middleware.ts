import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid calling getSession() in middleware because it doesn't validate JWT against auth server; use getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Protected route checking
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/invite')
  const isDashboardRoute =
    path.startsWith('/admin') ||
    path.startsWith('/empresa') ||
    path.startsWith('/colaborador') ||
    path.startsWith('/b2c')

  // Not authenticated trying to access protected area
  if (!user && isDashboardRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', path)
    return NextResponse.redirect(url)
  }

  // Authenticated user trying to access login/register
  if (user && isAuthRoute) {
    const userRole = (user.app_metadata?.rol as string) || (user.user_metadata?.rol as string) || 'colaborador'
    const url = request.nextUrl.clone()

    if (userRole === 'superadmin') {
      url.pathname = '/admin'
    } else if (['admin_tenant', 'rrhh', 'directivo'].includes(userRole)) {
      url.pathname = '/empresa'
    } else if (userRole === 'cliente_b2c') {
      url.pathname = '/b2c/mis-talleres'
    } else {
      url.pathname = '/colaborador'
    }

    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
