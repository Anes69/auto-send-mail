# Auto-Sending-Mail

Projet permettant d'avoir une interface via laquelle on connecte son mail.  
On y insère la liste de destinataires, et on planifie quand, combien de fois, à quelle heure et quel mail envoyer à cette liste.  
Le suivi permet de voir directement, via un tableau, quel destinataire a répondu à quel(s) mail(s).

---

## Front-end

Dans un premier temps, l'interface doit permettre :

- La connexion à un **profil propre au site**, chaque profil pouvant gérer **plusieurs liaisons de mail**.
- Sur la gauche : sélection du mail de base.
- Au centre : onglets en haut permettant de naviguer entre :
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
- Cet onglet servira de base pour le script de relance :
  - Chaque ligne doit contenir toutes les informations nécessaires à la relance, telles que :  
    - Nom  
    - Mail  
    - Dernier envoi  
    - Dernière réponse reçue  
    - Activé ou désactivé  
    - Template utilisé selon la condition (template de relance, template de premier mail, ou autre)

#### Calendrier
- Interface permettant de visualiser quand seront envoyés les prochains mails et lesquels, et quand telle ou telle liste de mails a été reçue.
- Aucune action initialement sur cette interface, c’est **uniquement du visuel**.

#### Template
- Interface permettant d'ajouter des templates pour les mails, récupérant les informations stockées dans le tableau.
- Plusieurs types de mails possibles, comme :
  - "Premier envoi"
  - "Relance"
  - Autres
- Possibilité d’avoir des templates par défaut, **et la possibilité d’ajouter des templates personnalisés** qui seront récupérables dans le tableau.
