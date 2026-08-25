export interface Servicio {
  slug: string;
  numero: string;
  titulo: string;
  tituloCorto: string;
  tagline: string;
  resumen: string;
  descripcion: string[];
  paraQuien: string;
  entregables: string[];
  normas: string[];
  icono: 'gestion' | 'riesgos' | 'control' | 'salud' | 'auditoria';
}

/**
 * BORRADOR DE CONTENIDO — sujeto a revisión de Andrea y Gustavo.
 * Las normas y marcos citados corresponden a la regulación colombiana vigente;
 * conviene confirmar alcance y versiones antes de publicar.
 */
export const servicios: Servicio[] = [
  {
    slug: 'sistemas-de-gestion',
    numero: '01',
    titulo: 'Sistemas de Gestión: Calidad, Ambiental y Seguridad y Salud en el Trabajo',
    tituloCorto: 'Sistemas de Gestión',
    tagline: 'ISO 9001 · ISO 14001 · ISO 45001',
    resumen:
      'Diseñamos, implementamos y preparamos para certificación sistemas de gestión que la organización realmente usa, en lugar de carpetas que solo se abren en auditoría.',
    descripcion: [
      'Acompañamos a su organización en todo el ciclo de un sistema de gestión: desde el diagnóstico inicial frente a la norma, hasta el cierre de hallazgos de la auditoría de certificación. Trabajamos sobre los procesos que usted ya tiene, no sobre plantillas genéricas.',
      'Nuestro enfoque parte de un principio: un sistema de gestión sirve cuando reduce reprocesos, ordena decisiones y da evidencia útil a la gerencia. La certificación es la consecuencia, no el objetivo.',
      'Integramos los tres sistemas cuando la organización lo requiere, de modo que exista una sola estructura documental, un solo programa de auditorías y un solo ciclo de revisión por la dirección, evitando la duplicación de esfuerzos que encarece la operación.',
    ],
    paraQuien:
      'Empresas que buscan certificarse por primera vez, organizaciones que necesitan recertificar o migrar de versión, y equipos que ya tienen el sistema documentado pero no logran que se aplique en el día a día.',
    entregables: [
      'Diagnóstico de brechas frente a la norma, con plan de cierre priorizado',
      'Mapa de procesos y caracterizaciones ajustadas a la operación real',
      'Documentación del sistema: política, objetivos, procedimientos y registros',
      'Matriz de requisitos legales aplicables y su evaluación de cumplimiento',
      'Formación del equipo interno y transferencia de conocimiento',
      'Auditoría interna previa y acompañamiento en la auditoría de certificación',
    ],
    normas: ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'Decreto 1072 de 2015', 'Resolución 0312 de 2019'],
    icono: 'gestion',
  },
  {
    slug: 'gestion-de-riesgos',
    numero: '02',
    titulo: 'Gestión de Riesgos Organizacionales',
    tituloCorto: 'Gestión de Riesgos',
    tagline: 'ISO 31000 · Riesgo operativo, estratégico y de cumplimiento',
    resumen:
      'Convertimos el mapa de riesgos en una herramienta de decisión gerencial, con controles que se miden y responsables que responden.',
    descripcion: [
      'La mayoría de las matrices de riesgo se construyen una vez y se archivan. Nosotros trabajamos en el sentido contrario: identificamos los riesgos que de verdad amenazan los objetivos del negocio, valoramos su exposición con criterios explícitos y diseñamos controles cuya efectividad se puede verificar.',
      'Aplicamos los lineamientos de ISO 31000 adaptados al tamaño y madurez de cada organización. Una empresa de veinte personas no necesita el mismo aparato metodológico que un grupo empresarial, pero ambas necesitan saber dónde están expuestas.',
      'Incluimos la articulación entre riesgos estratégicos, operativos, de cumplimiento y de los sistemas de gestión, de modo que la organización mantenga una sola conversación sobre riesgo y no cuatro inventarios paralelos.',
    ],
    paraQuien:
      'Juntas directivas y gerencias que necesitan visibilidad sobre su exposición, organizaciones bajo exigencia de terceros (clientes, aseguradoras, entes de control) y empresas que ya tienen matrices pero no confían en ellas.',
    entregables: [
      'Contexto estratégico y criterios de aceptación del riesgo, aprobados por la dirección',
      'Identificación y valoración de riesgos por proceso y por objetivo institucional',
      'Mapa de calor y priorización de la exposición residual',
      'Diseño y evaluación de efectividad de controles',
      'Planes de tratamiento con responsables, plazos y recursos definidos',
      'Tablero de indicadores para el seguimiento periódico',
    ],
    normas: ['ISO 31000:2018', 'ISO 31010', 'COSO ERM'],
    icono: 'riesgos',
  },
  {
    slug: 'control-interno',
    numero: '03',
    titulo: 'Control Interno Organizacional',
    tituloCorto: 'Control Interno',
    tagline: 'MECI · COSO · Líneas de defensa',
    resumen:
      'Estructuramos el sistema de control interno para que la organización detecte a tiempo lo que se desvía, sin convertir el control en un obstáculo para operar.',
    descripcion: [
      'Un buen sistema de control interno no multiplica las firmas ni los formatos: distribuye responsabilidades con claridad y hace que los problemas aparezcan temprano, cuando todavía son baratos de corregir.',
      'Diseñamos o fortalecemos el sistema bajo el modelo de las tres líneas de defensa, definiendo con precisión qué controla la operación, qué vigila el área de cumplimiento y qué verifica la auditoría interna. Esta separación es la que evita que todos supongan que otro está revisando.',
      'Para entidades públicas y economía mixta desarrollamos la implementación del MECI articulada con el Modelo Integrado de Planeación y Gestión, incluyendo los productos que exige el reporte anual.',
    ],
    paraQuien:
      'Entidades públicas y de economía mixta sujetas a MECI, empresas privadas con exigencias de gobierno corporativo, y organizaciones que han tenido hallazgos recurrentes de auditoría o eventos de pérdida.',
    entregables: [
      'Diagnóstico de madurez del sistema de control interno',
      'Definición de roles bajo el esquema de tres líneas de defensa',
      'Estructura de controles por proceso, con pruebas de diseño y de operación',
      'Manual de control interno y política institucional',
      'Plan de fortalecimiento con cronograma e indicadores',
      'Acompañamiento al comité de coordinación de control interno',
    ],
    normas: ['MECI', 'MIPG', 'COSO 2013', 'Ley 87 de 1993'],
    icono: 'control',
  },
  {
    slug: 'calidad-en-salud',
    numero: '04',
    titulo: 'Calidad en Instituciones Prestadoras de Servicios de Salud',
    tituloCorto: 'Calidad en Salud',
    tagline: 'Habilitación · PAMEC · Acreditación',
    resumen:
      'Acompañamos a IPS y prestadores en los cuatro componentes del Sistema Obligatorio de Garantía de Calidad, desde la habilitación hasta la ruta de acreditación.',
    descripcion: [
      'El sector salud tiene una exigencia normativa propia y una tolerancia al error mucho menor que otros sectores. Nuestro acompañamiento cubre los cuatro componentes del SOGCS: habilitación, auditoría para el mejoramiento (PAMEC), sistema de información y acreditación.',
      'Preparamos a la institución para la verificación de condiciones de habilitación, revisando estándares de talento humano, infraestructura, dotación, medicamentos, procesos prioritarios, historia clínica e interdependencia, con la evidencia que exige el verificador.',
      'Para instituciones con mayor madurez, estructuramos la ruta hacia la acreditación en salud, incluyendo la autoevaluación por grupos de estándares, la priorización de oportunidades de mejora y la formulación de los planes que sustentan el ciclo.',
      'Integramos el enfoque de seguridad del paciente de manera transversal, porque los indicadores de calidad en salud se sostienen sobre la gestión sistemática del evento adverso.',
    ],
    paraQuien:
      'IPS de cualquier nivel de complejidad, profesionales independientes, entidades con objeto social diferente que prestan servicios de salud, y transporte especial de pacientes.',
    entregables: [
      'Autoevaluación de estándares de habilitación por servicio',
      'Plan de cierre de brechas previo a la visita de verificación',
      'Diseño y puesta en marcha del PAMEC con su ciclo completo',
      'Programa de seguridad del paciente y gestión de eventos adversos',
      'Batería de indicadores de calidad y su reporte obligatorio',
      'Ruta de preparación para la acreditación en salud',
    ],
    normas: ['Resolución 3100 de 2019', 'Decreto 780 de 2016', 'Resolución 5095 de 2018', 'PAMEC', 'Sistema Único de Acreditación'],
    icono: 'salud',
  },
  {
    slug: 'programas-de-auditoria',
    numero: '05',
    titulo: 'Planificación, Diseño e Implementación de Programas de Auditoría',
    tituloCorto: 'Programas de Auditoría',
    tagline: 'ISO 19011 · Auditoría interna y de segunda parte',
    resumen:
      'Diseñamos programas de auditoría que generan hallazgos accionables y formamos al equipo interno para sostenerlos sin depender del consultor.',
    descripcion: [
      'Una auditoría que solo confirma que los documentos existen no aporta nada. Diseñamos programas orientados a riesgo, donde el alcance, la frecuencia y la profundidad de cada ciclo se deciden según lo que está en juego en cada proceso.',
      'Bajo los lineamientos de ISO 19011 estructuramos el programa completo: objetivos, criterios, competencia requerida de los auditores, planificación de ciclos, ejecución, informe y verificación de la eficacia de las acciones tomadas.',
      'Formamos y calificamos auditores internos con práctica real sobre los procesos de la propia organización, no con ejercicios de aula. El objetivo declarado es que al terminar el acompañamiento la organización pueda auditarse sola.',
      'Ejecutamos también auditorías de segunda parte a proveedores y contratistas, cuando la organización necesita verificar el cumplimiento a lo largo de su cadena de suministro.',
    ],
    paraQuien:
      'Organizaciones con sistemas de gestión certificados, áreas de auditoría interna en formación, y empresas que necesitan evaluar proveedores críticos.',
    entregables: [
      'Programa anual de auditoría basado en riesgo y desempeño de procesos',
      'Procedimiento de auditoría interna, listas de verificación y formatos',
      'Formación y calificación de auditores internos con práctica supervisada',
      'Ejecución de ciclos de auditoría con informe de hallazgos',
      'Metodología de análisis de causa y formulación de acciones correctivas',
      'Verificación de eficacia y cierre documentado de hallazgos',
    ],
    normas: ['ISO 19011:2018', 'ISO/IEC 17021', 'ISO 9001:2015'],
    icono: 'auditoria',
  },
];

export const getServicio = (slug: string) => servicios.find((s) => s.slug === slug);
