# Optimisation SEO — Hors Champ Formation

Document de référence : ce qui a été optimisé **dans le code** + le plan **hors-site**
(mots-clés, maillage interne, liens externes, **backlinks**).

---

## 1. Mots-clés — carte par page (keyword mapping)

| Page | Mot-clé principal | Mots-clés secondaires |
|---|---|---|
| Accueil `/` | formation audiovisuelle Paris | formation vidéo Paris, apprendre à filmer, formation vidéaste |
| Formations `/formations` | formation audiovisuelle Paris | formation tournage Paris, cadrage, lumière, prise de son, montage, étalonnage |
| Prêt à tourner | formation tournage | prise de vue, son, lumière, formation vidéaste Paris |
| Cadrage | formation cadrage | composition, exposition, valeurs de plan |
| Lumière | formation lumière | schéma trois points, lumière douce |
| Prise de son | formation prise de son | micro-cravate, perche, captation |
| Montage | formation montage vidéo | dérushage, rythme, raccords |
| Mixage | formation mixage | nettoyage audio, loudness |
| Étalonnage | formation étalonnage | correction colorimétrique, look |
| Méthode `/methode` | pédagogie formation audiovisuelle | formation par la pratique, formateurs en activité |
| Financement `/financement` | financement formation CPF | France Travail, AFDAS, OPCO, financement formation Paris |
| Blog `/blog` | conseils audiovisuel | conseils tournage, conseils montage |
| Article | (mot-clé de l'article) | catégorie + formation audiovisuelle Paris |

> **Règle d'or** : 1 page = 1 mot-clé principal. Éviter la cannibalisation (deux pages
> visant le même mot-clé). Densité naturelle, pas de bourrage.

### Mots-clés intégrés dans le code
- `title` + `meta description` uniques par page (≤ 60 car. pour les titres en SERP).
- `meta keywords` par page (`buildMetadata({ keywords })`).
- H1 unique + H2 riches en mots-clés.
- Données structurées `Course` avec `teaches`, `educationalLevel`, `courseMode: onsite`, `location: Paris`.

---

## 2. Maillage interne (implémenté)

✅ **En place dans le code :**
- Header + footer (navigation sitewide).
- Footer : colonnes « Formations » et « L'organisme » (liens profonds).
- **Formations liées** sur chaque page formation (3 liens contextuels, ancres = noms de formations).
- **Formation recommandée** + **articles connexes** sur chaque article de blog.
- CTA croisés blog ↔ formations, formations ↔ contact/financement.
- Fil d'Ariane (breadcrumbs) sur toutes les pages + `BreadcrumbList` JSON-LD.
- `parcours recommandés` (page formations) → liens vers parcours.

### Bonnes pratiques de maillage à poursuivre
- Lier chaque **nouvel article** à 2–3 autres articles et à 1 formation (ancre descriptive).
- Depuis les pages formation, lier vers les articles de blog pertinents (ex. « Cadrage » → article « lumière douce »).
- Garder les pages importantes à **≤ 3 clics** de l'accueil (déjà le cas).
- Ancres variées et descriptives (« formation tournage à Paris ») plutôt que « cliquez ici ».

---

## 3. Liens externes sortants (implémenté)

✅ Liens d'autorité ajoutés (renforcent la pertinence thématique et la confiance) :
- Page **Financement** → Mon Compte Formation (CPF), France Travail, AFDAS, OPCO
  (`target="_blank" rel="noopener noreferrer"`, sites officiels `.gouv`).
- **Footer** → profils sociaux (Instagram, LinkedIn, YouTube) + `sameAs` dans le JSON-LD `Organization`.

> Lier vers des sources officielles de qualité est un signal positif. Garder ces liens
> en `rel="noopener noreferrer"` ; ne pas mettre `nofollow` sur des sources d'autorité.

---

## 4. Backlinks — plan d'acquisition (HORS-SITE)

> ⚠️ Les backlinks ne se créent **pas depuis le code** : ce sont d'autres sites qui
> pointent vers le vôtre. Voici le plan d'action priorisé, du plus rapide au plus long.

### Niveau 1 — Fondations (citations & annuaires, semaines 1–4)
- [ ] **Google Business Profile** (fiche établissement Paris) — adresse, horaires, photos, avis.
- [ ] **Bing Places**, **Pages Jaunes**, **Apple Plans**.
- [ ] Annuaires **formation** : Mon Compte Formation / EDOF (si Qualiopi), Maformation, Kelformation, Emagister, Formation.com.
- [ ] **CARIF-OREF Île-de-France (Défi métiers)** — référencement régional de l'offre de formation.
- [ ] Annuaires locaux Paris / CCI Paris Île-de-France.
> NAP (Nom-Adresse-Téléphone) **strictement identique** partout.

### Niveau 2 — Autorité sectorielle (mois 1–3)
- [ ] **Certification Qualiopi** → page dédiée + logo (ouvre l'accès aux financements et à l'EDOF/CPF, fort signal de confiance).
- [ ] Partenariats : **loueurs de matériel** (caméra/lumière), **studios**, **associations de vidéastes**, écoles → échanges de visibilité et liens.
- [ ] Profils **Vimeo / YouTube** avec lien, **LinkedIn entreprise** + pages formateurs.

### Niveau 3 — Digital PR & contenu linkable (continu)
- [ ] **Linkable assets** : guides PDF (déjà prévus), **glossaire de l'audiovisuel**, check-lists, éventuelle « calculatrice de budget tournage ». Le contenu utile attire des liens naturels.
- [ ] **Articles invités** sur des blogs vidéo / création de contenu.
- [ ] **Interviews / tribunes** des formateurs (presse spécialisée, podcasts).
- [ ] Relations avec créateurs/influenceurs vidéo (mentions, retours d'expérience).

### Niveau 4 — Confiance & avis (continu)
- [ ] Avis **Google**, **Trustpilot** (signaux de confiance ; pas des backlinks mais E-E-A-T).
- [ ] Témoignages réels d'apprenants (remplacer les placeholders de `data/testimonials.ts`).

### Profil d'ancres (varier pour rester naturel)
- ~40 % **marque** : « Hors Champ Formation », « Hors Champ ».
- ~30 % **génériques/URL** : « voir la formation », l'URL nue.
- ~30 % **mots-clés** : « formation tournage Paris », « formation étalonnage », etc.
> Éviter la sur-optimisation d'ancres exactes (risque de pénalité).

---

## 5. Suivi & pilotage

- [ ] **Google Search Console** : valider le domaine, soumettre `sitemap.xml`, suivre l'indexation et les requêtes.
- [ ] **Bing Webmaster Tools**.
- [ ] Mesurer les **Core Web Vitals** sur l'URL réelle (PageSpeed Insights).
- [ ] Suivre les backlinks avec Ahrefs / Semrush / GSC (rapport « Liens »).
- [ ] Revue trimestrielle : nouveaux contenus, maillage, mots-clés en progression.

---

## 6. Pré-requis avant que le SEO décolle (rappel)

À renseigner dans `data/navigation.ts` et le contenu :
1. **Domaine de production** réel (`site.url`).
2. **Coordonnées réelles** (adresse, téléphone) — cohérence NAP.
3. **Profils sociaux** réels (`site.social`).
4. **E-E-A-T réel** : formateurs, avis, certification Qualiopi.
5. **Photos réelles** (N&B) via `next/image` avec `alt` riche en mots-clés.

Une fois ces points traités + le Niveau 1 d'acquisition lancé, le score passe de
**83** à **92–95** et l'autorité de domaine commence à se construire.
