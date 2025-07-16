import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, FileVideo, Upload } from 'lucide-react';
import React from 'react';

interface SubmissionFormProps {
    filmForm: any;
    castings: Array<{ real_name: string; film_name: string }>;
    dragOver: string | null;
    isConfirmed: boolean;
    setIsConfirmed: (v: boolean) => void;
    handleFilmSubmit: (e: React.FormEvent) => void;
    handleAddCasting: () => void;
    handleRemoveCasting: (idx: number) => void;
    handleCastingChange: (idx: number, field: 'real_name' | 'film_name', value: string) => void;
    handleDragOver: (e: React.DragEvent, field: string) => void;
    handleDragLeave: () => void;
    handleDrop: (
        e: React.DragEvent,
        field: 'originality_file' | 'poster_landscape_file' | 'poster_portrait_file' | 'backdrop_file',
    ) => void;
}

export default function SubmissionForm({
    filmForm,
    castings,
    dragOver,
    isConfirmed,
    setIsConfirmed,
    handleFilmSubmit,
    handleAddCasting,
    handleRemoveCasting,
    handleCastingChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
}: SubmissionFormProps) {
    return (
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileVideo className="h-5 w-5" />
                    Submit Film
                </CardTitle>
                <CardDescription>Kirim film Anda untuk festival NITISARA</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleFilmSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Film *</Label>
                        <Input
                            id="title"
                            type="text"
                            value={filmForm.data.title}
                            onChange={(e) => filmForm.setData('title', e.target.value)}
                            placeholder="Masukkan judul film Anda"
                            className={filmForm.errors.title ? 'border-red-500' : ''}
                        />
                        {filmForm.errors.title && <p className="text-sm text-red-600">{filmForm.errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="synopsis">Sinopsis Film *</Label>
                        <Textarea
                            id="synopsis"
                            value={filmForm.data.synopsis}
                            onChange={(e) => filmForm.setData('synopsis', e.target.value)}
                            placeholder="Masukkan sinopsis singkat tentang film Anda"
                            rows={4}
                            className={filmForm.errors.synopsis ? 'border-red-500' : ''}
                        />
                        {filmForm.errors.synopsis && <p className="text-sm text-red-600">{filmForm.errors.synopsis}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="film_url">Film URL *</Label>
                        <Input
                            id="film_url"
                            type="url"
                            value={filmForm.data.film_url}
                            onChange={(e) => filmForm.setData('film_url', e.target.value)}
                            placeholder="https://example.com/film.mp4"
                            className={filmForm.errors.film_url ? 'border-red-500' : ''}
                        />
                        {filmForm.errors.film_url && <p className="text-sm text-red-600">{filmForm.errors.film_url}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="teaser_url">Teaser URL *</Label>
                        <Input
                            id="teaser_url"
                            type="url"
                            value={filmForm.data.teaser_url}
                            onChange={(e) => filmForm.setData('teaser_url', e.target.value)}
                            placeholder="https://youtube.com/teaser"
                            className={filmForm.errors.teaser_url ? 'border-red-500' : ''}
                        />
                        {filmForm.errors.teaser_url && (
                            <p className="text-sm text-red-600">{filmForm.errors.teaser_url}</p>
                        )}
                    </div>

                    <Separator />

                    {/* Originality File - Full Width */}
                    <div className="space-y-2">
                        <Label>Surat Pernyataan Orisinalitas *</Label>
                        <div
                            className={`rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
                                dragOver === 'originality_file'
                                    ? 'border-primary bg-primary/5 scale-105'
                                    : filmForm.data.originality_file
                                      ? 'border-green-300 bg-green-50'
                                      : 'border-primary/30 hover:border-primary/50'
                            }`}
                            onDragOver={(e) => handleDragOver(e, 'originality_file')}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'originality_file')}
                        >
                            <div className="text-center">
                                <Upload className="text-primary mx-auto mb-4 h-8 w-8" />
                                <p className="text-sm font-medium">Upload File</p>
                                <p className="text-muted-foreground text-xs">PDF, JPG, PNG (max 4MB)</p>
                                <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => filmForm.setData('originality_file', e.target.files?.[0] || null)}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        {filmForm.errors.originality_file && (
                            <p className="text-sm text-red-600">{filmForm.errors.originality_file}</p>
                        )}
                    </div>

                    {/* Poster and Backdrop Files - Half Width Each */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Poster Landscape File */}
                        <div className="space-y-2">
                            <Label>Poster Landscape (16:9) *</Label>
                            <div
                                className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                    dragOver === 'poster_landscape_file'
                                        ? 'border-primary bg-primary/5 scale-105'
                                        : filmForm.data.poster_landscape_file
                                          ? 'border-green-300 bg-green-50'
                                          : 'border-primary/30 hover:border-primary/50'
                                }`}
                                onDragOver={(e) => handleDragOver(e, 'poster_landscape_file')}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, 'poster_landscape_file')}
                            >
                                <div className="text-center">
                                    <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                    <p className="text-sm font-medium">Upload Poster Landscape</p>
                                    <p className="text-muted-foreground text-xs">JPG, PNG (max 3MB) • Rasio 16:9</p>
                                    <Input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) =>
                                            filmForm.setData('poster_landscape_file', e.target.files?.[0] || null)
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                {/* Image Preview */}
                                {filmForm.data.poster_landscape_file && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-xs font-medium text-gray-700">Preview:</p>
                                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={URL.createObjectURL(filmForm.data.poster_landscape_file)}
                                                alt="Poster landscape preview"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {filmForm.errors.poster_landscape_file && (
                                <p className="text-sm text-red-600">{filmForm.errors.poster_landscape_file}</p>
                            )}
                        </div>
                        {/* Poster Portrait File */}
                        <div className="space-y-2">
                            <Label>Poster Portrait (2:3) *</Label>
                            <div
                                className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                    dragOver === 'poster_portrait_file'
                                        ? 'border-primary bg-primary/5 scale-105'
                                        : filmForm.data.poster_portrait_file
                                          ? 'border-green-300 bg-green-50'
                                          : 'border-primary/30 hover:border-primary/50'
                                }`}
                                onDragOver={(e) => handleDragOver(e, 'poster_portrait_file')}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, 'poster_portrait_file')}
                            >
                                <div className="text-center">
                                    <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                    <p className="text-sm font-medium">Upload Poster Portrait</p>
                                    <p className="text-muted-foreground text-xs">JPG, PNG (max 3MB) • Rasio 2:3</p>
                                    <Input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) =>
                                            filmForm.setData('poster_portrait_file', e.target.files?.[0] || null)
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                {/* Image Preview */}
                                {filmForm.data.poster_portrait_file && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-xs font-medium text-gray-700">Preview:</p>
                                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={URL.createObjectURL(filmForm.data.poster_portrait_file)}
                                                alt="Poster portrait preview"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {filmForm.errors.poster_portrait_file && (
                                <p className="text-sm text-red-600">{filmForm.errors.poster_portrait_file}</p>
                            )}
                        </div>
                        {/* Backdrop File (unchanged) */}
                        <div className="space-y-2">
                            <Label>Backdrop Film (Opsional)</Label>
                            <div
                                className={`rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
                                    dragOver === 'backdrop_file'
                                        ? 'border-primary bg-primary/5 scale-105'
                                        : filmForm.data.backdrop_file
                                          ? 'border-green-300 bg-green-50'
                                          : 'border-primary/30 hover:border-primary/50'
                                }`}
                                onDragOver={(e) => handleDragOver(e, 'backdrop_file')}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, 'backdrop_file')}
                            >
                                <div className="text-center">
                                    <Upload className="text-primary mx-auto mb-3 h-6 w-6" />
                                    <p className="text-sm font-medium">Upload Backdrop</p>
                                    <p className="text-muted-foreground text-xs">JPG, PNG (max 4MB)</p>
                                    <Input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) => filmForm.setData('backdrop_file', e.target.files?.[0] || null)}
                                        className="mt-2"
                                    />
                                </div>
                                {/* Image Preview */}
                                {filmForm.data.backdrop_file && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-xs font-medium text-gray-700">Preview:</p>
                                        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={URL.createObjectURL(filmForm.data.backdrop_file)}
                                                alt="Backdrop preview"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {filmForm.errors.backdrop_file && (
                                <p className="text-sm text-red-600">{filmForm.errors.backdrop_file}</p>
                            )}
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label htmlFor="director">Sutradara (Opsional)</Label>
                        <Input
                            id="director"
                            type="text"
                            value={filmForm.data.director}
                            onChange={(e) => filmForm.setData('director', e.target.value)}
                            placeholder="Nama sutradara"
                            className={filmForm.errors.director ? 'border-red-500' : ''}
                        />
                        {filmForm.errors.director && <p className="text-sm text-red-600">{filmForm.errors.director}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Pemeran (Castings) <span className="text-xs text-gray-400">(Opsional)</span>
                        </Label>
                        <div className="space-y-2">
                            {castings.length === 0 && <div className="text-gray-500">Belum ada data pemeran</div>}
                            {castings.map((c, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col gap-2 rounded border bg-gray-50 p-2 md:flex-row md:items-center"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Nama asli"
                                        value={c.real_name}
                                        onChange={(e) => handleCastingChange(idx, 'real_name', e.target.value)}
                                        className="md:w-1/3"
                                    />
                                    <span className="text-gray-500">sebagai</span>
                                    <Input
                                        type="text"
                                        placeholder="Nama di film"
                                        value={c.film_name}
                                        onChange={(e) => handleCastingChange(idx, 'film_name', e.target.value)}
                                        className="md:w-1/3"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleRemoveCasting(idx)}
                                    >
                                        &times;
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={handleAddCasting}>
                                Tambah Pemeran
                            </Button>
                        </div>
                        {filmForm.errors.castings && <p className="text-sm text-red-600">{filmForm.errors.castings}</p>}
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="space-y-4 pt-4">
                        {/* Warning Alert */}
                        <Alert className="border-amber-200 bg-amber-50">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800">
                                <strong>Peringatan Penting:</strong> Setelah film berhasil dikirim, data tidak dapat
                                diubah lagi. Pastikan semua informasi dan file yang diupload sudah benar sebelum
                                melakukan submit.
                            </AlertDescription>
                        </Alert>

                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="confirm-submission"
                                checked={isConfirmed}
                                onChange={(e) => setIsConfirmed(e.target.checked)}
                                className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300"
                            />
                            <div className="text-sm">
                                <label htmlFor="confirm-submission" className="font-medium text-gray-700">
                                    Saya mengkonfirmasi bahwa film yang saya kirim adalah karya orisinal
                                </label>
                                <p className="mt-1 text-gray-500">
                                    Dengan mencentang kotak ini, saya menyatakan bahwa film yang akan dikirim adalah
                                    karya orisinal tim saya dan tidak melanggar hak cipta pihak lain.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={filmForm.processing || !isConfirmed}
                            className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r"
                        >
                            {filmForm.processing ? 'Menyimpan...' : 'Submit Film (Tidak Dapat Diubah)'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
