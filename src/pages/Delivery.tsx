import {
  Truck,
  Clock,
  CreditCard,
  MapPin,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+212679545622";

const deliveryInfo = [
  {
    icon: Truck,
    title: "Free Delivery",
    description:
      "Free delivery on orders over $25. Standard delivery fee of $5 for smaller orders.",
  },
  {
    icon: Clock,
    title: "Delivery Times",
    description:
      "Same-day delivery for orders placed before 2 PM. Next-day delivery for later orders.",
  },
  {
    icon: MapPin,
    title: "Delivery Areas",
    description:
      "We deliver throughout the metropolitan area. Contact us for delivery to other locations.",
  },
  {
    icon: CreditCard,
    title: "Payment Options",
    description:
      "Cash on delivery, bank transfer, or digital payment methods available.",
  },
];

const steps = [
  {
    number: "1",
    title: "Browse Products",
    description: "Explore our range of premium bottled water products.",
  },
  {
    number: "2",
    title: "Order via WhatsApp",
    description:
      "Click the order button and send us your details through WhatsApp.",
  },
  {
    number: "3",
    title: "Confirm Details",
    description:
      "We'll confirm your order, delivery address, and payment method.",
  },
  {
    number: "4",
    title: "Receive Delivery",
    description: "Your fresh Mugix water will be delivered right to your door.",
  },
];

export default function Delivery() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-water-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Delivery & Payment
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about ordering and receiving your
              Mugix water.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Info Cards */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliveryInfo.map((item) => (
              <Card key={item.title} className="border-0 shadow-soft">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to Order
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ordering Mugix water is simple and convenient through WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Accepted Payment Methods
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Cash on Delivery",
                  description: "Pay when your order arrives",
                },
                {
                  title: "Bank Transfer",
                  description: "Direct transfer to our account",
                },
                {
                  title: "Digital Wallets",
                  description: "PayPal, Venmo, and other e-wallets",
                },
                {
                  title: "Credit/Debit Cards",
                  description: "Visa, Mastercard, American Express",
                },
              ].map((method) => (
                <div
                  key={method.title}
                  className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border"
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-water-dark text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl font-bold mb-4">
            Questions About Delivery?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Contact us on WhatsApp for any questions about delivery areas,
            times, or special requests.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground rounded-lg font-medium hover:bg-card/90 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}
