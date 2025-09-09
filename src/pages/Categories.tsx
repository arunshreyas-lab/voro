import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Utensils, 
  Car, 
  Home, 
  Heart, 
  Palette, 
  Laptop, 
  Building2,
  ChevronRight 
} from "lucide-react";

const businessCategories = [
  { title: "Retail & E-commerce", icon: ShoppingCart, url: "/categories/retail" },
  { title: "Food & Beverage", icon: Utensils, url: "/categories/food" },
  { title: "Automotive", icon: Car, url: "/categories/automotive" },
  { title: "Real Estate", icon: Home, url: "/categories/realestate" },
  { title: "Healthcare", icon: Heart, url: "/categories/healthcare" },
  { title: "Creative Services", icon: Palette, url: "/categories/creative" },
  { title: "Technology", icon: Laptop, url: "/categories/technology" },
  { title: "Construction", icon: Building2, url: "/categories/construction" },
];

const Categories = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-4">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold">Business Categories</h1>
          </header>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  Explore Business Categories
                </h1>
                <p className="text-muted-foreground text-lg">
                  Choose from our comprehensive list of business categories
                </p>
              </div>

              <div className="space-y-4">
                {businessCategories.map((category) => (
                  <div
                    key={category.title}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="w-6 h-6 text-accent" />
                      <span className="font-medium text-foreground">
                        {category.title}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                ))}
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