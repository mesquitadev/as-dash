export function getGreeting(): string {
  const now = new Date();
  const hours = now.getHours();
  if (hours >= 0 && hours < 12) {
    return 'Bom dia';
  } else if (hours >= 12 && hours < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
}

export const getMeasureUnit = (unit: string) => {
  switch (unit) {
    case 'KILOGRAM':
      return 'kg';
    case 'LITER':
      return 'lts';
    case 'METER':
      return 'mt';
    case 'KILOMETER':
      return 'km';
    case 'PIECE':
      return 'pcs';
    case 'UNITY':
      return 'un';
    default:
      return '';
  }
};

export const measureUnits = [
  { value: 'KILOGRAM', label: 'kg' },
  { value: 'LITER', label: 'lts' },
  { value: 'METER', label: 'mt' },
  { value: 'KILOMETER', label: 'km' },
  { value: 'PIECE', label: 'pcs' },
  { value: 'UNITY', label: 'un' },
];
