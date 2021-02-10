const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body
        const category = await new Sub({name, slug: slugify(name)
            .toLowerCase(), parent}).save();
        res.json(category);
    } catch (err) {
        console.log('SUB CREATE ERROR', err);
        res.status(400).send('Create sub failed');
    }
};

exports.list = async (req, res) => 
    res.json(await Sub.find({}).sort({createdAt: -1}).exec());


exports.read = async (req, res) => {
    let sub = await Sub.findOne({slug: req.params.slug}).exec();
    res.json(sub);
};

exports.update = async (req, res) => {
    const { name } = req.body
    try {
        const updated = await Sub.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, { new: true}).exec();
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(400).send('Update sub failed');
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug}).exec();
        res.json(deleted);
    } catch (err) {
        console.log(err);
        res.status(400).send('Delete sub failed');
    }
};