export default function getFormatDate(date) {
  if (!date) {
    return '';
  }

  console.log(date);

  const dateObj = new Date(date);
  const formatLastUpdated = `${dateObj.getFullYear()}年${
    dateObj.getMonth() + 1
  }月${dateObj.getDate()}日`;
  return formatLastUpdated;
}
