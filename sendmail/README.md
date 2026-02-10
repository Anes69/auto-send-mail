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

Auto-Sending-Mail est conçu comme un outil **universel** de gestion de campagnes d’envoi de mails, basé sur un **sujet** (ou contexte) et des **templates conditionnels**.

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
- naviguer entre plusieurs fonctionnalités de gestion (**campagnes**, tableau, calendrier, templates),
- préparer l’interface qui consommera plus tard l’API backend.

### Navigation / structure d’interface (concept)
L’interface est pensée comme un dashboard “**single context**” (même onglet navigateur), composé de :
- une **sidebar fixe** (ne doit pas être modifiée pour le moment : paramètres, déconnexion, sélection de mailbox active, nom projet, user actif, etc.)
- une zone de travail à droite avec des onglets type “folder” (inspiration Windows 11)
- une seule zone centrale de contenu, dans laquelle les écrans sont **injectés** (fragments PHP, pas de pages HTML complètes)

> Important : les écrans (Campagnes/Tableau/Calendrier/Templates/Compte) ne sont pas conçus pour être “ouverts comme des pages”.  
> Ils sont traités comme des **fragments** destinés à être inclus/injectés dans le conteneur de la page `home/index.php`.

### Onglets / sections (ordre)
Les “folders tabs” en haut de la zone de travail sont affichés dans l’ordre suivant :
1. **Campagnes**
2. **Templates**
3. **Tableau**
4. **Calendrier**
5. **Compte** (anciennement “mailboxes”, renommé)

---

## Onglet "Campagnes"

- Une campagne correspond à un ensemble cohérent :
  - un sujet/contexte,
  - une liste de destinataires,
  - des règles d’envoi / relance,
  - et des templates associés selon la situation.

L’objectif de cet onglet est de permettre la création et la gestion des campagnes (v0 -> v1 : surtout cadrage + UI, puis CRUD réel côté backend).

> Remarque : dans le cas spécifique “candidature / entretien d’embauche”, une campagne peut correspondre à un “poste” (au sens emploi), mais le projet reste volontairement universel.

---

## Onglet "Tableau"
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

---

## Onglet "Calendrier"
- Interface de visualisation des envois de mails passés et à venir.
- Permet de voir :
  - quand les prochains mails seront envoyés,
  - quels mails ont été envoyés à quelles listes.
- Aucune action directe en v0 : **interface informative**.

---

## Onglet "Templates"
- Interface permettant de créer et gérer des modèles de mails.
- Les templates peuvent récupérer automatiquement les informations stockées dans le tableau (variables dynamiques).
- Plusieurs types de templates sont prévus :
  - Premier envoi
  - Relance
  - Refus
  - Accepté

---

## Onglet "Compte" — idée cible

L’onglet **Compte** a vocation à devenir une **vision structurée de l’endroit où sont entreposés les mails** (une sorte de gestion des dossiers / arborescence), afin d’organiser et filtrer les messages liés à un sujet/campagne.

Idée de base (à repofiner) :
- Pour chaque campagne, créer une organisation logique des mails.

Exemple d’arborescence :

- `"nom de la campagne"/`
  - `mail envoyé/`
    - `Premier envoi/`
    - `Relance/`
  - `mail reçu/`
    - `Acceptation/`
    - `Refus/`

> Cas spécifique “candidature / entretien d’embauche” : le `"nom de la campagne"` peut être le nom d’un poste (emploi), mais la structure reste la même.

Objectifs envisagés (plus tard) :
- mieux **structurer** les retours et le suivi (envois / réponses),
- **filtrer** les mails et n’afficher que ceux qui parlent du sujet/campagne,
- préparer une logique de classement/tri exploitable par le backend (IMAP folders/labels, indexation, ou mapping interne).

> Cette partie est volontairement conceptuelle en v0 : le but est de cadrer une direction produit.

---

## Auth (v0) : Login & Register (frontend uniquement pour le moment)

### Statut
En v0, le login et le register existent côté Frontend, mais **tout fonctionne en local / mode “cible”** :
- les pages sont présentes,
- les scripts JS envoient des requêtes `fetch()` vers des endpoints backend “cibles”,
- le backend réel n’est pas encore en place (les routes sont donc à implémenter).

L’objectif est de :
- valider l’UX (forms, validations, affichage d’erreurs),
- préparer les appels API,
- préparer la future intégration de sessions/tokens.

### Login
- Page : `Frontend/login/index.php`
- Script : `Frontend/login/script.js`
- Fonctionnement :
  - Validation simple côté client (champs requis).
  - Envoi en `POST` JSON vers : `POST /Backend/auth/login`
  - Attendu côté backend (plus tard) : `{ success: true, token?: string, message?: string }`
  - Si succès :
    - stocke le token (si présent) dans `localStorage` (`auth_token`)
    - redirige vers `../home/`

> Remarque : le stockage dans `localStorage` est temporaire (v0). La cible est de gérer une auth propre (sessions/cookies HTTPOnly ou autre stratégie validée).

### Register
- Page : `Frontend/register/index.php`
- Script : `Frontend/register/script.js`
- Fonctionnement :
  - Validation côté client (champs requis, email valide, mot de passe min 6, confirmation).
  - Envoi en `POST` JSON vers : `POST /Backend/auth/register`
  - Attendu côté backend (plus tard) : `{ success: true, message?: string }`
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

## Exemples de cas d’usage

- Campagnes d’envoi de mails basées sur un sujet.
- Relances automatiques en fonction des réponses reçues.
- Suivi individuel de destinataires via un tableau centralisé.
- Gestion de campagnes pour des associations, événements ou démarches administratives.
- Envoi de candidatures (exemple d’utilisation : une campagne peut correspondre à un “poste”).