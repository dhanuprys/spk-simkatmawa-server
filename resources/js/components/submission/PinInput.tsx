import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import React from 'react';

interface PinInputProps {
    pinDigits: string[];
    currentDigit: number;
    pinForm: any;
    handlePinDigitChange: (index: number, value: string) => void;
    handlePinKeyDown: (index: number, e: React.KeyboardEvent) => void;
    handlePinSubmit: (e: React.FormEvent) => void;
}

export default function PinInput({
    pinDigits,
    currentDigit,
    pinForm,
    handlePinDigitChange,
    handlePinKeyDown,
    handlePinSubmit,
}: PinInputProps) {
    return (
        <form onSubmit={handlePinSubmit} className="space-y-6">
            {/* PIN Input Fields */}
            <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Masukkan PIN Anda</Label>
                <div className="flex justify-center gap-3">
                    {pinDigits.map((digit, index) => (
                        <div key={index} className="relative">
                            <Input
                                id={`pin-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handlePinDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handlePinKeyDown(index, e)}
                                className={`h-12 w-12 border-2 text-center text-lg font-semibold transition-all duration-200 ${
                                    currentDigit === index
                                        ? 'border-primary ring-primary/20 ring-2'
                                        : digit
                                          ? 'border-green-500 bg-green-50'
                                          : 'border-gray-300 hover:border-gray-400'
                                } ${pinForm.errors.pin ? 'border-red-500' : ''}`}
                                placeholder="•"
                            />
                            {digit && (
                                <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-green-500" />
                            )}
                        </div>
                    ))}
                </div>
                {pinForm.errors.pin && (
                    <div className="text-center">
                        <p className="rounded-md bg-red-50 p-2 text-sm text-red-600">{pinForm.errors.pin}</p>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 w-full transform bg-gradient-to-r text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                disabled={pinForm.processing || pinDigits.join('').length !== 6}
            >
                {pinForm.processing ? (
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Memverifikasi...
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Verifikasi PIN
                    </div>
                )}
            </Button>
        </form>
    );
}
