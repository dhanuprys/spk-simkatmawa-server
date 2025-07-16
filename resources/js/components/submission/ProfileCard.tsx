import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, User } from 'lucide-react';

interface ProfileCardProps {
    participant: any;
    handleLogout: () => void;
}

export default function ProfileCard({ participant, handleLogout }: ProfileCardProps) {
    return (
        <Card className="mb-8 border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardContent className="px-4 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="from-primary to-primary/80 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg sm:h-12 sm:w-12">
                            <User className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                                {participant?.team_name}
                            </h3>
                            <p className="truncate text-xs text-gray-600 sm:text-sm">
                                Ketua: {participant?.leader_name} • {participant?.city}
                            </p>
                            <p className="truncate text-xs text-gray-600 sm:text-sm">{participant?.company}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <Badge
                            variant="outline"
                            className="w-fit border-blue-200 bg-blue-50 text-xs text-blue-700 sm:text-sm"
                        >
                            PIN: {participant?.pin}
                        </Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-xs hover:bg-red-50 hover:text-red-600 sm:text-sm"
                        >
                            <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Keluar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
