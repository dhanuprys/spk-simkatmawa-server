import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Calendar,
    FileVideo,
    Home,
    Key,
    LogOut,
    Menu,
    Settings,
    Shield,
    User,
    Users,
    X,
} from 'lucide-react';
import { useState, type PropsWithChildren } from 'react';

interface AdminLayoutProps {
    title: string;
    description?: string;
}

const navigationMain = [
    { name: 'Dashboard', href: route('admin.dashboard'), icon: Home },
    { name: 'Statistik', href: route('admin.statistics'), icon: BarChart3 },
    { name: 'Peserta', href: route('admin.participants.index'), icon: Users },
    { name: 'Film', href: route('admin.films.index'), icon: FileVideo },
    { name: 'Tahun Event', href: route('admin.event-years.index'), icon: Calendar },
    { name: 'PIN Page Login', href: route('admin.voting-pins.index'), icon: Key },
    { name: 'Users', href: route('admin.users.index'), icon: User },
];
const navigationSecondary = [{ name: 'Pengaturan', href: route('admin.settings.index'), icon: Settings }];

export default function AdminLayout({ children, title, description }: PropsWithChildren<AdminLayoutProps>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth, url } = usePage().props as any;

    const isActive = (href: string) => {
        if (!url) return false;
        return url.startsWith(href);
    };

    return (
        <div className="bg-background min-h-screen">
            <Head title={title} />

            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
                <div className="bg-background fixed inset-y-0 left-0 w-64 border-r">
                    <div className="flex h-16 items-center justify-between border-b px-4">
                        <div className="flex items-center gap-2">
                            <AppLogoIcon className="h-8 w-8" />
                            <span className="font-semibold">NITISARA Admin</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <nav className="space-y-2 p-4">
                        <div className="mb-2">
                            <div className="text-muted-foreground px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                                Manajemen
                            </div>
                            {navigationMain.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        isActive(item.href)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-accent hover:text-accent-foreground',
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <Separator className="my-2" />
                        <div>
                            <div className="text-muted-foreground px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                                Lainnya
                            </div>
                            {navigationSecondary.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        isActive(item.href)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-accent hover:text-accent-foreground',
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <div className="bg-background flex grow flex-col gap-y-5 overflow-y-auto border-r px-6">
                    <div className="flex h-16 items-center gap-2">
                        <AppLogoIcon className="h-8 w-8" />
                        <span className="font-semibold">NITISARA Admin</span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    <div className="mb-2">
                                        <div className="text-muted-foreground px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                                            Manajemen
                                        </div>
                                        {navigationMain.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                                        isActive(item.href)
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'hover:bg-accent hover:text-accent-foreground',
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </div>
                                    <Separator className="my-2" />
                                    <div>
                                        <div className="text-muted-foreground px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                                            Lainnya
                                        </div>
                                        {navigationSecondary.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                                        isActive(item.href)
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'hover:bg-accent hover:text-accent-foreground',
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top header */}
                <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm backdrop-blur sm:gap-x-6 sm:px-6 lg:px-8">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="-m-2.5 p-2.5 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1 items-center">
                            <h1 className="text-foreground text-xl font-semibold">{title}</h1>
                        </div>

                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Admin badge */}
                            <div className="bg-primary/10 text-primary hidden items-center gap-2 rounded-full px-3 py-1.5 sm:flex">
                                <Shield className="h-3.5 w-3.5" />
                                <span className="text-xs font-medium">Admin Panel</span>
                            </div>

                            <Separator orientation="vertical" className="h-6" />

                            {/* User info */}
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                                    <User className="text-primary h-4 w-4" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-foreground text-sm font-medium">{auth?.user?.name || 'Admin'}</p>
                                    <p className="text-muted-foreground text-xs">Administrator</p>
                                </div>
                            </div>

                            <Separator orientation="vertical" className="h-6" />

                            {/* Logout button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Link href={route('logout')} method="post" as="button">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Keluar</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
