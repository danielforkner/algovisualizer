import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { wait } from '../sorting/helpers';

export default function BinaryTree() {
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [speed, setSpeed] = useState(500);
  const [numNodes, setNumNodes] = useState(25);
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [values, setValues] = useState([
    53, 64, 38, 82, 85, 21, 82, 95, 51, 65, 8, 54, 88, 43, 28, 2, 8, 27, 68, 53,
    30, 49, 26, 79, 86, 32,
  ]);

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

  const drawNode = (x, y, r, text) => {
    console.log(x, y, r, text);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.strokeText(text, x, y);
  };

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
      drawNode(this.rootX, this.rootY, this.rootRadius, value);
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
            y: curr.y + this.nodeYOffset - level * 3,
            radius: this.rootRadius - level,
          });
          // node
          drawNode(curr.right.x, curr.right.y, curr.right.radius, value);
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
            y: curr.y + this.nodeYOffset - level * 3,
            radius: this.rootRadius - level,
          });
          // node
          drawNode(curr.left.x, curr.left.y, curr.left.radius, value);
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
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };
  const handleDraw = async () => {
    let tree = new BinaryTree();
    const root = Math.floor(Math.random() * 100);
    tree.insertRoot(root);
    setValues((values) => [root]);
    for (let i = 0; i < numNodes; i++) {
      const value = Math.floor(Math.random() * 100);
      await tree.insertNode(value);
      setValues((values) => [...values, value]);
    }
  };
  return (
    <div>
      <button onClick={handleDraw}>Generate a Tree</button>
      <button onClick={handleClear}>Clear</button>
      <h2>Binary Tree</h2>
      <div className="values">
        {values.map((value, idx) => {
          return (
            <div className="cell" key={`binarytreevalue:${idx}`}>
              {value}
            </div>
          );
        })}
      </div>
      <Paper>
        <canvas
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
          // style={{ backgroundColor: 'white' }}
        >
          Your browser does not support this content
        </canvas>
      </Paper>
    </div>
  );
}
