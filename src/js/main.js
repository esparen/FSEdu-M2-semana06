import { 
  getAverage, 
  evaluateAverage, 
  addDisciplineRow, 
  cleanGradeTable, 
  initStudentGradeData,
  loadStudentList
} from './utils.js';


document.addEventListener('DOMContentLoaded', function () {
  initStudentGradeData(); //inicia JSON com notas e médias do aluno
  loadPageData(); //preenche campos com dados do aluno e disciplinas

  fetch('studentInsertModal.html')
    .then((response) => response.text())
    .then((html) => {
      document.querySelector('#registerModal .modal-dialog').innerHTML = html;
      addCEPListener(); 
      fetchStudentData();
      })
    .catch((error) => {
      console.error('Erro ao carregar o conteúdo do modal:', error);
    });

  document.getElementById('btn_add_discipline_row').addEventListener('click', function () {
    const newDiscipline = getNewDisciplineData();
    const studentGradesData = JSON.parse(localStorage.getItem('studentGradesData')) || [];
    studentGradesData.push(newDiscipline);
    localStorage.setItem('studentGradesData', JSON.stringify(studentGradesData));
    loadPageData();
  });
});

function loadPageData() {
  loadStudentData(); //carrega dados do aluno
  cleanGradeTable(); //limpa a tabela de disciplinas
  loadGradeData(); //carrega dados das disciplinas e notas
  loadStudentList(); //carrega lista de alunos
};

function loadGradeData() {
  const studentGradesData = JSON.parse(localStorage.getItem('studentGradesData'));
  
  if (studentGradesData) {
    let sumOfAverages = 0;
    let highestAverage = 0;
    studentGradesData.forEach((discipline) => {
      discipline.average = getAverage(discipline.grades);      
      if (discipline.average > highestAverage) highestAverage = discipline.average;
      sumOfAverages += discipline.average;
      addDisciplineRow(discipline.discipline, discipline.grades, discipline.average);
      evaluateAverage(discipline.average);
    });
    const generalAverage = sumOfAverages / studentGradesData.length;
    document.querySelector('#general_average_result').textContent = `A média geral do aluno é ${generalAverage}`;
    localStorage.setItem('studentGradesData', JSON.stringify(studentGradesData));    
    document.getElementById('highest-average').textContent = `A maior média entre as matérias é ${highestAverage}`;
  }
};

function getNewDisciplineData() {
  const discipline = prompt('Qual a matéria deseja cadastrar?');
    const grades = [];
    let i = 0;
    while (i < 4) {
      const grade = parseFloat(prompt(`Informe a nota ${i + 1} da matéria ${discipline}`));
      if (!isNaN(grade) && grade >= 0 && grade <= 10) {
        grades.push(grade);
        i++;
      } else {
        alert('Por favor, informe um número válido entre 0 e 10.');
      }
    }
    return { discipline, grades, average: getAverage(grades) };
  }

function fetchStudentData() {
  const form = document.getElementById('add_student_form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura os valores do formulário
    const studentNome = document.getElementById('inputName').value;
    const studentAge = document.getElementById('inputAge').value;
    const studentGrade = document.getElementById('inputGrade').value;
    const studentSchool = document.getElementById('inputSchool').value;
    const studentCEP = document.getElementById('inputCEP').value;
    const studentStreet = document.getElementById('inputStreet').value;
    const studentCity = document.getElementById('inputCity').value;
    const studentState = document.getElementById('inputState').value;
    const studentFavoriteDiscipline = document.getElementById('inputFavoriteDiscipline').value;

    const studentData = {
      nome: studentNome,
      idade: studentAge,
      serie: studentGrade,
      escola: studentSchool,
      materiaFavorita: studentFavoriteDiscipline,
      cep: studentCEP,
      rua: studentStreet,
      cidade: studentCity,
      estado: studentState
    };    
    localStorage.setItem('studentData', JSON.stringify(studentData));
    $('#registerModal').modal('hide'); // Fecha o modal
    loadStudentData();
  });
}


function addCEPListener() {
  const cepInput = document.getElementById('inputCEP');
  
  cepInput.addEventListener('blur', function () {
    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (data.erro) {
            alert('CEP não encontrado.');
          } else {
            document.getElementById('inputStreet').value = data.logradouro || '';
            document.getElementById('inputCity').value = data.localidade || '';
            document.getElementById('inputState').value = data.uf || '';
          }
        })
        .catch(error => {
          console.error('Erro ao buscar o CEP:', error);
          alert('Erro ao buscar o CEP.');
        });
    }
  });
}

function loadStudentData() {  
  const studentData = JSON.parse(localStorage.getItem('studentData'));
  if (studentData) {
    document.getElementById('student_name').value = studentData.nome || '';
    document.getElementById('student_age').value = studentData.idade || '';
    document.getElementById('student_class').value = studentData.serie || '';
    document.getElementById('student_school').value = studentData.escola || '';
    document.getElementById('student_favorite_discipline').value = studentData.materiaFavorita || '';
  }
}
