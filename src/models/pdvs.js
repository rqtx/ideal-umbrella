const mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

const pdvsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    tradingName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true,
        unique: true
    },
    coverageArea: {
        type: mongoose.Schema.Types.MultiPolygon,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.Point,
        required: true
    }
});

const pdvsModel = mongoose.model('pdvs', pdvsSchema, 'pdvs');
module.exports = pdvsModel;