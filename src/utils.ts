export const Vert = '#00643E';
export const Turquoise = '#80B29F';
export const Rouge = '#DE1300';

const couleursBinaire = [
  '#86C762',
  Rouge,
];

const couleursMultiple = [
  '#009AA9',
  '#F6AD57',
  '#C790B9',
  '#32A34D',
  '#2B9CA0',
  '#6FA332',
  '#A05D2B',
];

export const getCouleurs = (l: number, b: boolean = false) => {
  if (l === 2) return couleursBinaire;
  return b ? couleursBinaire.concat(couleursMultiple.slice(0, l - 2)) : couleursMultiple.slice(0, l);
}
