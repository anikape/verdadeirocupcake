// DEFINE A DATA DE LANÇAMENTO AQUI (Ano, Mês - 1, Dia, Hora, Minuto, Segundo)
// Exemplo: 15 de Dezembro de 2025 às 10:00:00
const launchDate = new Date("December 30, 2025 10:00:00").getTime();

// Atualiza o contador a cada segundo
const x = setInterval(function() {

  // Obtém a data e hora de hoje
  const now = new Date().getTime();

  // Encontra a distância entre hoje e a data de lançamento
  const distance = launchDate - now;

  // Cálculos de tempo para dias, horas, minutos e segundos
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Formata a saída para ter dois dígitos (ex: 05, 10)
  const formatTime = (time) => String(time).padStart(2, '0');

  // Exibe o resultado nos elementos correspondentes
  document.getElementById("days").innerHTML = formatTime(days);
  document.getElementById("hours").innerHTML = formatTime(hours);
  document.getElementById("minutes").innerHTML = formatTime(minutes);
  document.getElementById("seconds").innerHTML = formatTime(seconds);

  // Se o contador terminar
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "<h2>Lançado! Bem-vindo!</h2>";
    // Opcional: Redirecionar para o novo site aqui
    // window.location.href = "novo-site.html"; 
  }
}, 1000);