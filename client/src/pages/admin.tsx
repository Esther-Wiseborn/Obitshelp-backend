import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, Users, Calendar } from "lucide-react";
import { format } from "date-fns";

type EmailSignup = {
  id: number;
  email: string;
  created_at: string;
};

export default function AdminDashboard() {
  const { data: signups, isLoading, error } = useQuery<{ success: boolean; data: EmailSignup[] }>({
    queryKey: ['/api/signups'],
  });

  const exportCSV = () => {
    if (!signups?.data) return;
    
    const csvContent = [
      ['ID', 'Email', 'Signup Date'],
      ...signups.data.map(signup => [
        signup.id,
        signup.email,
        format(new Date(signup.created_at), 'yyyy-MM-dd HH:mm:ss')
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `obitshelp-signups-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !signups?.success) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12 text-red-600">
            Error loading signups data
          </div>
        </div>
      </div>
    );
  }

  const totalSignups = signups.data?.length || 0;
  const recentSignups = signups.data?.filter(signup => 
    new Date(signup.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ObitsHelp Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage email signups and track pre-launch interest
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSignups}</div>
              <p className="text-xs text-muted-foreground">
                Registered for launch notifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentSignups}</div>
              <p className="text-xs text-muted-foreground">
                New signups in last 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actions</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button 
                onClick={exportCSV}
                variant="outline" 
                size="sm"
                className="w-full"
              >
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Email List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {signups.data?.map((signup) => (
                <div 
                  key={signup.id} 
                  className="flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">#{signup.id}</Badge>
                    <span className="font-medium">{signup.email}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(signup.created_at), 'MMM d, yyyy • h:mm a')}
                  </div>
                </div>
              ))}
              
              {totalSignups === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No signups yet. Share your landing page to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}