import React from 'react';

interface TipTapProps {
  value: any;
  onChange: any;
  placeholder?: any;
  height?: string;
  toolbar?: string;
}

const TipTap = ({ value, onChange, placeholder, height, toolbar }: TipTapProps) => {
  return (
    <div
      className="border border-border rounded-xl p-4 bg-background"
      style={{ minHeight: height || '200px' }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full outline-none bg-transparent resize-y"
        style={{ minHeight: height ? `calc(${height} - 2rem)` : '180px' }}
      />
    </div>
  );
};

export default TipTap;
