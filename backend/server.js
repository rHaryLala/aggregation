const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB (base `test`)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connecté à la base test'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));

  const StudentSchema = new mongoose.Schema({
    student_id: String,     // Identifiant de l'étudiant
    student_nom: String,    // Nom de l'étudiant
    student_prenom: String, // Prénom de l'étudiant
    religion: String,       // Religion de l'étudiant
  });
  
// Forcer le nom de la collection à "student"
const Student = mongoose.model('Student', StudentSchema, 'student');

module.exports = Student;

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API avec la collection Student !');
});

// Route pour récupérer tous les étudiants
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour ajouter un étudiant
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Middleware pour les routes inconnues
app.use((req, res) => {
  res.status(404).send('Route non trouvée.');
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur actif sur le port ${PORT}`));
