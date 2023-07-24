const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleschema = new Schema ({

    userName: {
        type: String,
        required: true
    },

    userPhone: {
        type: Number,
        required: true
    },

    vehicleName: {
        type: String,
        required: true
    },

    pick_up_place: {
        type: String,
        required: true
    },

    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    destination_place: {
        type: String,
        required: true
    },

    distance: {
        type: Number,
        required: true
    },

    driverName: {
        type: String,
        required: true
    },

    licenNo: {
        type: Number,
        required: true
    },

    vehicleNum: {
        type: String,
        required: true
    }

    

})

const vehicle = mongoose.model('vehicle', vehicleschema);

module.exports = vehicle;

