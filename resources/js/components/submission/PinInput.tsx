import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';
import React from 'react';

interface PinInputProps {
    pinDigits: string[];
    currentDigit: number;
    pinForm: any;
    handlePinDigitChange: (index: number, value: string) => void;
    handlePinKeyDown: (index: number, e: React.KeyboardEvent) => void;
    handlePinSubmit: (e: React.FormEvent) => void;
    setPinDigits?: (digits: string[]) => void; // Optional, for paste support
}

export default function PinInput({
    pinDigits,
    currentDigit,
    pinForm,
    handlePinDigitChange,
    handlePinKeyDown,
    handlePinSubmit,
    setPinDigits,
}: PinInputProps) {
    // Paste handler: if user pastes 6 digits, fill all fields
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('Text').replace(/\D/g, '');
        if (pasted.length === 6 && setPinDigits) {
            e.preventDefault();
            setPinDigits(pasted.split(''));
        }
    };

    return (
        <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="space-y-3">
                <div className="flex justify-center gap-2">
                    {pinDigits.map((digit, index) => (
                        <Input
                            key={index}
                            id={`pin-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handlePinDigitChange(index, e.target.value.replace(/\D/g, ''))}
                            onKeyDown={(e) => handlePinKeyDown(index, e)}
                            onPaste={handlePaste}
                            className={`focus:border-primary focus:ring-primary/20 h-12 w-12 rounded-md border bg-white text-center text-lg font-semibold transition-all duration-200 focus:ring-2 ${
                                pinForm.errors.pin ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder=""
                            autoComplete="one-time-code"
                        />
                    ))}
                </div>
                {pinForm.errors.pin && (
                    <div className="text-center">
                        <p className="rounded-md bg-red-50 p-2 text-sm text-red-600">{pinForm.errors.pin}</p>
                    </div>
                )}
            </div>
            <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 h-12 w-full text-base font-semibold shadow-sm transition"
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
