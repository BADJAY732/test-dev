import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

interface Student {
  _id?: string;
  name: string;
  address: string;
  marks: number;
  view: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];  // เก็บผลลัพธ์การค้นหา
  searchText: string = '';           // ตัวแปรสำหรับเก็บคำค้นหา
  newStudent: Student = { name: '', address: '', marks: 0, view: '' };
  isEditing: boolean = false;
  selectedStudentId: string | null = null;
  selectedStudent: Student | null = null; // To store the student being viewed

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = data; // เริ่มต้นให้ผลลัพธ์การค้นหาตรงกับข้อมูลทั้งหมด
    });
  }

  addStudent(): void {
    if (!this.newStudent.name || !this.newStudent.address || this.newStudent.marks === null) {
      alert('Please fill in all fields');
      return;
    }

    this.studentService.addStudent(this.newStudent).subscribe(() => {
      this.loadStudents();
      this.resetForm();
    });
  }


  editStudent(student: Student): void {
    this.newStudent = { ...student };
    this.isEditing = true;
    this.selectedStudentId = student._id || null;
  }

  updateStudent(): void {
    if (this.selectedStudentId) {
      this.studentService.updateStudent(this.selectedStudentId, this.newStudent).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  deleteStudent(id: string | undefined): void {
    if (!id) {
      console.error('Student ID is undefined');
      return;
    }
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  // ฟังก์ชันสำหรับค้นหานักเรียน
  searchStudent(): void {
    const search = this.searchText.trim().toLowerCase();
    if (search) {
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(search) ||
        student.address.toLowerCase().includes(search) ||
        student.marks.toString().includes(search)
      );
    } else {
      this.filteredStudents = this.students; // ถ้าไม่มีคำค้นหา แสดงข้อมูลทั้งหมด
    }
  }

  resetForm(): void {
    this.newStudent = { name: '', address: '', marks: 0 , view: '' };
    this.isEditing = false;
    this.selectedStudentId = null;
  }

   // Method to view student details
   viewStudent(student: Student): void {
    console.log(student); // ตรวจสอบว่ามีนักเรียนถูกส่งเข้ามาหรือไม่
    this.selectedStudent = student;
  }


  // Method to close the view details modal or section
  closeView(): void {
    this.selectedStudent = null;
  }
}
