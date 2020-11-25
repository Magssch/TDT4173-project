import React from "react";
import Papa from "papaparse";
import data_csv from "../../assets/ushape.csv";
import * as d3 from "d3";

const euclideanDistance = (point1, point2) => {
  return Math.sqrt(
    (parseFloat(point1.X) - point2.X) ** 2 +
      (parseFloat(point1.Y) - point2.Y) ** 2
  );
};

const calulateClass = (datapoint, data, k) => {
    console.log(k);
  let nearestArr = [];
  let nearestClasses = [];
  for (let i = 0; i < k; i++) {
    nearestArr.push(1000000);
    nearestClasses.push(-1);
  }
  data.forEach(d => {
    const dist = euclideanDistance(d, datapoint);
    const maxVal = Math.max.apply(null, nearestArr);
    if (dist < maxVal) {
      const ind = nearestArr.indexOf(maxVal);
      nearestArr[ind] = dist;
      nearestClasses[ind] = d.class;
    }
  });
  const cl0 = nearestClasses.filter(p => p == 0);
  const cl1 = nearestClasses.filter(p => p == 1);
  return cl0 > cl1 ? 0 : 1;
};

const KNeighbors = () => {
  const [data, setData] = React.useState([]);
  const [svgRef, setRef] = React.useState(React.createRef());
  const [point, setPoint] = React.useState({
    X: 0.0,
    Y: 0.0,
    class: -1,
    movable: 1
  });
  const [k, setK] = React.useState(9);
  React.useEffect(() => {
    async function getData() {
      const response = await fetch(data_csv);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: true });
      const rows = results.data;
      setData(rows);
      return rows;
    }
    getData();
  }, []);

  React.useEffect(() => {
    plotData(data);
  }, [data, point]);

  const plotData = dataset => {
    d3.select(svgRef.current)
      .selectAll("svg")
      .remove();
    var svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    svg
      .selectAll("circle")
      .data(dataset.concat([point]))
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return (parseFloat(d.X) + 2) * 100;
      })
      .attr("stroke", d => d.movable && "rgb(0,0,0)")
      .attr("stroke-width", d => d.movable && "2")
      .attr("cy", function(d) {
        return 500 - (parseFloat(d.Y) + 2) * 100;
      })
      .attr("r", d => (d.movable ? 5 : 3))
      .attr("fill", function(d) {
        return d.class == -1
          ? "rgb(255,255,255)"
          : d.class == 1
          ? "rgb(255, 0 ,0)"
          : "rgb(0, 0, 255)";
      });
  };

  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <div ref={svgRef}>
            <input
              type="range"
              min={0}
              max={500}
              value={(point.X + 2) * 100}
              className="slider"
              id="myRange"
              style={{ width: "500px" }}
              onChange={e =>
                setPoint({
                  X: e.target.value / 100 - 2,
                  Y: point.Y,
                  class: point.class,
                  movable: point.movable
                })
              }
            />
          </div>
          <div style={{display: "flex", marginLeft: "-100px"}}>
            <input
              type="range"
              min={0}
              max={500}
              value={(point.Y + 2) * 100}
              className="slider"
              id="myRange"
              style={{ width: "500px", transform: "rotate(270deg)" }}
              onChange={e =>
                setPoint({
                  X: point.X,
                  Y: e.target.value / 100 - 2,
                  class: point.class,
                  movable: point.movable
                })
              }
            />
          </div>
        </div>
      </div>
        k=
        <input type={"text"} value={k} onChange={e=>setK(e.target.value)}/>
      <button
        onClick={() =>
          setPoint({
            X: point.X,
            Y: point.Y,
            class: calulateClass(point, data, k),
            movable: true
          })
        }
      >
        Kalkuler
      </button>
    </div>
  );
};

export default KNeighbors;
