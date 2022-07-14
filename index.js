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
  
  let [ano, mes] = resultadoData.split("/")

  mes = parseInt(mes)

  if((!ano || !mes) || ano.length !== 4 || !(mes.toString().length <= 2) || !(mes > 0 && mes <= 12)) {
    alert("Digite uma data no formato valido e entre o mes 1 e 12: ex: 2022/07")
    criarLembrete(event, resultadoDescricao)
    return
  }
  
  const novaData = new Date(ano, mes - 1)

  if (isNaN(novaData)) {
    alert("Data não é correta. Digite novamente.")
    criarLembrete(event, resultadoDescricao)
    return
  }

  const resultadoHora = prompt("Digite a hora: hh:mm")

  const [hora, minutos] = resultadoHora.split(":").map(item => parseInt(item))

  if(!(hora >= 0 && hora < 24) || !(minutos >= 0 && minutos < 60)) {
    alert("Digite uma hora valida.")
    criarLembrete(event, resultadoDescricao, resultadoData)
    return
  }

  novaData.setHours(hora)
  novaData.setMinutes(minutos)

  const novoLembrete = new Lembrete(resultadoDescricao, novaData, hora, minutos)

  ano = novaData.getFullYear()
  mes = novaData.getMonth()

  const chave = `${formatosMes[mes]}, ${ano}`

  if(!listaLembretes.has(chave)) {
    listaLembretes.set(chave, [])
  }

  listaLembretes.get(chave).push(novoLembrete);

  if((ano === dataAtual.getFullYear()) && (mes === dataAtual.getMonth())) {
    criarLista(chave)
  }
 
  alert(`Novo lembrete adicionado com sucesso:\n Descrição: ${resultadoDescricao} - horário: ${hora}:${minutos}`)

  return
}

const decrementarMes = () => {
  dataAtual.setMonth(--mesAtual)
  anoAtual = dataAtual.getFullYear()
  mesAtual = dataAtual.getMonth()

  const chave = `${formatosMes[mesAtual]}, ${anoAtual}`
  dataTexto.textContent = chave

  criarLista(chave)
}

const incrementarMes = () => {
  dataAtual.setMonth(++mesAtual)
  anoAtual = dataAtual.getFullYear()
  mesAtual = dataAtual.getMonth()

  const chave = `${formatosMes[mesAtual]}, ${anoAtual}`
  dataTexto.textContent = chave
 
  criarLista(chave)
}

const criarLista = (chave) => {
  const lista = document.getElementById("lista")
  const h1 = document.getElementById("h1")
  lista.innerHTML = ""

  if(!listaLembretes.has(chave)) {
    h1.classList.remove("nao-visivel")
    return;
  }

  h1.classList.add("nao-visivel")
  listaLembretes.get(chave).forEach( lembrete => {
    const listaItem = document.createElement("li")
    const descricao = document.createElement("span")
    const hora = document.createElement("span")

    descricao.textContent = lembrete.descricao
    hora.textContent = `${lembrete.hora}:${lembrete.minutos}`

    listaItem.classList.add("lista-item")
    listaItem.append(descricao,hora)
    lista.append(listaItem);
  })
}

const listaLembretes = new Map();
const formatosMes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

const dataAtual = new Date()
let anoAtual = dataAtual.getFullYear()
let mesAtual = dataAtual.getMonth()

const dataTexto = document.getElementById("data")
dataTexto.textContent = `${formatosMes[mesAtual]}, ${anoAtual}`

const botaoAnterior = document.getElementById("mes-anterior")
const botaoProximo = document.getElementById("proximo-mes")
const botaoLembrete = document.getElementById("botao-lembrete")

botaoLembrete.addEventListener("click", criarLembrete)
botaoAnterior.addEventListener("click", decrementarMes)
botaoProximo.addEventListener("click", incrementarMes)