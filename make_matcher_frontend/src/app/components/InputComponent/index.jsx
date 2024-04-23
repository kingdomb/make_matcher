import React from 'react';

export function InputComponent({ id, label, error, ...props }) {
  return (
    <div className="form-input-sections">
      <input id={id} {...props} className={id} required />
      <label className="form-labels" htmlFor={id}>
        {label}
      </label>
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
