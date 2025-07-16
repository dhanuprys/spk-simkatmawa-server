import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface FilmSummaryProps {
    existingFilm: any;
    showSuccess: boolean;
    setShowSuccess: (show: boolean) => void;
}

export default function FilmSummary({ existingFilm, showSuccess, setShowSuccess }: FilmSummaryProps) {
    if (!showSuccess) return null;
    return (
        <Card className="mb-6 border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-green-900">Film Berhasil Dikirim!</h3>
                        <p className="mb-4 text-green-700">
                            Film Anda telah berhasil dikirim dan sedang dalam proses verifikasi oleh panitia.
                        </p>
                        {/* Film Summary */}
                        {existingFilm && (
                            <div className="rounded-lg bg-white/50 p-4 backdrop-blur-sm">
                                <h4 className="mb-3 font-medium text-gray-900">Ringkasan Film:</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Judul:</span>
                                        <span className="text-gray-900">{existingFilm.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Sinopsis:</span>
                                        <span className="max-w-xs truncate text-gray-900" title={existingFilm.synopsis}>
                                            {existingFilm.synopsis}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">URL Film:</span>
                                        <span className="max-w-xs truncate text-gray-900" title={existingFilm.film_url}>
                                            {existingFilm.film_url}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Dikirim pada:</span>
                                        <span className="text-gray-900">
                                            {new Date(existingFilm.created_at).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="mt-4 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setShowSuccess(false)}
                                className="rounded border border-green-200 px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                            >
                                Tutup
                            </button>
                            <a
                                href="/status"
                                className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                            >
                                Lihat Status Film
                            </a>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
