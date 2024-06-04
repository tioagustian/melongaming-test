import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const canvas = useRef(null);
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(360);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (file) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        setErrorMessage('Only PNG and JPEG files are allowed');
      } else {
        setErrorMessage(null);
      }
      const ctx = canvas.current.getContext('2d');
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        canvas.current.width = width;
        canvas.current.height = height;
        setImageHeight(img.height);
        setImageWidth(img.width);
        ctx.drawImage(img, 0, 0, width, height);
      };
    } else {
      canvas.current.width = width;
      canvas.current.height = height;
      setImageHeight(0);
      setImageWidth(0);
      setImageY(0);
      setImageX(0);
    }
  }, [file]);

  useEffect(() => {
    if (width < 100 || height < 100) {
      setErrorMessage('Width and height must be at least 100px x 100px');
    } else {
      setErrorMessage(null);
    }
  }, [width, height]);

  const changeCanvasSize = () => {
    if (width < 100 || height < 100) {
      setErrorMessage('Width and height must be at least 100px x 100px');
      return;
    } else {
      setErrorMessage(null);
    }
    setFile(null);
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    canvas.current.width = width;
    canvas.current.height = height;
  };

  const changeImageProperties = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImageHeight(imageHeight);
      setImageWidth(imageWidth);
      ctx.drawImage(img, imageX, imageY, imageWidth, imageHeight);
    };
    
  };

  return (
    <div className="App">
      <div className="container">
        <div className="canvasOpts">
          <div style={{ textAlign: 'center' }}>
            <h2>Canvas Properties</h2>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="width" style={{ marginRight: '10px' }}>Width</label>
              <input type="number" id="width" className="input" value={width} onChange={e => setWidth(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="width" style={{ marginRight: '10px' }}>Height</label>
              <input type="number" id="height" value={height} className="input"  onChange={e => setHeight(e.target.value)}/>
            </div>
            <button style={{ marginTop: '10px' }} onClick={changeCanvasSize} disabled={file}>Change Size</button>
          </div>
        </div>
        <div>
          {errorMessage && <div className="error-container">{errorMessage}</div>}
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <input type="file" className="input" onChange={e => setFile(e.target.files[0])}/>
            <button style={{ marginTop: '10px', marginLeft: '10px' }} disabled={!file} onClick={e => setFile(null)}>Clear</button>
          </div>
          <div className="canvas">
            <canvas ref={canvas} height={360} width={640} className="canvasEl"></canvas>
          </div>
        </div>
        <div className="imgOpts">
          <div style={{ textAlign: 'center' }}>
            <h2>Image Properties</h2>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="width" style={{ marginRight: '10px' }}>X</label>
              <input type="number" id="width" className="input" value={imageX} onChange={e => setImageX(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="width" style={{ marginRight: '10px' }}>Y</label>
              <input type="number" id="height" value={imageY} className="input"  onChange={e => setImageY(e.target.value)}/>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="width" style={{ marginRight: '10px' }}>Width</label>
              <input type="number" id="width" className="input" value={imageWidth} onChange={e => setImageWidth(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="width" style={{ marginRight: '10px' }}>Height</label>
              <input type="number" id="height" value={imageHeight} className="input" onChange={e => setImageHeight(e.target.value)}/>
            </div>
            <button style={{ marginTop: '10px' }} onClick={changeImageProperties} disabled={!file}>Change Size</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
