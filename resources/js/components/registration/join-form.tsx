import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { registrationSchema, type RegistrationFormData } from '@/lib/schemas/registration';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import {
    AlertCircle,
    Building,
    Camera,
    CheckCircle,
    Clock,
    CreditCard,
    FileText,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    RefreshCw,
    Sparkles,
    Trophy,
    Upload,
    User,
    Users,
    X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import SafeWidth from '../safe-width';

interface JoinFormProps {
    eventYears: Array<{
        id: number;
        year: number;
        registration_start: string;
        registration_end: string;
    }>;
    categories: Array<{
        id: number;
        name: string;
    }>;
}

const STORAGE_KEY = 'nitisara_registration_form';

// Debounce function to limit localStorage writes
const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export default function JoinForm({ eventYears, categories }: JoinFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [studentCardFile, setStudentCardFile] = useState<File | null>(null);
    const [paymentEvidenceFile, setPaymentEvidenceFile] = useState<File | null>(null);
    const [activeStep, setActiveStep] = useState(1);
    const [dragOver, setDragOver] = useState<string | null>(null);
    const [showResetTooltip, setShowResetTooltip] = useState(false);

    // Load cached form data from localStorage - memoized to prevent unnecessary calls
    const loadCachedFormData = useCallback((): Partial<RegistrationFormData> => {
        if (typeof window === 'undefined') return {};

        try {
            const cached = localStorage.getItem(STORAGE_KEY);
            return cached ? JSON.parse(cached) : {};
        } catch (error) {
            console.warn('Failed to load cached form data:', error);
            return {};
        }
    }, []);

    // Save form data to localStorage - debounced to prevent excessive writes
    const saveFormData = useMemo(
        () =>
            debounce((data: Partial<RegistrationFormData>) => {
                if (typeof window === 'undefined') return;

                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                } catch (error) {
                    console.warn('Failed to save form data:', error);
                }
            }, 300),
        [],
    );

    // Clear cached form data
    const clearCachedFormData = useCallback(() => {
        if (typeof window === 'undefined') return;

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.warn('Failed to clear cached form data:', error);
        }
    }, []);

    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            team_name: '',
            city: '',
            company: '',
            category_id: '',
            leader_name: '',
            leader_email: '',
            leader_whatsapp: '',
            ...loadCachedFormData(),
        },
    });

    // Memoize watched values to prevent unnecessary re-renders
    const watchedValues = form.watch();
    const formDataToSave = useMemo(
        () => ({
            team_name: watchedValues.team_name,
            city: watchedValues.city,
            company: watchedValues.company,
            category_id: watchedValues.category_id,
            leader_name: watchedValues.leader_name,
            leader_email: watchedValues.leader_email,
            leader_whatsapp: watchedValues.leader_whatsapp,
        }),
        [watchedValues],
    );

    // Save form data to localStorage with debouncing
    useEffect(() => {
        saveFormData(formDataToSave);
    }, [formDataToSave, saveFormData]);

    // Handle keyboard shortcuts - memoized event handler
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Ctrl/Cmd + R to reset form
        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
            event.preventDefault();
            handleResetForm();
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Memoize reset form function
    const handleResetForm = useCallback(() => {
        form.reset({
            team_name: '',
            city: '',
            company: '',
            category_id: '',
            leader_name: '',
            leader_email: '',
            leader_whatsapp: '',
        });
        setStudentCardFile(null);
        setPaymentEvidenceFile(null);
        setActiveStep(1);
        clearCachedFormData();

        // Show tooltip feedback
        setShowResetTooltip(true);
        setTimeout(() => setShowResetTooltip(false), 2000);
    }, [form, clearCachedFormData]);

    // Memoize submit handler
    const onSubmit = useCallback(
        async (data: RegistrationFormData) => {
            if (!studentCardFile || !paymentEvidenceFile) {
                return;
            }

            // Validate all form fields before submission
            const isValid = await form.trigger();

            // Also check if files are uploaded
            if (!studentCardFile || !paymentEvidenceFile) {
                return;
            }

            if (!isValid) {
                // If validation fails, scroll to the error summary
                const errorElement = document.querySelector('[data-error-summary]');
                if (errorElement) {
                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            setIsSubmitting(true);

            const formData = new FormData();
            formData.append('team_name', data.team_name);
            formData.append('city', data.city);
            formData.append('company', data.company);
            formData.append('category_id', data.category_id);
            formData.append('leader_name', data.leader_name);
            formData.append('leader_email', data.leader_email);
            formData.append('leader_whatsapp', data.leader_whatsapp);
            formData.append('student_card_file', studentCardFile);
            formData.append('payment_evidence_file', paymentEvidenceFile);

            router.post('/registration', formData, {
                onSuccess: () => {
                    setIsSubmitting(false);
                    // Clear cached data on successful submission
                    clearCachedFormData();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            });
        },
        [studentCardFile, paymentEvidenceFile, clearCachedFormData, form],
    );

    // Memoize file change handlers
    const handleFileChange = useCallback((field: 'student_card_file' | 'payment_evidence_file', file: File | null) => {
        if (field === 'student_card_file') {
            setStudentCardFile(file);
        } else {
            setPaymentEvidenceFile(file);
        }
    }, []);

    // Memoize drag handlers
    const handleDragOver = useCallback((e: React.DragEvent, field: string) => {
        e.preventDefault();
        setDragOver(field);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragOver(null);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent, field: 'student_card_file' | 'payment_evidence_file') => {
            e.preventDefault();
            setDragOver(null);
            const file = e.dataTransfer.files[0];
            if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
                handleFileChange(field, file);
            }
        },
        [handleFileChange],
    );

    const removeFile = useCallback(
        (field: 'student_card_file' | 'payment_evidence_file') => {
            handleFileChange(field, null);
        },
        [handleFileChange],
    );

    // Memoize utility functions
    const formatFileSize = useCallback((bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }, []);

    // Memoize steps array
    const steps = useMemo(
        () => [
            { id: 1, title: 'Tim', icon: Users },
            { id: 2, title: 'Ketua Tim', icon: User },
            { id: 3, title: 'Dokumen', icon: Upload },
        ],
        [],
    );

    // Memoize step completion logic
    const isStepComplete = useCallback(
        (step: number) => {
            const values = form.getValues();
            switch (step) {
                case 1:
                    return values.team_name && values.city && values.company && values.category_id;
                case 2:
                    return values.leader_name && values.leader_email && values.leader_whatsapp;
                case 3:
                    return studentCardFile && paymentEvidenceFile;
                default:
                    return false;
            }
        },
        [form, studentCardFile, paymentEvidenceFile],
    );

    const canProceedToStep = useCallback(
        (step: number) => {
            if (step === 1) return true;

            // Check if previous step is complete and has no validation errors
            const previousStep = step - 1;
            const isPreviousStepComplete = isStepComplete(previousStep);

            // Also check for validation errors in the current form state
            const hasErrors = Object.keys(form.formState.errors).length > 0;

            return isPreviousStepComplete && !hasErrors;
        },
        [isStepComplete, form.formState.errors],
    );

    // Memoize progress calculation
    const stepProgress = useMemo(() => {
        const completedSteps = steps.filter((step) => isStepComplete(step.id)).length;
        return (completedSteps / steps.length) * 100;
    }, [steps, isStepComplete]);

    // Memoize step navigation
    const handleStepChange = useCallback(
        (step: number) => {
            if (canProceedToStep(step)) {
                setActiveStep(step);
            }
        },
        [canProceedToStep],
    );

    // Memoize step navigation buttons
    const handlePreviousStep = useCallback(() => {
        setActiveStep(Math.max(1, activeStep - 1));
    }, [activeStep]);

    const handleNextStep = useCallback(() => {
        // Validate current step before proceeding
        const currentStepErrors = form.formState.errors;
        const hasCurrentStepErrors = Object.keys(currentStepErrors).length > 0;

        if (hasCurrentStepErrors) {
            // Trigger validation for current step
            form.trigger();
            return;
        }

        setActiveStep(activeStep + 1);
    }, [activeStep, form]);

    return (
        <SafeWidth className="py-16">
            <div className="mx-auto max-w-4xl">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="mb-4 flex items-center justify-center gap-2">
                        <div className="relative">
                            <Trophy className="text-primary h-8 w-8 animate-pulse" />
                            <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-green-500" />
                        </div>
                        <h1 className="font-luckiest from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl text-transparent">
                            Pendaftaran
                        </h1>
                    </div>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Bergabunglah dengan festival film terbesar! Daftarkan tim Anda sekarang dan tunjukkan
                        kreativitas film Anda.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <div className="text-muted-foreground mb-2 flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{Math.round(stepProgress)}%</span>
                            </div>
                            <div className="bg-muted h-2 w-full rounded-full">
                                <div
                                    className="from-primary to-primary/70 h-full rounded-full bg-gradient-to-r transition-all duration-500"
                                    style={{ width: `${stepProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isComplete = isStepComplete(step.id);
                            const isActive = activeStep === step.id;
                            const canAccess = canProceedToStep(step.id);
                            const hasErrors = Object.keys(form.formState.errors).length > 0;

                            return (
                                <div key={step.id} className="flex items-center">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={() => handleStepChange(step.id)}
                                                    disabled={!canAccess}
                                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 hover:scale-105 ${
                                                        isActive
                                                            ? 'bg-primary text-primary-foreground shadow-lg'
                                                            : isComplete
                                                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                              : canAccess
                                                                ? 'bg-muted hover:bg-muted/80'
                                                                : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                                                    } ${hasErrors && !isActive ? 'ring-2 ring-red-500' : ''}`}
                                                >
                                                    {isComplete ? (
                                                        <CheckCircle className="h-4 w-4 animate-bounce" />
                                                    ) : (
                                                        <Icon className="h-4 w-4" />
                                                    )}
                                                    <span className="hidden sm:inline">{step.title}</span>
                                                    {hasErrors && !isActive && (
                                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                                    )}
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{step.title}</p>
                                                {hasErrors && !isActive && (
                                                    <p className="text-xs text-red-500">
                                                        Ada kesalahan yang perlu diperbaiki
                                                    </p>
                                                )}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`mx-2 h-0.5 w-8 transition-all duration-300 ${
                                                isStepComplete(step.id) ? 'bg-green-300' : 'bg-muted'
                                            }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-xl dark:from-gray-900 dark:to-gray-800/50">
                    <CardHeader className="from-primary/5 to-secondary/5 border-b bg-gradient-to-r px-8 py-8 text-center">
                        <div className="flex items-center justify-between">
                            <div className="flex-1" />
                            <div className="flex-1">
                                <CardTitle className="mb-2 text-xl">
                                    {activeStep === 1 && 'Informasi Tim'}
                                    {activeStep === 2 && 'Informasi Ketua Tim'}
                                    {activeStep === 3 && 'Upload Dokumen'}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {activeStep === 1 && 'Isi informasi tim Anda'}
                                    {activeStep === 2 && 'Isi data ketua tim untuk komunikasi'}
                                    {activeStep === 3 && 'Upload dokumen yang diperlukan'}
                                </CardDescription>
                            </div>
                            <div className="flex flex-1 justify-end">
                                <TooltipProvider>
                                    <Tooltip open={showResetTooltip}>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={handleResetForm}
                                                className="h-8 w-8"
                                            >
                                                <RefreshCw className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Reset form (Ctrl+R)</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Error Summary */}
                                {Object.keys(form.formState.errors).length > 0 && (
                                    <Alert variant="destructive" data-error-summary>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            <div className="space-y-1">
                                                <p className="font-semibold">Mohon perbaiki kesalahan berikut:</p>
                                                <ul className="list-disc space-y-1 pl-4">
                                                    {Object.entries(form.formState.errors).map(([field, error]) => (
                                                        <li key={field} className="text-sm">
                                                            {error?.message as string}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {/* Step 1: Event & Team Information */}
                                {activeStep === 1 && (
                                    <div className="animate-in slide-in-from-left-2 space-y-6 duration-300">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="category_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                                            <Camera className="text-primary h-5 w-5" />
                                                            Kategori Film
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="h-12">
                                                                    <SelectValue placeholder="Pilih kategori film" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {categories.map((category) => (
                                                                    <SelectItem
                                                                        key={category.id}
                                                                        value={category.id.toString()}
                                                                    >
                                                                        {category.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Users className="text-primary h-5 w-5" />
                                                <h3 className="text-lg font-semibold">Informasi Tim</h3>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="team_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-base">Nama Tim</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Masukkan nama tim yang kreatif"
                                                                className="h-12 text-base"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <FormField
                                                    control={form.control}
                                                    name="city"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4" />
                                                                Kota
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Kota asal tim"
                                                                    className="h-12"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="company"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <Building className="h-4 w-4" />
                                                                Perusahaan/Institusi
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Nama perusahaan/institusi"
                                                                    className="h-12"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Team Leader Information */}
                                {activeStep === 2 && (
                                    <div className="animate-in slide-in-from-left-2 space-y-6 duration-300">
                                        <div className="mb-4 flex items-center gap-2">
                                            <User className="text-primary h-5 w-5" />
                                            <h3 className="text-lg font-semibold">Informasi Ketua Tim</h3>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="leader_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">Nama Ketua Tim</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nama lengkap ketua tim"
                                                            className="h-12 text-base"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="leader_email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2">
                                                            <Mail className="h-4 w-4" />
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="email"
                                                                placeholder="email@example.com"
                                                                className="h-12"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="leader_whatsapp"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2">
                                                            <Phone className="h-4 w-4" />
                                                            WhatsApp
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="08123456789"
                                                                className="h-12"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <Alert>
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                Informasi ini akan digunakan untuk komunikasi resmi terkait festival
                                                film.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                )}

                                {/* Step 3: File Uploads */}
                                {activeStep === 3 && (
                                    <div className="animate-in slide-in-from-left-2 space-y-6 duration-300">
                                        <div className="mb-4 flex items-center gap-2">
                                            <Upload className="text-primary h-5 w-5" />
                                            <h3 className="text-lg font-semibold">Upload Dokumen</h3>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="space-y-4">
                                                <div
                                                    className={`rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
                                                        dragOver === 'student_card_file'
                                                            ? 'border-primary bg-primary/5 scale-105'
                                                            : studentCardFile
                                                              ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                                                              : 'border-primary/30 hover:border-primary/50'
                                                    }`}
                                                    onDragOver={(e) => handleDragOver(e, 'student_card_file')}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={(e) => handleDrop(e, 'student_card_file')}
                                                >
                                                    <div className="text-center">
                                                        <GraduationCap className="text-primary mx-auto mb-4 h-12 w-12" />
                                                        <h4 className="mb-2 font-semibold">Kartu Mahasiswa</h4>
                                                        <p className="text-muted-foreground mb-4 text-sm">
                                                            Upload kartu mahasiswa ketua tim
                                                        </p>
                                                        {studentCardFile ? (
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between rounded-lg bg-white p-3 dark:bg-gray-800">
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText className="text-primary h-4 w-4" />
                                                                        <div className="text-left">
                                                                            <p className="truncate text-sm font-medium">
                                                                                {studentCardFile.name}
                                                                            </p>
                                                                            <p className="text-muted-foreground text-xs">
                                                                                {formatFileSize(studentCardFile.size)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => removeFile('student_card_file')}
                                                                        className="h-6 w-6"
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm text-green-600">
                                                                    <CheckCircle className="h-4 w-4" />
                                                                    File terupload
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Input
                                                                type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                onChange={(e) =>
                                                                    handleFileChange(
                                                                        'student_card_file',
                                                                        e.target.files?.[0] || null,
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div
                                                    className={`rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
                                                        dragOver === 'payment_evidence_file'
                                                            ? 'border-primary bg-primary/5 scale-105'
                                                            : paymentEvidenceFile
                                                              ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                                                              : 'border-primary/30 hover:border-primary/50'
                                                    }`}
                                                    onDragOver={(e) => handleDragOver(e, 'payment_evidence_file')}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={(e) => handleDrop(e, 'payment_evidence_file')}
                                                >
                                                    <div className="text-center">
                                                        <CreditCard className="text-primary mx-auto mb-4 h-12 w-12" />
                                                        <h4 className="mb-2 font-semibold">Bukti Pembayaran</h4>
                                                        <p className="text-muted-foreground mb-4 text-sm">
                                                            Upload bukti pembayaran biaya pendaftaran
                                                        </p>
                                                        {paymentEvidenceFile ? (
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between rounded-lg bg-white p-3 dark:bg-gray-800">
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText className="text-primary h-4 w-4" />
                                                                        <div className="text-left">
                                                                            <p className="truncate text-sm font-medium">
                                                                                {paymentEvidenceFile.name}
                                                                            </p>
                                                                            <p className="text-muted-foreground text-xs">
                                                                                {formatFileSize(
                                                                                    paymentEvidenceFile.size,
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() =>
                                                                            removeFile('payment_evidence_file')
                                                                        }
                                                                        className="h-6 w-6"
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm text-green-600">
                                                                    <CheckCircle className="h-4 w-4" />
                                                                    File terupload
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Input
                                                                type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                onChange={(e) =>
                                                                    handleFileChange(
                                                                        'payment_evidence_file',
                                                                        e.target.files?.[0] || null,
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Alert>
                                            <FileText className="h-4 w-4" />
                                            <AlertDescription>
                                                <strong>Format yang diterima:</strong> PDF, JPG, JPEG, PNG (maksimal 2MB
                                                per file)
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between border-t pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePreviousStep}
                                        disabled={activeStep === 1}
                                        className="flex items-center gap-2"
                                    >
                                        Sebelumnya
                                    </Button>

                                    <div className="flex items-center gap-3">
                                        {activeStep < 3 && (
                                            <Button
                                                type="button"
                                                onClick={handleNextStep}
                                                disabled={!isStepComplete(activeStep)}
                                                className="flex items-center gap-2"
                                            >
                                                Selanjutnya
                                                <Sparkles className="h-4 w-4" />
                                            </Button>
                                        )}

                                        {activeStep === 3 && (
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting || !studentCardFile || !paymentEvidenceFile}
                                                className="flex items-center gap-2 px-8"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Clock className="h-4 w-4 animate-spin" />
                                                        Mendaftarkan...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trophy className="h-4 w-4" />
                                                        Daftar Sekarang
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </SafeWidth>
    );
}
