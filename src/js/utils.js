export function calculateAverage(gradesArray) {
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
                        <td>${average.toFixed(1)}</td>
                      </tr>`;
  tbody.innerHTML += newRow;
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

export function calculateAllAverages(allAverages) {
  const result = calculateAverage(allAverages);
  document.querySelector('#general_average_result').textContent = `A média geral do aluno é ${result.toFixed(1)}`;

  const highestSubjectAverage = findHighestAverageAmongSubjects(allAverages);
  document.getElementById('highest-average').textContent = `A maior média entre as matérias é ${highestSubjectAverage}`;
}
