import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertEmailSignupSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CheckCircle, Mail } from "lucide-react";


type FormData = { email: string };

export default function Landing() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(insertEmailSignupSchema),
    defaultValues: {
      email: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest(
  "POST",
  "https://c7bf4485-daaf-4559-9aaf-cffd0f5d8f2b-00-1236lcyd0h76v.riker.replit.dev/api/signup",
  data
);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Thank you! We'll notify you when we launch.",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="font-opensans min-h-screen flex items-center justify-center relative" style={{
      backgroundImage: "url('/brand-pattern.png')",
      backgroundRepeat: "repeat",
      backgroundSize: "300px 300px"
    }}>
      {/* Background Overlay for content readability */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="relative z-10 animate-fade-in">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl max-w-3xl w-full mx-6 my-10 p-16 md:p-20 text-center animate-slide-up border border-gray-200/50">
          {/* Coming Soon */}
          <div className="mb-8">
            <p className="text-gray-500 text-lg font-light tracking-wide">
              Coming Soon
            </p>
          </div>
          
          {/* Logo */}
          <div className="mb-12 relative">
            <div className="relative mx-auto w-80 h-auto">
              <img 
                src="/obitshelp-logo.png" 
                alt="ObitsHelp Logo" 
                className="w-full h-auto opacity-90 relative z-10"
              />
              <div 
                className="absolute inset-0 opacity-20 mix-blend-multiply rounded-lg"
                style={{
                  backgroundImage: "url('/brand-pattern.png')",
                  backgroundRepeat: "repeat",
                  backgroundSize: "300px 300px",
                  backgroundPosition: "center"
                }}
              ></div>
            </div>
          </div>
          
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-gray-900 font-light text-3xl md:text-4xl lg:text-5xl mb-8 leading-relaxed tracking-wide">
              Honoring Lives,<br />Preserving Memories
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-normal max-w-2xl mx-auto">
              ObitsHelp is revolutionizing how we create, share, and preserve obituaries. A compassionate platform designed to celebrate lives and support families during difficult times.
            </p>
          </header>
          
          {/* Reinforcing Message */}
          <div className="my-12 md:my-16">
            <blockquote className="italic text-gray-600 text-xl md:text-2xl leading-relaxed border-l-4 border-gray-300 pl-8 text-left max-w-xl mx-auto">
              Born of personal experience, created to bring clarity when it's hardest to find.
            </blockquote>
          </div>
          
          {/* Email Signup Form */}
          <div className="form-glass rounded-3xl p-12 md:p-16 my-12 md:my-16">
            {!isSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            className="w-full px-8 py-6 text-xl bg-white border-2 border-gray-300 rounded-2xl focus:border-accent-dark focus:ring-4 focus:ring-accent-dark focus:ring-opacity-10 transition-all duration-300 outline-none placeholder-gray-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={signupMutation.isPending}
                    className="w-full bg-gradient-to-r from-accent-dark to-accent-hover text-white font-medium text-xl px-12 py-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-dark focus:ring-opacity-20"
                  >
                    {signupMutation.isPending ? (
                      <>
                        <div className="animate-spin -ml-1 mr-3 h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                        Submitting...
                      </>
                    ) : (
                      "Notify Me When It Launches"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="p-8 bg-white border-2 border-gray-300 rounded-2xl animate-pulse-success">
                <div className="flex items-center justify-center text-gray-800">
                  <CheckCircle className="w-8 h-8 mr-4 text-green-600" />
                  <span className="font-medium text-xl">Thank you! We'll notify you when we launch.</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <footer className="mt-16 md:mt-20">
            <div className="text-gray-500 text-lg md:text-xl">
              <a 
                href="mailto:contact@obitshelp.com" 
                className="inline-flex items-center text-text-secondary hover:text-text-primary bg-transparent hover:bg-gray-100 px-8 py-4 rounded-2xl transition-all duration-300 font-medium border border-gray-300"
              >
                <Mail className="w-6 h-6 mr-3" />
                Contact Us
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
