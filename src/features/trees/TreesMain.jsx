export default function TreesMain() {
  const handleClear = () => {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 150, 150);
  };
  const handleDraw = () => {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.lineTo(75, 50);
    ctx.fill();
  };
  return (
    <div>
      <h1>Tree Traversal</h1>
      <div>Type: {`[Binary Tree]`}</div>
      <div>Number of nodes: {`[25]`}</div>
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleClear}>Clear</button>
      <canvas
        id="canvas"
        width="500"
        height="300"
        style={{ backgroundColor: 'white' }}
      >
        Your browser does not support this content
      </canvas>
    </div>
  );
}
