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
      const response = await apiRequest("POST", "/api/signup", data);
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
    <div className="font-opensans bg-overlay text-text-secondary min-h-screen flex items-center justify-center relative">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-candle pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="relative z-10 animate-fade-in">
        <div className="glass-morphism rounded-3xl shadow-2xl max-w-2xl w-full mx-4 my-8 p-12 md:p-16 text-center animate-slide-up">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-text-primary font-light text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight text-shadow">
              A guided way to honor a life — <span className="block mt-2">coming soon.</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-text-secondary font-normal">
              ObitsHelp is a guided obituary-writing service that walks families through creating a meaningful, complete tribute — without the stress of starting from a blank page.
            </p>
          </header>
          
          {/* Reinforcing Message */}
          <div className="my-8 md:my-12">
            <blockquote className="italic text-text-muted text-lg md:text-xl leading-relaxed border-quote pl-6 text-left max-w-lg mx-auto">
              Created from personal experience, built to support families in moments that matter.
            </blockquote>
          </div>
          
          {/* Email Signup Form */}
          <div className="form-glass rounded-2xl p-8 md:p-12 my-8 md:my-12">
            {!isSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            className="w-full px-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-green-accent focus:ring-4 focus:ring-green-accent focus:ring-opacity-20 transition-all duration-300 outline-none placeholder-gray-400"
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
                    className="w-full bg-gradient-to-r from-green-accent to-green-hover text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-accent focus:ring-opacity-20"
                  >
                    {signupMutation.isPending ? (
                      <>
                        <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Submitting...
                      </>
                    ) : (
                      "Notify Me When It Launches"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl animate-pulse-success">
                <div className="flex items-center justify-center text-green-800">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  <span className="font-semibold text-lg">Thank you! We'll notify you when we launch.</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <footer className="mt-12 md:mt-16">
            <div className="text-text-muted text-base md:text-lg">
              <a 
                href="mailto:contact@obitshelp.com" 
                className="inline-flex items-center text-text-secondary hover:text-text-primary bg-transparent hover:bg-green-accent hover:bg-opacity-10 px-6 py-3 rounded-xl transition-all duration-300 font-medium"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
