const express = require('express');
const router = express.Router();
const pdvsModel = require('../models/pdvs');
const { cnpj } = require('cpf-cnpj-validator');
const { toGeoJSON } = require('geojson-tools');

router.get('/', async (req, res) => {
    try {
        const pdvs = await pdvsModel.find()
        res.json({ pdvs });        
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/near', async (req, res) => {
    try {
        const pdvs = await pdvsModel.find(
            {coverageArea: {
                $geoIntersects: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [Number(req.query.lng),Number(req.query.lat)]
                    },
                }
            }

        });
        
        if (pdvs) {
            res.json({ pdvs });
        } else {
            res.status(400).send('Pdvs does not exist');
        }
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pdvs = await pdvsModel.findOne({
              id: req.params.id
        })

        if (pdvs) {
            res.json({ pdvs });
        } else {
            res.status(400).send('Pdvs does not exist');
        }
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/register', async (req, res) => {
    try {

        if(!cnpj.isValid(req.body.document)) {
            res.status(400).send('Invalid document field');
        }
    
        let pdvs = await pdvsModel.findOne({
            where: {
                document: req.body.document
            }
        })
        
        if (!pdvs) {
            pdvs = new pdvsModel({
                id: req.body.id,
                tradingName: req.body.tradingName,
                ownerName: req.body.ownerName,
                document: req.body.document,
                coverageArea: { type: "MultiPolygon", coordinates: JSON.parse(req.body.coverageArea) },
                address: { type: "Point", coordinates: JSON.parse(req.body.address) }
            });
            await pdvs.save();
            res.json({ status: pdvs.document + ' registered!' });     
        } else {
            res.status(400).send('Pdvs already exists')
        }
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  module.exports = router;