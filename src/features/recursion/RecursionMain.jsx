import p5 from 'p5';
import { useEffect } from 'react';
export default function RecursionMain() {
  useEffect(() => {
    let myp5 = new p5((sketch) => {
      let x = 100;
      let y = 100;
      sketch.setup = () => {
        sketch.createCanvas(200, 200);
      };

      sketch.draw = () => {
        sketch.background(220);
        sketch.fill(255);
        sketch.rect(x, y, 50, 50);
      };
    }, 'p5-container');

    return () => {
      console.log('unmounted');
    };
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <div id="p5-container"></div>
    </div>
  );
}
