import React, { Fragment, useEffect, useState } from "react";
import rhombus from "./rhombus.png";

function Properties({ canvas, canvasSize }) {
  const [properties, setProperties] = useState({
    dotText: "(100,100)",
    lineText: "(50,50) (100,50) (100,70) (50,70)",
    polygonText: "(150,150) (200,150) (200,170) (150,170)",
  });
  const [image, setImage] = useState();
  const regExp = /^[0-9,()" "]+$/;
  const [textState, setTextState] = useState("başarılı");

  const PropTypes = {
    SmallDot: "smallDot",
    MediumDot: "mediumDot",
    LargeDot: "largeDot",
    ThinLine: "thinLine",
    MediumLine: "mediumLine",
    ThickLine: "thickLine",
    EmptyPolygon: "emptyPolygon",
    FullPolygon: "fullPolygon",
    IllustratedPolygon: "illustratedPolygon",
  };

  useEffect(() => {
    const img = new Image();
    img.src = rhombus;
    img.width = 10;
    img.height = 10;
    setImage(img);
  }, []);

  const [showProp, setShowProp] = useState({
    showDot: false,
    showLine: false,
    showPolygon: false,
  });
  const [propType, setPropType] = useState({
    dot: 2,
    line: 2,
    polygon: PropTypes.EmptyPolygon,
  });

  const handleProps = (e) => {
    const { name } = e.target;
    setShowProp((prevProps) => {
      const showProps = {};
      for (const prop in prevProps) {
        showProps[prop] = false;
      }
      showProps[name] = true;
      return showProps;
    });
  };

  const handlePropType = (propTypeText) => {
    console.log("propTypeText", propTypeText);
    switch (propTypeText) {
      case PropTypes.SmallDot:
        setPropType((prevState) => {
          return { ...prevState, dot: 2 };
        });
        break;
      case PropTypes.MediumDot:
        setPropType((prevState) => {
          return { ...prevState, dot: 4 };
        });
        break;
      case PropTypes.LargeDot:
        setPropType((prevState) => {
          return { ...prevState, dot: 6 };
        });
        break;
      case PropTypes.ThinLine:
        setPropType((prevState) => {
          return { ...prevState, line: 2 };
        });
        break;
      case PropTypes.MediumLine:
        setPropType((prevState) => {
          return { ...prevState, line: 4 };
        });
        break;
      case PropTypes.ThickLine:
        setPropType((prevState) => {
          return { ...prevState, line: 6 };
        });
        break;
      case PropTypes.EmptyPolygon:
        setPropType((prevState) => {
          return { ...prevState, polygon: PropTypes.EmptyPolygon };
        });
        break;
      case PropTypes.FullPolygon:
        setPropType((prevState) => {
          return { ...prevState, polygon: PropTypes.FullPolygon };
        });
        break;
      case PropTypes.IllustratedPolygon:
        setPropType((prevState) => {
          return { ...prevState, polygon: PropTypes.IllustratedPolygon };
        });
        break;
      default:
        break;
    }
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || regExp.test(value)) {
      if (
        name === "dotText" &&
        (value.split(",").length - 1 > 1 ||
          value.split(")").length - 1 > 1 ||
          (value.split(")").length - 1 === 1 && value.split(")")[1] !== "") ||
          (value.split(",").length - 1 > 0 && value.split(" ").length - 1 > 0))
      ) {
        setTextState(
          <div className="label label-danger">
            {"bu değer için en fazla bir nokta belirtebilirsiniz"}
          </div>
        );
      } else {
        setTextState(<div className="label label-success">{"başarılı"}</div>);
        setProperties((prevTexts) => {
          return { ...prevTexts, [name]: value };
        });
      }
    }
  };

  const handleDot = (e) => {
    e.preventDefault();
    const coordinateArray =
      properties.dotText !== ""
        ? properties.dotText.replaceAll("(", "").replaceAll(")", "").split(" ")
        : "Koordinatları giriniz";

    let coordinates = [];
    for (let i = 0; i < coordinateArray.length; i++) {
      const x = Number(coordinateArray[i].split(",")[0]);
      const y = Number(coordinateArray[i].split(",")[1]);
      coordinates.push({ x: x, y: y });
    }

    if (coordinates) drawDot(coordinates);
  };

  const drawDot = (coordinates) => {
    var ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.arc(
      coordinates[0].x,
      canvasSize.y - coordinates[0].y,
      propType.dot,
      0 * Math.PI,
      2 * Math.PI,
      true
    );
    ctx.fill();
  };
  const handleIllustrated = (e) => {
    e.preventDefault();
    const coordinateArray =
      properties.lineText !== ""
        ? properties.lineText.replaceAll("(", "").replaceAll(")", "").split(" ")
        : "Koordinatlari giriniz";

    let coordinates = [];
    for (let i = 0; i < coordinateArray.length; i++) {
      const x = coordinateArray[i].split(",")[0];
      const y = coordinateArray[i].split(",")[1];
      coordinates.push({ x: x, y: y });
    }
    if (coordinates) drawIllustrated(coordinates);
  };

  const drawIllustrated = (coordinates) => {
    var ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "#f00";
    ctx.lineWidth = propType.line;
    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, canvasSize.y - coordinates[0].y);
    for (let i = 1; i < coordinates.length; i++) {
      ctx.lineTo(coordinates[i].x, canvasSize.y - coordinates[i].y);
    }
    ctx.stroke();
  };
  const handlePolygon = (e) => {
    e.preventDefault();
    const coordinateArray =
      properties.polygonText !== ""
        ? properties.polygonText
            .replaceAll("(", "")
            .replaceAll(")", "")
            .split(" ")
        : "Koordinatlari giriniz";

    let coordinates = [];
    for (let i = 0; i < coordinateArray.length; i++) {
      const x = coordinateArray[i].split(",")[0];
      const y = coordinateArray[i].split(",")[1];
      coordinates.push({ x: x, y: y });
    }
    if (coordinates) drawPolygon(coordinates);
  };

  const drawPolygon = (coordinates) => {
    var ctx = canvas.current.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, canvasSize.y - coordinates[0].y);
    for (let i = 1; i < coordinates.length; i++) {
      ctx.lineTo(coordinates[i].x, canvasSize.y - coordinates[i].y);
    }
    ctx.closePath();

    switch (propType.polygon) {
      case PropTypes.EmptyPolygon:
        ctx.stroke();
        break;
      case PropTypes.FullPolygon:
        ctx.fillStyle = "#f00";
        ctx.stroke();
        ctx.fill();
        break;
      case PropTypes.IllustratedPolygon:
        const pat = ctx.createPattern(image, "repeat");
        ctx.fillStyle = pat;
        ctx.stroke();
        ctx.fill();
        break;
      default:
        break;
    }
  };

  const cleanCanvas = () => {
    var ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
  };

  return (
    <div id="properties-container" className="properties-container">
      <form onSubmit={(e) => handleDot(e)}>
        <div className="props">
          <button
            onClick={(e) => handleProps(e)}
            name="showDot"
            className="btn btn-secondary"
            type="button"
          >
            Nokta
          </button>
          {showProp.showDot && (
            <Fragment>
              <div>
                <div onChange={(e) => handlePropType(e.target.value)}>
                  <input
                    type="radio"
                    value="smallDot"
                    name="dot"
                    defaultChecked
                  />{" "}
                  Küçük
                  <input type="radio" value="mediumDot" name="dot" /> Orta
                  <input type="radio" value="largeDot" name="dot" /> Büyük
                </div>
                <textarea
                  id="dotText"
                  name="dotText"
                  value={properties.dotText}
                  onChange={(e) => handleTextChange(e)}
                ></textarea>
                <br />
                {textState}
              </div>
              <button className="btn btn-success" type="submit">
                Uygula
              </button>
            </Fragment>
          )}
        </div>
      </form>
      <form onSubmit={(e) => handleIllustrated(e)}>
        <div className="props">
          <button
            onClick={(e) => handleProps(e)}
            name="showLine"
            className="btn btn-secondary"
            type="button"
          >
            Çizgi
          </button>
          {showProp.showLine && (
            <Fragment>
              <div>
                <div onChange={(e) => handlePropType(e.target.value)}>
                  <input
                    type="radio"
                    value="thinLine"
                    name="line"
                    defaultChecked
                  />{" "}
                  İnce
                  <input type="radio" value="mediumLine" name="line" /> Orta
                  <input type="radio" value="thickLine" name="line" /> Kalın
                </div>
                <textarea
                  name="lineText"
                  value={properties.lineText}
                  onChange={(e) => handleTextChange(e)}
                ></textarea>
              </div>
              <button className="btn btn-success" type="submit">
                Uygula
              </button>
            </Fragment>
          )}
        </div>
      </form>
      <form onSubmit={(e) => handlePolygon(e)}>
        <div className="props">
          <button
            onClick={(e) => handleProps(e)}
            name="showPolygon"
            className="btn btn-secondary"
            type="button"
          >
            Poligon
          </button>
          {showProp.showPolygon && (
            <Fragment>
              <div>
                <div onChange={(e) => handlePropType(e.target.value)}>
                  <input
                    type="radio"
                    value="emptyPolygon"
                    name="polygon"
                    defaultChecked
                  />{" "}
                  Boş
                  <input type="radio" value="fullPolygon" name="polygon" /> Dolu
                  <input
                    type="radio"
                    value="illustratedPolygon"
                    name="polygon"
                  />{" "}
                  Resimli
                </div>
                <textarea
                  name="polygonText"
                  value={properties.polygonText}
                  onChange={(e) => handleTextChange(e)}
                ></textarea>
              </div>
              <button className="btn btn-success" type="submit">
                Uygula
              </button>
            </Fragment>
          )}
          <br />
        </div>
      </form>
      <button type="button" className="btn btn-danger" onClick={cleanCanvas}>
        Temizle
      </button>
    </div>
  );
}

export default Properties;
