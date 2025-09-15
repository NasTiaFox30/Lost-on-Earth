export default function Message({ distance }) {
  const gameStatus = distance <= 10 ? "win" : "lose"; // наприклад, <=10 км — win

  return (
    <div className="m-auto w-100 absolute inset-x-0 bottom-4 z-20 bg-white p-4 rounded shadow-lg border border-gray-300">
      <h2 className="text-lg font-bold mb-1">You {gameStatus}!</h2>
      <p>Distance to real place: <strong>{distance.toFixed(2)} km</strong></p>
    </div>
  );
}
