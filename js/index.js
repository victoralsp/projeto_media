const resultado = document.getElementById("resultado")
const nomeAluno = document.getElementById("nomeAluno")
const notaPortugues = document.getElementById("notaPortugues")
const notaMatematica = document.getElementById("notaMatematica")
const notaRedacao = document.getElementById("notaRedacao")
let resultados = []

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('resultados')) {
        resultados = JSON.parse(localStorage.getItem('resultados'))
        mostrarResultados()
    }
});

function calcMedia() {
    let aluno = nomeAluno.value
    let notaPortuguesInput = parseFloat(notaPortugues.value)
    let notaMatematicaInput = parseFloat(notaMatematica.value)
    let notaRedacaoInput = parseFloat(notaRedacao.value)

    let media = (notaPortuguesInput + notaMatematicaInput + notaRedacaoInput) / 3
    media = media.toFixed(2)
    if (aluno == '' || !isNaN(aluno) || isNaN(notaPortuguesInput) || isNaN(notaMatematicaInput) || isNaN(notaRedacaoInput)) {
        errosInput.innerHTML = 'Verifique se o nome e as notas estão preenchidos corretamente.'
    } else {
        if (media < 5) {
        resultados.push(`A média do(a) aluno(a) ${aluno} é ${media}, ele(a) está reprovado(a).`)
    } else {
        resultados.push(`A média do(a) aluno(a) ${aluno} é ${media}, ele(a) está aprovado(a).`)
    }
    }
    localStorage.setItem('resultados', JSON.stringify(resultados));
    mostrarResultados()
    limparResultados()
}

function mostrarResultados() {
    let html = ''
    resultados.forEach(resultado => {
        html += `<p>${resultado}</p>`
    })
    resultado.innerHTML = html
}

function limparArray() {
    resultados = []; 
    localStorage.setItem('resultados', JSON.stringify(resultados)); 
    mostrarResultados();
}

function limparResultados() {
    nomeAluno.value = ""
    notaPortugues.value = ""
    notaMatematica.value = ""
    notaRedacao.value = ""
}