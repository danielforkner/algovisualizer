import p5 from 'p5';
import { useEffect, useState } from 'react';
export default function RecursionMain() {
  const [canvasX, setCanvasX] = useState(750);
  const [canvasY, setCanvasY] = useState(500);

  const sketch = (s) => {
    let sliderAngle;
    let sliderRight;
    let sliderLeft;
    let angle = 0;
    s.setup = () => {
      s.createCanvas(canvasX, canvasY);
      s.stroke(255);
      let labelAngle = s.createDiv('Angle');
      let labelLeft = s.createDiv('Left Length');
      let labelRigth = s.createDiv('Right Length');
      sliderAngle = s.createSlider(0.1, s.PI - 0.1, s.PI / 7, 0.01);
      sliderAngle.parent(labelAngle);
      sliderAngle.input(() => s.loop());
      sliderRight = s.createSlider(0.25, 0.83, 0.75, 0.02);
      sliderRight.parent(labelRigth);
      sliderRight.input(() => s.loop());
      sliderLeft = s.createSlider(0.25, 0.83, 0.75, 0.02);
      sliderLeft.parent(labelLeft);
      sliderLeft.input(() => s.loop());
    };

    s.draw = () => {
      s.background(55);
      console.log(angle);
      angle = sliderAngle.value();
      s.translate(canvasX / 2, canvasY);
      let len = 100;
      drawTree(len);
    };

    const drawTree = (len) => {
      s.line(0, 0, 0, -len);
      s.translate(0, -len);
      if (len > 6) {
        s.push();
        s.rotate(angle);
        drawTree(len * sliderRight.value());
        s.pop();
        s.push();
        s.rotate(-angle);
        drawTree(len * sliderLeft.value());
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
      <h1>Fun with Fractals</h1>
      <div className="container">
        <div id="p5-container"></div>
      </div>
    </div>
  );
}
