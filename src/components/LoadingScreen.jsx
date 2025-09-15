import stickman from '../assets/stickman_walk.gif';
import earth from '../assets/earth.gif';

export default function LoadingScreen() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center">
            <img
                src={stickman}
                alt="Stickman"
                className="-mb-35 w-46 h-auto z-10"
            />
            <img
                src={earth}
                alt="Earth"
                className="w-100 h-auto"
            />
            </div>
            <div className="mt-4 text-black text-xl text-center">
            Generating random place...
            </div>
        </div>
    )
}