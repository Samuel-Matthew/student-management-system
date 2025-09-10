// Student array
let students = JSON.parse(localStorage.getItem("students")) || [];

// DOM elements
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const addBtn = document.getElementById("addBtn");
const showBtn = document.getElementById("showBtn");
const saveBtn = document.getElementById("saveBtn");
const output = document.getElementById("output");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Function to display students
function displayStudents(list = students) {
  output.innerHTML = "";
  if (list.length === 0) {
    output.innerHTML = "<p>No students found.</p>";
    return;
  }

  list.forEach((student, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${student.name}</strong> (Age: ${student.age}, Course: ${student.course})
      <button onclick="deleteStudent(${index})">Delete</button>
    `;
    output.appendChild(div);
  });
}

// Add student
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value.trim());
  const course = courseInput.value.trim();

  if (!name || !age || !course) {
    output.innerHTML = "<p style='color:red;'>Error: All fields are required.</p>";
    return;
  }

  students.push({ name, age, course });
  localStorage.setItem("students", JSON.stringify(students));

  output.innerHTML = "<p style='color:green;'>Student added successfully!</p>";
  nameInput.value = "";
  ageInput.value = "";
  courseInput.value = "";
});

// Show students
showBtn.addEventListener("click", () => {
  displayStudents();
});

// Callbacks example
function filterStudents(callback) {
  return students.filter(callback);
}

// Example callback usage (by course)
console.log("JavaScript Students:", filterStudents(s => s.course.toLowerCase() === "javascript"));

// Save students (Promises + Async/Await)
function saveStudents() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (students.length === 0) {
        reject("Error: No students to save!");
      } else {
        resolve("Students saved successfully!");
      }
    }, 2000);
  });
}

saveBtn.addEventListener("click", async () => {
  try {
    const message = await saveStudents();
    output.innerHTML = `<p style='color:green;'>${message}</p>`;
  } catch (error) {
    output.innerHTML = `<p style='color:red;'>${error}</p>`;
  }
});

// Search student
searchBtn.addEventListener("click", () => {
  const searchName = searchInput.value.trim().toLowerCase();
  const results = students.filter(s => s.name.toLowerCase().includes(searchName));
  displayStudents(results);
});

// Delete student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

// Array method examples
function showArrayExamples() {
  console.log("Student Names:", students.map(s => s.name));
  console.log("Average Age:", students.reduce((sum, s) => sum + s.age, 0) / (students.length || 1));
}

showArrayExamples();

console.log(students);