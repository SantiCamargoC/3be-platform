export interface Question {
  id: number
  zone: 'z1' | 'z2' | 'z3' | 'z4' | 'z5' | 'z6'
  text: string
}

export interface ZoneMeta {
  code: string
  name: string
  freqRange: string
  description: string
  color: string
}

export const hawkinsZones: Record<string, ZoneMeta> = {
  z1: {
    code: 'z1',
    name: 'Zona 1: Supervivencia Reactiva',
    freqRange: '20 - 75 Hz',
    description: 'Emociones predominantes de culpa, vergüenza o apatía. Percepción de parálisis o victimismo.',
    color: '#E63946',
  },
  z2: {
    code: 'z2',
    name: 'Zona 2: Fuerza y Resistencia',
    freqRange: '100 - 175 Hz',
    description: 'Emociones impulsadas por miedo, deseo ansioso o frustración/ira. Gran desgaste de energía.',
    color: '#FB8426',
  },
  z3: {
    code: 'z3',
    name: 'Zona 3: El Umbral (Coraje)',
    freqRange: '200 Hz',
    description: 'Punto de inflexión decisivo: capacidad de asumir riesgos, actuar con entereza y tomar decisiones.',
    color: '#FEB62C',
  },
  z4: {
    code: 'z4',
    name: 'Zona 4: Armonía y Aceptación',
    freqRange: '250 - 350 Hz',
    description: 'Neutralidad, flexibilidad mental y aceptación sin resistencia ante las dificultades.',
    color: '#1E9E6A',
  },
  z5: {
    code: 'z5',
    name: 'Zona 5: Sabiduría y Comprensión',
    freqRange: '400 Hz',
    description: 'Pensamiento estratégico lúcido, empatía activa y resolución ecuánime de problemas complejos.',
    color: '#00B4D8',
  },
  z6: {
    code: 'z6',
    name: 'Zona 6: Trascendencia y Paz',
    freqRange: '500+ Hz',
    description: 'Amor incondicional, alegría interna autónoma y paz profunda sin dependencia de factores externos.',
    color: '#7209B7',
  },
}

