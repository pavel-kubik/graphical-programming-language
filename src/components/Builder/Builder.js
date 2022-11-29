import './Builder.css';

const Builder = ({ addCode }) => {
  const addConst = () => {
    addCode({
      type: 'const',
      name: '___',
      value: '___',
    });
  };

  const addVar = () => {
    addCode({
      type: 'var',
      name: '___',
      value: '___',
    });
  };

  const addExpression = () => {
    addCode({
      type: 'expression',
      lValue: '___',
      rValue: '___',
    });
  };

  const addIf = () => {
    addCode({
      type: 'if',
      condition: '___',
      trueStatements: '___',
      falseStatements: '___',
    });
  };

  return (
    <div className="Builder">
      <div onClick={addConst}>const</div>
      <div onClick={addVar}>var</div>
      <div onClick={addExpression}>expression</div>
      <div onClick={addIf}>if</div>
      <div>while</div>
      <div>for</div>
      <div>break</div>
      <div>continue</div>
      <div>return</div>
    </div>
  );
};

export default Builder;
