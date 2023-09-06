const bootcampModel = require('../models/BootcampModel')

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: 'show all bootcamps'});
}

exports.getBootcamp = (req, res, next) =>{
    res.status(200).json({success: true, msg:  `show bootcamp ${req.params.id}`});
}

exports.createBootcamp = async (req, res, next) => {
    
    console.log(req.body);
    const newBootcamp = await bootcampModel.create(req.body);
    res.status(201).json({
        success: true, 
        data: newBootcamp
    });
}

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`});
}

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`});
}

