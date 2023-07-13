export const formatDate = (date: number | string | Date) => {

  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');

};

export const getDateFewDaysAgo = (numberDates: number) => {
  let date = new Date;
  date.setDate(date.getDate() - numberDates);
  return formatDate(date);
}

export const roundValue = (value: number, fraction: number = 2) => Math.round(10**fraction * value)/10**fraction

