import React, { useState, useEffect } from 'react';
import './Error.scss';

export const ErrorMessageComponent = ({ error }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error && error.errorMessage) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!show) return null;

  return (
    <div className="error-toast">
      <p>{error.errorMessage}</p>
    </div>
  );
};
