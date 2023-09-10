const courseModel = require('../models/CourseModel');
const asyncHandler = require('../middleware/async');

exports.getCourses = asyncHandler(async (req, res) => {
    let courses;
    const bootcampFilter = {
        path: 'bootcamp',
        select: 'name description'
    }
    if(req.params.bootcampId){
        courses = await courseModel.find({ bootcamp: req.params.bootcampId }).populate(bootcampFilter);
    }
    else{
        courses = await courseModel.find().populate(bootcampFilter);
    }
    res.status(200).json({success: true, count: courses.length, courses: courses});
});