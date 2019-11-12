import React from 'react';
import Select from '../Select';

const TypeNameMap = {
  'ShortAnswer': '简短回答',
  'SingleSelection': '选择题',
  'MultiSelection': '多选题'
}

interface ITextAreaProps {
  className?: string;
  value?: string;
  types?: {[key: string]: string};
  onChange?: (type: string) => void;
  disabled?: boolean;
}

const TypeSelect: React.SFC<ITextAreaProps> = ({value, types = TypeNameMap, onChange, disabled}) => {
  const options = Object.keys(types).map((key) => {
    const name = types[key];
    return <option key={key} value={key}>{name}</option>;
  });
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (typeof onChange !== 'function') return;
    onChange(event.target.value);
  };
  return <Select onChange={handleChange} value={value} disabled={disabled}>
      {options}
    </Select>;
}

export default TypeSelect
