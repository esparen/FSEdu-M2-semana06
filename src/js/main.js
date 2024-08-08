import { calculateAverage, evaluateAverage, addDisciplineRow, calculateAllAverages } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {

  fetch('studentInsertModal.html')
    .then((response) => response.text())
    .then((html) => {
      document.querySelector('#registerModal .modal-dialog').innerHTML = html;
      addCEPListener(); // Adiciona o listener do CEP
      fetchStudentData();
      })
    .catch((error) => {
      console.error('Erro ao carregar o conteúdo do modal:', error);
    });

  const allAverages = [];
  document.getElementById('btn_add_discipline_row').addEventListener('click', function () {
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

    const average = calculateAverage(grades);
    allAverages.push(average);
    calculateAllAverages(allAverages);
    addDisciplineRow(discipline, grades, average);
    evaluateAverage(average);
  });
});


function fetchStudentData() {
  const form = document.getElementById('add_student_form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura os valores do formulário
    const studentNome = document.getElementById('inputName').value;
    const studentAge = document.getElementById('inputAge').value;
    const studentGrade = document.getElementById('inputGrade').value;
    const studentSchool = document.getElementById('inputSchool').value;
    const studentFavoriteDiscipline = document.getElementById('inputFavoriteDiscipline').value;

    // Atualiza a seção "header-student-info"
    document.getElementById('student_name').value = studentNome;
    document.getElementById('student_age').value = studentAge;
    document.getElementById('student_class').value = studentGrade;
    document.getElementById('student_school').value = studentSchool;
    document.getElementById('student_favorite_discipline').value = studentFavoriteDiscipline;
    $('#registerModal').modal('hide'); // Fecha o modal
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
