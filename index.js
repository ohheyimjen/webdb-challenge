const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// get packing 
server.get('/api/packing_list', async (req, res) => {
  try {
    const packing = await db('packing_list'); // gets all of the records from the table
    res.status(200).json(packing);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get items
server.get('/api/items', async (req, res) => {
  try {
    const items = await db('items'); // gets all of the records from the table
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  '19': 'Another project with that item already exists!'
}

// post for adding projects
server.post('/api/packing_list', async (req, res) => {
  try {
    const [id] = await db('packing_list').insert(req.body);
    const packing = await db('packing_list')
      .where({ id })
      .first();
    res.status(201).json(packing);
  } catch (error) {
    const message = errors[error.errno] || 'We have packing problems!';
    res.status(500).json({ message, error })
  }
}); 


// post for adding actions
server.post('/api/items', async (req, res) => {
  try {
    const [id] = await db('items').insert(req.body);
    const items = await db('items')
      .where({ id })
      .first();
    res.status(201).json(items);
  } catch (error) {
    const message = errors[error.errno] || 'We have packing problems!';
    res.status(500).json({ message, error })
  }
}); 


// get for retrieving a project by its id 
server.get('/api/packing_list/items', (req, res) => {
  try {
    const packing = await db('packing_list')
      .innerJoin('items', 'cohorts.id', 'students.cohort_id')
      .select('cohorts.name', 'students.name')
      .where({ cohort_id: req.params.id })

    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});


const port = process.env.PORT || 6000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);