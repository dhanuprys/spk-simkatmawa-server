import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function AdminTest() {
    return (
        <AdminLayout title="Test Page" description="Testing admin layout">
            <Head title="Test - NITISARA Admin" />

            <Card>
                <CardHeader>
                    <CardTitle>Admin Panel Test</CardTitle>
                    <CardDescription>
                        This is a test page to verify the admin layout is working correctly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        If you can see this page with the sidebar navigation, then the admin panel is working correctly!
                    </p>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
