import type { Post } from "@/types";
import { supabase } from "@/lib/supabase";


/** Catégories éditoriales du blog. */
export const blogCategories: string[] = [
  "Tournage",
  "Image",
  "Son",
  "Montage",
  "Étalonnage",
  "Production",
  "Business",
  "Équipement",
];

export const posts: Post[] = [
  {
    slug: "reussir-son-premier-tournage",
    title:
      "Réussir son premier tournage : la préparation fait toute la différence",
    excerpt:
      "Un tournage ne s'improvise pas. Découvrez comment transformer une idée fragile en journée de tournage claire, fluide et exploitable au montage.",
    category: "Tournage",
    date: "2026-05-28",
    readingTime: "12 min",
    author: "Julien Mercier",
    image: "/blog/reussir-son-premier-tournage.jpg",
    featured: true,
    relatedFormationSlug: "pret-a-tourner",
    intro:
      "Un premier tournage concentre beaucoup d'enjeux : matériel, lieu, équipe, personnes filmées, temps limité, météo, autorisations et résultat attendu. La plupart des problèmes se résolvent avant le jour J avec une méthode simple : clarifier l'intention, découper le film, sécuriser la logistique et préparer la postproduction.",
    sections: [
      {
        id: "intention",
        heading: "Clarifier l'intention avant de sortir la caméra",
        body: [
          "Avant de choisir une caméra ou une optique, définissez ce que la vidéo doit produire chez le spectateur : comprendre une idée, ressentir une émotion, faire confiance à une personne, découvrir un lieu ou passer à l'action. Cette intention devient votre boussole sur le plateau.",
          "Formulez l'objectif en une phrase courte. Par exemple : « à la fin, le spectateur doit comprendre que cette formation le rend autonome sur un tournage ». Cette phrase permet d'arbitrer les plans indispensables, les questions d'interview et les plans de coupe.",
          "Précisez aussi les contraintes de diffusion : format vertical ou horizontal, durée cible, plateforme, sous-titres, charte visuelle, niveau de finition attendu. Un film pensé pour Instagram, YouTube ou une page de vente ne se prépare pas exactement de la même manière.",
        ],
      },
      {
        id: "liste-plans",
        heading: "Transformer le script en liste de plans",
        body: [
          "Le script décrit ce qui doit être dit. La liste de plans décrit ce qui doit être capturé. Pour chaque séquence, notez le sujet, l'action, la valeur de plan, le son nécessaire, les raccords à surveiller et les plans de coupe utiles.",
          "Classez les plans en trois niveaux : indispensables, utiles et bonus. Le jour J, cette hiérarchie protège le film. Si le temps manque, vous savez ce qui peut disparaître sans casser le récit.",
          "Pensez déjà au montage. Une interview a besoin de respirations, de détails, d'ambiances et de plans de contexte. Une démonstration a besoin de mains, d'objets, de réactions et de plans larges pour situer l'action.",
        ],
      },
      {
        id: "logistique",
        heading: "Sécuriser le lieu, l'équipe et les autorisations",
        body: [
          "Une logistique claire évite les décisions prises dans l'urgence. Vérifiez l'adresse exacte, l'accès, le stationnement, les horaires, les prises électriques, les ascenseurs, les zones de stockage, les bruits récurrents et les contraintes du lieu.",
          "Préparez une feuille de service, même pour une petite équipe. Elle doit indiquer les horaires, les contacts, le matériel, l'ordre de tournage, les pauses, les contraintes et les priorités de la journée.",
          "Si vous filmez dans l'espace public ou dans un lieu soumis à autorisation, renseignez-vous avant. Le droit à l'image doit aussi être anticipé pour les personnes reconnaissables lorsque la vidéo est diffusée publiquement.",
        ],
      },
      {
        id: "materiel",
        heading: "Préparer le matériel et les réglages",
        body: [
          "Une check-list utile ne liste pas seulement les objets. Elle vérifie l'usage : batteries chargées, cartes formatées, optiques nettoyées, trépied complet, micros testés, casque, câbles, multiprise, supports de sauvegarde et outils de nettoyage.",
          "Ajoutez une check-list de réglages : résolution, cadence d'image, profil couleur, balance des blancs, obturation, niveaux audio, espace disponible et format d'enregistrement. Ces erreurs sont souvent invisibles sur le moment et coûteuses au montage.",
          "Faites une prise test complète avec image et son. Réécoutez au casque. Un bruit de climatisation, un frottement de vêtement ou une saturation audio se corrige beaucoup mieux sur le plateau qu'en postproduction.",
        ],
      },
      {
        id: "postproduction",
        heading: "Finir le tournage en pensant au montage",
        body: [
          "À la fin de la journée, sauvegardez les rushes sur au moins deux supports. Gardez une organisation claire : date, projet, caméra, séquence, audio et exports éventuels. Ne formatez pas les cartes avant vérification des copies.",
          "Notez les meilleures prises, les problèmes techniques et les plans manquants. Ces informations accélèrent le montage et évitent de revoir inutilement toute la matière.",
          "Un tournage réussi n'est pas seulement une journée agréable. C'est une journée qui laisse au monteur une matière complète, lisible et exploitable.",
        ],
      },
    ],
    callout: {
      title: "Le réflexe Hors Champ",
      body: "La préparation n'est pas une contrainte : c'est ce qui vous rend disponible pour la mise en scène, les personnes filmées et les imprévus créatifs.",
    },
    sources: [
      {
        title: "Tournages à Paris",
        publisher: "Ville de Paris",
        url: "https://www.paris.fr/pages/tournages-2356",
      },
      {
        title: "Droit à l'image et respect de la vie privée",
        publisher: "Service-Public.fr",
        url: "https://www.service-public.fr/particuliers/vosdroits/F32103",
      },
      {
        title: "Premiere Pro User Guide",
        publisher: "Adobe",
        url: "https://helpx.adobe.com/premiere-pro/user-guide.html",
      },
    ],
  },
  {
    slug: "preparer-son-tournage-comme-un-pro",
    title: "Préparer son tournage comme un pro",
    excerpt:
      "Les documents, réflexes et vérifications qui permettent d'aborder une journée de tournage avec méthode et efficacité.",
    category: "Production",
    date: "2026-05-14",
    readingTime: "10 min",
    author: "Julien Mercier",
    image: "/blog/preparer-son-tournage-comme-un-pro.jpg",
    relatedFormationSlug: "technique-plateau-tournage",
    intro:
      "Un tournage professionnel se reconnaît à sa préparation. Même avec une petite équipe, une méthode claire permet de réduire les oublis, d'accélérer les décisions et de protéger la qualité du film.",
    sections: [
      {
        id: "perimetre",
        heading: "Définir précisément le périmètre",
        body: [
          "Commencez par cadrer le livrable : nombre de vidéos, durée, formats, versions, délais, langues, sous-titres, habillage graphique et validations. Beaucoup de tensions viennent d'un périmètre flou.",
          "Identifiez les contraintes non négociables : disponibilité des intervenants, horaires du lieu, météo, confidentialité, droits musicaux, droit à l'image, sécurité et accès technique.",
          "Ce cadrage évite de découvrir trop tard qu'il manque un plan, une autorisation ou une version attendue par le client.",
        ],
      },
      {
        id: "reperage",
        heading: "Faire un repérage vraiment utile",
        body: [
          "Un repérage ne sert pas seulement à trouver un décor joli. Il sert à anticiper la lumière, le bruit, les branchements, les reflets, les déplacements, les axes caméra et les zones de stockage.",
          "Photographiez les accès, les pièces, les prises électriques, les fenêtres, les obstacles et les zones bruyantes. Notez les conditions à l'heure réelle du tournage : une pièce calme le matin peut devenir inutilisable l'après-midi.",
          "Le repérage permet aussi de préparer un plan B. Savoir où se replier en cas de pluie, de bruit ou de retard peut sauver la journée.",
        ],
      },
      {
        id: "documents",
        heading: "Construire les bons documents",
        body: [
          "Trois documents suffisent souvent : un conducteur, une liste de plans et une feuille de service. Le conducteur décrit le déroulé éditorial, la liste de plans décrit la matière à tourner, la feuille de service organise la journée.",
          "Ajoutez une check-list par poste : image, son, lumière, data, accessoires et régie. Chaque item doit pouvoir être coché avant le départ.",
          "Pour une interview, préparez un guide de questions. Il ne doit pas enfermer la conversation, mais garantir que les informations essentielles seront couvertes.",
        ],
      },
      {
        id: "planning",
        heading: "Prévoir un planning qui absorbe les retards",
        body: [
          "Un planning trop optimiste crée de mauvaises décisions. Comptez l'installation, les tests, les déplacements, les pauses, le rangement et la sauvegarde. Le temps de tournage pur n'est jamais le temps total.",
          "Placez les séquences importantes quand l'équipe est fraîche et que le lieu est le plus contrôlable. Gardez les plans de coupe comme variable d'ajustement.",
          "La marge n'est pas du confort. C'est une protection contre les imprévus et contre la baisse de qualité en fin de journée.",
        ],
      },
      {
        id: "brief",
        heading: "Briefer les personnes avant le tournage",
        body: [
          "La veille, envoyez une synthèse claire : horaires, adresse, contacts, objectif, tenue, contraintes et ordre de passage. Les personnes filmées arrivent plus détendues quand elles savent ce qui les attend.",
          "Sur place, commencez par un briefing court. Rappelez le but du film, les priorités, les règles pratiques et le déroulé. Une équipe informée prend de meilleures initiatives.",
        ],
      },
    ],
    callout: {
      title: "Le réflexe Hors Champ",
      body: "Préparer comme un pro, c'est transformer l'incertitude en décisions déjà prises. Le plateau doit servir le film, pas résoudre toute la production.",
    },
    sources: [
      {
        title: "Tournages à Paris",
        publisher: "Ville de Paris",
        url: "https://www.paris.fr/pages/tournages-2356",
      },
      {
        title: "Droit à l'image et respect de la vie privée",
        publisher: "Service-Public.fr",
        url: "https://www.service-public.fr/particuliers/vosdroits/F32103",
      },
      {
        title: "Ressources pour une production responsable",
        publisher: "Ecoprod",
        url: "https://www.ecoprod.com/",
      },
    ],
  },
  {
    slug: "5-erreurs-de-montage-a-eviter",
    title: "5 erreurs de montage à éviter absolument",
    excerpt:
      "Les pièges classiques qui trahissent un montage débutant, avec des méthodes concrètes pour les corriger durablement.",
    category: "Montage",
    date: "2026-04-30",
    readingTime: "11 min",
    author: "Nadia Roussel",
    image: "/blog/5-erreurs-de-montage-a-eviter.jpg",
    relatedFormationSlug: "postproduction",
    intro:
      "Le montage n'est pas l'assemblage des meilleurs plans. C'est une écriture : chaque coupe modifie le sens, le rythme et l'émotion. Voici les erreurs les plus fréquentes et les méthodes pour les éviter.",
    sections: [
      {
        id: "organisation",
        heading: "Erreur 1 : commencer sans organiser ses rushes",
        body: [
          "Avant de couper, organisez les médias par journée, caméra, scène, interview, son, musique, graphisme et exports. Un projet clair reste compréhensible plusieurs semaines plus tard.",
          "Synchronisez le son, marquez les meilleures prises, isolez les problèmes techniques et créez une timeline de sélection. Cette étape accélère toutes les décisions suivantes.",
          "L'organisation est une compétence créative : elle libère l'attention pour le récit au lieu de la gaspiller dans la recherche de fichiers.",
        ],
      },
      {
        id: "rythme",
        heading: "Erreur 2 : confondre vitesse et rythme",
        body: [
          "Un montage rapide n'est pas forcément rythmé. Le rythme naît de l'alternance : plans longs et courts, informations denses et respirations, sons pleins et silences.",
          "Regardez votre montage sans toucher à la souris. Si vous voulez avancer, le plan est peut-être trop long. Si vous ne comprenez plus, il est peut-être trop court.",
          "Le bon rythme laisse au spectateur le temps exact de recevoir l'idée, sans expliquer trop longtemps ni couper avant la compréhension.",
        ],
      },
      {
        id: "raccords",
        heading: "Erreur 3 : négliger les raccords",
        body: [
          "Surveillez les regards, les mouvements, les positions de mains, la lumière, les accessoires et les directions de déplacement. Un faux raccord visible peut casser l'immersion.",
          "Un plan de coupe peut sauver une continuité fragile. Il permet de masquer une coupe, de donner du contexte ou de relancer l'attention.",
          "Le son aide aussi : un J-cut ou un L-cut prépare la transition et rend l'enchaînement plus fluide.",
        ],
      },
      {
        id: "son",
        heading: "Erreur 4 : traiter le son à la fin",
        body: [
          "Le son ne doit pas être ajouté après coup. Dès le premier montage, travaillez l'intelligibilité des voix, les ambiances, les niveaux et les transitions.",
          "Un montage image correct peut sembler amateur si les niveaux varient brutalement ou si les ambiances disparaissent entre deux plans.",
          "Séparez dialogues, ambiances, bruitages et musique. Cette organisation rend les corrections plus rapides et évite de dégrader tout le mix.",
        ],
      },
      {
        id: "effets",
        heading: "Erreur 5 : masquer les faiblesses avec des effets",
        body: [
          "Transitions, zooms, ralentis et effets doivent avoir une fonction narrative. S'ils servent seulement à rendre le montage plus voyant, ils affaiblissent souvent le film.",
          "Avant d'ajouter un effet, demandez-vous ce qu'il raconte : changement de temps, souvenir, rupture émotionnelle, information graphique. Si la réponse est floue, le cut simple est souvent plus fort.",
          "Gardez une cohérence de langage. Les effets peuvent fonctionner, mais ils doivent appartenir à un système lisible.",
        ],
      },
    ],
    callout: {
      title: "Le réflexe Hors Champ",
      body: "Monter, c'est choisir. Une coupe doit servir le sens, le rythme ou l'émotion. Si elle ne sert rien, elle gêne.",
    },
    sources: [
      {
        title: "Premiere Pro User Guide",
        publisher: "Adobe",
        url: "https://helpx.adobe.com/premiere-pro/user-guide.html",
      },
      {
        title: "Audio editing in Premiere Pro",
        publisher: "Adobe",
        url: "https://helpx.adobe.com/premiere-pro/using/audio-editing.html",
      },
      {
        title: "DaVinci Resolve Training",
        publisher: "Blackmagic Design",
        url: "https://www.blackmagicdesign.com/products/davinciresolve/training",
      },
    ],
  },
  {
    slug: "la-lumiere-douce-quand-et-comment-l-utiliser",
    title: "La lumière douce : quand et comment l'utiliser",
    excerpt:
      "Comprendre la lumière douce, ses effets sur les visages et les techniques simples pour l'obtenir sur un tournage.",
    category: "Image",
    date: "2026-04-16",
    readingTime: "10 min",
    author: "Élodie Vasseur",
    image: "/blog/la-lumiere-douce-quand-et-comment-l-utiliser.jpg",
    relatedFormationSlug: "technique-plateau",
    intro:
      "La lumière douce est l'un des outils les plus utiles en vidéo. Elle flatte les visages, réduit les contrastes agressifs et crée une sensation naturelle ou intime. Encore faut-il comprendre comment elle se fabrique.",
    sections: [
      {
        id: "definition",
        heading: "Comprendre ce qu'est une lumière douce",
        body: [
          "Une lumière est douce lorsque les ombres ont des transitions progressives. Une lumière dure produit au contraire des ombres nettes, avec un bord marqué.",
          "Le facteur principal est la taille apparente de la source par rapport au sujet. Une petite LED éloignée paraît dure ; la même LED diffusée dans une grande surface proche devient beaucoup plus douce.",
          "La distance compte autant que la taille. Plus la source est proche, plus elle paraît grande et plus elle adoucit les ombres.",
        ],
      },
      {
        id: "usages",
        heading: "Savoir quand l'utiliser",
        body: [
          "La lumière douce convient aux interviews, portraits, vidéos pédagogiques et contenus corporate. Elle rend les visages lisibles et réduit les marques trop dures.",
          "Elle est utile quand le décor contient déjà beaucoup de détails. Une lumière dure peut créer des ombres parasites et détourner l'attention.",
          "Elle n'est pas toujours la bonne solution. Pour une scène tendue, graphique ou très stylisée, une lumière plus dure peut donner une direction dramatique plus forte.",
        ],
      },
      {
        id: "techniques",
        heading: "Créer une lumière douce simplement",
        body: [
          "Diffuser la source est la méthode la plus directe : softbox, toile de diffusion, cadre ou rideau blanc. L'objectif est d'augmenter la surface lumineuse qui éclaire le sujet.",
          "Le rebond fonctionne très bien : diriger une source vers un mur blanc, un plafond ou un réflecteur crée une lumière enveloppante. Attention à la couleur de la surface, qui peut teinter l'image.",
          "Une fenêtre peut devenir une excellente source. Placez le sujet près d'elle, coupez les lumières parasites et ajoutez une diffusion si le soleil est trop direct.",
        ],
      },
      {
        id: "contraste",
        heading: "Garder du relief malgré la douceur",
        body: [
          "Une lumière douce peut devenir plate si elle vient de partout. Gardez une direction claire : légèrement de côté, au-dessus du regard, orientée vers le visage.",
          "Utilisez aussi le négatif : un tissu noir, un drapeau ou un simple éloignement du mur blanc peut redonner du contraste au côté opposé du visage.",
          "Le bon équilibre consiste à flatter sans effacer le modelé. Une image douce doit rester lisible et construite.",
        ],
      },
    ],
    callout: {
      title: "Le réflexe Hors Champ",
      body: "Avant d'ajouter une lampe, observez la lumière déjà présente. Le bon choix consiste souvent à déplacer, diffuser ou couper.",
    },
    sources: [
      {
        title: "Lighting resources",
        publisher: "ARRI",
        url: "https://www.arri.com/en/learn-help/lighting",
      },
      {
        title: "Diffusion materials",
        publisher: "Rosco",
        url: "https://us.rosco.com/en/products/catalog/diffusion",
      },
      {
        title: "Lighting 101",
        publisher: "Aputure",
        url: "https://www.aputure.com/blogs/lighting-101/",
      },
    ],
  },
  {
    slug: "le-son-au-service-de-votre-histoire",
    title: "Le son au service de votre histoire",
    excerpt:
      "Le son n'est pas un accessoire : c'est la moitié de l'émotion. Voici comment le penser dès le tournage.",
    category: "Son",
    date: "2026-04-02",
    readingTime: "10 min",
    author: "Karim Belhadj",
    image: "/blog/le-son-au-service-de-votre-histoire.jpg",
    relatedFormationSlug: "technique-plateau",
    intro:
      "Le public peut accepter une image imparfaite plus facilement qu'un son incompréhensible. Le son guide l'attention, installe un lieu, donne du rythme et transporte l'émotion.",
    sections: [
      {
        id: "voix",
        heading: "Priorité absolue : comprendre les voix",
        body: [
          "Dans la plupart des vidéos, la voix porte l'information principale. Si elle est lointaine, saturée ou noyée dans la réverbération, le spectateur décroche.",
          "La règle de base est simple : rapprocher le micro de la source. Un micro moyen bien placé donne souvent un meilleur résultat qu'un bon micro trop loin.",
          "Contrôlez la pièce avant la prise : climatisation, machines, téléphones, néons, vibrations et bruits de rue.",
        ],
      },
      {
        id: "micros",
        heading: "Choisir le bon micro pour la situation",
        body: [
          "Le micro cravate est pratique pour une parole stable et proche. Il faut surveiller les frottements de vêtements, bijoux, cheveux et accessoires.",
          "Le micro sur perche permet un son naturel et invisible, mais il demande un placement précis. Il doit rester proche et viser correctement la bouche ou la poitrine haute.",
          "Le micro caméra peut servir de témoin, mais il est rarement suffisant comme source principale dès que la distance augmente.",
        ],
      },
      {
        id: "niveaux",
        heading: "Régler les niveaux sans se piéger",
        body: [
          "Un niveau trop bas augmente le bruit quand on remonte le gain. Un niveau trop haut sature et devient difficile à récupérer. Gardez une marge de sécurité.",
          "Contrôlez toujours au casque. Les vumètres indiquent le niveau, pas la qualité du son : souffle, buzz, frottement ou réverbération peuvent passer inaperçus.",
          "Faites une prise test et réécoutez-la. Trente secondes de vérification peuvent sauver toute une journée.",
        ],
      },
      {
        id: "ambiances",
        heading: "Enregistrer les ambiances",
        body: [
          "Une ambiance seule, souvent appelée room tone, est indispensable au montage. Elle permet de combler les coupes et de garder la continuité du lieu.",
          "Enregistrez au moins une minute d'ambiance dans chaque lieu important, avec la même configuration sonore que pendant les prises.",
          "Les ambiances racontent aussi le hors champ : circulation, ventilation, foule, atelier, oiseaux ou pas dans un couloir.",
        ],
      },
      {
        id: "montage",
        heading: "Penser le son comme une écriture",
        body: [
          "Le montage son organise l'attention. Un J-cut peut faire entrer une voix avant l'image ; un L-cut peut laisser une phrase continuer sur un autre plan.",
          "Les bruitages renforcent les gestes et la matérialité. Trop forts, ils deviennent artificiels ; absents, l'image peut sembler vide.",
          "La musique doit soutenir le sens, pas couvrir les faiblesses. Elle ne remplace ni une voix claire ni un rythme juste.",
        ],
      },
    ],
    callout: {
      title: "Le réflexe Hors Champ",
      body: "Le son se gagne à la prise. La postproduction améliore et organise, mais elle ne remplace pas un micro bien placé.",
    },
    sources: [
      {
        title: "Microphone Techniques",
        publisher: "Shure",
        url: "https://www.shure.com/en-US/performance-production/louder/microphone-techniques-for-recording",
      },
      {
        title: "Audio editing in Premiere Pro",
        publisher: "Adobe",
        url: "https://helpx.adobe.com/premiere-pro/using/audio-editing.html",
      },
      {
        title: "Premiere Pro User Guide",
        publisher: "Adobe",
        url: "https://helpx.adobe.com/premiere-pro/user-guide.html",
      },
    ],
  },
];

