# Auto-Sending-Mail

Projet permettant d'avoir une interface via laquelle on connecte son mail.  
On y insère la liste de destinataires, et on planifie quand, combien de fois, à quelle heure et quel mail envoyer à cette liste.  
Le suivi permet de voir directement, via un tableau, quel destinataire a répondu à quel(s) mail(s).

---

## Front-end

Dans un premier temps, l'interface doit permettre :

- La connexion à un **profil propre au site**, chaque profil pouvant gérer **plusieurs liaisons de mail**.
- Sur la gauche : sélection du mail de base.
- Sur le milieu : onglets en haut permettant de naviguer entre :
  - **Postes**
  - **Tableau**
  - **Calendrier**
  - **Template**

### Détails des onglets

#### Postes
- Une liste permettant d'insérer tous les postes désirés.
- Les postes pourront être réutilisés dans les autres onglets.

#### Tableau
- Permet d'ajouter, modifier et supprimer le contenu.
- Chaque ligne correspond à un **destinataire mail**.
- Les colonnes incluent les catégories des **postes visés**.

#### Calendrier
- (À développer plus tard pour planification visuelle)

#### Template
- (À développer pour gérer les modèles d'email)
