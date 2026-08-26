let records = [];

document.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("webOutput2Records");
  if (savedData) {
    records = JSON.parse(savedData);
  }
  render();
});

function autoSave() {
  localStorage.setItem("webOutput2Records", JSON.stringify(records));
}

function insertRecord() {
  const first = document.getElementById("firstName").value.trim();
  const middle = document.getElementById("middleName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const ageVal = document.getElementById("age").value.trim();

  if (!first || !last || !ageVal) {
    alert("First Name, Last Name, and Age are required fields!");
    return;
  }

  const newRecord = {
    firstName: first,
    middleName: middle || "N/A",
    lastName: last,
    age: parseInt(ageVal, 10),
  };

  records.push(newRecord);
  clearInputs();
  autoSave();
  render();
}

function clearInputs() {
  document.getElementById("firstName").value = "";
  document.getElementById("middleName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("age").value = "";
}

function clearRecords() {
  if (
    confirm("Are you sure you want to delete all records from the database?")
  ) {
    records = [];
    autoSave();
    render();
  }
}

function deleteRow(index) {
  records.splice(index, 1);
  autoSave();
  render();
}

function editRow(index) {
  const record = records[index];

  const newFirst = prompt("Edit First Name:", record.firstName);
  if (newFirst === null) return;

  const newMiddle = prompt("Edit Middle Name:", record.middleName);
  if (newMiddle === null) return;

  const newLast = prompt("Edit Last Name:", record.lastName);
  if (newLast === null) return;

  const newAgeStr = prompt("Edit Age:", record.age);
  if (newAgeStr === null) return;
  const newAge = parseInt(newAgeStr, 10);

  if (!newFirst.trim() || !newLast.trim() || isNaN(newAge)) {
    alert("Invalid entries. Changes discarded.");
    return;
  }

  records[index] = {
    firstName: newFirst.trim(),
    middleName: newMiddle.trim() || "N/A",
    lastName: newLast.trim(),
    age: newAge,
  };

  autoSave();
  render();
}

function sortRecords() {
  const key = document.getElementById("sortBy").value;
  const order = document.getElementById("sortOrder").value;

  records.sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  autoSave();
  render();
}

function render() {
  const tbody = document.getElementById("recordsTableBody");
  tbody.innerHTML = "";

  records.forEach((record, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${record.firstName}</td>
            <td>${record.middleName}</td>
            <td>${record.lastName}</td>
            <td>${record.age}</td>
            <td>
                <button onclick="deleteRow(${index})">Delete</button>
                <button onclick="editRow(${index})">Edit</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}
