export default function Home() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white">
        <div className="container relative z-10 flex flex-col gap-10 py-24 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <span className="badge bg-white/20 text-white">
              Votre boutique en ligne, en 5 minutes
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              Boutik Express — la vitrine digitale des commerçants africains
            </h1>
            <p className="max-w-2xl text-lg text-blue-50">
              Présentez vos produits en ligne, recevez des commandes sur WhatsApp et
              développez votre clientèle en un clin d&apos;œil. Sans développeur, sans
              stress.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/register" className="btn-primary bg-white text-blue-600 hover:bg-blue-50">
                Créer ma boutique
              </a>
              <a href="/login" className="btn-outline border-white/50 text-white hover:bg-white/10">
                Se connecter
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100">
              <div>
                ✅ Création express de boutique
                <br />✅ Commandes via WhatsApp & SMS
              </div>
              <div>
                ✅ 10 produits gratuits
                <br />✅ Design responsive mobile
              </div>
            </div>
          </div>
          <div className="relative flex-1 rounded-3xl bg-white/10 p-6 shadow-soft backdrop-blur lg:max-w-lg">
            <div className="rounded-2xl bg-white/90 p-6 text-slate-900 shadow-lg">
              <p className="text-sm font-semibold text-blue-600">Comment ça marche ?</p>
              <ol className="mt-4 space-y-4 text-sm text-slate-600">
                <li>
                  <span className="font-semibold text-slate-900">1. Créez votre compte</span>
                  <br />Ajoutez le nom de votre commerce et vos coordonnées WhatsApp.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">2. Publiez vos produits</span>
                  <br />Photos, prix, description, catégories — tout en quelques clics.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    3. Partagez votre lien
                  </span>
                  <br />Vos clients consultent et commandent directement sur WhatsApp.
                </li>
              </ol>
              <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">
                “Avec Boutik Express, j&apos;ai créé ma boutique en ligne pendant ma pause déjeuner.
                Mes clientes m&apos;écrivent maintenant tous les jours !”
                <span className="mt-2 block font-semibold">— Aïcha, coiffeuse à Dakar</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20" />
      </section>

      <section className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Pourquoi les commerçants choisissent Boutik Express ?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Nos outils sont pensés pour les boutiques de quartier, artisans, coiffeurs,
            couturiers, réparateurs et vendeurs de marché.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Vitrine professionnelle",
              description:
                "Un design moderne, adapté aux mobiles et personnalisé avec vos couleurs.",
            },
            {
              title: "Commandes par WhatsApp",
              description:
                "Bouton direct WhatsApp ou SMS avec message prêt-à-envoyer pour vos clients.",
            },
            {
              title: "Gestion simplifiée",
              description:
                "Ajoutez, modifiez, supprimez vos produits en un clic depuis votre tableau de bord.",
            },
            {
              title: "Statistiques essentielles",
              description:
                "Suivez le nombre de vues et de contacts reçus pour mesurer vos performances.",
            },
            {
              title: "Plan gratuit généreux",
              description:
                "Publiez jusqu'à 10 produits gratuitement et passez en Premium quand vous voulez.",
            },
            {
              title: "Prêt pour l&apos;avenir",
              description:
                "Paiements mobile money, flyers auto, notifications push — déjà en préparation.",
            },
          ].map((feature) => (
            <div key={feature.title} className="card text-left">
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Ils nous font confiance</h2>
            <p className="mt-3 text-base text-slate-600">
              Des entrepreneurs inspirants, prêts à faire briller leurs talents en ligne.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Chez Aïcha",
                category: "Perruques & soins capillaires",
                quote:
                  "Je reçois des commandes tout en travaillant. C&apos;est comme une vendeuse en ligne.",
              },
              {
                name: "Couture Bella",
                category: "Vêtements sur mesure",
                quote:
                  "Mes clientes choisissent le modèle, m&apos;appellent sur WhatsApp et je lance la couture.",
              },
              {
                name: "TechPhone",
                category: "Accessoires & réparation mobile",
                quote:
                  "Boutik Express me donne une vitrine claire pour afficher promotions et tarifs.",
              },
              {
                name: "Snack Délice",
                category: "Plats locaux & jus naturels",
                quote:
                  "Je mets à jour le menu chaque matin. Les habitués commandent directement via WhatsApp.",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                  {testimonial.name}
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                  {testimonial.category}
                </p>
                <p className="mt-4 text-sm text-slate-600">“{testimonial.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="rounded-3xl bg-blue-600 px-8 py-12 text-white shadow-soft lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[2fr,1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold leading-tight">
                Lancez votre boutique en ligne dès aujourd&apos;hui
              </h2>
              <p className="mt-4 text-base text-blue-100">
                Créez votre compte gratuitement, ajoutez vos produits, partagez votre lien.
                Votre commerce mérite une présence en ligne digne de votre savoir-faire.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="/register"
                className="btn-primary bg-white text-blue-600 hover:bg-blue-50"
              >
                Créer ma boutique
              </a>
              <a href="/login" className="btn-outline border-white text-white hover:bg-white/10">
                J&apos;ai déjà un compte
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
