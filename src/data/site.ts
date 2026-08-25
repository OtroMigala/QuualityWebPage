/**
 * Datos de contacto y configuración global del sitio.
 * Todo lo marcado con  // ⚠ PENDIENTE  requiere confirmación antes de publicar.
 */

export const site = {
  nombre: 'Quality Consulting Group',
  nombreCorto: 'Quality',
  tagline: 'Asesores & Consultores',
  // Meta descripción del home. Conviene mantenerla bajo 160 caracteres:
  // por encima de eso Google la corta en el resultado de búsqueda.
  descripcion:
    'Consultoría ISO 9001, ISO 14001 e ISO 45001, gestión de riesgos, control interno y calidad en salud. Formación con certificado. Popayán y todo Colombia.',

  email: 'andrea_urbano@qualityac.co',

  ciudad: 'Popayán, Cauca',
  cobertura: 'Cobertura nacional · Atención presencial y virtual',

  // ⚠ PENDIENTE: confirmar horario real de atención
  horario: 'Lunes a viernes, 8:00 a.m. – 6:00 p.m.',

  contactos: [
    {
      nombre: 'Andrea Cecilia Urbano Gallego',
      cargo: 'Dirección de Consultoría', // ⚠ PENDIENTE: confirmar cargo
      telefono: '+57 313 657 4369',
      telefonoLimpio: '573136574369',
      email: 'andrea_urbano@qualityac.co',
      esPrincipal: true,
    },
    {
      nombre: 'Gustavo Adolfo Ramírez González',
      cargo: 'Dirección de Formación y Eventos', // ⚠ PENDIENTE: confirmar cargo
      telefono: '+57 300 000 0000', // ⚠ PENDIENTE: número real de Gustavo
      telefonoLimpio: '573000000000',
      email: 'contacto@qualityac.co', // ⚠ PENDIENTE: correo real de Gustavo
      esPrincipal: false,
    },
  ],

  // ⚠ PENDIENTE: URLs reales. Las entradas sin url no se renderizan.
  redes: [
    { nombre: 'LinkedIn', url: '', icono: 'linkedin' },
    { nombre: 'Facebook', url: '', icono: 'facebook' },
    { nombre: 'Instagram', url: '', icono: 'instagram' },
    { nombre: 'YouTube', url: '', icono: 'youtube' },
  ],

  nav: [
    { texto: 'Inicio', href: '/' },
    { texto: 'Servicios', href: '/servicios' },
    { texto: 'Aula Virtual', href: '/aula' },
    { texto: 'Nosotros', href: '/nosotros' },
    { texto: 'Contacto', href: '/contacto' },
  ],
} as const;

export const whatsappUrl = (
  telefono = site.contactos[0].telefonoLimpio,
  mensaje = 'Hola, me gustaría recibir información sobre sus servicios de consultoría.'
) => `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
