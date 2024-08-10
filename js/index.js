const resultado = document.getElementById("resultado")
const nomeAluno = document.getElementById("nomeAluno")
const notaPortugues = document.getElementById("notaPortugues")
const notaMatematica = document.getElementById("notaMatematica")
const notaRedacao = document.getElementById("notaRedacao")
const errosInput = document.getElementById("errosInput")
let resultados = []

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('resultados')) {
        resultados = JSON.parse(localStorage.getItem('resultados'))
        mostrarResultados()
    }
    const form = document.getElementById("formCalculo");
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calcMedia();
    });
});

function calcMedia() {
    let aluno = nomeAluno.value
    let notaPortuguesInput = parseFloat(notaPortugues.value)
    let notaMatematicaInput = parseFloat(notaMatematica.value)
    let notaRedacaoInput = parseFloat(notaRedacao.value)
    let media = (notaPortuguesInput + notaMatematicaInput + notaRedacaoInput) / 3
    media = media.toFixed(2)

    if (aluno === '' || !isNaN(aluno) || isNaN(notaPortuguesInput) || isNaN(notaMatematicaInput) || isNaN(notaRedacaoInput)) {
        errosInput.innerHTML = 'Verifique se o nome e as notas estão preenchidas corretamente.'
    } else {
        errosInput.innerHTML = '';
        if ((notaPortuguesInput < 0 || notaPortuguesInput > 10) || (notaMatematicaInput < 0 || notaMatematicaInput > 10) || (notaRedacaoInput < 0 || notaRedacaoInput > 10)) {
            errosInput.innerHTML = "Digite uma nota entre 0 e 10."
        } else {
            if (media < 5) {
                resultados.push(`A média do(a) aluno(a) ${aluno} é ${media}, ele(a) está <span>reprovado(a)</span>.`)
            } else {
                resultados.push(`A média do(a) aluno(a) ${aluno} é ${media}, ele(a) está <span>aprovado(a)</span>.`)
            }
        }
    localStorage.setItem('resultados', JSON.stringify(resultados));
    mostrarResultados()
    limparResultados()
    }
}

function mostrarResultados() {
    let html = ''
    resultados.forEach(resultado => {
        html += 
        `<ul>
        <li>${resultado}</li>
        </ul>`
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