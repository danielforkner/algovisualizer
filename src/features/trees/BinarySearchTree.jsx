import { useState, useEffect } from 'react';
import { wait } from './helpers';

export default function BinarySearchTree() {
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [speed, setSpeed] = useState(40);
  const [numNodes, setNumNodes] = useState(25);
  const [tree, setTree] = useState(null);
  const [c, setC] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [values, setValues] = useState([3, 1, 6, 4, 7, 10, 14, 13, 12]);
  const [target, setTarget] = useState(14);
  // edge cases to account for: duplicate numbers (ignore them)

  useEffect(() => {
    setC(document.getElementById('bstCanvas'));
    if (c) {
      setCtx(c.getContext('2d'));
    }
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      handleDraw();
    }
  }, [c, ctx]);

  // const handleClear = () => {
  //   ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // };

  const handleDraw = async () => {
    const newTree = new BinarySearchTree();
    setTree(newTree);
    const root = 8;
    await newTree.insertRoot(root);
    for (let i = 0; i < values.length; i++) {
      await newTree.insertNode(values[i]);
    }
  };

  const handleDepthFirstSearch = async () => {
    await tree.depthFirstSearch(tree.root, target);
  };
  const handleBreadthFirstSearch = async () => {
    await tree.breadthFirstSearch(tree.root, target);
  };

  const drawNode = (x, y, r, text) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.strokeText(text, x, y);
  };
  const drawRedNode = (x, y, r, text) => {
    ctx.beginPath();
    ctx.fillStyle = 'salmon';
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.strokeText(text, x, y);
    ctx.fillStyle = 'white';
  };
  const drawGreenNode = (x, y, r, text) => {
    ctx.beginPath();
    ctx.fillStyle = 'lightgreen';
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.strokeText(text, x, y);
    ctx.fillStyle = 'white';
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
    depthFirstSearch = async (node = this.root, target) => {
      const search = async (node, target, visited = []) => {
        visited.push(node);
        if (node.left) visited = await search(node.left, target, visited);
        if (node.right) visited = await search(node.right, target, visited);
        return visited;
      };
      const visited = await search(node, target);
      // Search complete -> render visited
      for (let i = 0; i < visited.length; i++) {
        let node = visited[i];
        if (node.value !== target) {
          drawRedNode(node.x, node.y, node.radius, node.value);
          await wait(speed * 10);
        } else {
          drawGreenNode(node.x, node.y, node.radius, node.value);
          await wait(speed * 10);
          return;
        }
      }
    };
    breadthFirstSearch = async (node = this.root, target) => {
      const visited = [node];
      let curr = node;
      if (curr.value === target) {
        drawGreenNode(curr.x, curr.y, curr.radius, curr.value);
        await wait(speed * 10);
        return;
      } else {
        drawRedNode(curr.x, curr.y, curr.radius, curr.value);
        await wait(speed * 10);
      }
      while (visited.length) {
        if (curr.left) visited.push(curr.left);
        if (curr.right) visited.push(curr.right);
      }
    };

    insertRoot = async (value) => {
      this.root = new Node({
        value,
        x: this.rootX,
        y: this.rootY,
        radius: this.rootRadius,
      });
      drawNode(this.rootX, this.rootY, this.rootRadius, value);
      await wait(speed);
    };
    insertNode = async (value, parent = this.root, level = 0) => {
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
    };
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
      <button onClick={handleDraw}>Refresh Tree</button>
      <button onClick={handleDepthFirstSearch}>Depth First Search</button>
      {/* <button onClick={handleBreadthFirstSearch}>Breadth First Search</button> */}
      {/* <button onClick={handleClear}>Clear</button> */}
      <h2>Binary Search Tree</h2>
      <h4>{`Search Target: ${target}`}</h4>
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
