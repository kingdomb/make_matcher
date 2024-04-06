import { CSSProperties } from 'react';

export const testStyles: Record<string, CSSProperties> = {
  container: {
    width: '1200px',
    fontFamily: 'Arial, sans-serif',
    margin: '20px',

    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333',
  },
  subHeader: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
  paragraph: {
    fontFamily: 'Arial, sans-serif',
  },
  successText: {
    fontFamily: 'Arial, sans-serif',
    color: 'green',
  },
  errorText: {
    fontFamily: 'Arial, sans-serif',
    color: 'red',
  },
  buttonBlue: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: 'none',
  },
  buttonRed: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '5px',
    fontSize: '11px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: 'none',
  },
  paper: {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#ffffff',
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    width: '300px',
    height: '400px',
    overflowY: 'auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '20px',
  },
  column: {
    flex: '1',
  },
  list: { height: '150px', width: '100%', overflow: 'auto' },
};
