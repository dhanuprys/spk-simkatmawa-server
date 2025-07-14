import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Film, User } from 'lucide-react';

interface EventYear {
    id: number;
    year: number;
    title: string;
}

interface FilmVoting {
    id: number;
    film_id: number;
    ticket_id: number;
    created_at: string;
    film: {
        id: number;
        title: string;
        participant: {
            id: number;
            team_name: string;
            leader_name: string;
        };
    };
}

interface Ticket {
    id: number;
    code: string;
    event_year_id: number | null;
    used_at: string | null;
    created_at: string;
    eventYear?: EventYear;
    film_votings?: FilmVoting[];
}

interface Props {
    ticket: Ticket;
    currentEventYear: EventYear;
}

export default function TicketShow({ ticket, currentEventYear }: Props) {
    const formatDateTime = (dateString: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'full',
            timeStyle: 'short',
        }).format(date);
    };

    return (
        <AdminLayout title={`Detail Tiket - ${ticket.code}`}>
            <Head title={`Detail Tiket - ${ticket.code}`} />

            <div className="mb-6">
                <Button variant="outline" asChild>
                    <Link href={route('admin.event-years.tickets.index', currentEventYear.id)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Manajemen Tiket
                    </Link>
                </Button>
            </div>

            <div className="space-y-6">
                {/* Ticket Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="font-mono text-2xl">{ticket.code}</span>
                            <Badge variant={ticket.used_at ? 'secondary' : 'default'}>
                                {ticket.used_at ? 'Digunakan' : 'Belum Digunakan'}
                            </Badge>
                        </CardTitle>
                        <CardDescription>Detail informasi tiket</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="font-medium">Event</h4>
                                <p className="text-muted-foreground">
                                    {ticket.eventYear ? `${ticket.eventYear.year} - ${ticket.eventYear.title}` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium">Status</h4>
                                <p className="text-muted-foreground">
                                    {ticket.used_at ? 'Digunakan' : 'Belum Digunakan'}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium">Dibuat Pada</h4>
                                <p className="text-muted-foreground">{formatDateTime(ticket.created_at)}</p>
                            </div>
                            {ticket.used_at && (
                                <div>
                                    <h4 className="font-medium">Digunakan Pada</h4>
                                    <p className="text-muted-foreground">{formatDateTime(ticket.used_at)}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Voting History */}
                {ticket.film_votings && ticket.film_votings.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Film className="h-5 w-5" />
                                Riwayat Voting
                            </CardTitle>
                            <CardDescription>Film yang telah divoting menggunakan tiket ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {ticket.film_votings.map((voting) => (
                                    <div
                                        key={voting.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium">{voting.film.title}</h4>
                                            <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    <span>{voting.film.participant.team_name}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{formatDateTime(voting.created_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline">Voted</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {(!ticket.film_votings || ticket.film_votings.length === 0) && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Film className="h-5 w-5" />
                                Riwayat Voting
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="py-8 text-center">
                                <Film className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <p className="text-muted-foreground">
                                    Belum ada voting yang dilakukan dengan tiket ini
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
