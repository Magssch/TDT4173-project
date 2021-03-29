import * as functions from "firebase-functions";
const cors = require("cors")({
  origin: true,
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
  ],
  methods: ["POST"],
  credentials: true,
});

const tf = require("@tensorflow/tfjs-node");

let objectDetectionModel: { predict: (arg0: any) => any };
async function loadModel(input: any) {
  // Warm up the model
  if (!objectDetectionModel) {
    // Load the TensorFlow SavedModel through tfjs-node API. You can find more
    // details in the API documentation:
    // https://js.tensorflow.org/api_node/1.3.1/#node.loadSavedModel
    objectDetectionModel = await tf.node.loadSavedModel(
      "model",
      ["serve"],
      "serving_default"
    );
  }
  var res = null;
  try {
    var input_data = tf.tensor(input);
    var predictions = objectDetectionModel.predict(input_data);
    res = predictions.array().then((array: any[]) => array);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
  return res;
}

export const getQuestionQuality = functions.https.onRequest(
  async (request, response) => {
    return cors(request, response, async () => {
      response.set("Content-Type", "Application/JSON");
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Vary", "Origin");
      const instances = JSON.parse(request.body).instances;

      loadModel(instances)
        .then((r) => {
          console.log("Prediction done");
          return response.send(JSON.stringify({ predictions: r }));
        })
        .catch((e) => {
          response.sendStatus(e);
        });
    });
  }
);
