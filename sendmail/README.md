# Auto-Sending-Mail

Auto-Sending-Mail est un projet visant à fournir une interface permettant de connecter un ou plusieurs comptes mail afin d’automatiser l’envoi, la relance et le suivi de mails.

L’utilisateur peut importer une liste de destinataires, définir quand, combien de fois, à quelle heure et quel mail envoyer à cette liste. Le suivi se fait via un tableau centralisé permettant d’observer l’état de chaque destinataire (dernier envoi, réponses, prochaine action, template associé, etc.).

---

## État du projet

Le projet est actuellement en **v0 (phase de réflexion / cadrage)**.

Objectifs de cette phase :
- Énoncer clairement les besoins fonctionnels et techniques.
- Définir une architecture cible simple et solide.
- Identifier les priorités de développement.
- Préparer un socle backend propre avant l’implémentation complète.

> Les commandes de déploiement seront ajoutées plus tard, une fois la base technique stabilisée.

---

## Objectif et portée du projet

Auto-Sending-Mail est conçu comme un outil **générique** de gestion de campagnes d’envoi de mails, basé sur un **sujet** (ou contexte) et des **templates conditionnels**.

Le projet n’est pas limité à un cas d’usage spécifique : il peut être utilisé aussi bien pour des campagnes de communication, de prospection, de suivi administratif, d’organisation d’événements, etc.

Le fonctionnement repose sur l’association entre :
- un **sujet / campagne**
- une **liste de destinataires**
- un **ensemble de règles** définissant quels templates utiliser en fonction :
  - des réponses reçues
  - ou de l’absence de réponse
  - ou d’autres conditions (étape de la campagne, limites, etc.)

---

## Front-end (v0)

### Objectif front (v0)
Le front sert à :
- se connecter à un profil applicatif (auth dédiée à l’application),
- gérer plusieurs comptes mail liés au profil,
- naviguer entre plusieurs fonctionnalités de gestion (postes, tableau, calendrier, templates),
- préparer l’interface qui consommera plus tard l’API backend.

### Navigation / structure d’interface (concept)
L’interface est pensée comme une **application “à une seule page de contexte”** (type dashboard) :

- Il y a une **structure fixe** (ex: sidebar, header, layout).
- Les sections (“onglets”) ne doivent pas ouvrir de nouveaux onglets navigateur.
- Les écrans (Postes / Tableau / Calendrier / Templates) doivent être **chargés dans une zone centrale** via des `include` PHP (ou une logique équivalente plus tard).

Image mentale :
> Une maison avec plusieurs pièces, mais sans “murs” qui séparent des pages indépendantes : on reste dans la même maison, seul le contenu central change.

### Onglets / sections prévues
Navigation centrale par onglets vers :
- **Postes**
- **Tableau**
- **Calendrier**
- **Templates**

#### Postes
- Un poste correspond à un tableau à part entière, pour chaque poste, un tableau est dessiné.
- La création du profil poste doit correspondre à une ligne disposant sous forme de cases les informations suivantes :
  - Nom (du poste)
  - Domaine (général, facultatif)
  - Type (de contrat)
  - Durée (hors CDI)
  - École (si alternance)
  - Définition des envois
    - Premier envoi
    - Relance (tous les jours, hebdomadaire, jour de semaine, etc.)
  - Boutons d’interactions (Actif/Inactif, Ajout, Modification, Suppression)

#### Tableau
- Tableau central de l’application.
- Permet l’ajout, la modification et la suppression de lignes.
- Chaque ligne correspond à un **destinataire mail**.
- Colonnes (exemples) :
  - Nom
  - Adresse mail
  - Numéro
  - Numéro d’envoi
  - Date du dernier envoi
  - Date de la dernière réponse reçue
  - Template associé selon la situation

Cet onglet sert de **source principale de données** pour le script d’envoi et de relance : chaque ligne doit contenir toutes les informations nécessaires à l’automatisation.

#### Calendrier
- Interface de visualisation des envois de mails passés et à venir.
- Permet de voir :
  - quand les prochains mails seront envoyés,
  - quels mails ont été envoyés à quelles listes.
- Aucune action directe en v0 : **interface informative**.

#### Templates
- Interface permettant de créer et gérer des modèles de mails.
- Les templates peuvent récupérer automatiquement les informations stockées dans le tableau (variables dynamiques).
- Plusieurs types de templates sont prévus :
  - Premier envoi
  - Relance
  - Refus
  - Accepté

---

## Auth (v0) : Login & Register (frontend uniquement pour le moment)

### Statut
En v0, **le login et le register existent côté Frontend**, mais **tout fonctionne en local / mode “mock”** au sens où :
- les pages sont présentes,
- les scripts JS envoient des requêtes `fetch()` vers des endpoints backend “cibles”,
- **le backend réel n’est pas encore en place** (les routes sont donc à implémenter).

L’objectif est de :
- valider l’UX (forms, validations, affichage d’erreurs),
- préparer les appels API,
- préparer la future intégration de sessions/tokens.

### Login
- Page : `Frontend/login/index.php`
- Script : `Frontend/login/script.js`
- Fonctionnement :
  - Validation simple côté client (champs requis).
  - Envoi en `POST` JSON vers :
    - `POST /Backend/auth/login`
  - Attendu côté backend (plus tard) :
    - `{ success: true, token?: string, message?: string }`
  - Si succès :
    - stocke le token (si présent) dans `localStorage` (`auth_token`)
    - redirige vers `../home/`

> Remarque : le stockage dans `localStorage` est temporaire (v0). La cible est de gérer une auth propre (sessions/cookies HTTPOnly ou autre stratégie validée).

