import { useEffect, useRef } from 'react';
import Mapping from './Mapping';
import './Statement.css';

const Statement = ({ type, name, value, handleEditLine }) => {
  const nameInput = useRef(null);
  const valueInput = useRef(null);

  const alignWidthToContent = (element) => {
    if (!element || !element.value) return;
    element.style.width = element.value.length + 1 + 'ch';
  };

  useEffect(() => {
    alignWidthToContent(nameInput.current);
  }, [name]);

  useEffect(() => {
    alignWidthToContent(valueInput.current);
  }, [value]);

  const changeName = (event) => {
    event.preventDefault();
    alignWidthToContent(event.target);
    handleEditLine(event.target.value, value);
  };

  const changeValue = (event) => {
    event.preventDefault();
    alignWidthToContent(event.target);
    handleEditLine(name, event.target.value);
  };

  return (
    <span>
      {['const', 'var', 'expression'].includes(type) && (
        <>
          <span>{Mapping[type]} </span>
          <input
            ref={nameInput}
            className={type}
            value={name}
            onChange={changeName}
          />
          <span> = </span>
          <input
            ref={valueInput}
            className="expression"
            value={value}
            onChange={changeValue}
          />
        </>
      )}
    </span>
  );
};

export default Statement;
