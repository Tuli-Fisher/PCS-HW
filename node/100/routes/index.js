/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

let contacts = [
  {
    id: 1,
    first: 'Donald',
    last: 'Trump',
    phone: '1234567890',
    email: 'dtrump@whitehouse.gov'
  },
  {
    id: 2,
    first: 'JD',
    last: 'Vance',
    phone: '9876543210',
    email: 'jd@whitehouse.gov'
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Contact List',
    contacts,
    noContacts: !contacts?.length,
    partials: { content: 'index.hjs'} });
});

router.get('/addContact', (req, res, next) => {
  res.render('layout', {
    title: 'Add Contact',
    partials: { content: 'addContact.hjs' }
  });
});

router.post('/addContact', (req, res, next) =>{
  contacts.push(req.body);

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.get('/editContact/:id', (req, res, next) => {
  const contact = contacts.find(c => c.id === Number(req.params.id));

  res.render('layout', {
    title: 'edit Contact',
    contact,
    partials: { content:'editContacts.hjs' }
  });
});

router.post('/editContact/:id', (req, res, next) =>{
  const contact = contacts.find(c => c.id === Number(req.params.id));
  if(!contact){
    res.writeHead(404);
    res.end();
    return;
  }
  contact.first = req.body.first;
  contact.last = req.body.last;
  contact.phone = req.body.phone;
  contact.email = req.body.email;

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.post('/deleteContact/:id', (req, res, next) => {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.get('/api/contacts', (req, res, next) => {
  res.json(contacts);
});
module.exports = router;
