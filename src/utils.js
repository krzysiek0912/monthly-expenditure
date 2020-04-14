const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const formatedDate = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[month]} ${year}`;
};
export const createData = (day, amount) => {
  return { day, amount };
};
export const sumAmount = (a, b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  if (isNaN(a)) a = 0;
  if (isNaN(b)) b = 0;
  return +(a + b).toFixed(2);
};

export const dataToChart = (data) => {
  let curentDay = 0;
  let convertData = [];
  data.map(({ date, amount }) => {
    const day = new Date(date).getDate();
    if (curentDay === day) {
      let dataToUpdate = convertData.find((item) => item.day === day);
      dataToUpdate.amount = sumAmount(dataToUpdate.amount, amount);
    } else {
      curentDay = day;
      convertData = [...convertData, createData(day, amount)];
    }
    return null;
  });
  return convertData;
};
export const dataToChartProgress = (data) => {
  let sum = 0;
  let curentDay = 0;
  let convertData = [];

  data.map(({ date, amount }) => {
    const day = new Date(date).getDate();
    sum = sumAmount(sum, amount);
    if (curentDay === day) {
      let dataToUpdate = convertData.find((item) => item.day === day);
      dataToUpdate.amount = sumAmount(dataToUpdate.amount, amount);
    } else {
      curentDay = day;
      convertData = [...convertData, createData(day, sum)];
    }
    return null;
  });
  return convertData;
};
