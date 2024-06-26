import { app } from "@azure/functions";
import { studentList } from "./functions/GetStudents";
import { addStudent } from "./functions/AddStudent";
import { getStudentById } from "./functions/GetStudentById";
import { updateStudentById } from "./functions/UpdateStudentById";
import { decrementClasses } from "./functions/DecrementClasses";

app.http('studentList', {
  methods: ['GET'],
  route: 'studentList',
  authLevel: 'anonymous',
  handler: studentList
});

app.http('addStudent', {
  methods: ['POST'],
  route: 'addStudent',
  authLevel: 'anonymous',
  handler: addStudent
});

app.http('decrementClasses', {
  methods: ['POST'],
  route: 'decrementClasses/{id}',
  authLevel: 'anonymous',
  handler: decrementClasses
});

app.http('getStudentById', {
  methods: ['GET'],
  route: 'student/{id}',
  authLevel: 'anonymous',
  handler: getStudentById
});

app.http('updateStudentById', {
  methods: ['PUT'],
  route: 'updateStudent/{id}',
  authLevel: 'anonymous',
  handler: updateStudentById
});