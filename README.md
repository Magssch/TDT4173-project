# Machine learning TDT4173
A quick demo of the Recurrent Neural Network-model using LSTM is available at https://tdt4173-project-sl-1.web.app/, alongside a decription and information about all the methods used in this project. 

## Running the models
Each of the three approaches have their own .ipynb-file. To run these, simply clone the project, add the data located in /data/ and update the file paths in the second code-block of each notebook, variables `train` and `valid`, to the correct path. The notebooks should now be ready to run sequentially. 

## ml-demo
The folder /ml-demo/ contains the code used to present our models in the above-mentioned website.

### Running ml-demo
Clone the repository, navigate into the /ml-demo/-folder and run `npm install`. After installing dependencies, run `npm start`. 

The app will now be running at `http://localhost:3000`.
Unfortunately, the prediction do not work from localhost due to issues with CORS. We did not have the time to fix this. 
