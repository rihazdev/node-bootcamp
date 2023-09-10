const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env'});

// Load models
const BootcampModel = require('./models/BootcampModel');
const CourseModel = require('./models/CourseModel');

//connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}); //-- no await here, what will be the flow

// Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

//Import into DB
const importData = async () => {
    try{
        await BootcampModel.create(bootcamps);
        await CourseModel.create(courses);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//Delete Data
const deleteData = async () => {
    try{
        await BootcampModel.deleteMany();
        await CourseModel.deleteMany();
        console.log('Data destroyed...');
        process.exit();
    } catch(err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i'){
    importData();
}
else if(process.argv[2] === '-d'){
    deleteData();
}