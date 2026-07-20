# Hors Champ Formation

Site web de **Hors Champ Formation**, organisme de formation audiovisuelle en présentiel à Paris.
Construit avec **Next.js (App Router)**, **React** et **Tailwind CSS**.

> _« Ce que vous ne voyez pas fait la différence. »_

---

## ⚙️ Stack technique

- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- **lucide-react** (icônes linéaires)
- Polices via `next/font` : **Bebas Neue**, **Barlow Condensed**, **Inter**, **IBM Plex Mono**

---

## 🚀 Lancer le projet en local

Prérequis : **Node.js 18.18+** (Node 20 recommandé).

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev
```

Le site est alors disponible sur **http://localhost:3000**.

### Autres commandes

```bash
npm run build   # build de production
npm run start   # démarre le build de production
npm run lint    # analyse ESLint
```

---

## 🎨 Design system

Direction : **premium, minimaliste, typographique**. Monochrome strict (noir / blanc /
gris), inspiré du cinéma et de la postproduction. Élément signature : le **cadre de
viseur** (repères d'angle, grille règle des tiers) et la **numérotation en timecode**.

### Palette (tokens Tailwind)

| Token | Hex | Usage |
| --- | --- | --- |
| `canvas` | `#F7F6F2` | Fond principal |
| `paper` | `#FFFFFF` | Cartes / surfaces |
| `ink` | `#0A0A0A` | Texte fort, boutons |
| `ink.deep` | `#050505` | Footer, blocs de contraste |
| `muted` | `#565656` | Texte secondaire |
| `line` | `#D8D8D8` | Filets / séparateurs |
| `ghost` | `#B8B8B8` | Grands mots typographiques en fond |

### Typographies (familles Tailwind)

| Famille | Police | Rôle |
| --- | --- | --- |
| `font-display` | Bebas Neue | Mots géants & grands titres |
| `font-condensed` | Barlow Condensed | Titres condensés, labels, boutons |
| `font-sans` | Inter | Corps de texte |
| `font-mono` | IBM Plex Mono | Timecodes, durées, métadonnées |

Les tokens sont définis dans [`tailwind.config.ts`](./tailwind.config.ts) et
[`app/globals.css`](./app/globals.css).

---

## 🗂️ Structure du projet

```
app/                      Pages (App Router) + SEO (sitemap, robots)
├─ page.tsx               Accueil
├─ formations/            Liste + [slug] (détail)
├─ methode/               Méthode / À propos
├─ financement/           Financement / Inscription
├─ temoignages/           Témoignages
├─ contact/               Contact
└─ blog/                  Blog + [slug] (article)

components/
├─ layout/                Header, Footer, Container, Section, StickyMobileCTA…
├─ ui/                    CTAButton, SectionLabel, Reveal, ImagePlaceholder…
├─ cards/                 FormationCard, StatCard, TestimonialCard, BlogCard…
├─ sections/              Hero, StepTimeline, FAQAccordion, CTASection…
├─ formation/             FormationSummaryCard, ProgramTimeline, ForWhoColumns
└─ forms/                 ContactForm

data/                     Contenus éditoriaux (source unique de vérité)
lib/                      Helpers (SEO, utils)
types/                    Types TypeScript partagés
```

---

## ✏️ Modifier les contenus

Tout le contenu éditorial est centralisé dans `data/` :

- **Formations** → [`data/formations.ts`](./data/formations.ts)
- **Témoignages** → [`data/testimonials.ts`](./data/testimonials.ts)
- **Articles de blog** → [`data/posts.ts`](./data/posts.ts)
- **FAQ** → [`data/faq.ts`](./data/faq.ts)
- **Chiffres clés** → [`data/stats.ts`](./data/stats.ts)
- **Financement & inscription** → [`data/financing.ts`](./data/financing.ts)
- **Équipe / formateurs** → [`data/team.ts`](./data/team.ts)
- **Coordonnées & navigation** → [`data/navigation.ts`](./data/navigation.ts)

> ⚠️ **Chiffres** : les statistiques de `data/stats.ts` sont **indicatives**. Elles ne
> doivent pas être présentées comme certifiées tant qu'elles ne sont pas validées.

---

## 🖼️ Images

Les emplacements de photos sont rendus par le composant
[`ImagePlaceholder`](./components/ui/ImagePlaceholder.tsx) (cadre de viseur gris).
Remplacez-le par le composant `next/image` lorsque les photos réelles (noir & blanc,
utilisées avec parcimonie) seront disponibles dans `public/images/`.

---

## 🔍 SEO

- `title` / `description` uniques par page (`lib/seo.ts`)
- Un seul `<h1>` par page, `<h2>` structurés
- Données structurées JSON-LD : `EducationalOrganization`, `Course`, `Article`, `BreadcrumbList`
- `app/sitemap.ts` et `app/robots.ts`

> Pensez à mettre à jour l'URL de production dans [`data/navigation.ts`](./data/navigation.ts)
> (`site.url`) ainsi que les coordonnées réelles avant la mise en ligne.

---

## 📄 Pages

| Route | Page |
| --- | --- |
| `/` | Accueil |
| `/formations` | Liste des formations (filtres) |
| `/formations/[slug]` | Détail d'une formation |
| `/methode` | Méthode / À propos |
| `/financement` | Financement / Inscription |
| `/temoignages` | Témoignages |
| `/contact` | Contact |
| `/blog` | Blog |
| `/blog/[slug]` | Article de blog |
