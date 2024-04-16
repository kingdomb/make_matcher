import React from 'react';

export function RangeInputComponent({
  id,
  label,
  error,
  containerClassName,
  rangeClassName,
  inputClassName,
  labelClassName,
  errorClassName,
  updateClassName,
  buttonClassName,
  iconClassName,
  ...props
}) {
  return (
    <div className={`${containerClassName}`}>
      <div className={`${updateClassName}`}>
        <input id={id} {...props} className={`${inputClassName}`} required />
        <button className={`${buttonClassName}`}>
          <img
            className={`${iconClassName}`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Green_check_icon_with_gradient.svg/240px-Green_check_icon_with_gradient.svg.png"
            alt="green checkmark to save value"
          />
        </button>
      </div>
      <div className={`${errorClassName}`}>{error && <p>{error}</p>}</div>
    </div>
  );
}
