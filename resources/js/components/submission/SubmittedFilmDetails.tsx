import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    AlertCircle,
    FileText,
    Film as FilmIcon,
    Image,
    Link as LinkIcon,
    User as UserIcon,
    Video,
} from 'lucide-react';

interface SubmittedFilmDetailsProps {
    film: any;
}

export default function SubmittedFilmDetails({ film }: SubmittedFilmDetailsProps) {
    return (
        <Card className="mb-8 border border-gray-200 bg-white shadow-xl">
            <CardHeader className="flex flex-col gap-2 border-b border-gray-100 bg-white pb-4">
                <div className="flex items-center gap-3">
                    <FilmIcon className="h-7 w-7 text-gray-500" />
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-900">Film Sudah Dikirim</CardTitle>
                        <CardDescription className="font-medium text-gray-600">
                            Film Anda telah berhasil dikirim dan tidak dapat diubah lagi
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="bg-white px-4 pt-6 pb-2 sm:px-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-semibold text-gray-700">Judul Film</Label>
                            <div className="mt-1 flex items-center gap-2">
                                <Video className="h-4 w-4 text-gray-400" />
                                <span className="text-base font-medium text-gray-900">{film.title}</span>
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm font-semibold text-gray-700">Sinopsis</Label>
                            <p className="mt-1 rounded bg-gray-50 p-2 text-sm whitespace-pre-line text-gray-700">
                                {film.synopsis}
                            </p>
                        </div>
                        {film.director && (
                            <div>
                                <Label className="text-sm font-semibold text-gray-700">Sutradara</Label>
                                <div className="mt-1 flex items-center gap-2">
                                    <UserIcon className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-900">{film.director}</span>
                                </div>
                            </div>
                        )}
                        <div>
                            <Label className="text-sm font-semibold text-gray-700">Film URL</Label>
                            <a
                                href={film.film_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 flex items-center gap-2 break-all text-blue-600 hover:underline"
                            >
                                <LinkIcon className="h-4 w-4 text-gray-400" />
                                {film.film_url}
                            </a>
                        </div>

                        {film.teaser_url && (
                            <div>
                                <Label className="text-sm font-semibold text-gray-700">Teaser URL</Label>
                                <a
                                    href={film.teaser_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 flex items-center gap-2 break-all text-blue-600 hover:underline"
                                >
                                    <LinkIcon className="h-4 w-4 text-gray-400" />
                                    {film.teaser_url}
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        {film.castings && film.castings.length > 0 && (
                            <div>
                                <Label className="text-sm font-semibold text-gray-700">Pemeran (Castings)</Label>
                                <ul className="mt-2 grid gap-2">
                                    {film.castings.map((c: any, idx: number) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2 shadow-sm"
                                        >
                                            <UserIcon className="h-4 w-4 text-gray-400" />
                                            <span className="font-semibold text-gray-900">{c.real_name}</span>
                                            <span className="text-gray-500">sebagai</span>
                                            <span className="text-gray-700 italic">{c.film_name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="mt-2 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-gray-700">
                                    Surat Orisinalitas: <span className="font-semibold text-green-700">3</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-gray-700">
                                    Poster: <span className="font-semibold text-green-700">3</span>
                                </span>
                            </div>
                            {film.backdrop_file && (
                                <div className="flex items-center gap-2">
                                    <Image className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-gray-700">
                                        Backdrop: <span className="font-semibold text-green-700">3</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <Alert className="border-gray-200 bg-gray-50">
                        <AlertCircle className="h-4 w-4 text-gray-500" />
                        <AlertDescription className="text-gray-700">
                            Film telah dikirim dan tidak dapat diubah. Jika ada kesalahan, silakan hubungi panitia.
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>
    );
}
