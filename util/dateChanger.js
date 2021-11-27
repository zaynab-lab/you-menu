export default function dateChanger(od) {
  const date = new Date(od);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();
  // const hours = date.getHours();
  // const minute = date.getMinutes();
  const day = dt < 10 ? "0" + dt : dt;
  const mon = month < 10 ? "0" + month : month;
  // const hou = hours < 10 ? "0" + hours : hours;
  // const min = minute < 10 ? "0" + minute : minute;
  return day + "-" + mon + "-" + year;
}
export function timeChanger(od) {
  const date = new Date(od);

  const hours = date.getHours();

  const minute = date.getMinutes();
  const secound = date.getSeconds();

  const hou = hours < 10 ? "0" + hours : hours;
  const min = minute < 10 ? "0" + minute : minute;
  const sec = secound < 10 ? "0" + secound : secound;

  return hou + ":" + min + ":" + sec;
}

export function dateSub(date, validation) {
  const today = new Date();
  const ndate = new Date(date);
  const days = ((today - ndate) / (1000 * 60 * 60 * 24)) | 0;
  return validation - days;
}

export function orderCode() {
  const digitAt = (val, index) => {
    return Math.floor(
      (val /
        Math.pow(10, Math.floor(Math.log(Math.abs(val)) / Math.LN10) - index)) %
        10
    );
  };

  const date = new Date();

  const alphabet = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    "Z" +
    digitAt(year, 3) +
    "-" +
    alphabet[month] +
    alphabet[dt] +
    alphabet[hours] +
    alphabet[minutes] +
    "-" +
    Math.floor(Math.random() * 1000)
  );
}
