import { ArrowDownIcon } from 'lucide-react';
import SafeWidth from '../safe-width';

export default function Hero() {
    return (
        <div className="relative flex h-screen flex-col items-center justify-center">
            <div className="absolute top-[10%] left-0 hidden h-[40%] w-[300px] rounded-r-2xl bg-slate-950 md:block"></div>
            <div className="absolute right-0 bottom-[10%] hidden h-[30%] w-[200px] rounded-l-2xl bg-slate-950 md:block"></div>
            <SafeWidth className="relative z-[1] space-y-4">
                <h1 className="font-luckiest text-center text-7xl drop-shadow-[0_0_10px_#ffffff] md:text-9xl">
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
                <div className="mt-8 flex flex-col items-center gap-y-4">
                    <p className="text-center text-sm italic md:text-base">*Scroll ke bawah untuk mengisi formulir</p>
                    <div className="flex size-10 animate-bounce items-center justify-center rounded-full bg-white shadow md:size-12">
                        <ArrowDownIcon />
                    </div>
                </div>
            </SafeWidth>
        </div>
    );
}
