import React, { useRef, useState } from "react";
import "./App.css";
import Properties from "./components/Properties";

function App() {
  const [canvasSize, setCanvasSize] = useState({ x: 800, y: 300 });
  const [canvas, setCanvas] = useState(null);
  const [showProps, setShowProps] = useState(false);
  const canvasRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCanvas();
    createProperties();
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setCanvasSize((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const createCanvas = () => {
    setCanvas(
      <canvas
        height={canvasSize.y}
        width={canvasSize.x}
        className="canvas"
        id="canvas"
        ref={canvasRef}
      ></canvas>
    );
  };

  const createProperties = () => {
    setShowProps(true);
  };
  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <div className="x-y-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  X
                </span>
              </div>
              <input
                className="form-control"
                name="x"
                placeholder="x"
                value={canvasSize.x}
                onChange={(e) => handleInputChange(e)}
                type="text"
                aria-label="x"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <br />
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Y
                </span>
              </div>
              <input
                className="form-control"
                name="y"
                placeholder="y"
                value={canvasSize.y}
                onChange={(e) => handleInputChange(e)}
                type="text"
                aria-label="y"
                aria-describedby="basic-addon1"
              ></input>
            </div>
          </div>
        </div>
        <br />
        <button class="btn btn-primary mb-2" type="submit">
          Oluştur
        </button>
      </form>
      <br />
      {showProps && <Properties canvas={canvasRef} canvasSize={canvasSize} />}
      <div id="canvas-container" className="canvas-container">
        {canvas}
      </div>
    </div>
  );
}

export default App;
