export default function Logo(){
    return (
    <div className="fixed flex flex-col items-center justify-center w-full z-50">
        <img src="/public/logo.png" alt=""
            className="w-30" />
        <h1 className="bg-green-50 rounded"><strong>Lost-on-Earth</strong></h1>
    </div>
    )
}