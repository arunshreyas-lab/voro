import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand */}
          <div className="mb-8 form-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 rounded-full bg-gradient-primary animate-glow">
                <Lightbulb className="text-white" size={40} />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Voro
              </h1>
            </div>
            <p className="text-2xl text-muted-foreground mb-2">
              Where Ideas Come to Life
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Capture, organize, and bring your brilliant ideas to life. Join a community of creators and innovators.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 form-slide-up">
            <Button asChild variant="gradient" size="lg" className="gap-2">
              <Link to="/signup">
                Get Started
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/login">
                Login
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: <Lightbulb className="text-primary" size={32} />,
                title: "Capture Ideas",
                description: "Never lose a brilliant thought again. Quickly capture and organize your ideas."
              },
              {
                icon: <Sparkles className="text-primary" size={32} />,
                title: "Bring to Life",
                description: "Transform your ideas into reality with powerful tools and collaboration."
              },
              {
                icon: <ArrowRight className="text-primary" size={32} />,
                title: "Take Action",
                description: "From concept to completion, track your progress and achieve your goals."
              }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-lg bg-card border border-border shadow-card">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
