import React from "react";
import Papa from "papaparse";
import data_csv from "../../assets/ushape.csv";
import * as d3 from "d3";
import { Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const euclideanDistance = (point1, point2) => {
  return Math.sqrt((parseFloat(point1.X) - point2.X) ** 2 + (parseFloat(point1.Y) - point2.Y) ** 2);
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F48024',
    },
    secondary: {
      main: '#222426',
    },
  }
});

const calulateClass = (datapoint, data, k) => {
  let nearestArr = [];
  let nearestClasses = [];
  for (let i = 0; i < k; i++) {
    nearestArr.push(1000000);
    nearestClasses.push(-1);
  }
  data.forEach((d) => {
    const dist = euclideanDistance(d, datapoint);
    const maxVal = Math.max.apply(null, nearestArr);
    if (dist < maxVal) {
      const ind = nearestArr.indexOf(maxVal);
      nearestArr[ind] = dist;
      nearestClasses[ind] = d.class;
    }
  });
  const cl0 = nearestClasses.filter((p) => p == 0);
  const cl1 = nearestClasses.filter((p) => p == 1);
  return [cl0.length > cl1.length ? 0 : cl0.length === cl1.length ? -1 : 1, Math.max.apply(null, nearestArr)];
};

const KNeighbors = () => {
  const [data, setData] = React.useState([]);
  const [svgRef, setRef] = React.useState(React.createRef());
  const [maxVal, setMaxVal] = React.useState(10);
  const [point, setPoint] = React.useState({
    X: 0.0,
    Y: 0.0,
    class: -1,
    movable: 1,
  });
  const [k, setK] = React.useState(1);
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

  const plotData = (dataset) => {
    d3.select(svgRef.current).selectAll("svg").remove();
    var svg = d3.select(svgRef.current).append("svg").attr("width", 500).attr("height", 500);

    svg
      .selectAll("circle")
      .data(dataset.concat([point, { X: point.X, Y: point.Y, class: point.class, maxVal: maxVal }]))
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return (parseFloat(d.X) + 2) * 100;
      })
      .attr("stroke", (d) => d.movable && "rgb(0,0,0)")
      .attr("stroke-width", (d) => d.movable && "2")
      .attr("cy", function (d) {
        return 500 - (parseFloat(d.Y) + 2) * 100;
      })
      .attr("r", (d) => (d.movable ? 5 : d.maxVal ? d.maxVal : 3))
      .attr("opacity", (d) => (d.maxVal ? 0.1 : 1))
      .attr("fill", function (d) {
        return d.class == -1 ? "rgb(255,255,255)" : d.class == 1 ? "rgb(255, 0 ,0)" : "rgb(0, 0, 255)";
      });
  };

  const calculate = () => {
    let calcClass = calulateClass(point, data, k);
    setPoint({
      X: point.X,
      Y: point.Y,
      class: calcClass[0],
      movable: true,
    });
    setMaxVal(calcClass[1] * 100);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box py={3}></Box>
      <Box pt={2}>
        <h1>K-Nearest Neighbors</h1>
      </Box>
      <Grid container alignItems="center" direction="column" spacing={5}>
        <Grid item alignItems="right" xs={8}>
          <Typography align="left">
            k-Nearest Neighbors (kNN) falls within the supervised learning category in machine learning. This means that
            the algorithm uses a training set to determine a predictive model for new data points. Although kNN is
            mainly used for classification as in the example below, it may also be used in combination with other
            machine learning algorithms for regression. kNN is a lazy learning algorithm, which means that there is no
            explicit training phase. Instead of training a model, kNN uses all of the training data during test phase.
            The core of the kNN algorithm is simply measuring the distance between tested examples and training
            examples. Although its simplistic nature, kNN has proven to be a very effective machine learning algorithm.
          </Typography>
          <Typography align="left">
            Here we have created an interactive model for testing how kNN works in practice. By moving the scroll bars
            on the top and right of the grid, it is possible to move the marker, and by using the nummeric field you can
            choose any positive value for k. The color of the marker is determined by looking at the colors of the
            k nearest neighbors. Try moving the marker around and changing the number k to see the marker become
            classified as either blue or red!
          </Typography>
        </Grid>
        <Grid container direction="row" xs={8} justify="center">
          <input
            type="range"
            min={0}
            max={500}
            value={(point.X + 2) * 100}
            className="slider"
            id="myRange"
            style={{ width: "500px"}}
            onChange={(e) =>
              {
                let calcClass = calulateClass(point, data, k);
                setPoint({
                  X: e.target.value / 100 - 2,
                  Y: point.Y,
                  class: calcClass[0],
                  movable: point.movable,
                });
                setMaxVal(calcClass[1] * 100);
              }
            }
          />
        </Grid>
        <Grid container direction="row" justify="center">
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div>
              <div style={{ display: "flex" }}>
                <div ref={svgRef}></div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4} xt={4}>
            <div
              style={{
                display: "flex",
                marginTop: "250px",
                marginLeft: "-200px",
              }}
            >
              <input
                type="range"
                min={0}
                max={500}
                value={(point.Y + 2) * 100}
                className="slider"
                id="myRange"
                style={{ width: "500px", transform: "rotate(270deg)" }}
                onChange={(e) =>
                  {
                    let calcClass = calulateClass(point, data, k);
                    setPoint({
                      X: point.X,
                      Y: e.target.value / 100 - 2,
                      class: calcClass[0],
                      movable: point.movable,
                    })
                    setMaxVal(calcClass[1] * 100);
                  }
                }
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} direction="row">
          <Grid item>
            <TextField
              label="Value of K"
              variant="outlined"
              type={"number"}
              value={k}
              onChange={(e) => {setK(e.target.value); calculate();}}
            />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default KNeighbors;
