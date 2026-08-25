export interface Modulo {
  titulo: string;
  lecciones: number;
  duracion: string;
}

export interface Curso {
  slug: string;
  titulo: string;
  categoria: 'Sistemas de Gestión' | 'Riesgos y Control' | 'Salud' | 'Auditoría';
  nivel: 'Básico' | 'Intermedio' | 'Avanzado';
  modalidad: 'Autogestionado' | 'Con acompañamiento';
  resumen: string;
  duracionHoras: number;
  precio: number; // COP
  precioAntes?: number;
  destacado?: boolean;
  proximamente?: boolean;
  certificado: string;
  dirigidoA: string;
  aprendizajes: string[];
  temario: Modulo[];
  color: 'navy' | 'gold' | 'teal' | 'violet';
}

/**
 * BORRADOR — catálogo de ejemplo para maquetar el aula virtual.
 * Títulos, precios y temarios son propuestas de trabajo, no oferta definitiva.
 */
export const cursos: Curso[] = [
  {
    slug: 'auditor-interno-iso-9001',
    titulo: 'Auditor Interno ISO 9001:2015',
    categoria: 'Auditoría',
    nivel: 'Intermedio',
    modalidad: 'Con acompañamiento',
    resumen:
      'Formación práctica para planear, ejecutar y reportar auditorías internas de calidad con hallazgos que sí generan mejora.',
    duracionHoras: 40,
    precio: 480000,
    precioAntes: 620000,
    destacado: true,
    certificado: 'Certificado de asistencia y aprobación, con evaluación final',
    dirigidoA:
      'Coordinadores de calidad, líderes de proceso y profesionales que integrarán el equipo auditor interno de su organización.',
    aprendizajes: [
      'Interpretar los requisitos de ISO 9001:2015 desde la óptica del auditor',
      'Planificar un programa anual de auditoría basado en riesgo',
      'Redactar hallazgos con criterio, evidencia y no conformidad bien tipificada',
      'Conducir la reunión de apertura y cierre con manejo de objeciones',
      'Analizar causa raíz y verificar la eficacia de las acciones correctivas',
    ],
    temario: [
      { titulo: 'Fundamentos: calidad, procesos y pensamiento basado en riesgo', lecciones: 6, duracion: '4 h' },
      { titulo: 'Requisitos de ISO 9001:2015 capítulo por capítulo', lecciones: 10, duracion: '12 h' },
      { titulo: 'ISO 19011: el programa y el ciclo de auditoría', lecciones: 7, duracion: '8 h' },
      { titulo: 'Técnicas de auditoría: entrevista, muestreo y evidencia', lecciones: 8, duracion: '8 h' },
      { titulo: 'Hallazgos, informe y seguimiento', lecciones: 6, duracion: '5 h' },
      { titulo: 'Taller integrador: auditoría simulada', lecciones: 3, duracion: '3 h' },
    ],
    color: 'navy',
  },
  {
    slug: 'sg-sst-decreto-1072',
    titulo: 'Implementación del SG-SST según Decreto 1072',
    categoria: 'Sistemas de Gestión',
    nivel: 'Básico',
    modalidad: 'Autogestionado',
    resumen:
      'Ruta completa para montar el Sistema de Gestión de Seguridad y Salud en el Trabajo y sostener los estándares mínimos.',
    duracionHoras: 50,
    precio: 390000,
    destacado: true,
    certificado: 'Certificado de aprobación con intensidad horaria',
    dirigidoA:
      'Responsables del SG-SST, profesionales de talento humano y empresarios que deben responder por el cumplimiento ante la ARL.',
    aprendizajes: [
      'Estructurar el SG-SST bajo el ciclo PHVA exigido por el Decreto 1072',
      'Cumplir los estándares mínimos de la Resolución 0312 según el tamaño de la empresa',
      'Construir la matriz de peligros con metodología GTC 45',
      'Diseñar el plan anual de trabajo y el plan de capacitación',
      'Preparar la evidencia que solicita la visita de verificación',
    ],
    temario: [
      { titulo: 'Marco legal del SG-SST en Colombia', lecciones: 5, duracion: '5 h' },
      { titulo: 'Política, objetivos y asignación de responsabilidades', lecciones: 6, duracion: '6 h' },
      { titulo: 'Identificación de peligros y valoración de riesgos (GTC 45)', lecciones: 9, duracion: '12 h' },
      { titulo: 'Plan anual de trabajo, capacitación y recursos', lecciones: 7, duracion: '9 h' },
      { titulo: 'Investigación de incidentes y accidentes', lecciones: 6, duracion: '8 h' },
      { titulo: 'Indicadores, auditoría y revisión por la alta dirección', lecciones: 7, duracion: '10 h' },
    ],
    color: 'gold',
  },
  {
    slug: 'habilitacion-ips-resolucion-3100',
    titulo: 'Habilitación de servicios de salud — Resolución 3100',
    categoria: 'Salud',
    nivel: 'Intermedio',
    modalidad: 'Con acompañamiento',
    resumen:
      'Prepare su IPS para la visita de verificación con la evidencia organizada estándar por estándar.',
    duracionHoras: 36,
    precio: 520000,
    certificado: 'Certificado de aprobación',
    dirigidoA:
      'Gerentes y coordinadores de calidad de IPS, profesionales independientes y responsables de habilitación.',
    aprendizajes: [
      'Interpretar los estándares y criterios de la Resolución 3100 de 2019',
      'Realizar la autoevaluación por servicio y documentar su soporte',
      'Organizar la evidencia de talento humano, infraestructura y dotación',
      'Gestionar los procesos prioritarios y la historia clínica',
      'Anticipar los hallazgos frecuentes de la visita de verificación',
    ],
    temario: [
      { titulo: 'El SOGCS y el componente de habilitación', lecciones: 5, duracion: '4 h' },
      { titulo: 'Inscripción, novedades y autoevaluación en REPS', lecciones: 6, duracion: '6 h' },
      { titulo: 'Estándares transversales y por servicio', lecciones: 10, duracion: '12 h' },
      { titulo: 'Procesos prioritarios y seguridad del paciente', lecciones: 8, duracion: '9 h' },
      { titulo: 'Simulacro de visita de verificación', lecciones: 4, duracion: '5 h' },
    ],
    color: 'teal',
  },
  {
    slug: 'gestion-riesgos-iso-31000',
    titulo: 'Gestión de Riesgos con ISO 31000',
    categoria: 'Riesgos y Control',
    nivel: 'Intermedio',
    modalidad: 'Autogestionado',
    resumen:
      'De la matriz que nadie usa al tablero de riesgos que la gerencia revisa cada mes.',
    duracionHoras: 30,
    precio: 350000,
    certificado: 'Certificado de aprobación',
    dirigidoA:
      'Líderes de proceso, oficiales de cumplimiento y equipos de planeación que administran matrices de riesgo.',
    aprendizajes: [
      'Establecer el contexto y los criterios de aceptación del riesgo',
      'Aplicar técnicas de identificación y análisis de ISO 31010',
      'Valorar riesgo inherente, controles y riesgo residual con criterio consistente',
      'Diseñar planes de tratamiento con responsables y recursos reales',
      'Construir indicadores de seguimiento y reportar a la dirección',
    ],
    temario: [
      { titulo: 'Principios y marco de referencia de ISO 31000', lecciones: 5, duracion: '4 h' },
      { titulo: 'Contexto estratégico y apetito de riesgo', lecciones: 5, duracion: '5 h' },
      { titulo: 'Identificación y análisis: técnicas de ISO 31010', lecciones: 8, duracion: '9 h' },
      { titulo: 'Evaluación de controles y riesgo residual', lecciones: 6, duracion: '7 h' },
      { titulo: 'Tratamiento, monitoreo y reporte', lecciones: 5, duracion: '5 h' },
    ],
    color: 'violet',
  },
  {
    slug: 'integracion-9001-14001-45001',
    titulo: 'Integración de sistemas ISO 9001, 14001 y 45001',
    categoria: 'Sistemas de Gestión',
    nivel: 'Avanzado',
    modalidad: 'Con acompañamiento',
    resumen:
      'Una sola estructura documental, un solo programa de auditoría, una sola revisión por la dirección.',
    duracionHoras: 45,
    precio: 590000,
    certificado: 'Certificado de aprobación',
    dirigidoA:
      'Organizaciones con dos o más sistemas certificados que quieren reducir la carga administrativa de mantenerlos por separado.',
    aprendizajes: [
      'Aprovechar la estructura de alto nivel común a las tres normas',
      'Unificar documentación, registros y control de la información',
      'Diseñar un programa único de auditoría multinorma',
      'Integrar la gestión de riesgos y los requisitos legales',
      'Preparar una revisión por la dirección consolidada',
    ],
    temario: [
      { titulo: 'Estructura de alto nivel y requisitos comunes', lecciones: 6, duracion: '7 h' },
      { titulo: 'Mapa integrado de procesos y documentación única', lecciones: 8, duracion: '11 h' },
      { titulo: 'Matriz legal integrada y evaluación de cumplimiento', lecciones: 6, duracion: '8 h' },
      { titulo: 'Auditoría multinorma en un solo ciclo', lecciones: 7, duracion: '10 h' },
      { titulo: 'Revisión por la dirección consolidada', lecciones: 5, duracion: '9 h' },
    ],
    color: 'navy',
  },
  {
    slug: 'pamec-auditoria-para-el-mejoramiento',
    titulo: 'PAMEC: auditoría para el mejoramiento de la calidad',
    categoria: 'Salud',
    nivel: 'Avanzado',
    modalidad: 'Con acompañamiento',
    resumen:
      'Diseñe y opere el ciclo PAMEC de su institución con priorización defendible ante el verificador.',
    duracionHoras: 32,
    precio: 0,
    proximamente: true,
    certificado: 'Certificado de aprobación',
    dirigidoA: 'Equipos de calidad de IPS y EAPB responsables del componente de auditoría del SOGCS.',
    aprendizajes: [
      'Priorizar procesos con la metodología definida por el Ministerio',
      'Definir la calidad esperada y medir la calidad observada',
      'Formular planes de mejoramiento con seguimiento verificable',
      'Articular el PAMEC con seguridad del paciente y acreditación',
    ],
    temario: [
      { titulo: 'El PAMEC dentro del SOGCS', lecciones: 4, duracion: '4 h' },
      { titulo: 'Autoevaluación y priorización de procesos', lecciones: 6, duracion: '8 h' },
      { titulo: 'Calidad esperada, observada y brecha', lecciones: 6, duracion: '9 h' },
      { titulo: 'Planes de mejoramiento y aprendizaje organizacional', lecciones: 5, duracion: '11 h' },
    ],
    color: 'teal',
  },
];

export const categorias = ['Todos', 'Sistemas de Gestión', 'Riesgos y Control', 'Salud', 'Auditoría'] as const;

export const getCurso = (slug: string) => cursos.find((c) => c.slug === slug);

export const formatoCOP = (valor: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor);