export const diagnosisQuestions: Question[] = [
  { id: 1, zone: 'z1', text: 'Siento que no valgo lo suficiente, aunque nadie me lo diga directamente.' },
  { id: 2, zone: 'z2', text: 'Antes de una decisión importante, lo primero que aparece es el miedo a que salga mal.' },
  { id: 3, zone: 'z3', text: 'Aunque tenga miedo, actúo: prefiero intentarlo y equivocarme que quedarme sin hacer nada.' },
  { id: 4, zone: 'z4', text: 'Estoy dispuesto/a a aprender algo nuevo aunque signifique reconocer que estaba equivocado/a.' },
  { id: 5, zone: 'z5', text: 'Cuando enfrento un problema complejo, logro analizarlo con calma antes de reaccionar.' },
  { id: 6, zone: 'z6', text: 'Siento una alegría y plenitud que no depende de lo que está pasando afuera.' },
  { id: 7, zone: 'z1', text: 'Cuando algo sale mal en el equipo, mi primer impulso es pensar que la culpa es mía.' },
  { id: 8, zone: 'z2', text: 'Siento que nunca tengo "suficiente" (dinero, reconocimiento, logros, tiempo).' },
  { id: 9, zone: 'z3', text: 'Tomo decisiones difíciles aunque no tenga todas las garantías o certezas.' },
  { id: 10, zone: 'z4', text: 'Cuando algo no sale como esperaba, logro aceptarlo sin pelear contra la realidad.' },
  { id: 11, zone: 'z5', text: 'Actúo desde la comprensión incluso con personas que piensan muy diferente a mí.' },
  { id: 12, zone: 'z6', text: 'Experimento momentos de paz profunda, incluso en medio de la incertidumbre laboral.' },
  { id: 13, zone: 'z1', text: 'Hay días en que siento que nada de lo que haga va a cambiar realmente mi situación.' },
  { id: 14, zone: 'z2', text: 'Me cuesta soltar la frustración cuando alguien no hace las cosas como yo esperaba.' },
  { id: 15, zone: 'z3', text: 'Puedo estar en desacuerdo con alguien sin sentir que "tengo que ganar" la conversación.' },
  { id: 16, zone: 'z4', text: 'Me adapto rápidamente cuando cambian las reglas del juego o las prioridades.' },
  { id: 17, zone: 'z5', text: 'Busco soluciones donde todas las partes involucradas salgan beneficiadas.' },
  { id: 18, zone: 'z6', text: 'Siento una conexión genuina de respeto y afecto hacia las personas con quienes trabajo.' },
  { id: 19, zone: 'z1', text: 'Tiende a paralizarme la idea de que los demás me juzguen o me rechacen.' },
  { id: 20, zone: 'z2', text: 'Siento irritación con frecuencia ante la incompetencia o lentitud de otros.' },
  { id: 21, zone: 'z3', text: 'Asumo la responsabilidad completa de mis resultados sin buscar culpables externos.' },
  { id: 22, zone: 'z4', text: 'No me tomo los desacuerdos profesionales como ataques de índole personal.' },
  { id: 23, zone: 'z5', text: 'Logro ver el cuadro completo de una situación antes de emitir juicios o decisiones.' },
  { id: 24, zone: 'z6', text: 'Mi motivación nace del deseo sincero de servir y aportar valor, no de la necesidad de aprobación.' },
  { id: 25, zone: 'z1', text: 'A menudo postergo conversaciones importantes por miedo al conflicto o al rechazo.' },
  { id: 26, zone: 'z2', text: 'Me comparo constantemente con el éxito de mis compañeros o competidores.' },
  { id: 27, zone: 'z3', text: 'Defiendo mis ideas con firmeza pero escucho abiertamente los puntos de vista contrarios.' },
  { id: 28, zone: 'z4', text: 'Acepto la retroalimentación constructiva sin justificarme ni ponerme a la defensiva.' },
  { id: 29, zone: 'z5', text: 'Reconozco los patrones emocionales que me limitan y aplico métodos para transformarlos.' },
  { id: 30, zone: 'z6', text: 'Confío en que los desafíos traen consigo lecciones valiosas para mi evolución.' },
  { id: 31, zone: 'z1', text: 'Siento fatiga emocional recurrente al iniciar la jornada de trabajo.' },
  { id: 32, zone: 'z2', text: 'Siento necesidad de controlar todos los detalles para que las cosas salgan bien.' },
  { id: 33, zone: 'z3', text: 'Reconozco mis errores con rapidez y me enfoco en reparar el impacto generado.' },
  { id: 34, zone: 'z4', text: 'Mantengo el equilibrio y la templanza en momentos de alta presión operativa.' },
  { id: 35, zone: 'z5', text: 'Me entusiasma formular preguntas estratégicas que abran nuevas perspectivas.' },
  { id: 36, zone: 'z6', text: 'Siento gratitud espontánea por las oportunidades y aprendizajes cotidianos.' },
  { id: 37, zone: 'z1', text: 'Me resulta difícil expresar lo que realmente pienso por temor a equivocarme.' },
  { id: 38, zone: 'z2', text: 'Me cuesta celebrar genuinamente los logros de otros si siento que me opacan.' },
  { id: 39, zone: 'z3', text: 'Me atrevo a emprender proyectos nuevos incluso si implican salir de mi zona cómoda.' },
  { id: 40, zone: 'z4', text: 'Comprendo que cada colaborador tiene su propio ritmo y nivel de consciencia.' },
  { id: 41, zone: 'z5', text: 'Identifico las causas profundas de un problema en lugar de atacar solo los síntomas.' },
  { id: 42, zone: 'z6', text: 'Experimento una sensación continua de propósito y claridad en lo que hago.' },
  { id: 43, zone: 'z1', text: 'Siento que el entorno organizacional es hostil y que debo estar en guardia constante.' },
  { id: 44, zone: 'z2', text: 'El afán por destacar y demostrar valor me genera tensión física y mental.' },
  { id: 45, zone: 'z3', text: 'Inspiro a otros a dar lo mejor de sí mediante mi propio ejemplo y coherencia.' },
  { id: 46, zone: 'z4', text: 'Sé poner límites saludables sin agresividad ni sentimientos de culpa.' },
  { id: 47, zone: 'z5', text: 'Comunico conceptos complejos de forma clara, inspiradora y constructiva.' },
  { id: 48, zone: 'z6', text: 'Mi bienestar interno permanece estable aun cuando el entorno externo sea caótico.' },
  { id: 49, zone: 'z3', text: 'Elijo el diálogo constructivo incluso en situaciones de tensión.' },
  { id: 50, zone: 'z5', text: 'Actúo con base en principios y valores sólidos, independientemente de la conveniencia.' },
]
