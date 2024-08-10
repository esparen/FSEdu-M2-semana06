export function initStudentGradeData() {
  const studentGradesData = [
  {
    discipline: "Quimica",
    grades: [8, 7, 9, 10],
  }, 
  {
    discipline: "Matemática",
    grades: [10, 9, 10, 10]
  },
  {
    discipline: "Português",
    grades: [6, 7, 8, 8]
  },
  ]

  localStorage.setItem('studentGradesData', JSON.stringify(studentGradesData));
} 


export function getAverage(gradesArray) {
  let sum = 0;  
  for (let i = 0; i < gradesArray.length; i++) {
    sum += gradesArray[i];
  }
  return sum / gradesArray.length;
}

export function evaluateAverage(average) {
  const resultElement = document.getElementById('resultadoMedia');
  resultElement.innerHTML = '';
  if (average > 7) {
    resultElement.innerHTML += 'Parabéns, você passou na média!<br>';
  } else {
    resultElement.innerHTML += 'Infelizmente, você está de recuperação.<br>';
  }
}

export function addDisciplineRow(discipline, grades, average) {
  const tbody = document.getElementById('disciplines_table_body');
  const newRow = `<tr>
                        <td>${discipline}</td>
                        <td>${grades[0].toFixed(1)}</td>
                        <td>${grades[1].toFixed(1)}</td>
                        <td>${grades[2].toFixed(1)}</td>
                        <td>${grades[3].toFixed(1)}</td>
                        <td>${average}</td>
                      </tr>`;
  tbody.innerHTML += newRow;
}

export function cleanGradeTable() {
  const tbody = document.getElementById('disciplines_table_body');
  tbody.innerHTML = '';
}

export function findHighestAverageAmongSubjects(allAverages) {
  let highestAverage = allAverages[0];
  for (let average of allAverages) {
    if (average > highestAverage) {
      highestAverage = average;
    }
  }
  return highestAverage.toFixed(1);
}

export function loadStudentList() {
  fetch('http://localhost:3000/alunos') // URL do servidor json-server
    .then((response) => response.json())
    .then((students) => {
      const studentList = document.querySelector('#student_list');
      studentList.innerHTML = ''; // Limpa a lista existente

      students.forEach((student) => {
        const listItem = document.createElement('li');
        listItem.id = "student_id_"+ student.id;
        listItem.textContent = student.nome;
        studentList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar a lista de alunos:', error);
    });
}