### Register
- Page : `Frontend/register/index.php`
- Script : `Frontend/register/script.js`
- Fonctionnement :
  - Validation côté client (champs requis, email valide, mot de passe min 6, confirmation).
  - Envoi en `POST` JSON vers :
    - `POST /Backend/auth/register`
  - Attendu côté backend (plus tard) :
    - `{ success: true, message?: string }`
  - Si succès :
    - affiche un message
    - redirige vers `../login/`

---

## Back-end (cible, v0 -> v1)

### 1) Besoins backend à couvrir

Le backend doit assurer les fonctions suivantes :

1. **Gestion des utilisateurs et des profils**
   - Création de compte applicatif.
   - Authentification et sessions.
   - Gestion de plusieurs boîtes mail par utilisateur.

2. **Connexion aux fournisseurs de messagerie**
   - Connexion sécurisée aux comptes mail liés.
   - Lecture des dossiers/sous-dossiers.
   - Envoi et récupération des messages.

3. **Moteur de campagnes et relances**
   - Planification des envois (date/heure/fenêtre).
   - Relances automatiques selon règles métier.
   - Arrêt automatique selon condition (réponse reçue, limite atteinte, etc.).

4. **Gestion des templates**
   - Stockage versionné des templates.
   - Variables dynamiques (ex: `{{prenom}}`, `{{societe}}`, `{{poste}}`).
   - Rendu d’un message final avant envoi.

5. **Suivi et traçabilité**
   - Historique des événements (prévu, envoyé, échoué, répondu).
   - État du destinataire dans la campagne.
   - Journal technique (logs exploitables).

6. **Analyse des réponses entrantes**
   - Détection de réponse à un thread existant.
   - Classification simple (réponse positive, négative, neutre, automatique).
   - Mise à jour automatique du tableau.

7. **Sécurité & conformité**
   - Chiffrement des secrets (tokens/credentials).
   - Gestion des permissions par utilisateur.
   - Traçabilité et suppression des données à la demande.

---

### 2) Proposition d’architecture backend (v0)

Architecture modulaire, évolutive, démarrable rapidement :

- **API Backend**
  - Expose les endpoints pour le front (auth, campagnes, destinataires, templates, calendrier, historique).

- **Scheduler / Worker**
  - Exécute les tâches planifiées (envois, relances, sync de boîtes mail).
  - Traite les jobs en file (queue).

- **Mail Connector Layer**
  - Adaptateurs par fournisseur (Gmail, Outlook, IMAP/SMTP standard).
  - Isole la logique spécifique fournisseur.

- **Rule Engine (simple en v0)**
  - Applique les règles métier de campagne.
  - Détermine le “prochain template” et le “prochain envoi”.

- **Persistence Layer**
  - Base relationnelle pour les objets métier.
  - Stockage de logs événementiels.

Cette séparation permet de garder un backend lisible, testable et extensible.

---

### 3) Modèle de données métier (minimum viable)

Entités clés proposées :

- `User`
  - Informations de connexion à l’application.

- `MailboxAccount`
  - Compte mail lié à un user (provider, adresse, statut de connexion).

- `Campaign`
  - Sujet/objectif de campagne, règles globales, statut (active, pause, terminée).

- `Recipient`
  - Contact ciblé (nom, email, métadonnées).

- `CampaignRecipient`
  - État d’un destinataire dans une campagne (étape courante, dernier envoi, prochaine action).

- `Template`
  - Modèle de mail (type, version, variables).

- `MessageEvent`
  - Historique : prévu, envoyé, reçu, répondu, échec.

- `InboundMessage`
  - Mail entrant brut + classification + rattachement à un thread/campagne.

- `RuleSet`
  - Règles de relance et conditions d’arrêt.

---

### 4) Flux backend cible

1. L’utilisateur crée une campagne et importe des destinataires.
2. Le backend associe un template initial et génère des envois planifiés.
3. Le scheduler déclenche les envois au bon moment via le connecteur mail.
4. Chaque action génère un `MessageEvent`.
5. Le moteur d’analyse lit les réponses entrantes.
6. Le moteur de règles adapte la suite (relance, arrêt, changement de template).
7. L’API expose l’état à jour pour le tableau et le calendrier.

---

### 5) Solutions proposées par besoin

- **Besoin : relances fiables**
  - Solution : planification centralisée + verrouillage par destinataire pour éviter les doublons.

- **Besoin : adaptation selon réponses**
  - Solution : classification entrante + transition d’état pilotée par règles.

- **Besoin : multi-comptes mail**
  - Solution : abstraction `MailboxAccount` + connecteurs fournisseurs.

- **Besoin : visibilité produit**
  - Solution : journal événementiel standardisé exploitable dans le tableau/calendrier.

- **Besoin : sécurité**
  - Solution : secrets chiffrés, rotation possible, permissions strictes.

---

### 6) Priorités de développement (ordre recommandé)

**Phase 1 – Socle**
- Authentification utilisateur.
- Gestion des mailboxes.
- CRUD campagnes / destinataires / templates.

**Phase 2 – Automatisation**
- Scheduler + file de jobs.
- Envoi initial + relances simples basées sur le temps.

**Phase 3 – Intelligence de suivi**
- Ingestion des mails entrants.
- Rattachement aux threads.
- Classification de réponse.

**Phase 4 – Robustesse**
- Logs, métriques, retries, idempotence.
- Durcissement sécurité et conformité.

---

## Exemples de cas d’usage

- Campagnes d’envoi de mails basées sur un sujet.
- Relances automatiques en fonction des réponses reçues.
- Suivi individuel de destinataires via un tableau centralisé.
- Gestion de campagnes pour des associations, événements ou démarches administratives.
- Envoi de candidatures (exemple d’utilisation).