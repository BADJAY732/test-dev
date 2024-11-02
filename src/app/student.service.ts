// src/app/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  _id?: string;
  name: string;
  address: string;
  marks: number;
  view: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:4000/students';  // Backend URL

  constructor(private http: HttpClient) { }

  // GET all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  // POST new student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  // PUT update student
  updateStudent(id: string, student: Student): Observable<Student> {
    console.log(id);
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student);
  }

  // DELETE student
  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
