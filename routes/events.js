const express = require('express');
const router = express.Router();

// Sample data
let events = [
    { id: 1, type: 'Wedding', date: '2024-09-15', description: 'A beautiful wedding ceremony.' },
    { id: 2, type: 'Petting Zoo', date: '2024-09-22', description: 'Fun and educational petting zoo.' },
    { id: 3, type: 'Birthday Party', date: '2024-09-30', description: 'A fun birthday party.' },
    { id: 4, type: 'Garden Tour', date: '2024-10-05', description: 'A guided tour of the garden.' },
    { id: 5, type: 'Horseback Riding', date: '2024-10-10', description: 'Enjoy horseback riding in the countryside.' }
];

// GET all events
router.get('/', (req, res) => {
    res.render('index', { events });
});

// GET a specific event
router.get('/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (event) {
        res.render('event', { event });
    } else {
        res.status(404).send('Event not found');
    }
});

// POST a new event
router.post('/', (req, res) => {
    const newEvent = {
        id: events.length + 1,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description
    };
    events.push(newEvent);
    res.redirect('/events');
});

// PATCH/PUT an existing event
router.put('/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (event) {
        event.type = req.body.type || event.type;
        event.date = req.body.date || event.date;
        event.description = req.body.description || event.description;
        res.redirect(`/events/${event.id}`);
    } else {
        res.status(404).send('Event not found');
    }
});

// DELETE an event
router.delete('/:id', (req, res) => {
    events = events.filter(e => e.id !== parseInt(req.params.id));
    res.redirect('/events');
});

module.exports = router;
