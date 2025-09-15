//Random coordinates
export function getRandomCoords() {
  const lat = (Math.random() * 180 - 90).toFixed(6);
  const lng = (Math.random() * 360 - 180).toFixed(6);
  return { lat: Number(lat), lng: Number(lng) };
}

// Distance (haversin)
export function haversineDistance(coords1, coords2) {
  const R = 6371; // radius of Earth (km)
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);

  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; //km
}