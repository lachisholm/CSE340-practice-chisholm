const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
   
  try {
    const db = getDb();
    const contacts = await db
      .collection('contacts')
      .find()
      .toArray();

    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('contacts').insertOne(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});



router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contact = await db
        .collection('contacts')
        .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }

    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});


module.exports = router;


router.put('/:id', (req, res) => {
  res.sendStatus(204);
});

router.delete('/:id', (req, res) => {
  res.sendStatus(200);
});
