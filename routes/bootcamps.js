const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsWithinRadius
} = require('../controllers/bootcamps.js');

const router = express.Router();
router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

router.route('/:zipcode/:distance')
    .get(getBootcampsWithinRadius);

module.exports = router;