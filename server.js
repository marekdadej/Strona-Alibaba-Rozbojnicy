const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files
app.use('/logo2.jpeg', express.static('public/picture/logo2.jpeg'));

// CSV Writers
const reservationCsvWriter = createCsvWriter({
  path: 'rezerwacje.csv',
  header: [
    { id: 'name', title: 'Imię' },
    { id: 'lastname', title: 'Nazwisko' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Telefon' },
    { id: 'date', title: 'Data' },
    { id: 'time', title: 'Godzina' },
    { id: 'number', title: 'Liczba osób' },
    { id: 'message', title: 'Wiadomość' }
  ],
  append: true
});

const contactCsvWriter = createCsvWriter({
  path: 'kontakt.csv',
  header: [
    { id: 'name', title: 'Imię' },
    { id: 'lastname', title: 'Nazwisko' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Telefon' },
    { id: 'message', title: 'Wiadomość' }
  ],
  append: true
});

const jobCsvWriter = createCsvWriter({
  path: 'praca.csv',
  header: [
    { id: 'name', title: 'Imię' },
    { id: 'lastname', title: 'Nazwisko' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Telefon' },
    { id: 'message', title: 'Wiadomość' }
  ],
  append: true
});

// Routes for reservations
app.post('/saveReservation', (req, res) => {
  const reservation = req.body;
  reservationCsvWriter.writeRecords([reservation])
    .then(() => {
      console.log('Rezerwacja zapisana do pliku CSV.');
      res.status(200).send('Rezerwacja zapisana.');
    })
    .catch(err => {
      console.error('Błąd podczas zapisywania rezerwacji:', err);
      res.status(500).send('Błąd podczas zapisywania rezerwacji.');
    });
});

// Route for contact form
app.post('/saveContact', (req, res) => {
  const contact = req.body;
  contactCsvWriter.writeRecords([contact])
    .then(() => {
      console.log('Kontakt zapisany do pliku CSV.');
      res.status(200).send('Kontakt zapisany.');
    })
    .catch(err => {
      console.error('Błąd podczas zapisywania kontaktu:', err);
      res.status(500).send('Błąd podczas zapisywania kontaktu.');
    });
});

// Route for job application form
app.post('/saveJob', (req, res) => {
  const job = req.body;
  jobCsvWriter.writeRecords([job])
    .then(() => {
      console.log('Aplikacja o pracę zapisana do pliku CSV.');
      res.status(200).send('Aplikacja o pracę zapisana.');
    })
    .catch(err => {
      console.error('Błąd podczas zapisywania aplikacji o pracę:', err);
      res.status(500).send('Błąd podczas zapisywania aplikacji o pracę.');
    });
});

app.listen(port, () => {
  console.log(`Serwer działa pod adresem http://localhost:${port}/`);
});