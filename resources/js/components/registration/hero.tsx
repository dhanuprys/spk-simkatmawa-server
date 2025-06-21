import SafeWidth from '../safe-width';

export default function Hero() {
    return (
        <div className="relative flex h-screen flex-col items-center justify-center">
            <div className="absolute top-0 left-0 size-full bg-white"></div>
            <SafeWidth className="relative z-[1] space-y-4">
                <h1 className="font-luckiest text-center text-7xl md:text-9xl">
                    Waktumu
                    <br />
                    <span className="bg-gradient-to-br from-blue-800 to-blue-600 bg-clip-text px-4 text-transparent">
                        {' '}
                        di Layar.
                    </span>
                    <br />
                    Lebar!
                </h1>
                <p className="mx-auto max-w-[65rem] text-center md:text-2xl">
                    Daftarkan film terbaikmu untuk jadi bagian dari Film Festival Nitisara.
                </p>
            </SafeWidth>
        </div>
    );
}
