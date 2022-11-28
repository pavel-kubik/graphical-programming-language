import './CodeMap.css';

const CodeMap = ({ codeMap }) => {
  return (
    <div className="CodeMap">
      {codeMap.length === 0 && 'Place your code here.'}
      {codeMap.length > 0 && codeMap.map((line) => <div>{line}</div>)}
    </div>
  );
};

export default CodeMap;
