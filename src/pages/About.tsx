import { Recycle, Palette, Heart, Users, Leaf, Award } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Recycle,
    title: "Éco-responsabilité",
    description:
      "Chaque produit Mugix est conçu avec des matériaux durables et recyclables, pour un impact minimal sur l'environnement.",
  },
  {
    icon: Palette,
    title: "Design Créatif",
    description:
      "Nos bouteilles et mugs allient fonctionnalité et esthétique, avec des designs originaux qui se démarquent au quotidien.",
  },
  {
    icon: Leaf,
    title: "Engagement Durable",
    description:
      "Nous nous engageons à réduire les déchets plastiques en proposant des alternatives réutilisables et respectueuses de la planète.",
  },
  {
    icon: Award,
    title: "Qualité Premium",
    description:
      "Des contrôles rigoureux et des matériaux de premier choix assurent la longévité et la sécurité de chaque produit.",
  },
];

const stats = [
  { value: "100%", label: "Matériaux Durables" },
  { value: "50+", label: "Designs Uniques" },
  { value: "24/7", label: "Service Client" },
  { value: "1000+", label: "Clients Satisfaits" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-nature-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              À Propos de Mugix
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez notre histoire, notre mission et notre engagement envers
              un design éco-responsable.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Notre Histoire
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Née d'une envie de proposer des alternatives durables aux objets du
              quotidien, Mugix est le fruit d'une passion pour le design et
              l'éco-responsabilité. Notre aventure a commencé avec une conviction
              simple : chacun mérite des produits beaux, fonctionnels et
              respectueux de l'environnement.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Depuis nos débuts, nous avons consacré notre énergie à créer des
              bouteilles réutilisables et des mugs au design unique, en
              sélectionnant les meilleurs matériaux durables. Chaque produit
              Mugix raconte l'histoire d'un engagement envers la créativité et
              la planète.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et définissent
              l'identité de Mugix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((item) => (
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

      {/* Chiffres Clés */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mugix en Chiffres
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 lg:py-24 bg-nature-dark text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Heart className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl font-bold mb-4">
            Notre Mission
          </h2>
          <p className="text-primary-foreground/80 mb-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Offrir à chacun des produits du quotidien alliant design moderne
            et respect de l'environnement. Nous croyons que chaque geste
            compte et nous travaillons chaque jour pour que Mugix soit
            synonyme de style, durabilité et engagement écologique.
          </p>
        </div>
      </section>
    </Layout>
  );
}
