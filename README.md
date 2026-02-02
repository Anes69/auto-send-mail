# Auto-Sending-Mail

Auto-Sending-Mail est un projet visant à fournir une interface permettant de connecter un ou plusieurs comptes mail afin d’automatiser l’envoi, la relance et le suivi de mails.

L’utilisateur peut importer une liste de destinataires, définir quand, combien de fois, à quelle heure et quel mail envoyer à cette liste.  
Le suivi se fait via un tableau centralisé permettant de visualiser, pour chaque destinataire, les mails envoyés et les réponses reçues.

---

## Objectif et portée du projet

Auto-Sending-Mail est conçu comme un outil **générique** de gestion de campagnes d’envoi de mails, basé sur un **sujet** (ou contexte) et des **templates conditionnels**.

Le projet n’est pas limité à un cas d’usage spécifique :  
il peut être utilisé aussi bien pour des campagnes de communication, de prospection, de suivi administratif, d’organisation d’événements ou encore de candidatures, ces dernières n’étant qu’un **exemple d’utilisation parmi d’autres**.

Le fonctionnement repose sur l’association entre un sujet, une liste de destinataires et des règles définissant quels templates utiliser en fonction des réponses reçues ou de l’absence de réponse.

---

## Front-end

Dans un premier temps, l’interface doit permettre :

- La connexion à un **profil propre à l’application**, chaque profil pouvant gérer **plusieurs comptes mail**.
- Sur la gauche : sélection du compte mail actif.
- Au centre : une navigation par onglets permettant d’accéder aux différentes fonctionnalités :
  - **Postes**
  - **Tableau**
  - **Calendrier**
  - **Templates**

### Détails des onglets

#### Postes
- Interface permettant de créer et gérer une liste de postes (ou catégories).
- Les postes sont réutilisables dans les autres onglets, notamment dans le tableau.

#### Tableau
- Tableau central de l’application.
- Permet l’ajout, la modification et la suppression de lignes.
- Chaque ligne correspond à un **destinataire mail**.
- Les colonnes incluent notamment :
  - Nom
  - Adresse mail
  - Poste(s) visé(s)
  - Date du dernier envoi
  - Date de la dernière réponse reçue
  - Statut (actif / désactivé)
  - Template associé selon la situation (premier envoi, relance, autre)

Cet onglet sert de **source principale de données** pour le script d’envoi et de relance :  
chaque ligne doit contenir toutes les informations nécessaires à l’automatisation.

#### Calendrier
- Interface de visualisation des envois de mails passés et à venir.
- Permet de voir :
  - Quand les prochains mails seront envoyés
  - Quels mails ont été envoyés à quelles listes
- Aucune action directe dans un premier temps : **interface purement informative**.

#### Templates
- Interface permettant de créer et gérer des modèles de mails.
- Les templates peuvent récupérer automatiquement les informations stockées dans le tableau.
- Plusieurs types de templates sont prévus :
  - Premier envoi
  - Relance
  - Autres types personnalisés
- Des templates par défaut seront disponibles, avec la possibilité d’en ajouter de nouveaux.
- Les templates sont sélectionnables directement depuis l’onglet Tableau.

---

## Back-end

Le back-end doit assurer les fonctionnalités suivantes :

- Gestion des profils utilisateurs
- Connexion et authentification aux comptes mail liés
- Récupération des dossiers et sous-dossiers présents sur les comptes mail
- Envoi automatique de mails selon les règles définies
- Classement des mails envoyés et reçus dans les dossiers appropriés
- Détection des mails entrants :
  - Identification des réponses à un mail existant
  - Différenciation entre une réponse, une nouvelle conversation ou une proposition
- Mise à jour automatique des données du tableau en fonction des réponses reçues

---

## Exemples de cas d’usage

- Campagnes d’envoi de mails basées sur un sujet
- Relances automatiques en fonction des réponses reçues
- Suivi individuel de destinataires via un tableau centralisé
- Gestion de campagnes pour des associations, événements ou démarches administratives
- Envoi de candidatures (exemple d’utilisation)