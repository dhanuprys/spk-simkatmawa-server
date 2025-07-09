import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail, Shield, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Masuk" description="Masukkan kredensial Anda untuk mengakses akun" hideDefaultHeader={true}>
            <Head title="Admin Login - NITISARA" />

            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <div className="mb-4 flex items-center justify-center gap-2">
                        <div className="relative">
                            <Shield className="text-primary h-8 w-8" />
                            <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-green-500" />
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <Shield className="mr-1 h-3 w-3" />
                        Panel Admin
                    </Badge>
                </div>

                <form className="flex flex-col gap-6" onSubmit={submit}>
                    {status && (
                        <Alert>
                            <Shield className="h-4 w-4" />
                            <AlertDescription>{status}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2 text-base font-medium">
                                <Mail className="text-primary h-4 w-4" />
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="admin@nitisara.com"
                                className="h-12 text-base"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="flex items-center gap-2 text-base font-medium">
                                    <Lock className="text-primary h-4 w-4" />
                                    Kata Sandi
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="text-primary hover:text-primary/80 text-sm"
                                        tabIndex={5}
                                    >
                                        Lupa kata sandi?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Masukkan kata sandi Anda"
                                    className="h-12 pr-12 text-base"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-muted-foreground h-4 w-4" />
                                    ) : (
                                        <Eye className="text-muted-foreground h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3 pt-2">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                            />
                            <Label htmlFor="remember" className="text-sm">
                                Ingat saya selama 30 hari
                            </Label>
                        </div>
                    </div>

                    <Separator />

                    <Button
                        type="submit"
                        className="h-12 w-full text-base font-medium"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Sedang masuk...
                            </>
                        ) : (
                            <>
                                <User className="mr-2 h-4 w-4" />
                                Masuk ke Panel Admin
                            </>
                        )}
                    </Button>

                    <div className="text-center">
                        <p className="text-muted-foreground text-sm">
                            Butuh bantuan? Hubungi{' '}
                            <TextLink href="mailto:support@nitisara.com" className="text-primary">
                                support@nitisara.com
                            </TextLink>
                        </p>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
