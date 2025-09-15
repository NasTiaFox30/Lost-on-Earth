export default function MessageBox({ distance, guessesLeft, gameStatus, onNewGame, onGuess }) {
  let message = "";
  let title = "";

  switch (gameStatus) {
  case 'won':
    title = "Congrads! 🎉";
    message = `You WIN! Distance: ${distance.toFixed(2)} km.`;
    break;
  case 'lost':
    title = "You lose 😢";
    message = "You were so close! Maybe you'll lucky next time) ";
    break;
  default:
    title = "Your guesses?";
    message = `Current distance: ${distance?.toFixed(2) || '0'} km. Left tries: ${guessesLeft}`;
  }

  return (
    <div className="m-auto w-100 absolute inset-x-0 bottom-10 z-20 bg-white p-4 rounded shadow-xl border border-gray-300 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <p className="mb-3">{message}</p>
    
      {gameStatus == 'playing' && (
          <button
              className="px-4 py-2 bg-green-500 text-white rounded w-full"
              onClick={onGuess}
          > Check 🔎
          </button>
      )}
      
      {gameStatus !== 'playing' && (
          <button
              className="px-4 py-2 bg-orange-500 text-white rounded w-full"
              onClick={onNewGame}
          > Play one more time!
          </button>
      )}
    </div>
  );
}
