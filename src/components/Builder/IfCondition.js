import { useEffect, useRef } from 'react';
import './IfCondition.css';

const IfCondition = ({
  condition,
  trueStatements,
  falseStatements,
  handleEditLine,
}) => {
  const conditionInput = useRef(null);
  const trueStatementsInput = useRef(null);
  const falseStatementsInput = useRef(null);

  const alignWidthToContent = (element) => {
    if (!element || !element.value) return;
    element.style.width = element.value.length + 1 + 'ch';
  };

  useEffect(() => {
    alignWidthToContent(conditionInput.current);
  }, [condition]);

  useEffect(() => {
    alignWidthToContent(trueStatementsInput.current);
  }, [trueStatements]);

  useEffect(() => {
    alignWidthToContent(falseStatementsInput.current);
  }, [falseStatements]);

  const changeCondition = (event) => {
    event.preventDefault();
    alignWidthToContent(event.target);
    handleEditLine(event.target.value, trueStatements, falseStatements);
  };

  const changeTrueStatements = (event) => {
    event.preventDefault();
    alignWidthToContent(event.target);
    handleEditLine(condition, event.target.value, falseStatements);
  };

  const changeFalseStatements = (event) => {
    event.preventDefault();
    alignWidthToContent(event.target);
    handleEditLine(condition, trueStatements, event.target.value);
  };

  return (
    <span>
      <span>{'if ('}</span>
      <input
        ref={conditionInput}
        className="Condition"
        value={condition}
        onChange={changeCondition}
      />
      {') {\n  '}
      <input
        ref={trueStatementsInput}
        className="TrueStatement"
        value={trueStatements}
        onChange={changeTrueStatements}
      />
      {'\n} else {\n  '}
      <input
        ref={falseStatementsInput}
        className="FalseStatement"
        value={falseStatements}
        onChange={changeFalseStatements}
      />
      {'\n}'}
    </span>
  );
};

export default IfCondition;