/** Ressources & guides téléchargeables (liens à brancher). */
export const resources: { title: string; meta: string }[] = [
  { title: "Check-list complète de préparation de tournage", meta: "Guide PDF" },
  { title: "Les bases de la lumière en 10 schémas", meta: "Guide PDF" },
  { title: "Réglages caméra : l'aide-mémoire", meta: "Guide PDF" },
  { title: "Le glossaire de l'audiovisuel", meta: "Guide PDF" },
];

// Map database row back to camelCase Post type
export function mapDbPost(row: any): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: row.date,
    readingTime: row.reading_time,
    author: row.author,
    image: row.image || undefined,
    featured: row.featured,
    intro: row.intro,
    sections: row.sections,
    callout: row.callout || undefined,
    relatedFormationSlug: row.related_formation_slug || undefined,
    sources: row.sources || undefined,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (data) return mapDbPost(data);
  } catch (err) {
    console.warn(`Supabase getPostBySlug failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return posts.find((p) => p.slug === slug);
}

export async function getFeaturedPost(): Promise<Post> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("featured", true)
      .maybeSingle();

    if (error) throw error;
    if (data) return mapDbPost(data);
  } catch (err) {
    console.warn(`Supabase getFeaturedPost failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return posts.find((p) => p.featured) ?? posts[0];
}

export async function getRecentPosts(count = 4): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("featured", false)
      .order("date", { ascending: false })
      .limit(count);

    if (error) throw error;
    if (data && data.length > 0) return data.map(mapDbPost);
  } catch (err) {
    console.warn(`Supabase getRecentPosts failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return posts.filter((p) => !p.featured).slice(0, count);
}

export async function getPopularPosts(count = 5): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("date", { ascending: false })
      .limit(count);

    if (error) throw error;
    if (data && data.length > 0) return data.map(mapDbPost);
  } catch (err) {
    console.warn(`Supabase getPopularPosts failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return posts.slice(0, count);
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("slug");

    if (error) throw error;
    if (data && data.length > 0) return data.map((row) => row.slug);
  } catch (err) {
    console.warn(`Supabase getAllPostSlugs failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return posts.map((p) => p.slug);
}

export async function getRelatedPosts(slug: string, count = 3): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .neq("slug", slug)
      .limit(count);

    if (error) throw error;
    if (data && data.length > 0) return data.map(mapDbPost);
  } catch (err) {
    console.warn(`Supabase getRelatedPosts failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return posts.filter((p) => p.slug !== slug).slice(0, count);
}
