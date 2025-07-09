import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useWindowScroll } from '@uidotdev/usehooks';
import { ListIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import SafeWidth from '../safe-width';

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
        label: 'Cek Status',
        path: '/status',
    },
    {
        label: 'Kontak',
        path: '/contact',
    },
    {
        label: 'Pendaftaran',
        path: '/registration',
    },
];

interface HeaderProps {
    autoHide?: boolean;
    alwaysSeamless?: boolean;
    className?: string;
}

export default function Header({ autoHide, alwaysSeamless, className }: HeaderProps) {
    const isMobile = useIsMobile();
    const [{ y: scrollY }] = useWindowScroll();
    const [isHide, setHideStatus] = useState<boolean>(alwaysSeamless !== undefined ? alwaysSeamless : false);
    const [isNavHide, setNavHide] = useState<boolean>(true);

    useEffect(() => {
        if (!autoHide) return;
        !alwaysSeamless && setHideStatus(scrollY !== null && scrollY > 30);
    }, [scrollY, autoHide, alwaysSeamless]);

    if (isMobile) {
        return (
            <header className={cn('fixed z-10 w-full backdrop-blur-lg', className)}>
                <section>
                    <SafeWidth className={cn('flex items-center justify-between py-4')}>
                        <h1 className={cn('font-luckiest text-2xl')}>NITISARA</h1>
                        {isNavHide ? (
                            <ListIcon onClick={() => setNavHide(false)} />
                        ) : (
                            <XIcon onClick={() => setNavHide(true)} />
                        )}
                    </SafeWidth>
                    <nav className={cn('flex flex-col bg-white shadow-2xl', isNavHide && 'hidden')}>
                        {navigations.map((nav) => (
                            <Link prefetch className="px-4 py-2 text-black hover:font-semibold" href={nav.path}>
                                {nav.label}
                            </Link>
                        ))}
                    </nav>
                </section>
            </header>
        );
    }

    return (
        <header className={cn('fixed z-10 w-full backdrop-blur-lg', className)}>
            {!isHide && <section className="font-luckiest py-6 text-center text-4xl">NITISARA</section>}
            <section className={cn('py-4 transition-all', isHide && 'py-6')}>
                <SafeWidth className={cn('flex justify-between', !isHide && '!justify-center')}>
                    <h1 className={cn('font-luckiest text-2xl', !isHide && '!hidden')}>NITISARA</h1>
                    <nav className="flex gap-x-8">
                        {navigations.map((nav) => (
                            <Link prefetch className="hover:font-semibold" href={nav.path}>
                                {nav.label}
                            </Link>
                        ))}
                    </nav>
                </SafeWidth>
            </section>
        </header>
    );
}
