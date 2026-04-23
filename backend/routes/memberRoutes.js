const express = require('express');
const router = express.Router();
const multer = require('multer');
const Member = require('../models/Member');

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');    // saves to backend/uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/members — Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const memberData = {
      name:         req.body.name,
      roll:         req.body.roll,
      year:         req.body.year,
      degree:       req.body.degree,
      project:      req.body.project,
      hobbies:      req.body.hobbies,
      certificate:  req.body.certificate,
      internship:   req.body.internship,
      aboutYourAim: req.body.aboutYourAim,
      image:        req.file ? req.file.path.replace(/\\/g, '/') : null,
    };
    const member = new Member(memberData);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/members — Fetch all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/members/:id — Fetch single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
