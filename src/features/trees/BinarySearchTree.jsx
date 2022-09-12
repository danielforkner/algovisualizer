import { useState, useEffect } from 'react';

export default function BinarySearchTree() {
  const [canvasWidth, setCanvasWidth] = useState(250);
  const [canvasHeight, setCanvasHeight] = useState(250);
  const [speed, setSpeed] = useState(500);
  const [numNodes, setNumNodes] = useState(25);
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [values, setValues] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27,
  ]);
  // root = 13

  useEffect(() => {
    setC(document.getElementById('canvas'));
    if (c) {
      setCtx(c.getContext('2d'));
    }
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
    }
  }, [c, ctx]);

  const handleClear = () => {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 150, 150);
  };
  const handleDraw = () => {
    const c = document.getElementById('bstCanvas');
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.lineTo(75, 50);
    ctx.fill();
  };

  class BinaryTree {
    constructor() {
      this.root = null;
      this.rootX = canvasWidth / 2; // starting position on canvas
      this.rootY = 25; // starting position on canvas
      this.nodeXOffset = 200; // how far apart nodes are X
      this.nodeYOffset = 60; // how far apart nodes are Y
      this.levelIncrement = 1; // root is level 0
      this.rootRadius = 20; // starting node size on canvas
    }
    async depthFirstSearch(node, target) {}
    async breadthFirstSearch(node, target) {}
    async insertRoot(value) {
      this.root = new Node({
        value,
        x: this.rootX,
        y: this.rootY,
        radius: this.rootRadius,
      });
    }
  }

  class Node {
    constructor(data) {
      this.value = data.value;
      this.left = null;
      this.right = null;
      this.x = data.x;
      this.y = data.y;
      this.radius = data.radius;
    }
    isLeaf() {
      return this.left === null && this.right === null;
    }
  }

  return (
    <div>
      <h2>Binary Search Tree</h2>
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleClear}>Clear</button>
      <canvas
        id="bstCanvas"
        width="500"
        height="300"
        style={{ backgroundColor: 'white' }}
      >
        Your browser does not support this content
      </canvas>
    </div>
  );
}
