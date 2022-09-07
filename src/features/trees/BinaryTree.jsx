import { useEffect, useState } from 'react';
import { wait } from '../sorting/helpers';

export default function BinaryTree() {
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [speed, setSpeed] = useState(500);
  const [numNodes, setNumNodes] = useState(25);
  const [c, setC] = useState();
  const [ctx, setCtx] = useState();

  useEffect(() => {
    setC(document.getElementById('canvas'));
    if (c) setCtx(c.getContext('2d'));
  }, [c]);

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
  class BinaryTree {
    constructor() {
      this.root = null;
      this.rootX = 250; // starting position on canvas
      this.rootY = 20; // starting position on canvas
      this.nodeXOffset = 150; // how far apart nodes are X
      this.nodeYOffset = 60; // how far apart nodes are Y
      this.levelIncrement = 0.75; // root is level 0
      this.rootRadius = 20; // starting node size on canvas
    }
    async insertRoot(value) {
      this.root = new Node({
        value,
        x: this.rootX,
        y: this.rootY,
        radius: this.rootRadius,
      });
      ctx.beginPath();
      ctx.arc(this.root.x, this.root.y, this.rootRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      ctx.fillText(value, this.rootX, this.rootY);
      await wait(speed / 2);
    }
    async insertNode(value, parentNode, level = 0) {
      let curr;
      if (!parentNode) curr = this.root;
      else curr = parentNode;
      level += this.levelIncrement;
      if (value === curr.value) return;
      if (value > curr.value) {
        if (curr.right === null) {
          curr.right = new Node({
            value,
            x: curr.x + this.nodeXOffset / (1 + level),
            y: curr.y + this.nodeYOffset,
            radius: this.rootRadius - level,
          });
          // node
          ctx.beginPath();
          ctx.arc(
            curr.right.x,
            curr.right.y,
            curr.right.radius,
            0,
            Math.PI * 2
          );
          ctx.stroke();
          ctx.closePath();
          ctx.fillText(value, curr.right.x, curr.right.y);
          // line
          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y + curr.radius);
          ctx.lineTo(curr.right.x, curr.right.y - curr.right.radius);
          ctx.stroke();
          ctx.closePath();
          await wait(speed / 2);
        } else
          await this.insertNode(value, curr.right, level + this.levelIncrement);
      } else {
        if (curr.left === null) {
          curr.left = new Node({
            value,
            x: curr.x - this.nodeXOffset / (1 + level),
            y: curr.y + this.nodeYOffset,
            radius: this.rootRadius - level,
          });
          // node
          ctx.beginPath();
          ctx.arc(curr.left.x, curr.left.y, curr.left.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.closePath();
          ctx.fillText(value, curr.left.x, curr.left.y);
          // line
          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y + curr.radius);
          ctx.lineTo(curr.left.x, curr.left.y - curr.left.radius);
          ctx.stroke();
          ctx.closePath();
          await wait(speed / 2);
        } else
          await this.insertNode(value, curr.left, level + this.levelIncrement);
      }
    }
  }

  const handleClear = () => {
    ctx.clearRect(0);
  };
  const handleDraw = async () => {
    let tree = new BinaryTree();
    tree.insertRoot(Math.floor(Math.random() * 100));
    for (let i = 0; i < numNodes; i++) {
      await tree.insertNode(Math.floor(Math.random() * 100));
    }
  };
  return (
    <div>
      <h2>Binary Tree</h2>
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleClear}>Clear</button>
      <canvas
        id="canvas"
        width={canvasWidth}
        height={canvasHeight}
        style={{ backgroundColor: 'white' }}
      >
        Your browser does not support this content
      </canvas>
    </div>
  );
}
