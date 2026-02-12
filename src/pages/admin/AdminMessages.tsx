import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Trash2,
  LogOut,
  LayoutDashboard,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useContacts, useDeleteContact } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";

export default function AdminMessages() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: contacts, isLoading: contactsLoading } = useContacts();
  const deleteContact = useDeleteContact();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/admin/login");
      } else if (!isAdmin) {
        toast({
          title: "Acces Refuse",
          description: "Vous n'avez pas les privileges administrateur.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, loading, navigate, toast]);

  const handleDelete = async (id: string) => {
    try {
      await deleteContact.mutateAsync(id);
      toast({
        title: "Message Supprime",
        description: "Le message a ete supprime.",
      });
    } catch {
      toast({
        title: "Echec de la Suppression",
        description: "Impossible de supprimer le message. Veuillez reessayer.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border hidden lg:block">
        <div className="p-6">
          <Link to="/">
            <img src="/assets/mugix-logo.png" alt="Mugix" className="h-10" />
          </Link>
        </div>

        <nav className="px-4 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            Tableau de Bord
          </Link>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <Plus className="h-5 w-5" />
            Ajouter un Produit
          </Link>
          <Link
            to="/admin/messages"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
          >
            <Mail className="h-5 w-5" />
            Messages
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="px-4 py-2 text-sm text-sidebar-foreground/60 mb-2">
            {user.email}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            Deconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Link to="/">
            <img src="/assets/mugix-logo.png" alt="Mugix" className="h-10" />
          </Link>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Messages
          </h1>
          <p className="text-muted-foreground">
            Messages recus depuis le formulaire de contact
          </p>
        </div>

        {/* Messages Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Messages de Contact
              {contacts && contacts.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({contacts.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contactsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : contacts && contacts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telephone</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {contact.firstName} {contact.lastName}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-primary hover:underline"
                          >
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {contact.phone ? (
                            <a
                              href={`tel:${contact.phone}`}
                              className="text-primary hover:underline"
                            >
                              {contact.phone}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate" title={contact.message}>
                            {contact.message}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                          {formatDate(contact.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Supprimer le Message
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Etes-vous sur de vouloir supprimer le message
                                  de {contact.firstName} {contact.lastName} ?
                                  Cette action est irreversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(contact.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucun message pour le moment
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
