import { ContactIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
import { ReactNode } from 'react';
import SafeWidth from '../safe-width';

interface Social {
    icon: ReactNode;
    label: string;
    url: string;
}

const socials: Social[] = [
    {
        icon: <ContactIcon className="size-8 md:size-10" />,
        label: '@dhanuprys',
        url: 'https://instagram.com/dhanuprys',
    },
    {
        icon: <InstagramIcon className="size-8 md:size-10" />,
        label: '@dhanuprys',
        url: 'https://instagram.com/dhanuprys',
    },
    {
        icon: <YoutubeIcon className="size-8 md:size-10" />,
        label: '@dhanuprys',
        url: 'https://instagram.com/dhanuprys',
    },
];

export default function Hero() {
    return (
        <div className="relative flex h-screen flex-col items-center justify-center">
            <div className="absolute top-0 left-0 size-full bg-black">hello</div>
            <SafeWidth className="relative z-[1] space-y-4 text-white">
                <h1 className="font-luckiest text-center text-6xl md:text-8xl">Terhubung Bersama Komunitas Sinema.</h1>
                <p className="text-center">
                    Film Festival Nitisara membuka ruang dialog bagi sineas, penonton, partner, dan komunitas. Punya
                    ide, pertanyaan, atau ingin berkolaborasi? Tim kami siap mendengar.
                </p>
                <div className="flex justify-center gap-x-2">
                    {socials.map(({ icon: SocialIcon, label, url }) => (
                        <div className="rounded-2xl p-4 hover:bg-slate-100">{SocialIcon}</div>
                    ))}
                </div>
            </SafeWidth>
        </div>
    );
}
