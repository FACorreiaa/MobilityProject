require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const vehicleRouter = require('../api/Routes/vehicleRoute');
const placeRouter = require('../api/Routes/placeRouter');
const authRouter = require('../api/Routes/authenticationRoute');
const rentalRouter = require('../api/Routes/rentalRouter');
const userRouter = require('../api/Routes/userRoute');
const DashboardRouter = require('../api/Routes/DashboardRoute');
const rentalMethodRouter = require('../api/Routes/rentalMethodRoute');


const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const RentalModel = require('../api/Models/RentalModel');
const Place = require('../api/Models/PlaceModel');
require('../api/Models/VehicleModel');
const Rental = require('../api/Models/RentalModel');
require('../api/Models/UserModel');
require('../api/Models/RentalMethodsModel');

const dashController = require('../api/Controllers/Dashboard');
const app = express();
const port = process.env.PORT || 8000;
const server = require('http').Server(app);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
server.listen(port, () => {
  console.log('App is running on port ' + port);
  
});

const jwt = require('express-jwt');
const auth = jwt({
  secret: 'esteEoSegredo',
  userProperty: 'payload'
});

//BD SETUP
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-krbnl.mongodb.net/MobilityProject?retryWrites=true&w=majority`;
//const MONGO_URI = 'mongodb://localhost:27017/MobilityProject';

//mongoose.connect('mongodb://localhost/Mobility');

mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .catch(err => console.log(err));


mongoose.connection
  .on('error', error => console.log('Error connecting to MongoLab:', error))
  .once('open', () => {
    console.log('Connected to MongoLab instance.');
   
    const taskCollection = mongoose.connection.collection('Places');
    const changeStream = taskCollection.watch();

    changeStream.on('change', (change) => {
      console.log('change = '+ JSON.stringify(change));
      if(change.operationType === 'update' | change.operationType === 'replace')
        
      dashController.set_occupancy_trigger();
    });
  });


Place.createIndexes();
Rental.createIndexes();
vehicleRouter(app);
placeRouter(app);
authRouter(app);
rentalRouter(app);
DashboardRouter(app);
rentalMethodRouter(app);
userRouter(auth, app);

module.exports = app;

const expressSwagger = require('express-swagger-generator')(app);

//SWAGGER
let options = {
  swaggerDefinition: {
    info: {
      description: 'This is swagger documentation for Mobility Project',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:8000',
    basePath: '/api/v1/',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['../api/Routes/**.js', '../api/Models/**.js'] //Path to the API handle folder
};

expressSwagger(options);
app.listen(5001);
