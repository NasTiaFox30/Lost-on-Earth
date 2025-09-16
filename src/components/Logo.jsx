export default function Logo() {
    return (
        <div className="fixed flex flex-col items-center justify-center w-full z-50">
            <img
                src="logo.png"
                alt="Lost on Earth Logo"
                className="w-15 md:w-30"
            />
            <h1 className="bg-green-50 rounded text-sm md:text-base">
                <strong>Lost-on-Earth</strong>
            </h1>
        </div>
    );
}