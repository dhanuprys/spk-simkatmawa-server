import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useWindowScroll } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

const navigations = [
    {
        label: 'Beranda',
        path: '/',
    },
    {
        label: 'Jelajahi Film',
        path: '/film',
    },
    {
        label: 'Kontak',
        path: '/contact',
    },
    {
        label: 'Pendaftaran',
        path: '/join',
    },
];

interface HeaderProps {
    autoHide?: boolean;
}

export default function Header({ autoHide }: HeaderProps) {
    const [{ y: scrollY }] = useWindowScroll();
    const [isHide, setHideStatus] = useState<boolean>(false);

    useEffect(() => {
        if (!autoHide) return;
        setHideStatus(scrollY !== null && scrollY > 30);
    }, [scrollY, autoHide]);

    return (
        <header className={cn('fixed w-full backdrop-blur-lg', !isHide && 'border-b')}>
            {!isHide && <section className="font-luckiest py-6 text-center text-4xl">NITISARA</section>}
            <section className={cn('flex justify-center py-4 transition-all', isHide && 'py-6')}>
                <nav className="flex gap-x-8">
                    {navigations.map((nav) => (
                        <Link prefetch className="hover:font-semibold" href={nav.path}>
                            {nav.label}
                        </Link>
                    ))}
                </nav>
            </section>
        </header>
    );
}
