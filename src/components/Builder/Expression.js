import { useEffect, useRef } from 'react';
import './Expression.css';

const Expression = ({ type, lValue, rValue, handleEditLine }) => {
  const lValueInput = useRef(null);
  const rValueInput = useRef(null);

  const alignWidthToContent = (element) => {
    if (!element || !element.value) return;
    element.style.width = element.value.length + 1 + 'ch';
  };

  useEffect(() => {
    alignWidthToContent(lValueInput.current);
  }, [lValue]);

  useEffect(() => {
    alignWidthToContent(rValueInput.current);
  }, [rValue]);

  const changeLValue = (event) => {
    event.preventDefault();
    alignWidthToContent(event.target);
    handleEditLine(event.target.value, rValue);
  };

  const changeRValue = (event) => {
    event.preventDefault();
    alignWidthToContent(event.target);
    handleEditLine(lValue, event.target.value);
  };

  return (
    <span>
      <input
        ref={lValueInput}
        className={type}
        value={lValue}
        onChange={changeLValue}
      />
      <span> = </span>
      <input
        ref={rValueInput}
        className="expression"
        value={rValue}
        onChange={changeRValue}
      />
    </span>
  );
};

export default Expression;
