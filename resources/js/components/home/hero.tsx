import SafeWidth from '../safe-width';

export default function Hero() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <SafeWidth className="space-y-4">
                <h1 className="font-luckiest text-center text-8xl md:text-9xl">
                    Satu Layar,
                    <br />
                    Seribu Cerita
                </h1>
                <p className="text-center">
                    Selamat datang di Film Festival Nitisara — sebuah selebrasi sinema yang menyatukan imajinasi,
                    budaya, dan suara generasi.
                </p>
            </SafeWidth>
        </div>
    );
}
