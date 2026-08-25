import { site } from './site';
import { rutaArea, type AreaConsultoria } from './servicios';
import { formatoCOP, type Curso } from './cursos';

/**
 * Datos estructurados (JSON-LD) para buscadores.
 *
 * Todo cuelga de una sola entidad ProfessionalService con @id fijo, para que
 * Google entienda que servicios, cursos y páginas pertenecen a la misma empresa
 * y no a organizaciones distintas.
 */

export const ID_ORG = '#organizacion';

export const urlAbsoluta = (ruta: string, base: URL | string) => new URL(ruta, base).href;

/** La empresa. Se emite en todas las páginas. */
export function organizacion(base: URL | string) {
  return {
    '@type': 'ProfessionalService',
    '@id': urlAbsoluta(ID_ORG, base),
    name: site.nombre,
    alternateName: 'Quality',
    description: site.descripcion,
    url: urlAbsoluta('/', base),
    logo: urlAbsoluta('/brand/logo.webp', base),
    image: urlAbsoluta('/og.jpg', base),
    email: site.email,
    telephone: site.contactos[0].telefono,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      // ⚠ PENDIENTE: dirección exacta. Sin calle, Google no muestra ficha local completa.
      addressLocality: 'Popayán',
      addressRegion: 'Cauca',
      addressCountry: 'CO',
    },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    contactPoint: site.contactos.map((c) => ({
      '@type': 'ContactPoint',
      name: c.nombre,
      telephone: c.telefono,
      email: c.email,
      contactType: 'customer service',
      areaServed: 'CO',
      availableLanguage: 'Spanish',
    })),
    // ⚠ PENDIENTE: al tener redes sociales, añadir sus URL aquí. Google las usa
    // para confirmar que la empresa es la misma en todos lados.
    sameAs: site.redes.filter((r) => r.url).map((r) => r.url),
    knowsAbout: [
      'ISO 9001',
      'ISO 14001',
      'ISO 45001',
      'ISO 31000',
      'ISO 19011',
      'Sistemas de gestión de calidad',
      'Seguridad y salud en el trabajo',
      'Control interno',
      'Auditoría interna',
      'Habilitación de servicios de salud',
    ],
  };
}

/** Migas de pan. Google las muestra en lugar de la URL cruda. */
export function migas(items: { nombre: string; ruta: string }[], base: URL | string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: urlAbsoluta(item.ruta, base),
    })),
  };
}

/**
 * Un área dentro de Consultoría organizacional.
 * Se declara como parte de la línea, no como servicio suelto, para que Google
 * entienda la jerarquía real de la oferta.
 */
export function areaLd(area: AreaConsultoria, base: URL | string) {
  const url = urlAbsoluta(rutaArea(area.slug), base);
  return {
    '@type': 'Service',
    '@id': `${url}#servicio`,
    name: area.titulo,
    description: area.resumen,
    serviceType: area.tituloCorto,
    url,
    provider: { '@id': urlAbsoluta(ID_ORG, base) },
    isRelatedTo: { '@id': urlAbsoluta('/servicios/consultoria-organizacional#servicio', base) },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Entregables — ${area.tituloCorto}`,
      itemListElement: area.entregables.map((e) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: e },
      })),
    },
  };
}

/** Un curso del aula. Es el esquema con más potencial de resultado enriquecido. */
export function cursoLd(curso: Curso, base: URL | string) {
  const url = urlAbsoluta(`/aula/${curso.slug}`, base);

  return {
    '@type': 'Course',
    '@id': `${url}#curso`,
    name: curso.titulo,
    description: curso.resumen,
    url,
    inLanguage: 'es-CO',
    educationalLevel: curso.nivel,
    teaches: curso.aprendizajes,
    provider: { '@id': urlAbsoluta(ID_ORG, base) },
    offers: curso.proximamente
      ? undefined
      : {
          '@type': 'Offer',
          price: curso.precio,
          priceCurrency: 'COP',
          availability: 'https://schema.org/InStock',
          category: 'Paid',
          url,
        },
    timeRequired: `PT${curso.duracionHoras}H`,
    // Google exige courseMode y courseWorkload para el resultado enriquecido de cursos.
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${curso.duracionHoras}H`,
      inLanguage: 'es-CO',
    },
  };
}

/** Lista de cursos para la página de catálogo. */
export function catalogoLd(cursos: Curso[], base: URL | string) {
  return {
    '@type': 'ItemList',
    name: 'Catálogo del Aula Virtual Quality',
    numberOfItems: cursos.length,
    itemListElement: cursos.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: urlAbsoluta(`/aula/${c.slug}`, base),
      name: c.titulo,
    })),
  };
}

/** Preguntas frecuentes. Puede aparecer desplegable en el resultado de búsqueda. */
export function faqLd(preguntas: { p: string; r: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: preguntas.map(({ p, r }) => ({
      '@type': 'Question',
      name: p,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  };
}

export const precioLegible = formatoCOP;
