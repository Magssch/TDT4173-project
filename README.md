# Machine learning TDT4173
A quick demo of the Recurrent Neural Network-model using LSTM is available at https://tdt4173-project-sl-1.web.app/, alongside a decription and information about all the methods used in this project. 

## Running the models
Each of the three approaches have their own .ipynb-file. To run these, simply clone the project, add the data located in /data/ and update the file paths in the second code-block. The notebooks should now be ready to run sequentially. 

## ml-demo
The folder /ml-demo/ contains the code used to present our models in the above-mentioned website.

### Running ml-demo
Clone the repository, navigate into the /ml-demo/-folder and run `npm install`. Open a second command-prompt/terminal-window and navigate into /functions/, and then running `firebase emulators:start`. When this is running properly, go back to the previous window (with this one still open and running) and run `npm start`. 

The app will now be running at `http://localhost:3000`.
