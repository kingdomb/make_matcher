/**
 *
 * DropdownFormComponent
 *
 */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export function DropdownFormComponent({
  name,
  label,
  options,
  initialValue,
  containerClassName,
  updateClassName,
  buttonClassName,
  iconClassName,
  inputClassName,
  labelClassName,
  onChange,
}) {
  const [selected, setSelected] = useState('');

  const handleOptionClick = value => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className={containerClassName}>
      <div className={`${updateClassName}`}>
        <label htmlFor={name} className={`${labelClassName}`}>
          {label}
        </label>
        <select name={name} id={name} className={`${inputClassName}`} multiple>
          <option value="" disabled hidden selected>
            -- Select your days --
          </option>
          {options.map(option => (
            <option
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </option>
          ))}
        </select>
        <button className={`${buttonClassName}`}>
          <img
            className={`${iconClassName}`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Green_check_icon_with_gradient.svg/240px-Green_check_icon_with_gradient.svg.png"
            alt="green checkmark to save value"
          />
        </button>
      </div>
      <br />
      <br />
      <p>
        Hold down the Ctrl (Windows & Linux) or Command (Mac) button to select
        multiple options.
      </p>
    </div>
  );
}
