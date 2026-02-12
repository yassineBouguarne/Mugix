import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateContact } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+212679545622";
const phoneDisplay = import.meta.env.VITE_PHONE_DISPLAY || "+212 679 545 622";

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
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
    title: "Adresse",
    value: "123 Crystal Spring Road, Mountain Valley, CA 90210",
    link: null,
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun-Ven : 8h-18h, Sam : 9h-16h",
    link: null,
  },
];

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const createContact = useCreateContact();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact.mutateAsync({
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        message,
      });
      toast({
        title: "Message Envoyé",
        description: "Merci pour votre message ! Nous vous répondrons bientôt.",
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-nature-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contactez-Nous
            </h1>
            <p className="text-lg text-muted-foreground">
              Des questions ou des remarques ? Nous serions ravis de vous entendre.
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
                Nous Contacter
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
                      <h3 className="font-semibold mb-1">Vous préférez WhatsApp ?</h3>
                      <p className="text-primary-foreground/80 text-sm">
                        Discutez directement avec nous pour des réponses rapides
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
                    Ouvrir WhatsApp
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-medium">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Envoyer un Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" placeholder="Jean" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" placeholder="Dupont" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone (Optionnel)</Label>
                      <Input id="phone" type="tel" placeholder={phoneDisplay} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Comment pouvons-nous vous aider ?"
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={createContact.isPending}>
                      {createContact.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Envoyer le Message
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
              L'intégration de la carte peut être ajoutée ici
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
