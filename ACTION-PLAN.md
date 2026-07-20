# Plan d'action SEO — Hors Champ Formation

Score actuel : **83 / 100 (Bon)** · Score cible après corrections : **92–95 / 100**

Priorisation : 🔴 avant mise en ligne · ⚠️ sous 1 mois · 🟢 amélioration continue.

---

## 🔴 Bloquants (avant déploiement)

1. **Renseigner le domaine de production** — `data/navigation.ts` → `site.url`.
   Impacte canonical, OG, sitemap, robots. *(5 min)*
2. **Remplacer les coordonnées réelles** — adresse, téléphone, e-mail dans `data/navigation.ts`.
   Créer une fiche **Google Business Profile** (SEO local Paris). *(30 min + GBP)*
3. **Vrais signaux E-E-A-T** — formateurs réels (`data/team.ts`), avis vérifiés
   (`data/testimonials.ts`), validation des chiffres (`data/stats.ts`). *(selon contenu)*
4. **Raccourcir les meta titles > 60 caractères** — `app/methode`, `app/blog`,
   et les titres d'articles (`generateMetadata` de `app/blog/[slug]`). *(20 min)*

---

## ⚠️ Court terme (sous 1 mois)

5. **Enrichir le schema `Course`** — ajouter `hasCourseInstance`
   (`courseMode: "onsite"`, `location` Paris, `startDate`) et `offers` (prix) dans
   `lib/seo.ts → courseJsonLd`. Active les rich results Course. *(1 h)*
6. **Ajouter le schema `WebSite`** (+ `SearchAction` si recherche interne) dans `app/layout.tsx`. *(20 min)*
7. **Créer `public/llms.txt`** — liste structurée des pages clés pour les moteurs d'IA (GEO/AEO). *(20 min)*
8. **Remplacer les `ImagePlaceholder` par de vraies photos N&B** via `next/image`
   (attributs `alt` riches en mots-clés, noms de fichiers descriptifs, `width`/`height`). *(selon photos)*
9. **Étoffer les articles de blog** à 1 200–1 800 mots, avec exemples concrets et FAQ. *(rédaction)*

---

## 🟢 Amélioration continue

10. **Déployer puis mesurer les CWV** sur PageSpeed Insights (URL réelle) et corriger si besoin.
11. **Google Search Console + sitemap** : soumettre `sitemap.xml`, suivre l'indexation.
12. **Maillage éditorial** : relier chaque article à 1–2 formations et inversement (déjà amorcé).
13. **Pages locales / requêtes longue traîne** : « formation tournage Paris », « formation étalonnage Paris », etc.
14. **Programme PDF réel** derrière les CTA « Télécharger le programme » (capture de leads + valeur).
15. **Avis structurés** : quand des avis réels existeront, envisager `Review`/`AggregateRating`
    (avec parcimonie et conformité Google).

---

## Récapitulatif des fichiers à éditer

| Action | Fichier |
|---|---|
| Domaine, coordonnées | `data/navigation.ts` |
| Formateurs / témoignages / chiffres | `data/team.ts`, `data/testimonials.ts`, `data/stats.ts` |
| Titres trop longs | `app/methode/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` |
| Schema Course / WebSite | `lib/seo.ts`, `app/layout.tsx` |
| llms.txt | `public/llms.txt` (à créer) |
| Images réelles | composant `next/image` en remplacement de `ImagePlaceholder` |
