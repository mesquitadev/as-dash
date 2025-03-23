import moment from 'moment';

export function validaCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D+/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calcCheckDigit = (base: string, factor: number) => {
    let total = 0;
    for (const digit of base) {
      total += parseInt(digit) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base = cpf.slice(0, 9);
  const firstCheckDigit = calcCheckDigit(base, 10);
  const secondCheckDigit = calcCheckDigit(base + firstCheckDigit, 11);

  return cpf === base + firstCheckDigit + secondCheckDigit;
}

export const futureDatesOnly = (current: moment.Moment) => {
  return current && current.isBefore(moment().startOf('day'));
};

export const pastDatesOnly = (current: moment.Moment) => {
  return current && current.isAfter(moment().endOf('day'));
};
