import p5 from 'p5';
import { useEffect, useState } from 'react';
export default function RecursionMain() {
  const [canvasX, setCanvasX] = useState(750);
  const [canvasY, setCanvasY] = useState(500);

  const sketch = (s) => {
    let slider;
    let angle = 0;
    s.setup = () => {
      s.createCanvas(canvasX, canvasY);
      s.stroke(255);
      let label = s.createDiv('Angle');
      slider = s.createSlider(0.1, s.PI - 0.1, s.PI / 7, 0.01);
      slider.parent(label);
      slider.input(() => s.loop());
    };

    s.draw = () => {
      s.background(55);
      console.log(angle);
      angle = slider.value();
      s.translate(canvasX / 2, canvasY);
      let len = 100;
      drawTree(len);
    };

    const drawTree = (len) => {
      s.line(0, 0, 0, -len);
      s.translate(0, -len);
      if (len > 9) {
        s.push();
        s.rotate(angle);
        drawTree(len * 0.8);
        s.pop();
        s.push();
        s.rotate(-angle);
        drawTree(len * 0.8);
        s.pop();
      } else {
        s.noLoop();
      }
    };
  };

  useEffect(() => {
    let myp5 = new p5(sketch, 'p5-container');

    return () => {
      console.log('unmounted');
    };
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <div className="container">
        <div id="p5-container"></div>
      </div>
    </div>
  );
}
