const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require('multer');
const path = require('path');
const OfficerModel = require("./models/Officer");
const UserModel = require("./models/User");
const { ApplicantModel, DocModel } = require("./models/Applicant");
const cookieParser = require('cookie-parser');

const officerRoutes = require('./routes/officerRoutes');

// Import the certificate route
const certificateRoutes = require('./routes/certificateRoutes');


dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// -----------------------------------------------------------
// Middleware to parse JSON
app.use(express.json());

// Register the certificate tracking route
app.use('/certificate', certificateRoutes);

//hierarchy
app.use('/officer',officerRoutes);

//reviwer
// Use the reviewer routes
app.use('/reviewer', reviewerRoutes);

// Starting the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//--------------------------------------------------------------



const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Helps prevent XSS attacks
        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
    }
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


app.post("/officer/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name + " " + email + " " + password)
        const existingOfficer = await OfficerModel.findOne({ email });
        if (existingOfficer) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOfficer = new OfficerModel({ name, email, password: hashedPassword });
        const savedOfficer = await newOfficer.save();
        res.status(201).json(savedOfficer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//user signup
app.post("/user/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name + " " + email + " " + password)
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/officer/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const Officer = await OfficerModel.findOne({ email });
        if (Officer) {
            const passwordMatch = await bcrypt.compare(password, Officer.password);
            if (passwordMatch) {
                req.session.Officer = { id: Officer._id, name: Officer.name, email: Officer.email };
                console.log(email);
                console.log(Officer.name);
                res.json("Success");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } else {
            res.status(404).json("No Records found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//user login
app.post("/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await UserModel.findOne({ email });
        if (User) {
            const passwordMatch = await bcrypt.compare(password, User.password);
            if (passwordMatch) {
                req.session.User = { id: User._id, name: User.name, email: User.email };
                console.log(email);
                console.log(User.name);
                res.json("Success");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } else {
            res.status(404).json("No Records found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

app.get('/officer', (req, res) => {
    if (req.session.Officer) {
        res.json({ Officer: req.session.Officer });
    } else {
        res.status(401).json("Not authenticated");
    }
});

app.get('/user', (req, res) => {
    if (req.session.User) {
        res.json({ User: req.session.User });
    } else {
        res.status(401).json("Not authenticated");
    }
});

app.post('/officer/apply', upload.array('documents'), async (req, res) => {
    try {
        console.log('Form Data:', req.body);
        const { applicantId, applicantName, mobile, age, email, aadhar, gender, dob } = req.body;
        const documents = req.files.map(file => ({
            documentPath: file.path, // Save file path
            field: file.fieldname,   // Save field name
        }));
        const fields = Object.keys(req.body).filter(key => !['applicantName', 'mobile', 'age', 'gender', 'dob', 'aadhar', 'email'].includes(key))
            .map(key => ({ label: key, value: req.body[key] }));
        if (!applicantId) {
            return res.status(400).json({ error: 'applicantId is required' });
        }

        const newApplicant = new ApplicantModel({
            applicantName, mobile, age, gender, dob, aadhar, email, fields: [
                { label: 'PAN No.', value: pan },
                { label: 'Monthly Income', value: income }
            ], documents: documents
        });
        const savedApplicant = await newApplicant.save();
        res.status(201).json(savedApplicant);
    } catch (error) {
        console.error("Error saving applicant data:", error);
        res.status(500).json({ error: "An error occurred while saving the application" });
    }
});

// app.get('/applicant', (req, res)=>{
//     if(req.session.applicant){
//         res.json({applicant: req.session.applicant});
//     } else {
//         res.status(401).json("NOT FOUND")
//     }
// })