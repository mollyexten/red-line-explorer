export const compareStations = (a, b) => {
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

export const compareRecommendations = (a, b) => {
  const recA = a.createdTime;
  const recB = b.createdTime;
  let comparison = 0;
  if (recA > recB) {
    comparison = -1;
  } else if (recA < recB) {
    comparison = 1;
  }
  return comparison
}

export const convertKebab = (string) => {
  return string.replace(/\s+/g, '-').replace('/', '-').toLowerCase();
}