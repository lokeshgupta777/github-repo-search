const getFormattedDate = (dateObj) => {
  let formattedDate = "";

  let date = dateObj.getDate() + "";
  if (date === '1' || date === '21' || date === '31')
    formattedDate = date + "st";
  else if (date === '2' || date === '22')
    formattedDate = date + "nd";
  else if (date === '3' || date === '23')
    formattedDate = date + "rd";
  else
    formattedDate = date + "th";
  formattedDate += " ";

  let month = dateObj.toLocaleDateString('en-IN', { month: 'long' });
  formattedDate += month.slice(0, 3);
  formattedDate += '\'';

  let year = dateObj.getFullYear() + "";
  formattedDate += year.slice(-2);

  return formattedDate
}

export default getFormattedDate;