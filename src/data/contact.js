export const PHONE = '5547999455080';
export const PHONE_DISPLAY = '+55 47 99945-5080';
export const EMAIL = 'suporte@catalucca.com.br';

export const ADDRESSES = [
  { role: 'HUB', city: 'Brasília/DF', detail: 'Setor de Autarquias Sul' },
  { role: 'Polo logístico', city: 'Itajaí/SC', detail: 'Rodovia Jorge Lacerda' },
];

export function whatsappLink(message) {
  const base = `https://wa.me/${PHONE}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
