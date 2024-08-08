import { calculateAverage, evaluateAverage, addDisciplineRow, calculateAllAverages } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
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
