export default function formatDate(date: string | Date = new Date()) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();

  // Adicione um zero à esquerda se o mês ou o dia for menor que 10
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}