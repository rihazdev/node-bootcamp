const bootcampModel = require('../models/BootcampModel');
const asyncHandler = require('../middleware/async');

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    const bootcamps = await bootcampModel.find();
    res.status(200).json({
        success: true, 
        count: bootcamps.length, 
        data: bootcamps
    });
    
});

exports.getBootcamp = asyncHandler(async (req, res, next) =>{
        const bootcamp = await bootcampModel.findById(req.params.id);

        if(!bootcamp){
            return next(err);
        }
        res.status(200).json({success: true, data:  bootcamp});
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
    
    const newBootcamp = await bootcampModel.create(req.body);
    res.status(201).json({
        success: true, 
        data: newBootcamp
    });
    res.status(400).json({success: false});
    
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const updatedBootcamp = await bootcampModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({success: true, data: updatedBootcamp});
    
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    PRIVATE
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const deleteBootcamp = await bootcampModel.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, data: {}});
});

