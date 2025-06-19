import SafeWidth from '../safe-width';

export default function Partnership() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <SafeWidth className="max-w-[65rem] space-y-4">
                <h2 className="font-luckiest text-center text-6xl md:text-8xl">
                    Partner with Purpose — Connect Through Cinema
                </h2>
                <p className="text-center">
                    Kami berterima kasih kepada seluruh mitra yang telah mendukung perjalanan Film Festival Nitisara.
                    Bersama Anda, cerita ini bisa terus dinyalakan.
                </p>
            </SafeWidth>
        </div>
    );
}
