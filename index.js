
class Lembrete {
  descricao
  data
  hora
  minutos

  constructor(descricao, data, hora, minutos) {
    this.descricao = descricao
    this.data = data
    this.hora = hora
    this.minutos = minutos
  }
}

const criarLembrete = (event, descricao, data) => {

  const resultadoDescricao = descricao ? descricao : prompt("Digite a descrição do seu lembrete:")
  
  if(!resultadoDescricao || !resultadoDescricao.length) {
    alert("Digite uma descrição valida.")
    criarLembrete()
    return
  }

  const resultadoData =  data ? data : prompt("Digite o ano e o mês: ano/mês")
 
  const [ano, mes] = resultadoData.split("/")

  if(!ano || !mes) {
    alert("Digite uma data no formato valido: ex: 2022/07")
    criarLembrete(event, resultadoDescricao)
    return
  }

  const novaData = new Date(ano, mes)

  if (isNaN(novaData)) {
    alert("Data não é correta. Digite novamente.")
    criarLembrete(event, resultadoDescricao)
    return
  }

  const resultadoHora = prompt("Digite a hora: hh:mm")

  const [hora, minutos] = resultadoHora.split(":").map(item => parseInt(item))

  if(!(hora > 0 && hora < 24) || !(minutos > 0 && minutos < 60)) {
    alert("Digite uma hora valida.")
    criarLembrete(event, resultadoDescricao, novaData)
    return
  }

  novaData.setHours(hora)
  novaData.setMinutes(minutos)

  const novoLembrete = new Lembrete(resultadoDescricao, novaData, hora, minutos)

  listaLembretes.push(novoLembrete)

  alert(`Novo lembrete adicionado com sucesso:\n Descrição: ${resultadoDescricao} - horário: ${hora}:${minutos}`)

  console.log(listaLembretes)
  return

}

const decrementarMes = () => {
  dataAtual.setMonth(--mes)
  ano = dataAtual.getFullYear()
  mes = dataAtual.getMonth()

  dataTexto.textContent = `${formatosMes[mes]}, ${ano}`
}

const incrementarMes = () => {
  
 dataAtual.setMonth(++mes)
 ano = dataAtual.getFullYear()
 mes = dataAtual.getMonth()

 dataTexto.textContent = `${formatosMes[mes]}, ${ano}`
}

const listaLembretes = []

const formatosMes = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

const dataAtual = new Date()
let ano = dataAtual.getFullYear()
let mes = dataAtual.getMonth()

const dataTexto = document.getElementById("data")
dataTexto.textContent = `${formatosMes[mes]}, ${ano}`

const botaoAnterior = document.getElementById("mes-anterior")
const botaoProximo = document.getElementById("proximo-mes")

const botaoLembrete = document.getElementById("botao-lembrete")

botaoLembrete.addEventListener("click", criarLembrete)
botaoAnterior.addEventListener("click", decrementarMes)
botaoProximo.addEventListener("click", incrementarMes)


