const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

const MongoURI = process.env.MONGO_URI;

const adminUsername = 'omar';
const adminPassword = 'omar';


// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MongoURI , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Model
const SurveySchema = new mongoose.Schema({
  PROLIFIC_PID: String,
  prolific_id_input_user: String,
  explanation_id: String,
  quality_check_intention_to_act: String,
  intention_to_use_item_1:  Number,
  intention_to_use_item_2:  Number,
  intention_to_use_item_3:  Number,
  attention_check_1: Boolean,
  performance_expectancy_item_1: Number,
  performance_expectancy_item_2: Number,
  performance_expectancy_item_3: Number,
  effort_expectancy_item_1: Number,
  effort_expectancy_item_2: Number,
  effort_expectancy_item_3: Number,
  trust_item_1: Number,
  trust_item_2: Number,
  trust_item_3: Number,
  attention_check_2: Boolean,
  FAILED: { type: Boolean, default: false },
  psychological_openness_item_1: Number,
  psychological_openness_item_2: Number,
  psychological_openness_item_3: Number,
  indifference_to_stigma_item_1: Number,
  indifference_to_stigma_item_2: Number,
  indifference_to_stigma_item_3: Number,
  helpSeeking_propensity_item_1: Number,
  helpSeeking_propensity_item_2: Number,
  helpSeeking_propensity_item_3: Number,
  erfahrung_mit_app_typen_item_1: Number,
  erfahrung_mit_app_typen_item_2: Number,
  erfahrung_mit_app_typen_item_3: Number 
});

const Survey = mongoose.model('Survey', SurveySchema);

// Routes
app.post('/submit-survey', (req, res) => {
  const newSurvey = new Survey(req.body); 

  newSurvey.save()
    .then(() => res.json('Survey added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all the survey objects from the database
app.get('/get-surveys', (req, res) => {
  Survey.find()
    .then(surveys => res.json(surveys))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // In a real application, you'd have more robust validation and error handling
  if (username === adminUsername && password === adminPassword) {
    // Again, in a real-world scenario, you would return a session token or JWT
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
