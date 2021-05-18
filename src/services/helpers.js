export const compare = (a, b) => {
  const stationA = a.fields.sortId;
  const stationB = b.fields.sortId;
  let comparison = 0;
  if (stationA > stationB) {
    comparison = 1;
  } else if (stationA < stationB) {
    comparison = -1;
  }
  return comparison;
}