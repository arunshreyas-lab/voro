import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Plus, LogOut } from "lucide-react";

const Ideas = () => {
  const handleLogout = () => {
    // This will be implemented when Supabase is connected
    console.log("Logout");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Voro
            </h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 form-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-primary">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h1 className="text-4xl font-bold">Ideas Dashboard</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Capture, organize, and bring your ideas to life
            </p>
            <Button variant="gradient" size="lg" className="gap-2">
              <Plus size={20} />
              New Idea
            </Button>
          </div>

          {/* Ideas Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 form-slide-up">
            {/* Placeholder Ideas */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="shadow-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Idea #{i + 1}</CardTitle>
                  <CardDescription>
                    This is a placeholder for your brilliant ideas. Start creating!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>In Progress</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State Message */}
          <div className="text-center mt-16 p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Lightbulb className="text-muted-foreground" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to capture your ideas?</h3>
            <p className="text-muted-foreground mb-4">
              Your creative journey starts here. Add your first idea to get started.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ideas;