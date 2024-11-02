const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mStudent = require('./models/Student');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb+srv://jay:1234@cluster0.qigfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// สร้าง Schema สำหรับนักเรียน

// const Student = mongoose.model('Student', studentSchema);

// API สำหรับการดึงข้อมูลนักเรียนทั้งหมด
app.get('/students', async (req, res) => {
  const students = await mStudent.find();
  res.json(students);
});

// API สำหรับการเพิ่มนักเรียนใหม่
app.post('/students', async (req, res) => {
  const student = new mStudent(req.body);
  await student.save();
  res.json(student);
});

// API สำหรับการแก้ไขข้อมูลนักเรียน
app.put('/students/:id', async (req, res) => {
  const id = req.params.id;
  const { name, address, marks, view } = req.body;
  const find_student = await mStudent.findById(id);
  if (!find_student) {
    return res.status(400).json({ message: 'Missing student ID' });
  }
  if (!name || !address || !marks) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const student = await mStudent.findByIdAndUpdate(id,{ name, address, marks, view }, { new: true });
  res.json(student);
});

// API สำหรับการลบนักเรียน
app.delete('/students/:id', async (req, res) => {
  await mStudent.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

// เริ่มต้นเซิร์ฟเวอร์
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
