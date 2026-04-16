let students = [];

function showSection(section) {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("students").style.display = "none";

  document.getElementById(section).style.display = "block";
}

function addStudent() {
  const name = document.getElementById("nameInput").value;
  const cls = document.getElementById("classInput").value;

  if (name === "") return;

  students.push({ name, cls, present: true });

  document.getElementById("nameInput").value = "";
  renderTable();
}

function toggleAttendance(index) {
  students[index].present = !students[index].present;
  renderTable();
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
}

function renderTable() {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  let presentCount = 0;

  students.forEach((s, i) => {
    if (s.present) presentCount++;

    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.cls}</td>
        <td>
          <button onclick="toggleAttendance(${i})">
            ${s.present ? "Present" : "Absent"}
          </button>
        </td>
        <td>
          <button onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("totalStudents").innerText = students.length;

  let attendance = students.length
    ? Math.round((presentCount / students.length) * 100)
    : 0;

  document.getElementById("attendance").innerText = attendance + "%";
}