//Random coordinates
export function getRandomCoords() {
  const lat = (Math.random() * 180 - 90).toFixed(6);
  const lng = (Math.random() * 360 - 180).toFixed(6);
  return { lat: Number(lat), lng: Number(lng) };
}