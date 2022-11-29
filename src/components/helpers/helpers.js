import moment from "moment/moment";

export const speak = (msg) => {
  const sp = new SpeechSynthesisUtterance(msg);
  [sp.voice] = speechSynthesis.getVoices();
  speechSynthesis.speak(sp);
};
export const isEmptyOrUndefined = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    // value === NaN ||
    value === -1
  ) {
    return true;
  } else {
    return false;
  }
};

const checkValidValue = (variable) => {
  if (variable === undefined || variable === null) {
    return false;
  }
  return true;
};

export const convertFilterToString = (obj) => {
  let str = [];

  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      if (checkValidValue(obj[p]) && obj[p].length !== 0) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }

  return str.join("&");
};

export const convertDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
export const cutHour = (hour) => {
  if (!isEmptyOrUndefined(hour)) {
    let arr = hour?.split(".");
    return arr[0];
  }
};
export const today = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd; //AAA-MM-DD
  return today;
};
