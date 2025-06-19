import SafeWidth from '../safe-width';

export default function Footer() {
    return (
        <footer className="bg-slate-950">
            <SafeWidth className="py-10 text-white">
                <h3 className="font-luckiest text-5xl text-white md:text-5xl">NITISARA</h3>
                <p className="text-lg">A product of Pendidikan Teknik Informatik Undiksha.</p>
                <p>
                    Digital experience by <strong>Dedan Labs</strong>.
                </p>
            </SafeWidth>
        </footer>
    );
}
