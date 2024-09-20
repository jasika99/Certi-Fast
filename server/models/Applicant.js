const mongoose = require("mongoose");

// Applicant Schema
const applicantSchema = new mongoose.Schema({
    applicantName: {type: String, required: true },
    mobile: {type: String, required: true},
    age: {type: String, required: true},
    email: {type: String, required: true},
    fields: [    { label: {type: String, required: true},  value: {type: String, required: true } }  ],
    aadhar: {type: String, required: true },
    applicantId: {type: String, unique: true, required: true},
    createdAt: {type: Date, default: Date.now}
});
//Document Schema
const documentSchema = new mongoose.Schema({
    documentPath: { type: String, required: true },
    field: { type: String, required: true },
});
// Create the Applicant and Document model
const ApplicantModel = mongoose.model("Applicant", applicantSchema);
const DocModel = mongoose.model("Documents", documentSchema);
module.exports = {ApplicantModel, DocModel};

