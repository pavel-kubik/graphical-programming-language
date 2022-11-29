import Expression from './Builder/Expression';
import IfCondition from './Builder/IfCondition';
import Statement from './Builder/Statement';
import './CodeMap.css';

const CodeMap = ({ codeMap, editLine }) => {
  const toJS = (line) => {
    switch (line.type) {
      case 'const':
        return `const ${line.name} = ${line.value}`;
      case 'var':
        return `let ${line.name} = ${line.value}`;
      case 'expression':
        return `let ${line.lValue} = ${line.rValue}`;
      case 'if':
        return (
          `if (${line.condition}) {\n` +
          `  ${line.trueStatements}\n` +
          `} else {\n` +
          `  ${line.falseStatements}\n` +
          `}`
        );
      default:
        return '<unsupported command>';
    }
  };

  return (
    <div className="CodeMap">
      {codeMap.length === 0 && 'Place your code here.'}
      {codeMap.length > 0 &&
        codeMap.map((line, i) => (
          <div key={i} className="CodeLine">
            <span className="LineNumber">{i}. </span>
            <span className="Code">
              {['const', 'var'].includes(line.type) && (
                <Statement
                  line={i}
                  type={line.type}
                  name={line.name}
                  value={line.value}
                  handleEditLine={(name, value) => {
                    editLine(i, {
                      type: line.type,
                      name: name,
                      value: value,
                    });
                  }}
                />
              )}
              {line.type === 'expression' && (
                <Expression
                  line={i}
                  type={line.type}
                  lValue={line.lValue}
                  rValue={line.rValue}
                  handleEditLine={(lValue, rValue) => {
                    editLine(i, {
                      type: line.type,
                      lValue: lValue,
                      rValue: rValue,
                    });
                  }}
                />
              )}
              {line.type === 'if' && (
                <IfCondition
                  line={i}
                  type={line.type}
                  condition={line.condition}
                  trueStatements={line.trueStatements}
                  falseStatements={line.falseStatements}
                  handleEditLine={(
                    condition,
                    trueStatements,
                    falseStatements
                  ) => {
                    editLine(i, {
                      type: line.type,
                      condition: condition,
                      trueStatements: trueStatements,
                      falseStatements: falseStatements,
                    });
                  }}
                />
              )}
            </span>
            <span className="TrueCode">{toJS(line)}</span>
          </div>
        ))}
    </div>
  );
};

export default CodeMap;
