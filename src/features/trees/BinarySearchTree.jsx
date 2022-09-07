export default function BinarySearchTree() {
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
      <h2>Binary Search Tree</h2>
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
