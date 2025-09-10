

let students = JSON.parse(localStorage.getItem("store")) || []


const addBtn = document.getElementById('add-student');
const output = document.getElementById('output');

addBtn.addEventListener('click', studentDB);

function studentDB() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const course = document.getElementById('course').value;

    let studentDetails = {
        name: name,
        age: age,
        course: course
    }

    if (!name || !age || !course) {
        output.innerHTML = `<p style = "color:red;">Error: All fields are required</p>`;

        setTimeout(() => {
            output.innerHTML = "";

        }, 2000);
        return;
    }

    students.push(studentDetails);
    localStorage.setItem("store", JSON.stringify(students));

    output.innerHTML = `<p style = "color:green;">student sucessfully added</p>`;

    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('course').value = " ";

    setTimeout(() => {
        output.innerHTML = "";

    }, 2000);

    console.log(students)
}


// SHOW STUDENTS
const showStudents = document.getElementById('all-students');

showStudents.addEventListener('click', displayStudents);

function displayStudents() {

    output.innerHTML = "";
    currentView = "all";
    if (students.length === 0) {
        output.innerHTML = "<p>No students found.</p>";
        return;
    }

    let table = document.createElement("table");

    let header = `
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Course</th>
      <th>Action</th>
    </tr>
  `;
    table.innerHTML = header;

    // Add rows for each student
    students.forEach((student, index) => {
        let row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td><button onclick="deleteStudent(${index})">Delete</button></td>
      </tr>
    `;
        table.innerHTML += row;


    });
    output.appendChild(table);

    // return displayStudents();
}



// Delete student
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("store", JSON.stringify(students));

    output.innerHTML = "";
    if (currentView === "all") {
        displayStudents(students);
    } else if (currentView === "js") {
        filterJS();
    }

}

// FILTER BY NAME

const filterName = document.getElementById('filter-name');

filterName.addEventListener('click', filterByName);

function filterByName() {
    output.innerHTML = "";

    const StudentName = students.map(students => students.name);

    output.innerHTML = `<h3>Student Names</h3>
    <ol>${StudentName
            .map(step => `<li>${step}</li>`)
            .join('')
        }</ol>`;

    console.log(StudentName);

}


// FILTER JS STUDENTS
const studentJSbtn = document.getElementById('filter-course');

studentJSbtn.addEventListener('click', filterJS);

function filterJS() {
    output.innerHTML = "";
    currentView = "js";
    const studentJS = students.filter(student => student.course.toLowerCase().trim() === "javascript".toLowerCase());

    if (studentJS.length === 0) {
        output.innerHTML = "<p>No students found.</p>";
        return;
    }

    let table = document.createElement("table");

    let header = `
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Course</th>
      <th>Action</th>
    </tr>
  `;
    table.innerHTML = header;

    // Add rows for each student
    studentJS.forEach((student, index) => {

        index = students.indexOf(student);
        let row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td><button onclick="deleteStudent(${index})">Delete</button></td>
      </tr>
    `;
        table.innerHTML += row;


        output.appendChild(table);
    });

    console.log(studentJS);

    // return filterJS();
}




window.addEventListener("DOMContentLoaded", () => {
    const savedStudent = localStorage.getItem("store");

    console.log(savedStudent);
});