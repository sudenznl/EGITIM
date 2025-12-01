import express from 'express';
import cors from 'cors';
import * as events from './data/event.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/events', async (req, res) => {
  try {
    const allEvents = await events.getAll();
    res.json({ events: allEvents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/events/:id', async (req, res) => {
  try {
    const event = await events.get(req.params.id);
    res.json({ event });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.post('/events', async (req, res) => {
  try {
    await events.add(req.body);
    res.status(201).json({ message: 'Event added!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
