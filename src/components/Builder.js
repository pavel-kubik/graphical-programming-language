import './Builder.css';

const Builder = ({ addCode }) => {
  const addConst = () => {
    addCode('const ___ = ___');
  };

  return (
    <div className="Builder">
      <div onClick={addConst}>const</div>
      <div>var</div>
      <div>expression</div>
      <div>if</div>
      <div>while</div>
      <div>for</div>
      <div>break</div>
      <div>continue</div>
      <div>return</div>
    </div>
  );
};

export default Builder;
