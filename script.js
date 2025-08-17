function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function marksToGP(m) {
  if (m >= 90) return 10;
  if (m >= 80) return 9;
  if (m >= 70) return 8;
  if (m >= 60) return 7;
  if (m >= 50) return 6;
  if (m >= 40) return 5;
  return 0;
}

// SGPA
function sgpaForm() {
  let n = document.getElementById("sgpaSubjects").value;
  let div = document.getElementById("sgpaInputs");
  div.innerHTML = "";
  for (let i = 0; i < n; i++) {
    div.innerHTML += `Credits of Subject ${i+1}: <input type="number" id="c${i}"><br>
                      Marks of Subject ${i+1}: <input type="number" id="m${i}"><br><br>`;
  }
  div.innerHTML += `<button onclick="calculateSGPA(${n})">Calculate SGPA</button>`;
}

function calculateSGPA(n) {
  let totalCredits = 0, totalPoints = 0;
  for (let i = 0; i < n; i++) {
    let c = +document.getElementById("c"+i).value;
    let m = +document.getElementById("m"+i).value;
    totalCredits += c;
    totalPoints += marksToGP(m) * c;
  }
  let sgpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("sgpaResult").innerHTML = "✅ Your SGPA = " + sgpa;
  document.getElementById("sgpaResult").classList.remove("hidden");
}

// Minimum Marks
function minMarksForm() {
  let n = document.getElementById("minSubjects").value;
  let div = document.getElementById("minInputs");
  div.innerHTML = "";
  for (let i = 0; i < n; i++) {
    div.innerHTML += `Credits of Subject ${i+1}: <input type="number" id="mc${i}"><br>`;
  }
  div.innerHTML += `Target SGPA: <input type="number" id="target"><br><br>
                    <button onclick="calculateMinMarks(${n})">Calculate</button>`;
}

function calculateMinMarks(n) {
  let totalCredits = 0;
  for (let i = 0; i < n; i++) totalCredits += +document.getElementById("mc"+i).value;
  let target = +document.getElementById("target").value;
  let perCreditGP = target;
  let requiredMarks = (perCreditGP - 0.5) * 10;
  document.getElementById("minResult").innerHTML = `📌 To achieve SGPA ${target}, you need approx ${requiredMarks.toFixed(2)} marks per subject.`;
  document.getElementById("minResult").classList.remove("hidden");
}

// Updated CGPA
function cgpaForm() {
  let n = document.getElementById("curSubjects").value;
  let div = document.getElementById("curInputs");
  div.innerHTML = "";
  for (let i = 0; i < n; i++) {
    div.innerHTML += `Credits of Subject ${i+1}: <input type="number" id="cc${i}"><br>
                      Marks of Subject ${i+1}: <input type="number" id="cm${i}"><br><br>`;
  }
  div.innerHTML += `<button onclick="calculateCGPA(${n})">Calculate Updated CGPA</button>`;
}

function calculateCGPA(n) {
  let prevCgpa = +document.getElementById("prevCgpa").value;
  let prevCredits = +document.getElementById("prevCredits").value;
  let totalCredits = 0, earnedPoints = 0;

  for (let i = 0; i < n; i++) {
    let c = +document.getElementById("cc"+i).value;
    let m = +document.getElementById("cm"+i).value;
    totalCredits += c;
    earnedPoints += marksToGP(m) * c;
  }

  let sgpa = earnedPoints / totalCredits;
  let updatedCgpa = (prevCgpa * prevCredits + earnedPoints) / (prevCredits + totalCredits);

  document.getElementById("cgpaResult").innerHTML =
    `✅ Current SGPA = ${sgpa.toFixed(2)} <br> 🎯 Updated CGPA = ${updatedCgpa.toFixed(2)}`;
  document.getElementById("cgpaResult").classList.remove("hidden");
}
