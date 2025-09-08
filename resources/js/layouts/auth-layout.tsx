import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    hideDefaultHeader?: boolean;
}

export default function AuthLayout({ children, title, description, hideDefaultHeader, ...props }: AuthLayoutProps) {
    return (
        <AuthLayoutTemplate title={title} description={description} hideDefaultHeader={hideDefaultHeader} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
