import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download, FileText } from 'lucide-react';

interface GuidebookSectionProps {
    eventYear?: any;
    className?: string;
}

/**
 * A dedicated section for downloading the event guidebook with an improved, centered, light-themed UI.
 */
export default function GuidebookSection({ eventYear, className }: GuidebookSectionProps) {
    if (!eventYear?.event_guide_document) {
        return null;
    }

    return (
        <section
            className={cn(
                'overflow-hidden bg-slate-50 py-20 sm:py-24',
                // Subtle gradient for a touch of color on a light background
                'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/20 to-slate-50',
                className,
            )}
        >
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-8 px-4 text-center sm:px-6 lg:px-8">
                {/* Visual Element */}
                <div className="relative rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5">
                    <FileText className="h-16 w-16 text-blue-600" strokeWidth={1.5} />
                </div>

                {/* Text & CTA */}
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Buku Panduan Pendaftaran
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                    Semua syarat, ketentuan, dan detail teknis kompetisi dapat ditemukan di dalam buku panduan. Pastikan
                    Anda membacanya dengan saksama sebelum mendaftar.
                </p>
                <div className="mt-6">
                    <Button
                        asChild
                        size="lg"
                        className="gap-2.5 px-8 py-6 text-base font-bold shadow-lg shadow-blue-500/20"
                    >
                        <a
                            href={route('registration.guidebook')}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Unduh buku panduan dalam format PDF"
                        >
                            <Download className="h-5 w-5" />
                            <span>Unduh Sekarang (PDF)</span>
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
