# Audit SEO — Hors Champ Formation

**Type d'audit :** code-level (LLM-first), projet Next.js local
**Date :** 2026-06-18
**Périmètre :** 9 modèles de pages (App Router), JSON-LD, sitemap, robots, metadata
**Score global : 83 → 87 / 100 — Bon (Good)**

> 🔼 **Mise à jour post-optimisation.** Après le lot SEO (schema `Course` enrichi +
> `CourseInstance`, `WebSite` + `sameAs`, titres ≤ 60 car., maillage interne « formations
> liées », liens externes d'autorité, `llms.txt`, mots-clés par page), le score on-site
> passe de **83 à ~87**. Le plafond restant (E-E-A-T réel, images réelles, domaine, backlinks)
> dépend du contenu et de l'off-site — voir `SEO-OPTIMISATION.md`.

> ⚠️ **Limitation d'environnement.** Le site n'est pas encore déployé sur une URL publique.
> Les mesures live (Core Web Vitals via PageSpeed, crawl réel, vérification HTTPS/headers,
> liens cassés) n'ont pas pu être exécutées. Les catégories concernées sont évaluées à partir
> de l'architecture du code avec un niveau de confiance « Probable », non « Confirmé ».

---

## Score par catégorie

| Catégorie | Poids | Score | Pondéré | Confiance |
|---|---|---|---|---|
| Technical SEO | 25 % | 90 | 22,5 | Confirmé (code) |
| Content Quality / E-E-A-T | 20 % | 78 | 15,6 | Confirmé |
| On-Page SEO | 15 % | 85 | 12,75 | Confirmé |
| Schema / Données structurées | 15 % | 85 | 12,75 | Confirmé |
| Performance (CWV) | 10 % | 90 | 9,0 | Probable (non mesuré) |
| Image Optimization | 10 % | 70 | 7,0 | Confirmé |
| AI Search Readiness (GEO) | 5 % | 75 | 3,75 | Confirmé |
| **TOTAL** | **100 %** | | **83,35 → 83** | |

---

## ✅ Points forts (Pass)

- **Architecture statique (SSG)** : 29 routes prérendues, ~102–114 kB First Load JS. Excellent socle pour le SEO et les CWV.
- **`generateMetadata` sur toutes les pages** : `title` + `description` uniques, `openGraph`, `twitter`, `canonical` (`alternates.canonical`).
- **`metadataBase`**, `lang="fr"`, balises `robots: index, follow`.
- **Données structurées JSON-LD** : `EducationalOrganization` (global), `Course` (formations), `Article` (blog), `BreadcrumbList` (toutes les pages clés).
- **`sitemap.ts`** dynamique (pages statiques + formations + articles) et **`robots.ts`** référençant le sitemap.
- **Hiérarchie des titres** : un seul `<h1>` par page, `<h2>` structurés, `<h3>` cohérents.
- **Image Open Graph générée** dynamiquement (`app/opengraph-image.tsx`, 1200×630).
- **Mots-clés cibles** intégrés naturellement (formation audiovisuelle Paris, tournage, cadrage, lumière, prise de son, montage, postproduction, étalonnage…).
- **Maillage interne** dense et cohérent (header, footer, CTA, formations liées, articles connexes, breadcrumbs).
- **Accessibilité** (facteur SEO indirect) : skip link, focus visible, ARIA accordéon, `prefers-reduced-motion`.

---

## 🔴 Critiques (à corriger avant mise en ligne)

| # | Finding | Évidence | Impact | Fix |
|---|---|---|---|---|
| C1 | **Domaine factice** | `data/navigation.ts` → `site.url = "https://www.horschamp-formation.fr"` | Tous les `canonical`, OG `url`, sitemap et robots pointent vers un domaine non confirmé. Risque d'indexation incorrecte. | Renseigner le domaine réel de production. |
| C2 | **E-E-A-T fictif** | Formateurs, témoignages, coordonnées (`data/team.ts`, `testimonials.ts`, `navigation.ts`) sont des placeholders. | E-E-A-T s'applique à toutes les requêtes concurrentielles (déc. 2025). Données fictives = signal faible/risque de confiance. | Remplacer par de vrais profils, avis vérifiés, adresse/SIRET réels. |
| C3 | **Coordonnées et adresse placeholder** | `site.address.street = "00 rue du Cinéma"`, téléphone factice | NAP (Name-Address-Phone) incohérent = mauvais SEO local Paris. | Renseigner l'adresse, le téléphone et créer une fiche Google Business Profile. |

---

## ⚠️ Avertissements (optimisations sous 1 mois)

| # | Finding | Évidence | Impact | Fix |
|---|---|---|---|---|
| W1 | **Meta titles trop longs** | méthode ≈83 car., blog ≈81, titres d'articles ≈92 (avec suffixe « — Hors Champ Formation ») | Troncature en SERP (~60 car.), perte de mots-clés en fin de titre. | Raccourcir les titres ou les passer en `rawTitle` avec un libellé court. |
| W2 | **Schema `Course` minimal** | `lib/seo.ts` → `courseJsonLd` n'inclut ni `offers`, ni `hasCourseInstance` (dates, lieu, mode présentiel), ni `provider` détaillé. | Manque les rich results « Course » (durée, lieu, prix). | Enrichir avec `hasCourseInstance` (`courseMode: "onsite"`, `location` Paris) et `offers`. |
| W3 | **Pas de `WebSite` + `SearchAction`** | Aucun schéma `WebSite` global. | Pas de sitelinks searchbox potentielle. | Ajouter `WebSite` JSON-LD dans le layout. |
| W4 | **Pas de `llms.txt`** | Absent de `public/`. | Réduit la lisibilité par les moteurs d'IA (GEO/AEO). | Ajouter `public/llms.txt` listant les pages clés. |
| W5 | **Contenu blog modéré** | 5 articles, ~500–800 mots, sections courtes. | Profondeur insuffisante pour des requêtes concurrentielles. | Étoffer à 1 200–1 800 mots, ajouter exemples, FAQ, médias. |
| W6 | **Images réelles absentes** | `ImagePlaceholder` (CSS) partout, pas de `next/image`. | Aucune valeur SEO image, pas d'`alt` descriptif, pas d'Image/Video schema. | Au remplacement : `next/image` + `alt` riche en mots-clés + noms de fichiers descriptifs. |

---

## ℹ️ Informations / Conformité

- **FAQPage schema NON utilisé** — ✅ correct : restreint aux sites gouvernementaux/santé depuis août 2023. Les FAQ restent en HTML accessible.
- **HowTo schema NON utilisé** — ✅ correct : rich results supprimés (sept. 2023).
- **INP** : aucune référence obsolète à FID. ✅
- **Mobile-first** : design responsive complet, aucun débordement horizontal mesuré (375 px). ✅
- **Crawlers IA** : `robots.ts` autorise tout (`allow: "/"`), GPTBot/ClaudeBot/PerplexityBot inclus. ✅

---

## Performance (CWV) — estimation architecture (non mesurée)

| Métrique | Estimation | Raison |
|---|---|---|
| LCP | Bon | Hero textuel (pas d'image lourde), SSG, `next/font` avec `display: swap`. |
| CLS | Bon | Polices auto-hébergées (`next/font` gère le `size-adjust`), pas d'images sans dimensions. |
| INP | Bon | JS client minimal (header, accordéon, filtres, formulaire), aucune lib lourde. |

> À confirmer après déploiement via PageSpeed Insights sur l'URL réelle.

---

## Détail des scores

- **Technical 90** : socle excellent ; –10 pour domaine factice (C1) et absence `llms.txt` (W4).
- **Content 78** : contenu unique et bien rédigé ; –22 pour E-E-A-T fictif (C2) et profondeur blog (W5).
- **On-Page 85** : structure et metadata solides ; –15 pour titres trop longs (W1).
- **Schema 85** : couverture large et correcte ; –15 pour `Course` minimal (W2) et absence `WebSite/SearchAction` (W3).
- **Performance 90** : architecture idéale ; score « Probable » (non mesuré live).
- **Image 70** : approche placeholder propre mais aucune image réelle optimisée (W6).
- **GEO 75** : contenu très structuré et exploitable par les IA ; –25 pour absence `llms.txt`.

---

## Verdict

Le site est **techniquement excellent et prêt à indexer** côté code. Le score de 83 est plafonné
par des éléments **pré-lancement** (domaine, coordonnées, E-E-A-T fictifs, images réelles absentes),
non par des défauts de conception. Après correction des 3 points critiques (C1–C3) et des titres (W1),
le score atteignable est de l'ordre de **92–95 / 100**.

Voir `ACTION-PLAN.md` pour le plan d'action priorisé.
