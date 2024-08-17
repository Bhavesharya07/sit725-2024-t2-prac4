const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://bhavesharya07:ctLHyXD4Ff1O91Hu@cluster0.qrqbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection established");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});


const appointmentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);


app.post('/submit_appointment', (req, res) => {
    const appointment = new Appointment({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        appointmentDate: req.body.appointmentDate
    });

    appointment.save()
        .then(() => {
            res.send('Appointment booked successfully');
        })
        .catch((err) => {
            res.status(500).send('Error occurred while booking appointment');
        });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
