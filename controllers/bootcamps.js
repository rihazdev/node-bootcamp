const bootcampModel = require('../models/BootcampModel');
const asyncHandler = require('../middleware/async');
const BootcampModel = require('../models/BootcampModel');
const geocoder = require('../utils/geocoder');

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


// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:zipcode/:distance
// @access    PUBLIC
exports.getBootcampsWithinRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    const disInMeter = distance * 1000;

    const bootcamps = await BootcampModel.find({
        'location.coordinates': {
            $near: {
                $geometry: {
                    type: "Point" ,
                    coordinates: [ lng , lat ]
                },
                $maxDistance: disInMeter
            }
        }
    });

    res
        .status(200)
        .json({
            success: true,
            count: (await bootcamps).length,
            data: bootcamps
        });
});
