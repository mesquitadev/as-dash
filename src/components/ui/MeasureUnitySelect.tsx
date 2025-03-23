import { measureUnits } from '@/utils';
// Componente de Select para Unidade de Medida
export const MeasureUnitSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className='p-2 border rounded'>
      {measureUnits.map((unit) => (
        <option key={unit.value} value={unit.value}>
          {unit.label}
        </option>
      ))}
    </select>
  );
};
