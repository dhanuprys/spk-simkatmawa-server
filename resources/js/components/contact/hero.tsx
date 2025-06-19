import SafeWidth from '../safe-width';

export default function Hero() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <SafeWidth className="space-y-4">
                <h1 className="font-luckiest text-center text-7xl md:text-8xl">Hubungi Kami</h1>
                <p className="text-center">
                    Selamat datang di Film Festival Nitisara — sebuah selebrasi sinema yang menyatukan imajinasi,
                    budaya, dan suara generasi.
                </p>
            </SafeWidth>
        </div>
    );
}
