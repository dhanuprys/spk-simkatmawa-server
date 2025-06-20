import { cn } from '@/lib/utils';
import { useWindowScroll } from '@uidotdev/usehooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import SafeWidth from '../safe-width';

interface Winner {
    id: number;
    backgroundImage: string;
    videoUrl: string;
    title: string;
    team: string;
}

const winnerList: Winner[] = [
    {
        id: 1,
        backgroundImage: '/assets/images/1.avif',
        videoUrl: '',
        title: 'Winner 1',
        team: '',
    },
    {
        id: 2,
        backgroundImage: '/assets/images/2.avif',
        videoUrl: '',
        title: 'Winner 2',
        team: '',
    },
    {
        id: 3,
        backgroundImage: '/assets/images/3.avif',
        videoUrl: '',
        title: 'Winner 3',
        team: '',
    },
];

export default function Winners() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [{ y: scrollY }] = useWindowScroll();
    const winnerScrollHeight = winnerList.length * (window.innerHeight + 400);
    const heightAwareWinners = useMemo(() => {
        const output: { topKey: number; winner: Winner }[] = [];
        const fullHeight = winnerScrollHeight / winnerList.length;
        let height = 0;
        for (const winner of winnerList) {
            output.push({
                topKey: height,
                winner,
            });
            height += fullHeight - 100;
        }

        return output.reverse();
    }, []);
    const [currentActive, setCurrentActive] = useState<Winner>(winnerList[0]);
    const cleanScrollTop = useMemo(() => {
        if (!containerRef.current || !scrollY) return 0;
        const containerTop = containerRef.current.offsetTop;
        return scrollY - containerTop;
    }, [scrollY]);
    const safeShowHeight = useMemo(() => {
        if (!containerRef.current) return 0;
        return containerRef.current.scrollHeight - window.innerHeight;
    }, [containerRef.current]);

    useEffect(() => {
        for (const winner of heightAwareWinners) {
            if (cleanScrollTop >= winner.topKey) {
                setCurrentActive(winner.winner);
                break;
            }
        }
    }, [cleanScrollTop]);

    return (
        <div className="bg-slate-950 pt-20 pb-20">
            <div ref={containerRef} style={{ height: winnerScrollHeight + 'px' }}>
                <div className="font-luckiest text-center text-4xl text-white md:text-7xl">THE WINNERS</div>
                <div
                    className={cn(
                        'opacity-0 transition-all duration-100',
                        cleanScrollTop > 20 && cleanScrollTop < safeShowHeight && 'opacity-100 duration-500',
                    )}
                >
                    {winnerList.map((winner) => (
                        <div
                            key={winner.id}
                            className={cn(
                                'pointer-events-none fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center text-white opacity-0',
                                winner.id === currentActive.id && 'opacity-100',
                            )}
                        >
                            <div className="absolute top-0 left-0 z-[1] h-screen w-full bg-slate-950">
                                <img
                                    src={currentActive.backgroundImage}
                                    className={cn(
                                        'size-full scale-125 object-cover opacity-0 transition-all duration-1000 outline-none',
                                        cleanScrollTop < 20 && '!opacity-0',
                                        winner.id === currentActive.id && 'scale-100 opacity-15',
                                    )}
                                />
                            </div>
                            <SafeWidth className="relative z-[2] grid w-full grid-cols-1 px-8 md:grid-cols-2">
                                <div>
                                    <div className="aspect-video w-full rounded-2xl bg-slate-900 shadow-2xl"></div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <h3>{currentActive.title}</h3>
                                </div>
                            </SafeWidth>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
