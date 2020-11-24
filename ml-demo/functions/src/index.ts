import * as functions from 'firebase-functions';
const cors = require("cors")({
    origin: true,
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept"
    ],
    methods: ["POST"],
    credentials: true
  });

import { google } from 'googleapis';
const ml = google.ml('v1')

export const getQuestionQuality = functions.https.onRequest(async (request, response) => {

    return cors(request, response, async () => {
        response.set("Content-Type", "Application/JSON");
        response.set("Access-Control-Allow-Origin", request.get("Origin"));
        const instances = JSON.parse(request.body).instances; 

        const { credential } = await google.auth.getApplicationDefault();
        const modelName = `projects/tdt4173-project-sl-1/models/rnn_lstm`;
        console.log("Getting instances:" + instances)
        ml.projects.predict({
            auth: credential,
            name: modelName,
            requestBody: { 
                instances,
            },
        } as any, {
            rootUrl: "https://europe-west4-ml.googleapis.com",
        } as any).then(
            res => {
                console.log(res);
                return response.send(JSON.stringify(res.data))
            }
        );
    })
});