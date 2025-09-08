import { z } from 'zod';

export const registrationSchema = z.object({
    team_name: z.string().min(1, 'Nama tim wajib diisi').max(100, 'Nama tim maksimal 100 karakter'),
    city: z.string().min(1, 'Kota wajib diisi').max(100, 'Kota maksimal 100 karakter'),
    company: z
        .string()
        .min(1, 'Perusahaan/Institusi wajib diisi')
        .max(100, 'Perusahaan/Institusi maksimal 100 karakter'),
    category_id: z.string().min(1, 'Pilih kategori'),
    leader_name: z.string().min(1, 'Nama ketua tim wajib diisi').max(100, 'Nama ketua tim maksimal 100 karakter'),
    leader_email: z.string().email('Email tidak valid').max(100, 'Email maksimal 100 karakter'),
    leader_whatsapp: z.string().min(1, 'WhatsApp wajib diisi').max(20, 'WhatsApp maksimal 20 karakter'),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
