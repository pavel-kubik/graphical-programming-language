import Const from './Builder/Const';
import './CodeMap.css';

const CodeMap = ({ codeMap, editLine }) => {
  const toJS = (line) => {
    switch (line.type) {
      case 'const':
        return `const ${line.name} = ${line.value}`;
      default:
        return '<unsupported command>';
    }
  };

  return (
    <div className="CodeMap">
      {codeMap.length === 0 && 'Place your code here.'}
      {codeMap.length > 0 &&
        codeMap.map((line, i) => (
          <div key={line.name} className="codeLine">
            <span className="lineNumber">{i}. </span>
            {line.type === 'const' && (
              <Const
                line={i}
                name={line.name}
                value={line.value}
                handleEditLine={(name, value) => {
                  editLine(i, {
                    type: 'const',
                    name: name,
                    value: value,
                  });
                }}
              />
            )}
            <span className="TrueCode">{toJS(line)}</span>
          </div>
        ))}
    </div>
  );
};

export default CodeMap;
