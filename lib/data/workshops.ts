export interface Lesson {
  id: string
  numero: number
  titulo: string
  duracionMin: number
  tipo: 'video' | 'ejercicio' | 'lectura' | 'check'
}

export interface Workshop {
  id: string
  codigo: string
  title: string
  subtitle: string
  tag: string
  color: 'petrol' | 'teal' | 'orange'
  description: string
  lessons: Lesson[]
  priceCop: number
  priceEmpresaCop: number
}

export const workshops: Workshop[] = [
  {
    id: 'taller-01',
    codigo: 'DESCUBRE-01',
    title: 'Descubre: Transformación del SER',
    subtitle: 'Transforma tus creencias subconscientes y transforma tu realidad.',
    tag: 'AUTOCONOCIMIENTO',
    color: 'petrol',
    description:
      'Descubre las creencias limitantes que están en tu subconsciente y que frenan tu vida y tu organización. Aprende el método de reprogramación y la escala de Hawkins.',
    priceCop: 350000,
    priceEmpresaCop: 180000,
    lessons: [
      { id: 'l1-1', numero: 1, titulo: 'Horizontes de crecimiento', duracionMin: 18, tipo: 'video' },
      { id: 'l1-2', numero: 2, titulo: 'Escala de emociones y frecuencias', duracionMin: 22, tipo: 'video' },
      { id: 'l1-3', numero: 3, titulo: 'Visión cuántica de la realidad', duracionMin: 25, tipo: 'video' },
      { id: 'l1-4', numero: 4, titulo: 'Reconecta con tu ADN y esencia', duracionMin: 20, tipo: 'video' },
      { id: 'l1-5', numero: 5, titulo: 'Lo que somos (de la materia a la energía)', duracionMin: 24, tipo: 'video' },
      { id: 'l1-6', numero: 6, titulo: 'Mi entorno como espejo', duracionMin: 19, tipo: 'video' },
      { id: 'l1-7', numero: 7, titulo: 'Construcción de un nuevo Estado del SER', duracionMin: 30, tipo: 'ejercicio' },
      { id: 'l1-8', numero: 8, titulo: 'Reprogramación de creencias limitantes', duracionMin: 35, tipo: 'ejercicio' },
      { id: 'l1-9', numero: 9, titulo: 'Cómo conectar con la Supraconciencia', duracionMin: 22, tipo: 'video' },
    ],
  },
  {
    id: 'taller-02',
    codigo: 'PROPOSITO-02',
    title: 'Propósito, Sentido y Legado',
    subtitle: 'Conecta con lo que realmente te mueve y define tu huella en el mundo.',
    tag: 'PROPÓSITO & CULTURA',
    color: 'teal',
    description:
      'Encuentra tu propósito auténtico, define el legado que quieres dejar y aprende a manifestar la cultura que deseas en tu equipo de trabajo.',
    priceCop: 380000,
    priceEmpresaCop: 200000,
    lessons: [
      { id: 'l2-1', numero: 1, titulo: 'Llegando al propósito', duracionMin: 20, tipo: 'video' },
      { id: 'l2-2', numero: 2, titulo: 'Propósito y sentido de vida', duracionMin: 25, tipo: 'video' },
      { id: 'l2-3', numero: 3, titulo: 'Aspiración, trascendencia y legado', duracionMin: 28, tipo: 'video' },
      { id: 'l2-4', numero: 4, titulo: 'Mapa de sueños y coherencia cardíaca', duracionMin: 32, tipo: 'ejercicio' },
      { id: 'l2-5', numero: 5, titulo: 'Manifestación consciente en la acción', duracionMin: 26, tipo: 'video' },
      { id: 'l2-6', numero: 6, titulo: 'Caleidoscopio de talentos organizacionales', duracionMin: 24, tipo: 'ejercicio' },
    ],
  },
  {
    id: 'taller-03',
    codigo: 'VENTAS-SER-03',
    title: 'Negociación y Ventas desde el SER',
    subtitle: 'Construye acuerdos reales desde la empatía y la esencia, no desde el ego.',
    tag: 'LIDERAZGO CONSCIENTE',
    color: 'orange',
    description:
      'Aprende a negociar y cerrar ventas de alto valor conectando con tu SER, superando el miedo al rechazo y generando confianza indeleble con clientes y aliados.',
    priceCop: 420000,
    priceEmpresaCop: 220000,
    lessons: [
      { id: 'l3-1', numero: 1, titulo: 'Pilares de negociación y ventas conscientes', duracionMin: 22, tipo: 'video' },
      { id: 'l3-2', numero: 2, titulo: 'Postura interna y desapego al resultado', duracionMin: 20, tipo: 'video' },
      { id: 'l3-3', numero: 3, titulo: 'El poder frente a la razón (quién lidera la venta)', duracionMin: 24, tipo: 'video' },
      { id: 'l3-4', numero: 4, titulo: '3 principales competencias de un negociador SER', duracionMin: 26, tipo: 'video' },
      { id: 'l3-5', numero: 5, titulo: 'Del vendedor EGO al vendedor SER', duracionMin: 28, tipo: 'video' },
      { id: 'l3-6', numero: 6, titulo: 'Cliente: escucha profunda sin juicio', duracionMin: 25, tipo: 'video' },
      { id: 'l3-7', numero: 7, titulo: 'Preguntas poderosas que transforman conversaciones', duracionMin: 30, tipo: 'ejercicio' },
      { id: 'l3-8', numero: 8, titulo: 'Negociación: el ciclo de la venta SER', duracionMin: 35, tipo: 'ejercicio' },
      { id: 'l3-9', numero: 9, titulo: 'Errores fatales que destruyen la confianza del cliente', duracionMin: 20, tipo: 'check' },
    ],
  },
]
