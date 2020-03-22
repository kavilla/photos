# Photo Viewer Application

Project to implement a photo viewer application using
Python, Flask, FlaskRestPlus, and Pandas.
Front end was built in ReactJS, which was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

### Things I failed to do

* I missed the section about toggling grayscale on the backend

### Things I wanted to do but due to schedule can't do by deadline

* [Unit testing](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCUOih9J7Ahx7hbA3yUE4ucf4UnGxegwqluZ6__4Dmkhw43KoQ&s)
* User Authorization - [JWT-based authorization](https://oauth.net/code/python/) 

### Getting started

* Clone this repo

`How to run the API:`

* If you haven't already cd src/api
* [Install python, create and run a virtual environment](https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment) - follow until you get to the part to twilio.
  * Here's my virtual environment name:
    ```
    python -m venv env
    source env/Scripts/activate
    ```
* Install the dependencies by running:
  ```
  pip install -r requirements.txt
  ```
* Run the API by running:
  ```
  python run.py
  ```
* Open to [http://localhost:5000](http://localhost:5000) to get the swagger page.
* Feel free to put any formatted CSV file in src/api as long as it is formatted properly and is a CSV filetype. 

`How to run the UI:`

* cd src/app
* Install the dependencies
  ```
  npm install
  ```
* Fix in npm issues if it says to
  ```
  npm audit fix
  ```
* Run the app in development mode
  ```
  npm start
  ```
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
* Build the app minified to the build folder.
  ```
  npm run build
  ```

## Authors

* **Kawika Avilla**
