# reactFlaskMl

This is an ML application developped using ReactJs and Python. It uses Logistic regression model to predict wheather the automobile insurance claims are fraudlent or not. Flask API is used to get the request from the client side and send back the predicted response.

### Getting Started

Clone the repository by entering `git clone https://github.com/chris287/reactFlaskMl.git` 

The `scripts` directory contains all the python scripts and `ui` directory consists of the ReactJs code for frontend UI.

Navigate inside scripts directory and run command `pip install -r requirements.txt` in cmd to install all the required libraries for python.In the same way navigate inside ui and run `npm i` to install node modules.

To start the flask API server,navigate scripts directory and run `python main.py`.This will start a development server on `http://127.0.0.1:5000/` for python flask API.Run the server by opening the link in browser.Next step is to load the ui.To do this run the command `npm start` inside ui directory. This will start a react server and you can access the ui.
