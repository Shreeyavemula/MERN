const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://shreeyavemula53:ProjecT@project.nrsjrj2.mongodb.net/leaveforms?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the LeaveForm data
const leaveFormSchema = new mongoose.Schema({
  empName: String,
  empId: String,
  department: String,
  leaveType: String,
  startDate: String,
  endDate: String,
  reason: String,
});

// Create a model based on the schema
const LeaveForm = mongoose.model('LeaveForm', leaveFormSchema);

app.use(bodyParser.json());

// Handle form submission
app.post('/submitForm', async (req, res) => {
  try {
    const formData = req.body;
    // Save the form data to the database
    const newLeaveForm = new LeaveForm(formData);
    await newLeaveForm.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Log forms in the console for debugging
app.get('/getForms', async (req, res) => {
  try {
    const forms = await LeaveForm.find();
    console.log('Forms:', forms);
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define a route for the root endpoint
app.get('/', (req, res) => {
  res.send('Hello, this is the root endpoint!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
