import { useState, useEffect } from 'react';
import { wait } from './helpers';

export default function BinarySearchTree() {
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [speed, setSpeed] = useState(500);
  const [numNodes, setNumNodes] = useState(25);
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [values, setValues] = useState([3, 1, 6, 4, 7, 10, 14, 13]);
  // edge cases to account for: duplicate numbers (ignore them)

  useEffect(() => {
    setC(document.getElementById('bstCanvas'));
    if (c) {
      setCtx(c.getContext('2d'));
    }
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
    }
  }, [c, ctx]);

  const handleClear = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };
  const handleDraw = async () => {
    let tree = new BinarySearchTree();
    const root = 8;
    await tree.insertRoot(root);
    for (let i = 0; i < values.length; i++) {
      await tree.insertNode(values[i]);
    }
  };

  const drawNode = (x, y, r, text) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.strokeText(text, x, y);
  };
  class BinarySearchTree {
    constructor() {
      this.root = null;
      this.rootX = canvasWidth / 2; // starting position on canvas
      this.rootY = 25; // starting position on canvas
      this.nodeXOffset = 200; // how far apart nodes are X
      this.nodeYOffset = 60; // how far apart nodes are Y
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
      drawNode(this.rootX, this.rootY, this.rootRadius, value);
      await wait(speed);
    }
    async insertNode(value, parent = this.root, level = 0) {
      level += 1;
      if (value > parent.value) {
        if (parent.right === null) {
          parent.right = new Node({
            value,
            x: parent.x + this.nodeXOffset / (1 + level),
            y: parent.y + this.nodeYOffset - level * 3,
            radius: this.rootRadius,
          });
          drawNode(parent.right.x, parent.right.y, parent.right.radius, value);
          ctx.beginPath();
          ctx.moveTo(parent.x, parent.y + parent.radius);
          ctx.lineTo(parent.right.x, parent.right.y - parent.right.radius);
          ctx.stroke();
          ctx.closePath();
          await wait(speed);
        } else {
          await this.insertNode(value, parent.right, level);
        }
      } else {
        if (parent.left === null) {
          parent.left = new Node({
            value,
            x: parent.x - this.nodeXOffset / (1 + level),
            y: parent.y + this.nodeYOffset - level * 3,
            radius: this.rootRadius,
          });
          drawNode(parent.left.x, parent.left.y, parent.left.radius, value);
          ctx.beginPath();
          ctx.moveTo(parent.x, parent.y + parent.radius);
          ctx.lineTo(parent.left.x, parent.left.y - parent.left.radius);
          ctx.stroke();
          ctx.closePath();
          await wait(speed);
        } else {
          await this.insertNode(value, parent.left, level);
        }
      }
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
        width={canvasWidth}
        height={canvasHeight}
        style={{ backgroundColor: 'white' }}
      >
        Your browser does not support this content
      </canvas>
    </div>
  );
}
