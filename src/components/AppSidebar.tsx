import { useState } from "react";
import {
  Building2,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Heart,
  Palette,
  Laptop,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const getUserDisplayName = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <Sidebar className="w-80">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
              {user?.email ? getUserInitials(user.email) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sidebar-foreground truncate">
              {user?.user_metadata?.full_name || (user?.email ? getUserDisplayName(user.email) : "User")}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Business Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {businessCategories.map((category) => (
                <SidebarMenuItem key={category.title}>
                  <SidebarMenuButton asChild className="h-auto p-0">
                    <NavLink
                      to={category.url}
                      className="flex items-center justify-between p-4 rounded-lg border border-sidebar-border bg-card hover:bg-accent/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className="w-5 h-5 text-accent" />
                        <span className="font-medium text-sidebar-foreground">
                          {category.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground hover:text-accent"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}