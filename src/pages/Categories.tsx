import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Categories = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  Business Categories
                </h1>
                <p className="text-muted-foreground text-lg">
                  Explore different business categories and discover opportunities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-glow transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Featured Categories</span>
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <span className="text-accent">★</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Discover the most popular business categories and trending opportunities.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-glow transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Growth Sectors</span>
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <span className="text-accent">📈</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Explore rapidly growing business sectors with high potential.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-glow transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Innovation Hub</span>
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <span className="text-accent">💡</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cutting-edge business ideas and innovative solutions.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-card p-6 rounded-lg border border-border text-center">
                    <div className="text-3xl font-bold text-accent mb-2">8</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border text-center">
                    <div className="text-3xl font-bold text-accent mb-2">120+</div>
                    <div className="text-sm text-muted-foreground">Opportunities</div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border text-center">
                    <div className="text-3xl font-bold text-accent mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Growth Areas</div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border text-center">
                    <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Categories;