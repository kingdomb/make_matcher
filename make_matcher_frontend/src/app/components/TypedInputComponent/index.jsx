/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export function TypedInputComponent({
  id,
  label,
  containerClassName,
  inputClassName,
  labelClassName,
  updateClassName,
  buttonClassName,
  iconClassName,
  errorClassName,
  onClick,
  ...props
}) {
  const [prevValue, setPrevValue] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    // Perform validation checks based on 'value'
    const inputField = document.getElementById(id);
    const newValue = inputField.value;
    const isValid = newValue !== prevValue;
    if (!isValid) {
      setError('Invalid input');
    } else {
      setError('');
      setPrevValue(newValue);
      onClick(id, value); // Only update parent if valid
    }
  };

  return (
    <div className={`${containerClassName}`}>
      {/* Check if onClick exists before rendering this section */}
      {onClick && (
        <div className={`${updateClassName}`}>
          <input
            id={id}
            {...props}
            className={`${inputClassName}`}
            required
            value={value}
            onChange={handleChange}
          />
          <button className={`${buttonClassName}`}>
            <img
              className={`${iconClassName}`}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Green_check_icon_with_gradient.svg/240px-Green_check_icon_with_gradient.svg.png"
              alt="green checkmark to save value"
            />
          </button>
        </div>
      )}

      {/* Only render the following if onClick is NOT provided */}
      {!onClick && (
        <>
          <input id={id} {...props} className={`${inputClassName}`} required />
          <label className={`${labelClassName}`} htmlFor={id}>
            {label}
          </label>
          <div className={`${errorClassName}`}>{error && <p>{error}</p>}</div>
        </>
      )}
    </div>
  );
}
