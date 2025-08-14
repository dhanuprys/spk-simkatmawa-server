import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface EventYear {
    id: number;
    year: number;
    title: string;
    description: string | null;
    registration_start: string;
    registration_end: string;
    submission_start_date: string;
    submission_end_date: string;
    show_start: string | null;
    show_end: string | null;
    event_guide_document: string | null;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    eventYears?: EventYear[];
    categories?: Category[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type CriteriaTemplateForm = {
    name: string;
    description: string;

    // L3 Criteria Values
    l3_cg1_a_value: string;
    l3_cg1_b_value: string;
    l3_cg1_c_value: string;
    l3_cg2_a_value: string;
    l3_cg2_b_value: string;

    // L3 Criteria Max Flags
    l3_cg1_a_max: boolean;
    l3_cg1_b_max: boolean;
    l3_cg1_c_max: boolean;
    l3_cg2_a_max: boolean;
    l3_cg2_b_max: boolean;

    // L2 Criteria Values
    l2_cg1_a_value: string;
    l2_cg1_b_value: string;
    l2_cg1_c_value: string;
    l2_cg1_d_value: string;
    l2_cg1_e_value: string;
    l2_cg1_f_value: string;
    l2_cg1_g_value: string;
    l2_cg2_a_value: string;
    l2_cg2_b_value: string;
    l2_cg3_a_value: string;
    l2_cg3_b_value: string;
    l2_cg3_c_value: string;
    l2_cg3_d_value: string;
    l2_cg3_e_value: string;

    // L2 Criteria Max Flags
    l2_cg1_a_max: boolean;
    l2_cg1_b_max: boolean;
    l2_cg1_c_max: boolean;
    l2_cg1_d_max: boolean;
    l2_cg1_e_max: boolean;
    l2_cg1_f_max: boolean;
    l2_cg1_g_max: boolean;
    l2_cg2_a_max: boolean;
    l2_cg2_b_max: boolean;
    l2_cg3_a_max: boolean;
    l2_cg3_b_max: boolean;
    l2_cg3_c_max: boolean;
    l2_cg3_d_max: boolean;
    l2_cg3_e_max: boolean;

    // L1 Criteria Values
    l1_cg1_a_value: string;
    l1_cg1_b_value: string;
    l1_cg1_c_value: string;

    // L1 Criteria Max Flags
    l1_cg1_a_max: boolean;
    l1_cg1_b_max: boolean;
    l1_cg1_c_max: boolean;

    // Result settings
    limit: number;
    ascending: boolean;
};
