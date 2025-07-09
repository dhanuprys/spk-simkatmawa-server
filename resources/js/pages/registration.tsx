import Hero from '@/components/registration/hero';
import JoinForm from '@/components/registration/join-form';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function Registration() {
    const { auth, eventYears, categories } = usePage<SharedData>().props;
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Head title="Pendaftaran - NITISARA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div ref={containerRef}>
                <Header autoHide alwaysSeamless />
                <Hero />
                <JoinForm eventYears={eventYears} categories={categories} />
                <Footer />
            </div>
        </>
    );
}
