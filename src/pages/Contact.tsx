import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+212679545622";
const phoneDisplay = import.meta.env.VITE_PHONE_DISPLAY || "+212 679 545 622";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: phoneDisplay,
    link: `tel:${whatsappNumber}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@mugix.com",
    link: "mailto:hello@mugix.com",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Crystal Spring Road, Mountain Valley, CA 90210",
    link: null,
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    link: null,
  },
];

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would be handled here
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-water-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <Card className="border-0 bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <MessageCircle className="h-8 w-8" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Prefer WhatsApp?</h3>
                      <p className="text-primary-foreground/80 text-sm">
                        Chat with us directly for quick responses
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-card text-foreground rounded-lg text-sm font-medium hover:bg-card/90 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Open WhatsApp
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-medium">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Send a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input id="phone" type="tel" placeholder={phoneDisplay} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Map integration can be added here
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
