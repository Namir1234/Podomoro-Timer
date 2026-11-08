/* ============================================================
   DATEN & HILFSFUNKTIONEN
   Alles wird im localStorage des Browsers gespeichert.
   Zitate: t = Text { de, en, fr, it, hu }, a = Autor (Text oder { de, en, … }), n = Zusätze wie "attr" (zugeschrieben)
   ============================================================ */
const PROVERB = { de: "Sprichwort", en: "Proverb", fr: "Proverbe", it: "Proverbio", hu: "Közmondás" };
const CN_PROVERB = { de: "Chinesisches Sprichwort", en: "Chinese proverb", fr: "Proverbe chinois", it: "Proverbio cinese", hu: "Kínai közmondás" };
const UNKNOWN = { de: "Unbekannt", en: "Unknown", fr: "Inconnu", it: "Sconosciuto", hu: "Ismeretlen" };

const QUOTES = [
  { t: { de: "Es ist nicht genug zu wissen, man muss auch anwenden.", en: "Knowing is not enough; we must apply.", fr: "Il ne suffit pas de savoir, il faut aussi appliquer.", it: "Non basta sapere, bisogna anche applicare.", hu: "Nem elég tudni, alkalmazni is kell." }, a: "Johann Wolfgang von Goethe" },
  { t: { de: "Die einzige Art, grossartige Arbeit zu leisten, ist zu lieben, was man tut.", en: "The only way to do great work is to love what you do.", fr: "La seule façon de faire du bon travail, c’est d’aimer ce que l’on fait.", it: "L’unico modo di fare un ottimo lavoro è amare quello che fai.", hu: "Nagyszerű munkát csak úgy végezhetsz, ha szereted, amit csinálsz." }, a: "Steve Jobs" },
  { t: { de: "Es scheint immer unmöglich, bis es geschafft ist.", en: "It always seems impossible until it's done.", fr: "Cela semble toujours impossible, jusqu’à ce que ce soit fait.", it: "Sembra sempre impossibile finché non viene fatto.", hu: "Mindig lehetetlennek tűnik, amíg meg nem csinálják." }, a: "Nelson Mandela" },
  { t: { de: "Erfolg ist die Summe kleiner Anstrengungen, die Tag für Tag wiederholt werden.", en: "Success is the sum of small efforts, repeated day in and day out.", fr: "Le succès est la somme de petits efforts, répétés jour après jour.", it: "Il successo è la somma di piccoli sforzi, ripetuti giorno dopo giorno.", hu: "A siker apró erőfeszítések összege, amelyeket nap mint nap megismételünk." }, a: "Robert Collier" },
  { t: { de: "Ob du denkst, du kannst es, oder du kannst es nicht – du hast recht.", en: "Whether you think you can, or you think you can't – you're right.", fr: "Que vous pensiez pouvoir le faire ou non, vous avez raison.", it: "Che tu pensi di potercela fare o di non potercela fare, hai ragione.", hu: "Akár azt hiszed, hogy képes vagy rá, akár azt, hogy nem – igazad van." }, a: "Henry Ford" },
  { t: { de: "Fall siebenmal hin, steh achtmal auf.", en: "Fall seven times, stand up eight.", fr: "Tombe sept fois, relève-toi huit.", it: "Cadi sette volte, rialzati otto.", hu: "Ess el hétszer, állj fel nyolcszor." }, a: { de: "Japanisches Sprichwort", en: "Japanese proverb", fr: "Proverbe japonais", it: "Proverbio giapponese", hu: "Japán közmondás" } },
  { t: { de: "Ich fürchte nicht den, der 10'000 verschiedene Kicks geübt hat, sondern den, der einen Kick 10'000 Mal geübt hat.", en: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.", fr: "Je ne crains pas celui qui a pratiqué 10 000 coups de pied une fois, mais celui qui a pratiqué un coup de pied 10 000 fois.", it: "Non temo chi ha praticato 10.000 calci una volta, ma chi ha praticato un calcio 10.000 volte.", hu: "Nem attól tartok, aki 10 000 különböző rúgást gyakorolt egyszer, hanem attól, aki egy rúgást gyakorolt 10 000-szer." }, a: "Bruce Lee", n: ["attr"] },
  { t: { de: "Das Geheimnis des Vorankommens ist, anzufangen.", en: "The secret of getting ahead is getting started.", fr: "Le secret pour avancer, c’est de commencer.", it: "Il segreto per andare avanti è iniziare.", hu: "Az előrejutás titka az, hogy elkezded." }, a: "Mark Twain", n: ["attr"] },
  { t: { de: "Du musst nicht gross sein, um anzufangen, aber du musst anfangen, um gross zu werden.", en: "You don't have to be great to start, but you have to start to be great.", fr: "Pas besoin d’être grand pour commencer, mais il faut commencer pour devenir grand.", it: "Non devi essere grande per iniziare, ma devi iniziare per diventare grande.", hu: "Nem kell nagyszerűnek lenned ahhoz, hogy elkezdd, de el kell kezdened ahhoz, hogy nagyszerű légy." }, a: "Zig Ziglar" },
  { t: { de: "Phantasie ist wichtiger als Wissen.", en: "Imagination is more important than knowledge.", fr: "L’imagination est plus importante que le savoir.", it: "L’immaginazione è più importante della conoscenza.", hu: "A képzelet fontosabb a tudásnál." }, a: "Albert Einstein" },
  { t: { de: "Wir sind, was wir wiederholt tun. Vortrefflichkeit ist daher keine Handlung, sondern eine Gewohnheit.", en: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", fr: "Nous sommes ce que nous faisons de manière répétée. L’excellence n’est donc pas un acte, mais une habitude.", it: "Siamo ciò che facciamo ripetutamente. L’eccellenza, quindi, non è un atto ma un’abitudine.", hu: "Azok vagyunk, amit ismételten teszünk. A kiválóság tehát nem cselekedet, hanem szokás." }, a: "Will Durant" },
  { t: { de: "Ich habe in meinem Leben immer wieder versagt. Und deshalb habe ich Erfolg.", en: "I've failed over and over and over again in my life. And that is why I succeed.", fr: "J’ai échoué encore et encore dans ma vie. Et c’est pour cela que je réussis.", it: "Nella mia vita ho fallito più e più volte. Ed è per questo che ho successo.", hu: "Életemben újra és újra kudarcot vallottam. És ezért vagyok sikeres." }, a: "Michael Jordan" },
  { t: { de: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.", en: "Those who fight can lose. Those who don't fight have already lost.", fr: "Celui qui se bat peut perdre. Celui qui ne se bat pas a déjà perdu.", it: "Chi lotta può perdere. Chi non lotta ha già perso.", hu: "Aki harcol, veszíthet. Aki nem harcol, már veszített." }, a: "Bertolt Brecht" },
  { t: { de: "Der beste Zeitpunkt, einen Baum zu pflanzen, war vor 20 Jahren. Der zweitbeste ist jetzt.", en: "The best time to plant a tree was 20 years ago. The second best time is now.", fr: "Le meilleur moment pour planter un arbre, c’était il y a 20 ans. Le deuxième meilleur moment, c’est maintenant.", it: "Il momento migliore per piantare un albero era 20 anni fa. Il secondo momento migliore è adesso.", hu: "A legjobb idő egy fa elültetésére 20 évvel ezelőtt volt. A második legjobb most van." }, a: CN_PROVERB },
  { t: { de: "Der Weg von tausend Meilen beginnt mit dem ersten Schritt.", en: "The journey of a thousand miles begins with a single step.", fr: "Un voyage de mille lieues commence par un premier pas.", it: "Un viaggio di mille miglia comincia con il primo passo.", hu: "Az ezer mérföldes út is egyetlen lépéssel kezdődik." }, a: "Laozi" },
  { t: { de: "Bildung ist die mächtigste Waffe, die du verwenden kannst, um die Welt zu verändern.", en: "Education is the most powerful weapon which you can use to change the world.", fr: "L’éducation est l’arme la plus puissante que l’on puisse utiliser pour changer le monde.", it: "L’istruzione è l’arma più potente che puoi usare per cambiare il mondo.", hu: "Az oktatás a leghatásosabb fegyver, amellyel megváltoztathatod a világot." }, a: "Nelson Mandela" },
  { t: { de: "Was ich nicht weiss, macht mich neugierig.", en: "What I don't know makes me curious.", fr: "Ce que je ne sais pas me rend curieuse.", it: "Ciò che non so mi rende curiosa.", hu: "Amit nem tudok, az kíváncsivá tesz." }, a: "Marie Curie", n: ["para"] },
  { t: { de: "Disziplin ist die Brücke zwischen Zielen und Erfolg.", en: "Discipline is the bridge between goals and accomplishment.", fr: "La discipline est le pont entre les objectifs et la réussite.", it: "La disciplina è il ponte tra gli obiettivi e i risultati.", hu: "A fegyelem a híd a célok és a megvalósítás között." }, a: "Jim Rohn" },
  { t: { de: "Wer andere kennt, ist klug. Wer sich selbst kennt, ist weise.", en: "Knowing others is intelligence; knowing yourself is true wisdom.", fr: "Connaître les autres, c’est être intelligent ; se connaître soi-même, c’est être sage.", it: "Chi conosce gli altri è intelligente; chi conosce sé stesso è saggio.", hu: "Aki másokat ismer, okos. Aki önmagát ismeri, bölcs." }, a: "Laozi" },
  { t: { de: "Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.", en: "It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.", fr: "Ce n’est pas parce que les choses sont difficiles que nous n’osons pas, c’est parce que nous n’osons pas qu’elles sont difficiles.", it: "Non è perché le cose sono difficili che non osiamo, è perché non osiamo che sono difficili.", hu: "Nem azért nem merünk, mert a dolgok nehezek, hanem azért nehezek, mert nem merünk." }, a: "Seneca" },
  { t: { de: "Solange du lebst, lerne zu leben.", en: "As long as you live, keep learning how to live.", fr: "Tant que tu vis, apprends à vivre.", it: "Finché vivi, continua a imparare a vivere.", hu: "Amíg élsz, tanulj meg élni." }, a: "Seneca" },
  { t: { de: "Was im Weg steht, wird zum Weg.", en: "What stands in the way becomes the way.", fr: "Ce qui fait obstacle devient le chemin.", it: "Ciò che ostacola il cammino diventa il cammino.", hu: "Ami az utadba áll, az lesz az út." }, a: { de: "Marc Aurel", en: "Marcus Aurelius", fr: "Marc Aurèle", it: "Marco Aurelio", hu: "Marcus Aurelius" }, n: ["para"] },
  { t: { de: "Es sind nicht die Dinge, die uns beunruhigen, sondern unsere Urteile über die Dinge.", en: "It is not things that disturb us, but our judgments about things.", fr: "Ce ne sont pas les choses qui nous troublent, mais les jugements que nous portons sur elles.", it: "Non sono le cose a turbarci, ma i giudizi che diamo sulle cose.", hu: "Nem a dolgok nyugtalanítanak minket, hanem a dolgokról alkotott ítéleteink." }, a: { de: "Epiktet", en: "Epictetus", fr: "Épictète", it: "Epitteto", hu: "Epiktétosz" } },
  { t: { de: "Der Anfang ist der wichtigste Teil der Arbeit.", en: "The beginning is the most important part of the work.", fr: "Le commencement est la partie la plus importante du travail.", it: "L’inizio è la parte più importante del lavoro.", hu: "A kezdet a munka legfontosabb része." }, a: { de: "Platon", en: "Plato", fr: "Platon", it: "Platone", hu: "Platón" } },
  { t: { de: "Einfachheit ist die höchste Form der Raffinesse.", en: "Simplicity is the ultimate sophistication.", fr: "La simplicité est la sophistication suprême.", it: "La semplicità è la massima raffinatezza.", hu: "Az egyszerűség a kifinomultság csúcsa." }, a: "Leonardo da Vinci", n: ["attr"] },
  { t: { de: "Genie ist ein Prozent Inspiration und neunundneunzig Prozent Transpiration.", en: "Genius is one percent inspiration and ninety-nine percent perspiration.", fr: "Le génie, c’est un pour cent d’inspiration et quatre-vingt-dix-neuf pour cent de transpiration.", it: "Il genio è per l’uno per cento ispirazione e per il novantanove per cento sudore.", hu: "A zsenialitás egy százalék ihlet és kilencvenkilenc százalék verejték." }, a: "Thomas Edison" },
  { t: { de: "Ich bin nicht gescheitert. Ich habe nur 10'000 Wege gefunden, die nicht funktionieren.", en: "I have not failed. I've just found 10,000 ways that won't work.", fr: "Je n’ai pas échoué. J’ai simplement trouvé 10 000 solutions qui ne fonctionnent pas.", it: "Non ho fallito. Ho solo trovato 10.000 modi che non funzionano.", hu: "Nem buktam el. Csak találtam 10 000 módszert, ami nem működik." }, a: "Thomas Edison", n: ["attr"] },
  { t: { de: "Eine Investition in Wissen bringt noch immer die besten Zinsen.", en: "An investment in knowledge pays the best interest.", fr: "Un investissement dans le savoir rapporte toujours les meilleurs intérêts.", it: "Un investimento nella conoscenza paga sempre il miglior interesse.", hu: "A tudásba fektetett pénz hozza a legjobb kamatot." }, a: "Benjamin Franklin" },
  { t: { de: "Sei du selbst – alle anderen sind bereits vergeben.", en: "Be yourself; everyone else is already taken.", fr: "Sois toi-même, les autres sont déjà pris.", it: "Sii te stesso, tutti gli altri sono già occupati.", hu: "Légy önmagad – mindenki más már foglalt." }, a: "Oscar Wilde", n: ["attr"] },
  { t: { de: "Was mich nicht umbringt, macht mich stärker.", en: "What does not kill me makes me stronger.", fr: "Ce qui ne me tue pas me rend plus fort.", it: "Ciò che non mi uccide mi rende più forte.", hu: "Ami nem öl meg, az megerősít." }, a: "Friedrich Nietzsche" },
  { t: { de: "Wer ein Warum zum Leben hat, erträgt fast jedes Wie.", en: "He who has a why to live can bear almost any how.", fr: "Celui qui a un pourquoi pour vivre peut supporter presque n’importe quel comment.", it: "Chi ha un perché per vivere può sopportare quasi ogni come.", hu: "Akinek van miért élnie, az szinte bármilyen hogyant elvisel." }, a: "Friedrich Nietzsche" },
  { t: { de: "Die Zukunft soll man nicht voraussehen wollen, sondern möglich machen.", en: "As for the future, your task is not to foresee it, but to enable it.", fr: "Pour ce qui est de l’avenir, il ne s’agit pas de le prévoir, mais de le rendre possible.", it: "Quanto al futuro, il tuo compito non è prevederlo, ma renderlo possibile.", hu: "A jövőt nem megjósolni kell, hanem lehetővé tenni." }, a: "Antoine de Saint-Exupéry" },
  { t: { de: "Man sieht nur mit dem Herzen gut.", en: "One sees clearly only with the heart.", fr: "On ne voit bien qu’avec le cœur.", it: "Non si vede bene che col cuore.", hu: "Jól csak a szívével lát az ember." }, a: "Antoine de Saint-Exupéry" },
  { t: { de: "Wenn ich weiter gesehen habe, dann weil ich auf den Schultern von Riesen stand.", en: "If I have seen further, it is by standing on the shoulders of giants.", fr: "Si j’ai vu plus loin, c’est en me tenant sur les épaules de géants.", it: "Se ho visto più lontano, è perché stavo sulle spalle di giganti.", hu: "Ha messzebbre láttam, az azért van, mert óriások vállán álltam." }, a: "Isaac Newton" },
  { t: { de: "Nichts im Leben muss man fürchten, man muss es nur verstehen.", en: "Nothing in life is to be feared, it is only to be understood.", fr: "Dans la vie, rien n’est à craindre, tout est à comprendre.", it: "Nella vita non c’è nulla da temere, solo da comprendere.", hu: "Az életben semmitől sem kell félni, csak meg kell érteni." }, a: "Marie Curie" },
  { t: { de: "Der einzige Ort, wo Erfolg vor Arbeit kommt, ist das Wörterbuch.", en: "The only place success comes before work is in the dictionary.", fr: "Le seul endroit où le succès vient avant le travail, c’est dans le dictionnaire.", it: "L’unico posto in cui il successo viene prima del lavoro è il dizionario.", hu: "A siker csak a szótárban előzi meg a munkát." }, a: "Vince Lombardi", n: ["attr"] },
  { t: { de: "Erfolg ist nicht endgültig, Misserfolg nicht fatal: Was zählt, ist der Mut weiterzumachen.", en: "Success is not final, failure is not fatal: it is the courage to continue that counts.", fr: "Le succès n’est pas définitif, l’échec n’est pas fatal : c’est le courage de continuer qui compte.", it: "Il successo non è definitivo, il fallimento non è fatale: ciò che conta è il coraggio di continuare.", hu: "A siker nem végleges, a kudarc nem végzetes: a folytatáshoz szükséges bátorság számít." }, a: "Winston Churchill", n: ["attr"] },
  { t: { de: "Es ist besser, ein kleines Licht anzuzünden, als die Dunkelheit zu verfluchen.", en: "It is better to light a small candle than to curse the darkness.", fr: "Mieux vaut allumer une petite bougie que maudire l’obscurité.", it: "È meglio accendere una piccola candela che maledire l’oscurità.", hu: "Jobb egy kis gyertyát gyújtani, mint átkozni a sötétséget." }, a: { de: "Konfuzius", en: "Confucius", fr: "Confucius", it: "Confucio", hu: "Konfuciusz" }, n: ["attr"] },
  { t: { de: "Wer einen Berg versetzen will, beginnt damit, kleine Steine wegzutragen.", en: "The man who moves a mountain begins by carrying away small stones.", fr: "Celui qui déplace une montagne commence par enlever de petites pierres.", it: "Chi vuole spostare una montagna comincia portando via piccole pietre.", hu: "Aki hegyet akar elmozdítani, az apró kövek elhordásával kezdi." }, a: { de: "Konfuzius", en: "Confucius", fr: "Confucius", it: "Confucio", hu: "Konfuciusz" }, n: ["attr"] },
  { t: { de: "Es ist egal, wie langsam du gehst, solange du nicht stehen bleibst.", en: "It does not matter how slowly you go as long as you do not stop.", fr: "Peu importe la lenteur avec laquelle tu avances, tant que tu ne t’arrêtes pas.", it: "Non importa quanto vai piano, l’importante è non fermarsi.", hu: "Nem számít, milyen lassan haladsz, amíg meg nem állsz." }, a: { de: "Konfuzius", en: "Confucius", fr: "Confucius", it: "Confucio", hu: "Konfuciusz" }, n: ["attr"] },
  { t: { de: "Ich weiss, dass ich nichts weiss.", en: "I know that I know nothing.", fr: "Je sais que je ne sais rien.", it: "So di non sapere.", hu: "Tudom, hogy nem tudok semmit." }, a: { de: "Sokrates", en: "Socrates", fr: "Socrate", it: "Socrate", hu: "Szókratész" }, n: ["attr"] },
  { t: { de: "Lerne von gestern, lebe für heute, hoffe für morgen.", en: "Learn from yesterday, live for today, hope for tomorrow.", fr: "Apprends d’hier, vis pour aujourd’hui, espère pour demain.", it: "Impara da ieri, vivi per oggi, spera per domani.", hu: "Tanulj a tegnapból, élj a mának, remélj a holnapban." }, a: "Albert Einstein", n: ["attr"] },
  { t: { de: "Wer nie einen Fehler gemacht hat, hat nie etwas Neues ausprobiert.", en: "Anyone who has never made a mistake has never tried anything new.", fr: "Celui qui n’a jamais commis d’erreur n’a jamais tenté quelque chose de nouveau.", it: "Chi non ha mai commesso un errore non ha mai provato nulla di nuovo.", hu: "Aki sosem hibázott, az sosem próbált ki semmi újat." }, a: "Albert Einstein", n: ["attr"] },
  { t: { de: "Der beste Weg, anzufangen, ist, aufzuhören zu reden und anzufangen zu tun.", en: "The way to get started is to quit talking and begin doing.", fr: "Pour commencer, il faut arrêter de parler et commencer à agir.", it: "Il modo per iniziare è smettere di parlare e cominciare a fare.", hu: "Úgy kezdhetsz bele, hogy abbahagyod a beszédet, és elkezdesz cselekedni." }, a: "Walt Disney", n: ["attr"] },
  { t: { de: "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt unsere Freiheit.", en: "Between stimulus and response there is a space. In that space is our freedom.", fr: "Entre le stimulus et la réponse, il y a un espace. Dans cet espace se trouve notre liberté.", it: "Tra stimolo e risposta c’è uno spazio. In quello spazio c’è la nostra libertà.", hu: "Az inger és a válasz között van egy tér. Ebben a térben rejlik a szabadságunk." }, a: "Viktor Frankl", n: ["attr"] },
  { t: { de: "Gestern war ich klug und wollte die Welt verändern. Heute bin ich weise und verändere mich selbst.", en: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", fr: "Hier j’étais intelligent et je voulais changer le monde. Aujourd’hui je suis sage et je me change moi-même.", it: "Ieri ero intelligente e volevo cambiare il mondo. Oggi sono saggio e sto cambiando me stesso.", hu: "Tegnap okos voltam, ezért meg akartam változtatni a világot. Ma bölcs vagyok, ezért önmagamat változtatom meg." }, a: "Rumi", n: ["attr"] },
  { t: { de: "Was wir denken, das werden wir.", en: "What we think, we become.", fr: "Nous devenons ce que nous pensons.", it: "Diventiamo ciò che pensiamo.", hu: "Azzá válunk, amit gondolunk." }, a: "Buddha", n: ["attr"] },
  { t: { de: "Erfolg ist kein Zufall. Er ist harte Arbeit, Ausdauer, Lernen und Hingabe.", en: "Success is no accident. It is hard work, perseverance, learning and dedication.", fr: "Le succès n’est pas un hasard. C’est du travail, de la persévérance, de l’apprentissage et du dévouement.", it: "Il successo non è un caso. È duro lavoro, perseveranza, apprendimento e dedizione.", hu: "A siker nem véletlen. Kemény munka, kitartás, tanulás és odaadás." }, a: "Pelé", n: ["attr"] },
  { t: { de: "Mut steht am Anfang des Handelns, Glück am Ende.", en: "Courage is the beginning of action, happiness its end.", fr: "Le courage est le commencement de l’action, le bonheur en est la fin.", it: "Il coraggio è l’inizio dell’azione, la felicità la sua fine.", hu: "A bátorság a cselekvés kezdete, a boldogság a vége." }, a: { de: "Demokrit", en: "Democritus", fr: "Démocrite", it: "Democrito", hu: "Démokritosz" }, n: ["attr"] },
  { t: { de: "Übung macht den Meister.", en: "Practice makes perfect.", fr: "C’est en forgeant qu’on devient forgeron.", it: "La pratica rende perfetti.", hu: "Gyakorlat teszi a mestert." }, a: PROVERB },
  { t: { de: "Steter Tropfen höhlt den Stein.", en: "Dripping water hollows out stone.", fr: "La goutte d’eau creuse la pierre.", it: "La goccia scava la pietra.", hu: "Lassú víz partot mos." }, a: "Ovid", n: ["para"] },
  { t: { de: "Wo ein Wille ist, ist auch ein Weg.", en: "Where there's a will, there's a way.", fr: "Vouloir, c’est pouvoir.", it: "Volere è potere.", hu: "Ahol akarat van, ott út is van." }, a: PROVERB },
  { t: { de: "Auch der längste Marsch beginnt mit dem ersten Schritt.", en: "Even the longest march begins with the first step.", fr: "Même la plus longue marche commence par un premier pas.", it: "Anche la marcia più lunga comincia con il primo passo.", hu: "A leghosszabb menetelés is az első lépéssel kezdődik." }, a: CN_PROVERB },
  { t: { de: "Konzentration ist die Wurzel aller höheren Fähigkeiten des Menschen.", en: "Concentration is the root of all the higher abilities in man.", fr: "La concentration est la racine de toutes les capacités supérieures de l’homme.", it: "La concentrazione è la radice di tutte le capacità superiori dell’uomo.", hu: "Az összpontosítás az ember minden magasabb képességének gyökere." }, a: "Bruce Lee", n: ["attr"] },
  { t: { de: "Tu heute etwas, wofür dir dein zukünftiges Ich danken wird.", en: "Do something today that your future self will thank you for.", fr: "Fais aujourd’hui quelque chose dont ton futur toi te remerciera.", it: "Fai oggi qualcosa per cui il tuo io futuro ti ringrazierà.", hu: "Tegyél ma valamit, amit a jövőbeli éned megköszön majd." }, a: UNKNOWN },
  { t: { de: "Kleine Schritte sind besser als gar keine Schritte.", en: "Small steps are better than no steps at all.", fr: "De petits pas valent mieux que pas de pas du tout.", it: "Piccoli passi sono meglio di nessun passo.", hu: "Kis lépések jobbak, mint semmilyen lépés." }, a: UNKNOWN },
  { t: { de: "Motivation bringt dich in Gang. Gewohnheit hält dich in Bewegung.", en: "Motivation is what gets you started. Habit is what keeps you going.", fr: "La motivation te fait démarrer. L’habitude te fait continuer.", it: "La motivazione ti fa iniziare. L’abitudine ti fa continuare.", hu: "A motiváció elindít. A szokás tovább visz." }, a: "Jim Ryun", n: ["attr"] }
];

// Zitate asiatischer Mönche in der Originalsprache (a = Name im Original, r = Umschrift)
const MONK_QUOTES = [
  { t: "門松は冥土の旅の一里塚　めでたくもありめでたくもなし", a: "一休宗純", r: "Ikkyū Sōjun", lang: "ja" },
  { t: "世の中は食うて糞して寝て起きて　さてその後は死ぬるばかりぞ", a: "一休宗純", r: "Ikkyū Sōjun", n: ["attr"], lang: "ja" },
  { t: "祖死、父死、子死、孫死。", a: "仙厓義梵", r: "Sengai Gibon", n: ["attr"], lang: "ja" },
  { t: "死にとうない。", a: "仙厓義梵", r: "Sengai Gibon", n: ["last", "attr"], lang: "ja" },
  { t: "災難に逢う時節には災難に逢うがよく候。死ぬ時節には死ぬがよく候。是はこれ災難をのがるる妙法にて候。", a: "良寛", r: "Ryōkan", lang: "ja" },
  { t: "散る桜　残る桜も　散る桜", a: "良寛", r: "Ryōkan", n: ["attr"], lang: "ja" },
  { t: "逢佛殺佛，逢祖殺祖。", a: "臨濟義玄", r: "Linji Yixuan", lang: "zh-Hant" },
  { t: "「如何是佛？」「乾屎橛。」", a: "雲門文偃", r: "Yunmen Wenyan", lang: "zh-Hant" },
  { t: "我當時若見，一棒打殺與狗子喫卻，貴圖天下太平。", a: "雲門文偃", r: "Yunmen Wenyan", lang: "zh-Hant" },
  { t: "「如何是佛？」「麻三斤。」", a: "洞山守初", r: "Dongshan Shouchu", lang: "zh-Hant" },
  { t: "「狗子還有佛性也無？」「無。」", a: "趙州從諗", r: "Zhaozhou Congshen", lang: "zh-Hant" },
  { t: "「喫粥了也未？」「喫粥了也。」「洗鉢盂去。」", a: "趙州從諗", r: "Zhaozhou Congshen", lang: "zh-Hant" },
  { t: "道得也三十棒，道不得也三十棒。", a: "德山宣鑒", r: "Deshan Xuanjian", lang: "zh-Hant" },
  { t: "大眾道得即救，道不得即斬卻也。", a: "南泉普願", r: "Nanquan Puyuan", lang: "zh-Hant" },
  { t: "既無舍利，更取兩尊燒。", a: "丹霞天然", r: "Danxia Tianran", lang: "zh-Hant" },
  { t: "내 말에 속지 마라.", a: "성철", r: "Seongcheol", lang: "ko" },
  { t: "일생 동안 남녀의 무리를 속여서 하늘을 넘치는 죄업은 수미산을 지나친다.", a: "성철", r: "Seongcheol", n: ["farewell"], lang: "ko" }
];

// Zitate berühmter Revolutionäre (o = Original; wird nur gezeigt, wenn es von der Übersetzung abweicht)
const REVO_QUOTES = [
  { t: { de: "Seien wir realistisch – verlangen wir das Unmögliche.", en: "Let's be realistic – let's demand the impossible.", fr: "Soyons réalistes, exigeons l’impossible.", it: "Siamo realisti, esigiamo l’impossibile.", hu: "Legyünk realisták, követeljük a lehetetlent." }, a: "Che Guevara", n: ["attr"], o: "Seamos realistas, exijamos lo imposible." },
  { t: { de: "Freiheit ist immer die Freiheit der Andersdenkenden.", en: "Freedom is always the freedom of those who think differently.", fr: "La liberté, c’est toujours la liberté de celui qui pense autrement.", it: "La libertà è sempre la libertà di chi la pensa diversamente.", hu: "A szabadság mindig a másként gondolkodók szabadsága." }, a: "Rosa Luxemburg", o: "Freiheit ist immer die Freiheit der Andersdenkenden." },
  { t: { de: "Nach dem Erklimmen eines hohen Berges entdeckt man nur, dass es noch viele weitere Berge zu erklimmen gibt.", en: "After climbing a great hill, one only finds that there are many more hills to climb.", fr: "Après avoir gravi une haute colline, on découvre seulement qu’il reste beaucoup d’autres collines à gravir.", it: "Dopo aver scalato una grande collina, si scopre solo che ci sono molte altre colline da scalare.", hu: "Egy nagy hegy megmászása után az ember csak azt látja, hogy még sok hegyet kell megmásznia." }, a: "Nelson Mandela", o: "After climbing a great hill, one only finds that there are many more hills to climb." },
  { t: { de: "Das Vaterland oder den Tod – wir werden siegen.", en: "Homeland or death – we will win.", fr: "La patrie ou la mort, nous vaincrons.", it: "La patria o la morte, vinceremo.", hu: "Haza vagy halál – győzni fogunk." }, a: "Thomas Sankara", o: "La patrie ou la mort, nous vaincrons." },
  { t: { de: "Nichts ist kostbarer als Unabhängigkeit und Freiheit.", en: "Nothing is more precious than independence and freedom.", fr: "Rien n’est plus précieux que l’indépendance et la liberté.", it: "Niente è più prezioso dell’indipendenza e della libertà.", hu: "Semmi sem értékesebb a függetlenségnél és a szabadságnál." }, a: "Hồ Chí Minh", o: "Không có gì quý hơn độc lập, tự do." },
  { t: { de: "Lieber im Stehen sterben als auf den Knien leben.", en: "I would rather die on my feet than live on my knees.", fr: "Je préfère mourir debout que vivre à genoux.", it: "Preferisco morire in piedi che vivere in ginocchio.", hu: "Inkább halok meg állva, mint hogy térden éljek." }, a: "Emiliano Zapata", n: ["attr"], o: "Prefiero morir de pie que vivir de rodillas." },
  { t: { de: "Die Philosophen haben die Welt nur verschieden interpretiert; es kommt aber darauf an, sie zu verändern.", en: "The philosophers have only interpreted the world in various ways; the point, however, is to change it.", fr: "Les philosophes n’ont fait qu’interpréter le monde de différentes manières ; ce qui importe, c’est de le transformer.", it: "I filosofi hanno soltanto interpretato il mondo in modi diversi; ma si tratta di trasformarlo.", hu: "A filozófusok csak különbözőképpen értelmezték a világot; a feladat az, hogy megváltoztassuk." }, a: "Karl Marx", o: "Die Philosophen haben die Welt nur verschieden interpretiert; es kommt aber darauf an, sie zu verändern." },
  { t: { de: "Die Zukunft gehört denen, die sich heute darauf vorbereiten.", en: "The future belongs to those who prepare for it today.", fr: "L’avenir appartient à ceux qui s’y préparent aujourd’hui.", it: "Il futuro appartiene a chi si prepara oggi.", hu: "A jövő azoké, akik ma felkészülnek rá." }, a: "Malcolm X", o: "The future belongs to those who prepare for it today." },
  { t: { de: "Die Kunst zu siegen lernt man in den Niederlagen.", en: "The art of winning is learned in defeat.", fr: "L’art de vaincre s’apprend dans les défaites.", it: "L’arte di vincere si impara nelle sconfitte.", hu: "A győzelem művészetét a vereségekből tanuljuk." }, a: "Simón Bolívar", o: "El arte de vencer se aprende en las derrotas." },
  { t: { de: "Sei selbst die Veränderung, die du dir für die Welt wünschst.", en: "Be the change that you wish to see in the world.", fr: "Sois le changement que tu veux voir dans le monde.", it: "Sii il cambiamento che vuoi vedere nel mondo.", hu: "Légy te magad a változás, amit látni szeretnél a világban." }, a: "Mahatma Gandhi", n: ["attr"], o: "Be the change that you wish to see in the world." },
  { t: { de: "Mit meinem Sturz hat man nur den Stamm des Freiheitsbaumes gefällt – er treibt aus den Wurzeln neu aus, denn sie sind tief und zahlreich.", en: "In overthrowing me, you have cut down only the trunk of the tree of liberty. It will spring up again from the roots, for they are numerous and deep.", fr: "En me renversant, on n'a abattu à Saint-Domingue que le tronc de l'arbre de la liberté des Noirs ; il repoussera par les racines, car elles sont profondes et nombreuses.", it: "Rovesciandomi, avete abbattuto soltanto il tronco dell’albero della libertà: ricrescerà dalle radici, perché sono profonde e numerose.", hu: "Megbuktatásommal csak a szabadság fájának törzsét vágták ki – a gyökereiből újra kihajt, mert azok mélyek és számosak." }, a: "Toussaint Louverture", o: "En me renversant, on n'a abattu à Saint-Domingue que le tronc de l'arbre de la liberté des Noirs ; il repoussera par les racines, car elles sont profondes et nombreuses." }
];

// Autor mit Zusätzen, z. B. "Mark Twain (zugeschrieben)"
const noteText = n => (n || []).map(k => t("q." + k));
function authorText(q) {
  const notes = noteText(q.n);
  return L(q.a) + (notes.length ? ` (${notes.join(", ")})` : "");
}
const monkAuthor = q => `${q.a} (${[q.r, ...noteText(q.n)].join(", ")})`;
const wrapQuote = s => t("q.wrap", { t: s });

const DEFAULTS = { focus: 25, focusSec: 0, short: 5, shortSec: 0, long: 15, longSec: 0, rounds: 4, sound: 1, notify: 1, useSeconds: false, goal: 4 };
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
// cloud.push lädt die Änderung hoch, wenn jemand angemeldet ist (sonst passiert nichts).
const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} cloud.push(key, value); };

let settings = { ...DEFAULTS, ...load("pomo_settings", {}) };
let sessions = load("pomo_sessions", []);       // [{date:"2026-10-06", ts:..., min:25, subject:"...", over: Minuten länger gearbeitet}]
let breaks = load("pomo_breaks", []);           // [{date, ts, min, kind:"short"|"long", over: Minuten Pause überzogen}]
let favs = load("pomo_favs", []).map(f => typeof f === "number" ? "b" + f : f);   // Favoriten als IDs
let customQuotes = load("pomo_custom_quotes", []);   // eigene Zitate [{ id, t, a }]

const $ = id => document.getElementById(id);
const dayKey = d => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth()+1).padStart(2,"0") + "-" + String(x.getDate()).padStart(2,"0"); };
const round1 = n => Math.round(n * 10) / 10;
// Dauer einer Phase ("focus", "short", "long") in Sekunden
const phaseSec = m => settings[m] * 60 + settings[m + "Sec"];
const fmtDur = m => [settings[m] && t("dur.min", { n: settings[m] }), settings[m + "Sec"] && t("dur.sec", { n: settings[m + "Sec"] })].filter(Boolean).join(" ");
// Sessions ohne Fach werden mit diesem Wert gespeichert und beim Anzeigen übersetzt
const NO_SUBJECT = "Ohne Fach";
const subjectName = s => s === NO_SUBJECT ? t("subject.none") : s;

/* ============================================================
   NAVIGATION
   ============================================================ */
function updatePageTimerState() {
  const isTimer = $("timer")?.classList.contains("active");
  document.body.classList.toggle("page-timer", !!isTimer);
  document.body.classList.toggle("page-stats", !!$("stats")?.classList.contains("active"));
}

document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $(btn.dataset.page).classList.add("active");
    updatePageTimerState();
    if (btn.dataset.page === "stats") renderStats();
    if (btn.dataset.page === "timer") freeRenderAll();
  };
});
updatePageTimerState();

/* ============================================================
   TIMER
   ============================================================ */
const MODE_TEXT = { focus: "mode.focusText", short: "mode.short", long: "mode.long" };
const CIRC = 2 * Math.PI * 114;     // Umfang des Kreises
$("ringFg").style.strokeDasharray = CIRC;

let mode = "focus";
let totalSec = phaseSec("focus");
let remaining = totalSec;
let running = false;
let endTime = 0;
let tick = null;
let ringFrame = null;
let endTimer = null;                // genauer Timeout aufs Ende (Intervalle laufen im Hintergrund gedrosselt)
let focusDone = 0;                  // Fokus-Sessions im aktuellen Zyklus (0 bis settings.rounds)

// Überzeit: Ist eine Phase abgelaufen, zählt die Uhr weiter, bis man weitermacht.
// over = { since: Ende der Phase (ms) = ts des Eintrags in sessions/breaks, mode }
const OVER_MAX_MIN = 60;            // länger wird nicht mitgezählt (z.B. App offen vergessen)
let over = null;
let overTick = null;
const overSec = () => over ? Math.min(OVER_MAX_MIN * 60, Math.floor((Date.now() - over.since) / 1000)) : 0;

function fmt(s) {
  const m = Math.floor(s / 60), r = s % 60;
  return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}

// Alle Farbvariablen (Hintergrund, Karten, Linien, Akzent …) wandern gegen Ende ins Rote.
// Jeweils [Startwert, Rotwert] als RGB, pro Design. Erste Hälfte voll Startfarbe, danach langsam immer röter.
const WARM_THEMES = {
  // Original: Olivgrün → Rot
  original: {
    "--bg":        [[27, 33, 25],  [38, 24, 22]],
    "--card":      [[36, 43, 32],  [54, 34, 31]],
    "--inset":     [[31, 38, 28],  [46, 29, 27]],
    "--border":    [[59, 71, 51],  [96, 60, 54]],
    "--hover":     [[45, 53, 39],  [70, 44, 40]],
    "--secondary": [[53, 63, 45],  [84, 52, 47]],
    "--track":     [[59, 71, 51],  [96, 60, 54]],
    "--accent":    [[95, 125, 71], [184, 72, 54]]
  },
  // Coral dunkel: warmes Anthrazit → sanftes Rotbraun, Koralle → kräftiges Rot (Werte aus oklch in style/tokens.css)
  coral: {
    "--bg":        [[24, 20, 17],    [31, 17, 14]],
    "--card":      [[33, 28, 25],    [39, 25, 22]],
    "--inset":     [[18, 14, 12],    [25, 11, 9]],
    "--border":    [[52, 46, 42],    [58, 43, 40]],
    "--hover":     [[42, 36, 32],    [48, 33, 30]],
    "--secondary": [[42, 36, 32],    [48, 33, 30]],
    "--track":     [[52, 46, 42],    [58, 43, 40]],
    "--accent":    [[235, 137, 117], [236, 92, 82]]
  }
};
// Das Design wählt schon das Skript im <head> von pomodoro.html (vor dem ersten Zeichnen)
let design = document.documentElement.dataset.design === "original" ? "original" : "coral";

function applyWarmth(frac) {
  const t = Math.max(0, Math.min(1, (0.5 - frac) / 0.5));   // 0 = Startfarbe (erste Hälfte) … 1 = rot (Ende)
  const vars = WARM_THEMES[design];
  for (const v in vars) {
    const [g, r] = vars[v];
    const c = g.map((x, i) => Math.round(x + (r[i] - x) * t));
    document.body.style.setProperty(v, `rgb(${c[0]},${c[1]},${c[2]})`);
  }
}

// Ring wird mit der genauen Restzeit (inkl. Millisekunden) gezeichnet → läuft gleichmässig statt im Sekundentakt
function drawRing() {
  const left = running ? Math.max(0, (endTime - Date.now()) / 1000) : remaining;
  const frac = totalSec && !over ? left / totalSec : 0;
  $("ringFg").style.strokeDashoffset = CIRC * (1 - frac);
  applyWarmth(frac);
}

function animateRing() {
  if (!running) return;
  drawRing();
  ringFrame = requestAnimationFrame(animateRing);
}

function draw() {
  const digits = over ? "+" + fmt(overSec()) : fmt(remaining);
  $("digits").textContent = digits;
  $("digits").classList.toggle("long", digits.length > 5);   // ab 100 Minuten bzw. mit "+" breiter
  $("modeLabel").textContent = t(over ? (mode === "focus" ? "over.focus" : "over.break") : MODE_TEXT[mode]);
  drawRing();
  document.body.classList.toggle("pause", mode !== "focus");
  document.body.classList.toggle("overtime", !!over);
  document.title = (running || over ? digits + " · " : "") + t("doc.title");
  document.querySelectorAll(".modes button[data-mode]").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  $("startBtn").textContent = t(over ? (mode === "focus" ? "btn.toBreak" : "btn.toFocus")
    : running ? "btn.pause" : (remaining < totalSec ? "btn.resume" : "btn.start"));
  // Während der Überzeit nach dem Fokus ist die Runde schon geschafft
  const doneDots = focusDone + (over && mode === "focus" ? 1 : 0);
  $("dots").innerHTML = Array.from({ length: settings.rounds }, (_, i) => `<div class="dot ${i < doneDots ? "done" : ""}"></div>`).join("");
  $("cycleHint").textContent = t("cycle", { r: settings.rounds, f: fmtDur("focus"), s: fmtDur("short"), l: fmtDur("long") });
  drawLock();
}

/* Sperrbildschirm: Der Pomodoro-Timer erscheint als "Wiedergabe" (Media Session) mit Phase,
   Endzeit und Fortschrittsbalken, den das Handy selbst weiterzählt. Dafür läuft ein stummer
   Ton in Schleife – das hält die App im Hintergrund wach (Ton und Mitteilung kommen pünktlich),
   pausiert aber andere Musik. Pro Gerät (pomo_lockscreen), auf Handys standardmässig an. */
const lockCan = "mediaSession" in navigator;
let lockOn = lockCan && !!+load("pomo_lockscreen", matchMedia("(pointer: coarse)").matches ? 1 : 0);
let lockAudio = null;
let lockState = "";
let lockSeen = false;               // einmal gestartet → Karte bleibt, auch nach Skip/Reset (Start dann vom Sperrbildschirm)

// 10 s Stille als WAV (8 kHz, 8 Bit); Android zeigt die Karte erst ab 5 s Länge.
// Als data:-URL, weil die App-CSP (tools/build-app.mjs) keine blob:-Medien erlaubt.
function silentWav(sec) {
  const n = 8000 * sec, v = new DataView(new ArrayBuffer(44 + n));
  const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF"); v.setUint32(4, 36 + n, true); str(8, "WAVE"); str(12, "fmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true);
  str(36, "data"); v.setUint32(40, n, true);
  const bytes = new Uint8Array(v.buffer);
  bytes.fill(128, 44);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return "data:audio/wav;base64," + btoa(bin);
}

const clockTime = ms => new Date(ms).toLocaleTimeString(document.documentElement.lang || undefined, { hour: "2-digit", minute: "2-digit" });

// Wird bei jedem draw() aufgerufen, ändert aber nur etwas, wenn sich der Zustand ändert
function drawLock() {
  if (!lockCan) return;
  if (running) lockSeen = true;
  const active = lockOn && (lockSeen || !!over || remaining < totalSec);
  const title = t(over ? (mode === "focus" ? "over.focus" : "over.break") : mode === "focus" ? "mode.focus" : MODE_TEXT[mode]);
  const state = active ? [mode, running, endTime, over?.since, running ? 0 : remaining, totalSec, title, design].join("|") : "";
  if (state === lockState) return;
  lockState = state;
  const ms = navigator.mediaSession;
  if (!active) {
    lockAudio?.pause();
    ms.metadata = null;
    ms.playbackState = "none";
    return;
  }
  if (!lockAudio) {
    lockAudio = new Audio(silentWav(10));
    lockAudio.loop = true;
  }
  const artist = over ? t("lock.since", { time: clockTime(over.since) })
    : running ? t("lock.until", { time: clockTime(endTime) })
    : t("lock.paused", { time: fmt(remaining) });
  const icon = design === "original" ? "icon-512.png" : "icon-coral-512.png";
  ms.metadata = new MediaMetadata({
    title, artist, album: "Fokus",
    artwork: [{ src: new URL("../img/icons/" + icon, location.href).href, sizes: "512x512", type: "image/png" }]
  });
  // Überzeit zählt aufwärts bis zum Maximum, sonst läuft der Balken über die ganze Phase
  const [duration, position] = over ? [OVER_MAX_MIN * 60, overSec()]
    : [totalSec, totalSec - (running ? Math.max(0, (endTime - Date.now()) / 1000) : remaining)];
  try { ms.setPositionState({ duration: Math.max(1, duration), position: Math.min(duration, Math.max(0, position)), playbackRate: 1 }); } catch {}
  if (running || over) {
    // Braucht beim ersten Mal einen Tipp (Start-Knopf); schlägt es fehl, bleibt einfach die normale App
    lockAudio.play().catch(() => {});
    ms.playbackState = "playing";
  } else {
    lockAudio.pause();
    ms.playbackState = "paused";
  }
}

// Knöpfe auf dem Sperrbildschirm machen dasselbe wie die Knöpfe in der App
if (lockCan) {
  const act = (name, fn) => { try { navigator.mediaSession.setActionHandler(name, fn); } catch {} };
  act("play", () => { if (!running && !over) $("startBtn").click(); });
  act("pause", () => { if (running) $("startBtn").click(); else if (over) $("resetBtn").click(); });
  act("nexttrack", () => $("skipBtn").click());
  act("previoustrack", () => $("resetBtn").click());
  act("seekto", null);
  act("seekbackward", null);
  act("seekforward", null);
}

// Nach einer Fokus-Runde: kurze Pause, nach der letzten Runde des Zyklus die lange Pause
function afterFocus() {
  focusDone++;
  if (focusDone >= settings.rounds) { focusDone = 0; setMode("long"); }
  else setMode("short");
}

function setMode(m) {
  stop();
  recordOver();
  mode = m;
  totalSec = phaseSec(m);
  remaining = totalSec;
  saveTimer();
  draw();
}

function stop() {
  running = false;
  clearInterval(tick);
  clearTimeout(endTimer);
  cancelAnimationFrame(ringFrame);
}

// Ein einzelner Timeout genau aufs Ende: Im Hintergrund drosselt der Browser setInterval
// (bis auf einmal pro Minute), Popup und Mitteilung kämen sonst zu spät.
function scheduleEnd() {
  clearTimeout(endTimer);
  endTimer = setTimeout(() => {
    if (!running) return;
    if (Date.now() < endTime) return scheduleEnd();
    remaining = 0;
    finish();
  }, Math.max(0, endTime - Date.now()));
}

// end: Endzeit von einem anderen Gerät bzw. aus dem Speicher (dann wird nicht nochmals gespeichert)
function start(end) {
  running = true;
  endTime = end || Date.now() + remaining * 1000;   // Endzeit merken → bleibt genau, auch wenn der Tab im Hintergrund ist
  tick = setInterval(() => {
    remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
    draw();
    if (remaining <= 0) finish();
  }, 250);
  scheduleEnd();
  ringFrame = requestAnimationFrame(animateRing);
  if (!end) saveTimer();
  draw();
}

function pause() {
  stop();
  remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  saveTimer();
  draw();
}

// Phase abgelaufen: speichern, Popup zeigen und die Überzeit mitzählen
function finish() {
  stop();
  const since = endTime;
  const entry = { date: dayKey(since), ts: since, min: round1(phaseSec(mode) / 60) };
  // Ist die App auf mehreren Geräten offen, läuft die Phase überall ab: nur einmal zählen.
  if (mode === "focus") {
    if (!sessions.some(s => s.ts === since)) sessions.push({ ...entry, subject: $("subject").value.trim() || NO_SUBJECT });
    save("pomo_subject", $("subject").value.trim());
    save("pomo_sessions", sessions);
    updateSubjectList();
    renderToday();
    renderTodos();
  } else {
    if (!breaks.some(b => b.ts === since)) breaks.push({ ...entry, kind: mode });
    save("pomo_breaks", breaks);
  }
  // Schon lange vorbei (App war zu): ohne Überzeit gleich zur nächsten Phase
  if (Date.now() - since >= OVER_MAX_MIN * 60000) return mode === "focus" ? afterFocus() : setMode("focus");
  beep();
  showTimeUp([t(mode === "focus" ? "done.focus" : "done.break"), t("done.over")]);
  over = { since, mode };
  runOver();
  saveTimer();
  draw();
}

const runOver = () => { clearInterval(overTick); overTick = setInterval(() => overSec() >= OVER_MAX_MIN * 60 ? endOver(false) : draw(), 250); };

// Stand des Pomodoro-Timers: übersteht so ein Neuladen, und angemeldete Geräte sehen ihn live.
// Nur absolute Zeitpunkte (endTime, over.since) → jedes Gerät rechnet selbst weiter.
function saveTimer() {
  save("pomo_timer", { mode, totalSec, remaining, running, endTime: running ? endTime : 0, focusDone, over });
}

// Gespeicherten oder von einem anderen Gerät kommenden Stand übernehmen (ohne zurückzuspeichern)
function applyTimer(s) {
  if (!s || !MODE_TEXT[s.mode]) return;
  const wasRunning = running, wasOver = !!over;
  stop();
  clearInterval(overTick);
  mode = s.mode;
  totalSec = +s.totalSec || phaseSec(mode);
  remaining = Math.min(totalSec, Math.max(0, +s.remaining || 0));
  focusDone = Math.max(0, +s.focusDone || 0);
  over = s.over?.since ? { since: +s.over.since, mode: s.over.mode } : null;
  if (over && overSec() >= OVER_MAX_MIN * 60) {
    // Überzeit längst vorbei: nicht mehr mitzählen, nur zur nächsten Phase
    const m = over.mode;
    over = null;
    return m === "focus" ? afterFocus() : setMode("focus");
  }
  if (s.running && s.endTime > Date.now()) start(+s.endTime);
  else if (s.running && s.endTime) { endTime = +s.endTime; remaining = 0; return finish(); }
  if (over) {
    runOver();
    // Ein anderes Gerät war einen Moment schneller: hier trotzdem Ton und Popup
    if (wasRunning && !wasOver) {
      beep();
      showTimeUp([t(mode === "focus" ? "done.focus" : "done.break"), t("done.over")]);
    }
  } else if (wasOver) closeTimeUp();
  draw();
}

// Überzeit in den Eintrag schreiben (Minuten, eine Nachkommastelle)
function saveOver() {
  if (!over) return;
  const [key, list] = over.mode === "focus" ? ["pomo_sessions", sessions] : ["pomo_breaks", breaks];
  const e = list.find(x => x.ts === over.since);
  const min = round1(overSec() / 60);
  if (!e || !min || e.over === min) return;
  e.over = min;
  save(key, list);
}

// Überzeit beenden, ohne die Phase zu wechseln
function recordOver() {
  if (!over) return;
  saveOver();
  over = null;
  clearInterval(overTick);
}

// Weiter zur nächsten Phase (auf Wunsch gleich starten)
function endOver(startNext) {
  const m = over.mode;
  recordOver();
  if (m === "focus") afterFocus(); else setMode("focus");
  if (startNext) { askNotify(); start(); }
}

// Wird die App geschlossen oder versteckt, ist die Überzeit bis dahin gespeichert
window.addEventListener("pagehide", saveOver);
document.addEventListener("visibilitychange", () => { if (document.hidden) saveOver(); });

// Ein gemeinsamer Audio-Kontext, freigegeben beim Tippen auf Start: iOS spielt den Ton
// sonst nicht ab, wenn die Phase im Hintergrund (Sperrbildschirm) endet.
let audioCtx = null;
function unlockAudio() {
  try { audioCtx ||= new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume(); } catch {}
}

function beep() {
  if (!+settings.sound) return;
  try {
    unlockAudio();
    const ctx = audioCtx;
    [0, 0.25, 0.5].forEach(delay => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = 880; g.gain.value = 0.15;
      o.start(ctx.currentTime + delay); o.stop(ctx.currentTime + delay + 0.18);
    });
  } catch {}
}

// Popup "Zeit ist um" – für Pomodoro, Timer und mehrere gleichzeitig abgelaufene Timer.
// Ist die App nicht im Vordergrund (minimiert, anderer Tab, anderes Programm),
// kommt zusätzlich eine System-Mitteilung (falls erlaubt).
function showTimeUp(lines) {
  const list = $("timeUpList");
  for (const line of lines) {
    const li = document.createElement("li");
    li.textContent = line;
    list.append(li);
  }
  $("timeUpModal").hidden = false;
  $("timeUpOk").focus();
  if (document.hidden || !document.hasFocus()) systemNotify(lines);
}

const canNotify = () => "Notification" in window;
function systemNotify(lines) {
  if (!+settings.notify || !canNotify() || Notification.permission !== "granted") return;
  const opts = {
    body: lines.join("\n"),
    icon: new URL("../img/icons/icon-192.png", location.href).href,
    tag: "fokus-timeup",        // eine neue Meldung ersetzt die alte, statt sich zu stapeln
    renotify: true,
    requireInteraction: true    // bleibt stehen, bis man sie wegklickt
  };
  try {
    const n = new Notification(t("done.title"), opts);
    n.onclick = () => { window.focus(); n.close(); };
  } catch {
    // Android-Chrome erlaubt Mitteilungen nur über den Service Worker
    navigator.serviceWorker?.ready.then(reg => reg.showNotification(t("done.title"), opts)).catch(() => {});
  }
}
const closeTimeUp = () => { $("timeUpModal").hidden = true; $("timeUpList").replaceChildren(); };
$("timeUpOk").onclick = closeTimeUp;
$("timeUpModal").onclick = e => { if (e.target === $("timeUpModal")) closeTimeUp(); };
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("timeUpModal").hidden) closeTimeUp(); });

// Beim Starten (Klick = Erlaubnis darf gefragt werden) einmalig um System-Mitteilungen bitten
// und den Ton für das Ende freigeben
function askNotify() {
  unlockAudio();
  if (+settings.notify && canNotify() && Notification.permission === "default") Notification.requestPermission().then(showNotifySetting).catch(() => {});
}

// Schalter "Mitteilung im Hintergrund": an = gewünscht und nicht blockiert
function showNotifySetting() {
  const perm = canNotify() ? Notification.permission : "unsupported";
  $("setNotify").checked = !!+settings.notify && perm !== "denied" && perm !== "unsupported";
  $("setNotify").disabled = perm === "unsupported";
  const hint = perm === "unsupported" ? "notify.unsupported" : perm === "denied" ? "notify.blocked" : "";
  $("notifyHint").hidden = !hint;
  $("notifyHint").textContent = hint ? t(hint) : "";
}
$("setNotify").onchange = e => {
  settings.notify = e.target.checked ? 1 : 0;
  save("pomo_settings", settings);
  askNotify();
  showNotifySetting();
};
showNotifySetting();
document.addEventListener("langchange", showNotifySetting);

// Schalter "Auf dem Sperrbildschirm" (nur wo der Browser Media Session kann)
$("lockRow").hidden = $("lockHint").hidden = !lockCan;
$("setLock").checked = lockOn;
$("setLock").onchange = e => {
  lockOn = e.target.checked;
  lockSeen = false;
  save("pomo_lockscreen", lockOn ? 1 : 0);
  draw();
};

// Während der Überzeit: Start = nächste Phase gleich starten, Reset/Skip = nur dorthin wechseln
$("startBtn").onclick = () => over ? endOver(true) : running ? pause() : (askNotify(), start());
$("resetBtn").onclick = () => over ? endOver(false) : setMode(mode);
$("skipBtn").onclick = () => {
  if (over) return endOver(false);
  stop();
  if (mode === "focus") afterFocus();
  else setMode("focus");
};
document.querySelectorAll(".modes button[data-mode]").forEach(b => b.onclick = () => setMode(b.dataset.mode));

// Zeiteinstellung: Vorlagen, Plus/Minus, tippbare Felder und optionale Sekunden
const STEP_LIMITS = { focus: [1, 180], short: [1, 120], long: [1, 180], rounds: [1, 12] };

function clampVal(key, field, raw) {
  const n = Math.round(+raw) || 0;
  if (field === "sec") return Math.min(Math.max(n, 0), 59);
  const [min, max] = STEP_LIMITS[key];
  // Mit Sekunden darf eine Phase auch unter einer Minute liegen (z.B. 0:10)
  const low = key !== "rounds" && settings.useSeconds ? 0 : min;
  return Math.min(Math.max(n, low), max);
}

function showSteppers() {
  document.querySelectorAll(".step-row").forEach(row => {
    const key = row.dataset.key;
    row.querySelector('[data-field="min"]').value = key === "rounds" ? settings.rounds : settings[key];
    const secInput = row.querySelector('[data-field="sec"]');
    if (secInput) secInput.value = String(settings[key + "Sec"] || 0).padStart(2, "0");
  });
  const current = `${settings.focus},${settings.short},${settings.long}`;
  document.querySelectorAll(".presets button").forEach(b => b.classList.toggle("active", b.dataset.preset === current));
}

function commitKey(key) {
  save("pomo_settings", settings);
  if (key !== "rounds" && !running && !over && mode === key) setMode(mode); else draw();
  showSteppers();
}

function setValue(key, field, raw) {
  if (key === "rounds") {
    settings.rounds = clampVal("rounds", "min", raw);
    focusDone = Math.min(focusDone, settings.rounds - 1);
  } else if (field === "sec") {
    settings[key + "Sec"] = clampVal(key, "sec", raw);
  } else {
    settings[key] = clampVal(key, "min", raw);
  }
  // Eine Phase dauert immer mindestens 1 Sekunde
  if (key !== "rounds" && !phaseSec(key)) settings[key + "Sec"] = 1;
  commitKey(key);
}

document.querySelectorAll(".step-row").forEach(row => {
  const key = row.dataset.key;
  row.querySelectorAll("button").forEach(b => b.onclick = () => {
    const cur = key === "rounds" ? settings.rounds : settings[key];
    setValue(key, "min", cur + (+b.dataset.d));
  });
  row.querySelectorAll(".step-val").forEach(inp => inp.onchange = () => setValue(key, inp.dataset.field, inp.value));
});

document.querySelectorAll(".presets button").forEach(b => b.onclick = () => {
  const [f, s, l] = b.dataset.preset.split(",").map(Number);
  Object.assign(settings, { focus: f, focusSec: 0, short: s, shortSec: 0, long: l, longSec: 0 });
  save("pomo_settings", settings);
  if (!running && !over) setMode(mode); else draw();
  showSteppers();
});

// Sekunden anzeigen (Ein/Aus)
$("setSeconds").checked = !!settings.useSeconds;
$("steppers").classList.toggle("with-seconds", !!settings.useSeconds);
$("setSeconds").onchange = e => {
  settings.useSeconds = e.target.checked;
  if (!settings.useSeconds) {
    Object.assign(settings, { focusSec: 0, shortSec: 0, longSec: 0 });
    for (const k of ["focus", "short", "long"]) settings[k] = Math.max(settings[k], 1);
  }
  $("steppers").classList.toggle("with-seconds", settings.useSeconds);
  save("pomo_settings", settings);
  if (!running && !over) setMode(mode); else draw();
  showSteppers();
};

$("setSound").checked = !!+settings.sound;
$("setSound").onchange = e => { settings.sound = e.target.checked ? 1 : 0; save("pomo_settings", settings); };

showSteppers();

// Fach-Vorschläge
$("subject").value = load("pomo_subject", "");
function updateSubjectList() {
  const names = [...new Set(sessions.map(s => s.subject))].filter(n => n !== NO_SUBJECT);
  $("subjectList").innerHTML = names.map(n => `<option value="${n.replace(/"/g, "&quot;")}">`).join("");
}
updateSubjectList();

/* ============================================================
   STATISTIK
   ============================================================ */
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Verlauf: 7 Tage (Minuten), 12 Wochen oder 12 Monate (Stunden)
const RANGE_KEY = "pomo_chart_range";   // nur pro Gerät, wird nicht synchronisiert
let chartRange = "days";
try { const r = localStorage.getItem(RANGE_KEY); if (["days", "weeks", "months"].includes(r)) chartRange = r; } catch {}

function chartBuckets(days) {
  if (chartRange === "days") return days.map(d => ({ label: d.label, val: d.min }));
  const sumRange = (from, to) => sessions.filter(s => s.date >= from && s.date < to).reduce((a, s) => a + s.min, 0);
  const out = [];
  if (chartRange === "weeks") {
    const mon = new Date(); mon.setHours(0, 0, 0, 0);
    mon.setDate(mon.getDate() - (mon.getDay() + 6) % 7);          // Montag dieser Woche
    for (let i = 11; i >= 0; i--) {
      const a = new Date(mon); a.setDate(a.getDate() - 7 * i);
      const b = new Date(a); b.setDate(b.getDate() + 7);
      out.push({ label: a.toLocaleDateString(locale(), { day: "numeric", month: "numeric" }), val: sumRange(dayKey(a), dayKey(b)) / 60 });
    }
  } else {
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const a = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const b = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      out.push({ label: a.toLocaleDateString(locale(), { month: "short" }), val: sumRange(dayKey(a), dayKey(b)) / 60 });
    }
  }
  return out;
}

function renderChart(days) {
  const key = { days: "stats.chart", weeks: "stats.chartWeeks", months: "stats.chartMonths" }[chartRange];
  $("chartTitle").dataset.i18n = key;
  $("chartTitle").textContent = t(key);
  $("chartRange").querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.range === chartRange));
  const bars = chartBuckets(days);
  const max = Math.max(...bars.map(d => d.val), chartRange === "days" ? 1 : 0.1);
  $("chart").classList.toggle("dense", bars.length > 7);
  $("chart").innerHTML = bars.map(d => `
    <div class="bar-col">
      <div class="bar-val">${round1(d.val) || ""}</div>
      <div class="bar" style="height:${(d.val / max) * 100}%"></div>
      <div class="bar-day">${esc(d.label)}</div>
    </div>`).join("");
}

$("chartRange").querySelectorAll("button").forEach(b => b.onclick = () => {
  chartRange = b.dataset.range;
  try { localStorage.setItem(RANGE_KEY, chartRange); } catch {}
  renderStats();
});

function renderStats() {
  const today = dayKey(new Date());
  const sumFor = key => sessions.filter(s => s.date === key).reduce((a, s) => a + s.min, 0);

  // Letzte 7 Tage
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push({ key: dayKey(d), label: d.toLocaleDateString(locale(), { weekday: "short" }), min: sumFor(dayKey(d)) });
  }
  renderChart(days);

  // Pausen und Überzeit (Pause = geplante Zeit + überzogen)
  const weekKeys = new Set(days.map(d => d.key));
  const sum = (list, f) => round1(list.reduce((a, x) => a + f(x), 0));
  const pause = b => b.min + (b.over || 0);
  const overOf = x => x.over || 0;
  const weekBreaks = breaks.filter(b => weekKeys.has(b.date));
  $("stBreakToday").textContent = sum(breaks.filter(b => b.date === today), pause);
  $("stBreakWeek").textContent = sum(weekBreaks, pause);
  $("stBreakOver").textContent = sum(weekBreaks, overOf);
  $("stWorkOver").textContent = sum(sessions.filter(s => weekKeys.has(s.date)), overOf);
  $("stOverTotal").textContent = t("stats.overTotal", { b: sum(breaks, pause), o: sum(breaks, overOf), w: sum(sessions, overOf) });

  $("stToday").textContent = round1(sumFor(today));
  $("stWeek").textContent = round1(days.reduce((a, d) => a + d.min, 0));
  $("stTotal").textContent = sessions.length;

  // Streak: aufeinanderfolgende Tage mit mind. 1 Session (heute zählt, wenn schon gelernt)
  let streak = 0;
  const d = new Date();
  if (!sumFor(dayKey(d))) d.setDate(d.getDate() - 1);
  while (sumFor(dayKey(d)) > 0) { streak++; d.setDate(d.getDate() - 1); }
  $("stStreak").textContent = streak;

  // Nach Fach
  const bySubject = {};
  sessions.forEach(s => bySubject[s.subject] = (bySubject[s.subject] || 0) + s.min);
  const entries = Object.entries(bySubject).sort((a, b) => b[1] - a[1]);
  const top = entries.length ? entries[0][1] : 1;
  $("subjectStats").innerHTML = entries.length
    ? entries.map(([n, m]) => `<div class="subject-line"><span class="name">${esc(subjectName(n))}</span><div class="track"><div class="fill" style="width:${m / top * 100}%"></div></div><span class="mins">${round1(m)} min</span></div>`).join("")
    : `<p style="color:var(--muted)">${esc(t("stats.noData"))}</p>`;

  // Verlauf
  $("history").innerHTML = sessions.slice(-8).reverse().map(s => {
    const d = new Date(s.ts);
    return `<li><span>${esc(subjectName(s.subject))} · ${s.min} min${s.over ? ` <span class="over">+${s.over}</span>` : ""}</span><span>${d.toLocaleDateString(locale())} ${d.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" })}</span></li>`;
  }).join("") || `<li><span style="color:var(--muted)">${esc(t("stats.nothing"))}</span></li>`;

  // Neuer Inhalt kann Felder fester Höhe vergrössern: Anordnung neu berechnen
  if ($("stats").classList.contains("active")) freeSchedule($("statsCanvas"), true);
}

// Alle Sessions und Pausen als CSV (Semikolon + BOM, damit Excel Umlaute und Spalten richtig liest)
function statsCsv() {
  const cell = v => {
    let s = String(v ?? "");
    if (/^[=+\-@]/.test(s)) s = "'" + s;                        // keine Formeln in Excel
    return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const num = n => new Intl.NumberFormat(locale(), { useGrouping: false, maximumFractionDigits: 1 }).format(round1(n || 0));
  const rows = [
    ...sessions.map(s => ({ ...s, kind: "focus" })),
    ...breaks
  ].sort((a, b) => a.ts - b.ts).map(x => {
    const d = new Date(x.ts);
    return [t("mode." + x.kind), x.date, d.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" }),
      num(x.min), num(x.over), x.kind === "focus" ? subjectName(x.subject) : ""].map(cell).join(";");
  });
  return "\ufeff" + [t("csv.head"), ...rows].join("\r\n") + "\r\n";
}

$("exportBtn").onclick = async () => {
  const name = `fokus-statistik-${dayKey(new Date())}.csv`;
  const blob = new Blob([statsCsv()], { type: "text/csv;charset=utf-8" });
  // Auf Handys (v.a. iOS-App) gibt es keinen Download-Ordner: dort über "Teilen" sichern
  const file = typeof File === "function" ? new File([blob], name, { type: blob.type }) : null;
  if (file && matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: name }); return; } catch (e) { if (e.name === "AbortError") return; }
  }
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

$("clearBtn").onclick = () => {
  if (confirm(t("stats.confirm"))) {
    sessions = []; save("pomo_sessions", sessions);
    breaks = []; save("pomo_breaks", breaks);
    updateSubjectList(); renderStats();
  }
};

/* ============================================================
   ZITATE
   ============================================================ */
let currentQuote = "";
let filter = "all";

// Eingebaute + eigene Zitate, jedes mit stabiler ID (Text und Autor in der aktuellen Sprache)
function allQuotes() {
  return [
    ...QUOTES.map((q, i) => ({ t: L(q.t), a: authorText(q), id: "b" + i, custom: false })),
    ...customQuotes.map(q => ({ t: q.t, a: !q.a || q.a === "Unbekannt" ? t("q.unknown") : q.a, id: q.id, custom: true }))
  ];
}

function paintQuote(textEl, authorEl, id) {
  const q = allQuotes().find(x => x.id === id);
  if (!q) return false;
  $(textEl).textContent = wrapQuote(q.t);
  $(authorEl).textContent = "– " + q.a;
  return true;
}

function showQuote() {
  const list = allQuotes();
  let i;
  do { i = Math.floor(Math.random() * list.length); } while (list[i].id === currentQuote && list.length > 1);
  currentQuote = list[i].id;
  paintQuote("qText", "qAuthor", currentQuote);
}

// Pro Seitenaufruf wird nur eine zufällige Auswahl gezeigt – bei jedem Öffnen eine andere
const QUOTE_BATCH = 10;
let quoteBatch = [];
function shuffleQuoteBatch() {
  const ids = allQuotes().map(q => q.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  quoteBatch = ids.slice(0, QUOTE_BATCH);
}
shuffleQuoteBatch();

function renderQuoteList() {
  const all = allQuotes();
  const list = filter === "fav"
    ? all.filter(q => favs.includes(q.id))
    : quoteBatch.map(id => all.find(q => q.id === id)).filter(Boolean);
  $("quoteList").innerHTML = list.length ? list.map(q => `
    <div class="q">
      <button class="fav ${favs.includes(q.id) ? "on" : ""}" data-id="${q.id}" title="${esc(t("q.fav"))}">${favs.includes(q.id) ? "★" : "☆"}</button>
      ${q.custom ? `<button class="qdel" data-id="${q.id}" title="${esc(t("q.delOwn"))}" aria-label="${esc(t("btn.delete"))}">✕</button>` : ""}
      ${esc(wrapQuote(q.t))}<small>– ${esc(q.a)}</small>
    </div>`).join("") : `<p style="color:var(--muted)">${esc(t("q.noFavs"))}</p>`;
  $("quoteList").querySelectorAll(".fav").forEach(b => b.onclick = () => {
    const id = b.dataset.id;
    favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    save("pomo_favs", favs);
    renderQuoteList();
  });
  $("quoteList").querySelectorAll(".qdel").forEach(b => b.onclick = () => {
    const id = b.dataset.id;
    customQuotes = customQuotes.filter(q => q.id !== id);
    favs = favs.filter(f => f !== id);
    save("pomo_custom_quotes", customQuotes);
    save("pomo_favs", favs);
    renderQuoteList();
  });
}

$("quoteAddForm").onsubmit = e => {
  e.preventDefault();
  const t = $("qNewText").value.trim();
  if (!t) return;
  const a = $("qNewAuthor").value.trim();   // leer = "Unbekannt" in der jeweiligen Sprache
  const id = "c" + Date.now();
  customQuotes.push({ id, t, a });
  save("pomo_custom_quotes", customQuotes);
  quoteBatch = [id, ...quoteBatch];   // neues Zitat sofort oben anzeigen
  $("qNewText").value = ""; $("qNewAuthor").value = "";
  renderQuoteList();
};

document.querySelectorAll(".chips button[data-filter]").forEach(b => b.onclick = () => {
  document.querySelectorAll(".chips button[data-filter]").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); filter = b.dataset.filter; renderQuoteList();
});
$("nextQuote").onclick = showQuote;
$("shuffleQuotes").onclick = () => {
  shuffleQuoteBatch();
  filter = "all";
  document.querySelectorAll(".chips button[data-filter]").forEach(x => x.classList.toggle("active", x.dataset.filter === "all"));
  renderQuoteList();
};

// Umschalten zwischen den drei Zitat-Arten auf der einen Zitate-Seite
document.querySelectorAll(".qtabs button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".qtabs button").forEach(x => x.classList.remove("active"));
  document.querySelectorAll(".qview").forEach(v => v.classList.remove("active"));
  b.classList.add("active");
  $("qview-" + b.dataset.qtab).classList.add("active");
});

/* ============================================================
   MÖNCHS-ZITATE (in der Originalsprache)
   ============================================================ */
let currentMonk = -1;

function showMonkQuote() {
  let i;
  do { i = Math.floor(Math.random() * MONK_QUOTES.length); } while (i === currentMonk && MONK_QUOTES.length > 1);
  currentMonk = i;
  paintMonkQuote();
}

function paintMonkQuote() {
  const q = MONK_QUOTES[currentMonk];
  $("mText").textContent = q.t;
  $("mText").lang = q.lang;
  $("mAuthor").textContent = "– " + monkAuthor(q);
}

function renderMonkList() {
  $("monkList").innerHTML = MONK_QUOTES.map(q => `
    <div class="q">
      <span class="lang">${esc(t("lang." + q.lang))}</span>
      <span lang="${q.lang}">${esc(q.t)}</span><small>– ${esc(monkAuthor(q))}</small>
    </div>`).join("");
}

$("nextMonk").onclick = showMonkQuote;

/* ============================================================
   REVOLUTIONÄRE
   ============================================================ */
let currentRevo = -1;

function showRevoQuote() {
  let i;
  do { i = Math.floor(Math.random() * REVO_QUOTES.length); } while (i === currentRevo && REVO_QUOTES.length > 1);
  currentRevo = i;
  paintRevoQuote();
}

function paintRevoQuote() {
  const q = REVO_QUOTES[currentRevo];
  $("rText").textContent = wrapQuote(L(q.t));
  $("rAuthor").textContent = "– " + authorText(q);
}

function renderRevoList() {
  $("revoList").innerHTML = REVO_QUOTES.map(q => {
    const text = L(q.t);
    return `
    <div class="q">
      ${esc(wrapQuote(text))}${q.o && q.o !== text ? `<span class="orig">${esc(q.o)}</span>` : ""}<small>– ${esc(authorText(q))}</small>
    </div>`;
  }).join("");
}

$("nextRevo").onclick = showRevoQuote;

/* ============================================================
   TO-DO (im Browser gespeichert)
   ============================================================ */
let todos = load("pomo_todos", []);   // [{ id, text, done, due }]  (due: "2026-10-31" oder leer)
const saveTodos = () => save("pomo_todos", todos);

// Deadline als kleines Schild: Datum + wie lange noch
const validDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
function dueBadge(todo) {
  if (!validDate(todo.due || "")) return "";
  const [y, m, d] = todo.due.split("-").map(Number);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.round((new Date(y, m - 1, d) - today) / 864e5);
  const rel = diff === 0 ? t("due.today") : diff === 1 ? t("due.tomorrow") : diff > 1 ? t("due.in", { n: diff })
    : diff === -1 ? t("due.yesterday") : t("due.over", { n: -diff });
  const cls = todo.done ? "" : diff < 0 ? "late" : diff <= 1 ? "soon" : "";
  const date = new Date(y, m - 1, d).toLocaleDateString(locale(), { day: "2-digit", month: "2-digit", year: "numeric" });
  return `<span class="due ${cls}" title="${esc(t("due.title"))}">${date} · ${rel}</span>`;
}

// Ein To-do wird im Timer zum Fach (das Feld fasst 30 Zeichen); seine Zeit = Sessions mit diesem Fach
const todoSubject = td => td.text.slice(0, 30).trim();
function todoTime(td) {
  const key = todoSubject(td);
  const min = round1(sessions.filter(s => s.subject === key).reduce((a, s) => a + s.min, 0));
  const txt = min < 60 ? t("dur.min", { n: min }) : round1(min / 60) + " h";
  return min ? `<span class="due todo-time" title="${esc(t("todo.time"))}">${txt}</span>` : "";
}

function focusTodo(td) {
  $("subject").value = todoSubject(td);
  save("pomo_subject", $("subject").value);
  document.querySelector('nav button[data-page="timer"]')?.click();
  setTimerTab("timerCanvas");
  if (!running && !over && mode !== "focus") setMode("focus");
}

function renderTodos() {
  $("todoList").innerHTML = todos.length
    ? todos.map(td => `
      <li class="${td.done ? "done" : ""}" data-id="${td.id}">
        <label><input type="checkbox" ${td.done ? "checked" : ""}><span>${esc(td.text)}</span></label>
        ${todoTime(td)}
        ${dueBadge(td)}
        ${td.done ? "" : `<button class="todo-focus" title="${esc(t("todo.focus"))}" aria-label="${esc(t("todo.focus"))}">▶</button>`}
        <button class="todo-del" title="${esc(t("btn.delete"))}" aria-label="${esc(t("btn.delete"))}">✕</button>
      </li>`).join("")
    : `<li class="empty">${esc(t("todo.empty"))}</li>`;
  $("todoList").querySelectorAll("li[data-id]").forEach(li => {
    const id = +li.dataset.id;
    li.querySelector("input").onchange = e => {
      const t = todos.find(x => x.id === id);
      if (t) { t.done = e.target.checked; saveTodos(); renderTodos(); }
    };
    const focusBtn = li.querySelector(".todo-focus");
    if (focusBtn) focusBtn.onclick = () => { const td = todos.find(x => x.id === id); if (td) focusTodo(td); };
    li.querySelector(".todo-del").onclick = () => {
      todos = todos.filter(x => x.id !== id); saveTodos(); renderTodos();
    };
  });
}

$("todoForm").onsubmit = e => {
  e.preventDefault();
  const text = $("todoInput").value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false, due: validDate($("todoDate").value) });
  $("todoInput").value = ""; $("todoDate").value = "";
  saveTodos(); renderTodos();
};
$("clearDone").onclick = () => { todos = todos.filter(t => !t.done); saveTodos(); renderTodos(); };

/* ============================================================
   TIMER-ÜBERSICHT: Heute-Werte, Tagesziel, Zitat
   ============================================================ */
function renderToday() {
  const sumFor = k => sessions.filter(s => s.date === k).reduce((a, s) => a + s.min, 0);
  const todayKey = dayKey(new Date());
  const todays = sessions.filter(s => s.date === todayKey);
  $("tMin").textContent = round1(sumFor(todayKey));
  $("tSessions").textContent = todays.length;
  let streak = 0; const d = new Date();
  if (!sumFor(dayKey(d))) d.setDate(d.getDate() - 1);
  while (sumFor(dayKey(d)) > 0) { streak++; d.setDate(d.getDate() - 1); }
  $("tStreak").textContent = streak;
  const goal = settings.goal || 4;
  $("goalVal").textContent = goal;
  $("goalCount").textContent = `${todays.length} / ${goal}`;
  $("goalFill").style.width = Math.min(100, todays.length / goal * 100) + "%";
}

$("goalMinus").onclick = () => { settings.goal = Math.max((settings.goal || 4) - 1, 1); save("pomo_settings", settings); renderToday(); };
$("goalPlus").onclick = () => { settings.goal = Math.min((settings.goal || 4) + 1, 12); save("pomo_settings", settings); renderToday(); };

let timerQuote = "";
function showTimerQuote() {
  const list = allQuotes();
  timerQuote = list[Math.floor(Math.random() * list.length)].id;
  paintQuote("tQuote", "tQuoteAuthor", timerQuote);
}

/* ============================================================
   UHREN: beliebig viele eigene Timer und Stoppuhren
   Gespeichert in pomo_clocks: [{ id, type: "timer"|"watch", name, dur: Sekunden (nur Timer),
     acc: bisher gelaufene ms, start: Zeitpunkt des Starts (ms) oder null, laps: [ms] (nur Stoppuhr) }]
   Laufende Uhren merken sich nur den Startzeitpunkt → laufen auch nach dem Neuladen weiter.
   ============================================================ */
const CLOCK_MAX_SEC = 100 * 3600 - 1;
const CLOCK_MAX_LAPS = 99;
const CLOCK_PRESETS = [10, 60, 300, 600];   // Schnellwahl in Sekunden
let clocks = load("pomo_clocks", []);
if (!Array.isArray(clocks)) clocks = [];
let clockTick = null;
let clockEndTimer = null;
const saveClocks = () => save("pomo_clocks", clocks);

const clockElapsed = c => c.acc + (c.start ? Date.now() - c.start : 0);
const clockLeft = c => Math.max(0, c.dur * 1000 - clockElapsed(c));
const clockIdle = c => !c.start && !c.acc;
const clockDone = c => c.type === "timer" && !c.start && c.acc > 0 && clockLeft(c) <= 0;

// 1:05:09 bzw. 05:09 – Stoppuhren zusätzlich mit Zehntelsekunden
function fmtClock(ms, tenths) {
  const total = tenths ? Math.floor(ms / 1000) : Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600), m = Math.floor(total / 60) % 60, s = total % 60;
  const p = n => String(n).padStart(2, "0");
  return (h ? h + ":" + p(m) : p(m)) + ":" + p(s) + (tenths ? "." + Math.floor(ms % 1000 / 100) : "");
}

function clockStartLabel(c) {
  if (c.start) return t("btn.pause");
  return clockIdle(c) || clockDone(c) ? t("btn.start") : t("btn.resume");
}

// Text unter den Ziffern (wie "Zeit zum Fokussieren" beim Pomodoro)
function clockLabel(c) {
  if (c.type === "timer") {
    if (clockDone(c)) return t("clocks.done");
    return clockIdle(c) ? t("clocks.setHint") : t("clocks.of", { t: fmtClock(c.dur * 1000) });
  }
  return (c.laps || []).length ? t("clocks.lapN", { n: c.laps.length + 1 }) : "";
}

// Abgelaufene Timer anhalten (beim Laden ohne Ton und ohne Popup)
function clockCheckDone(silent) {
  const hit = [];
  clocks.forEach(c => {
    if (c.type === "timer" && c.start && clockLeft(c) <= 0) {
      c.acc = c.dur * 1000; c.start = null; hit.push(c);
    }
  });
  if (!hit.length) return;
  if (!silent) {
    beep();
    showTimeUp(hit.map(c => t("done.timer", { name: c.name })));
  }
  saveClocks();
  renderClocks();
}

function paintClocks() {
  clockCheckDone(false);
  document.querySelectorAll(".clock-list li[data-id]").forEach(li => {
    const c = clocks.find(x => x.id === +li.dataset.id);
    if (!c) return;
    const el = li.querySelector(".digits");
    if (el) {
      el.textContent = c.type === "timer" ? fmtClock(clockLeft(c)) : fmtClock(clockElapsed(c), true);
      el.classList.toggle("long", el.textContent.length > 5);
      el.classList.toggle("xlong", el.textContent.length > 7);
    }
    // Ring wie beim Pomodoro: Timer = Restzeit, Stoppuhr = läuft einmal pro Minute voll
    const frac = c.type === "timer" ? (c.dur ? clockLeft(c) / (c.dur * 1000) : 0) : clockElapsed(c) % 60000 / 60000;
    li.querySelector(".ring .fg").style.strokeDashoffset = CIRC * (1 - frac);
  });
}

function clockEnsureTick() {
  const any = clocks.some(c => c.start);
  if (any && !clockTick) clockTick = setInterval(paintClocks, 50);
  if (!any && clockTick) { clearInterval(clockTick); clockTick = null; }
  // Wie beim Pomodoro: genauer Timeout auf das nächste Timer-Ende, auch im Hintergrund
  clearTimeout(clockEndTimer);
  const left = clocks.filter(c => c.type === "timer" && c.start).map(clockLeft);
  if (left.length) clockEndTimer = setTimeout(paintClocks, Math.min(...left) + 20);
}

// Timer und Stoppuhren stehen in je einer eigenen Liste (Umschalter oben auf der Timer-Seite)
const CLOCK_LISTS = { timer: ["clockTimerList", "clocks.emptyTimer"], watch: ["clockWatchList", "clocks.emptyWatch"] };

function renderClocks() {
  for (const type in CLOCK_LISTS) renderClockList(type);
  paintClocks();
  clockEnsureTick();
}

function renderClockList(type) {
  const [listId, emptyKey] = CLOCK_LISTS[type];
  const list = clocks.filter(c => c.type === type);
  $(listId).innerHTML = list.length ? list.map(c => {
    const timer = c.type === "timer";
    const idle = clockIdle(c);
    const h = Math.floor(c.dur / 3600), m = Math.floor(c.dur / 60) % 60, s = c.dur % 60;
    // Eingabe direkt in den Ziffern: mm:ss, ab einer Stunde h:mm:ss (Minuten dürfen auch 90 o.ä. sein)
    const field = (f, v, label, max) => `<input class="clock-set-val" data-f="${f}" type="text" inputmode="numeric" maxlength="${max}" value="${String(v).padStart(2, "0")}" aria-label="${esc(t(label))}">`;
    const setFields = [h ? field("h", h, "clocks.h", 2) : "", field("m", m, "clocks.m", h ? 2 : 3), field("s", s, "clocks.s", 2)]
      .filter(Boolean).join(`<span class="colon">:</span>`);
    const laps = c.laps || [];
    return `
      <li class="clock-item ${timer ? "is-timer" : "is-watch"} ${c.start ? "running" : ""} ${clockDone(c) ? "done" : ""}" data-id="${c.id}">
        ${timer ? `<div class="modes clock-presets">${CLOCK_PRESETS.map(sec => `<button type="button" data-sec="${sec}" class="${c.dur === sec ? "active" : ""}">${esc(sec < 60 ? t("dur.sec", { n: sec }) : t("dur.min", { n: sec / 60 }))}</button>`).join("")}</div>` : ""}
        <div class="ring-wrap">
          <svg class="ring" viewBox="0 0 260 260" aria-hidden="true">
            <circle class="bg" cx="130" cy="130" r="114"/>
            <circle class="fg" cx="130" cy="130" r="114" style="stroke-dasharray:${CIRC}"/>
          </svg>
          <div class="time">
            ${timer && idle
              ? `<div class="clock-set ${h ? "with-h" : ""}">${setFields}</div>`
              : `<div class="digits"></div>`}
            <div class="label">${esc(clockLabel(c))}</div>
          </div>
        </div>
        <div class="controls">
          <button class="btn clock-start" type="button" ${timer && !c.dur ? "disabled" : ""}>${esc(clockStartLabel(c))}</button>
          ${!timer && c.start ? `<button class="btn secondary clock-lap" type="button" ${laps.length >= CLOCK_MAX_LAPS ? "disabled" : ""}>${esc(t("clocks.lap"))}</button>` : ""}
          <button class="btn secondary clock-reset" type="button" ${idle ? "disabled" : ""}>${esc(t("btn.reset"))}</button>
        </div>
        ${laps.length ? `<ol class="clock-laps">${laps.map((ms, i) => `<li><span>${esc(t("clocks.lapN", { n: i + 1 }))}</span><span>${fmtClock(ms - (laps[i - 1] || 0), true)}</span><span>${fmtClock(ms, true)}</span></li>`).reverse().join("")}</ol>` : ""}
        <div class="subject-row clock-name-row">
          <label for="clockName${c.id}">${esc(t("clocks.name"))}</label>
          <input class="clock-name" id="clockName${c.id}" type="text" maxlength="40" value="${esc(c.name)}">
          <button class="todo-del clock-del" type="button" title="${esc(t("btn.delete"))}" aria-label="${esc(t("btn.delete"))}">✕</button>
        </div>
      </li>`;
  }).join("") : `<li class="empty">${esc(t(emptyKey))}</li>`;

  $(listId).querySelectorAll("li[data-id]").forEach(li => {
    const c = clocks.find(x => x.id === +li.dataset.id);
    const update = () => { saveClocks(); renderClocks(); };
    li.querySelector(".clock-name").onchange = e => { c.name = e.target.value.trim() || c.name; e.target.value = c.name; saveClocks(); };
    li.querySelector(".clock-del").onclick = () => { clocks = clocks.filter(x => x !== c); update(); };
    li.querySelector(".clock-start").onclick = () => {
      if (c.start) { c.acc = clockElapsed(c); c.start = null; }
      else { if (clockDone(c)) c.acc = 0; c.start = Date.now(); if (c.type === "timer") askNotify(); }
      update();
    };
    // Schnellwahl wie die Modus-Knöpfe beim Pomodoro: setzt die Zeit und hält den Timer an
    li.querySelectorAll(".clock-presets button").forEach(b => b.onclick = () => {
      c.dur = +b.dataset.sec; c.acc = 0; c.start = null; update();
    });
    li.querySelector(".clock-reset").onclick = () => { c.acc = 0; c.start = null; c.laps = []; update(); };
    const lap = li.querySelector(".clock-lap");
    if (lap) lap.onclick = () => { (c.laps = c.laps || []).push(clockElapsed(c)); update(); };
    li.querySelectorAll(".clock-set-val").forEach(inp => {
      inp.onfocus = () => inp.select();
      inp.onkeydown = e => { if (e.key === "Enter") inp.blur(); };
      // Feld wächst mit, wenn dreistellige Minuten getippt werden
      inp.oninput = () => { inp.style.width = Math.max(2, inp.value.length) + "ch"; };
      inp.onchange = () => {
        const v = f => +(li.querySelector(`[data-f="${f}"]`)?.value.replace(/\D/g, "")) || 0;
        const hasH = !!li.querySelector('[data-f="h"]');
        c.dur = Math.min(CLOCK_MAX_SEC, v("h") * 3600 + (hasH ? Math.min(v("m"), 59) : v("m")) * 60 + Math.min(v("s"), 59));
        update();
      };
    });
  });
}

function addClock(type) {
  const n = clocks.filter(c => c.type === type).length + 1;
  // Eindeutige ID, auch wenn zwei Uhren in derselben Millisekunde entstehen
  const id = Math.max(Date.now(), ...clocks.map(c => c.id + 1));
  clocks.push({ id, type, name: t(type === "timer" ? "clocks.timerName" : "clocks.watchName", { n }), dur: type === "timer" ? 300 : 0, acc: 0, start: null, laps: [] });
  saveClocks(); renderClocks();
}
$("addClockTimer").onclick = () => addClock("timer");
$("addClockWatch").onclick = () => addClock("watch");

// Umschalter oben auf der Timer-Seite: Pomodoro, Timer, Stoppuhr (gemerkt pro Gerät)
const TTAB_KEY = "fokus_timer_tab";
function setTimerTab(id) {
  if (!$(id)?.classList.contains("tview")) id = "timerCanvas";
  document.querySelectorAll(".ttabs button").forEach(b => {
    const on = b.dataset.ttab === id;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", String(on));
  });
  document.querySelectorAll(".tview").forEach(v => v.classList.toggle("active", v.id === id));
  document.body.classList.toggle("tab-pomodoro", id === "timerCanvas");
  try { localStorage.setItem(TTAB_KEY, id); } catch {}
}
document.querySelectorAll(".ttabs button").forEach(b => b.onclick = () => setTimerTab(b.dataset.ttab));
let savedTimerTab = null;
try { savedTimerTab = localStorage.getItem(TTAB_KEY); } catch {}
setTimerTab(savedTimerTab || "timerCanvas");

/* ============================================================
   MENÜ ANPASSEN: sichtbare Menüpunkte und Reihenfolge
   ============================================================ */
const navEl = document.querySelector("nav");
const MENU_DEFAULT = [...navEl.querySelectorAll("button")].map(b => b.dataset.page);
let menuCfg = load("pomo_menu", null);

function normalizeMenu() {
  if (!Array.isArray(menuCfg)) menuCfg = MENU_DEFAULT.map(page => ({ page, visible: true }));
  menuCfg = menuCfg.filter(m => MENU_DEFAULT.includes(m.page));
  MENU_DEFAULT.forEach(page => { if (!menuCfg.some(m => m.page === page)) menuCfg.push({ page, visible: true }); });
  menuCfg.find(m => m.page === "timer").visible = true;   // Timer bleibt immer sichtbar
}

function applyMenu() {
  menuCfg.forEach(m => {
    const b = navEl.querySelector(`button[data-page="${m.page}"]`);
    navEl.appendChild(b);
    b.hidden = !m.visible;
  });
  const active = navEl.querySelector("button.active");
  if (active && active.hidden) navEl.querySelector('button[data-page="timer"]').click();
}

function saveMenu() { save("pomo_menu", menuCfg); applyMenu(); renderMenuEdit(); }

function renderMenuEdit() {
  $("menuEditList").innerHTML = menuCfg.map((m, i) => {
    const b = navEl.querySelector(`button[data-page="${m.page}"]`);
    const locked = m.page === "timer";
    return `
      <li>
        <label><input type="checkbox" data-i="${i}" ${m.visible ? "checked" : ""} ${locked ? "disabled" : ""}>
          <img class="icon" src="${b.querySelector("img").getAttribute("src")}" alt="">${esc(b.querySelector(".label").textContent)}</label>
        <span class="order">
          <button type="button" data-move="-1" data-i="${i}" ${i === 0 ? "disabled" : ""} aria-label="${esc(t("menuEdit.up"))}">↑</button>
          <button type="button" data-move="1" data-i="${i}" ${i === menuCfg.length - 1 ? "disabled" : ""} aria-label="${esc(t("menuEdit.down"))}">↓</button>
        </span>
      </li>`;
  }).join("");
  $("menuEditList").querySelectorAll("input").forEach(cb => cb.onchange = () => {
    menuCfg[+cb.dataset.i].visible = cb.checked; saveMenu();
  });
  $("menuEditList").querySelectorAll("[data-move]").forEach(btn => btn.onclick = () => {
    const i = +btn.dataset.i, j = i + +btn.dataset.move;
    [menuCfg[i], menuCfg[j]] = [menuCfg[j], menuCfg[i]]; saveMenu();
  });
}

const closeMenuModal = () => { $("menuModal").hidden = true; };
$("menuEditBtn").onclick = () => { renderMenuEdit(); $("menuModal").hidden = false; };
$("menuDone").onclick = closeMenuModal;
$("menuModal").onclick = e => { if (e.target === $("menuModal")) closeMenuModal(); };
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("menuModal").hidden) closeMenuModal(); });
$("menuReset").onclick = () => { menuCfg = null; normalizeMenu(); saveMenu(); };

normalizeMenu();
applyMenu();

/* ============================================================
   FELDER ANORDNEN: Position, Breite und Höhe der Felder anpassen
   Raster mit 12 Spalten.
   Pro Karte wird gespeichert:
     - order: Array der Karten-IDs im Container
     - size: { [kartenId]: { w: Spalten (3..12), h: Höhe in px (oder weggelassen für Auto) } }
   ============================================================ */
const GRID_COLS = 12;
const MIN_SPAN = 3;
let layout = load("pomo_layout", {});
const layoutBoxes = [...document.querySelectorAll(".page, .qview")].filter(box => box.querySelector(":scope > .card"));

function getBoxCards(box) {
  return [...box.children].filter(el => el.classList.contains("card"));
}

function getCardId(card, box, index) {
  return card.dataset.cardId || card.dataset.card || (box.id + "-" + index);
}

// Übersetzungs-Schlüssel für den Titel eines Feldes (aus data-title-key oder der Überschrift)
function getCardTitleKey(card) {
  if (card.dataset.titleKey) return card.dataset.titleKey;
  const h = card.querySelector("h2[data-i18n], h2 [data-i18n]");
  return h ? h.dataset.i18n : "layout.field";
}

function boxCfg(box) {
  const cfg = layout[box.id] || (layout[box.id] = {});
  cfg.size = cfg.size || {};
  return cfg;
}

const saveLayout = () => save("pomo_layout", layout);

function saveBoxOrder(box) {
  const cfg = boxCfg(box);
  cfg.order = getBoxCards(box).map(c => c.dataset.card);
  saveLayout();
}

function getCardSize(card) {
  const box = card.parentElement;
  if (!box) return {};
  const cfg = boxCfg(box);
  return { ...(cfg.size[card.dataset.card] || {}) };
}

function getCardSpan(card) {
  const s = getCardSize(card);
  return (s && s.w) ? s.w : 6;
}

function setCardSize(card, s) {
  const box = card.parentElement;
  if (!box) return;
  const cfg = boxCfg(box);
  const clean = {};
  if (s && s.w) clean.w = Math.min(GRID_COLS, Math.max(MIN_SPAN, s.w));
  if (s && s.h) clean.h = Math.max(140, Math.round(s.h / 10) * 10);
  cfg.size[card.dataset.card] = clean;
}

function applyCardSize(card, s) {
  if (s && s.w) {
    card.style.setProperty("--span", s.w);
  } else {
    card.style.removeProperty("--span");
  }
  if (s && s.h) {
    card.style.height = s.h + "px";
    card.classList.add("sized");
  } else {
    card.style.removeProperty("height");
    card.classList.remove("sized");
  }
}

// Ermittelt die Karten, die in derselben Zeile wie die gegebene Karte liegen
function getRowCards(card) {
  const box = card.parentElement;
  if (!box) return [card];
  const cards = getBoxCards(box);
  let currentRow = [];
  let currentUsed = 0;
  for (const c of cards) {
    const w = getCardSpan(c);
    if (currentRow.length > 0 && currentUsed + w > GRID_COLS) {
      if (currentRow.includes(card)) {
        return currentRow;
      }
      currentRow = [];
      currentUsed = 0;
    }
    currentRow.push(c);
    currentUsed += w;
  }
  return currentRow;
}

// Stellt sicher, dass Paare in einer Zeile nicht über 12 Spalten überlaufen und nach unten springen
function sanitizeBoxSizes(box) {
  const cards = getBoxCards(box);
  const cfg = boxCfg(box);
  let currentRow = [];
  let currentUsed = 0;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const s = cfg.size[card.dataset.card] || {};
    let w = s.w || 6;

    if (w >= GRID_COLS) {
      currentRow = [];
      currentUsed = 0;
      continue;
    }

    if (currentRow.length > 0 && currentUsed + w > GRID_COLS) {
      const prevCard = currentRow[currentRow.length - 1];
      const prevS = cfg.size[prevCard.dataset.card] || {};
      const prevW = prevS.w || 6;
      const available = GRID_COLS - (currentUsed - prevW);

      if (available === GRID_COLS && prevW < GRID_COLS) {
        const safePrevW = Math.min(GRID_COLS - MIN_SPAN, Math.max(MIN_SPAN, prevW));
        const safeCurW = Math.max(MIN_SPAN, GRID_COLS - safePrevW);

        prevS.w = safePrevW;
        cfg.size[prevCard.dataset.card] = prevS;

        s.w = safeCurW;
        cfg.size[card.dataset.card] = s;

        currentUsed = safePrevW + safeCurW;
        currentRow = [prevCard, card];
        continue;
      }

      currentRow = [card];
      currentUsed = w;
    } else {
      currentRow.push(card);
      currentUsed += w;
    }
  }
}

// Ändert die Spaltenbreite einer Karte und verkleinert anstossende Nachbar-Karten in derselben Zeile
function setCardSpanWithSiblings(card, desiredW) {
  const box = card.parentElement;
  if (!box) return;

  const rowCards = getRowCards(card);
  const targetIndex = rowCards.indexOf(card);
  const curW = getCardSpan(card);
  desiredW = Math.min(GRID_COLS, Math.max(MIN_SPAN, desiredW));

  if (desiredW === curW) return;

  // Wenn nur 1 Karte in der Reihe ist oder gewünschte Breite 12 (Vollbild) ist
  if (rowCards.length <= 1 || desiredW === GRID_COLS) {
    const s = getCardSize(card);
    s.w = desiredW;
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateBoxCardsUI(box);
    return;
  }

  const delta = desiredW - curW;
  const currentTotal = rowCards.reduce((sum, c) => sum + getCardSpan(c), 0);
  const newTotal = currentTotal + delta;

  if (newTotal <= GRID_COLS) {
    const s = getCardSize(card);
    s.w = desiredW;
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateBoxCardsUI(box);
    return;
  }

  // Überlauf: Die Vergrösserung stösst gegen andere Karten in derselben Reihe!
  // Nachbar-Karten verkleinern, damit keine Karte nach unten springt.
  let overflow = newTotal - GRID_COLS;
  const updates = new Map();

  // 1. Zuerst Karten rechts vom Ziel verkleinern
  for (let i = targetIndex + 1; i < rowCards.length; i++) {
    const c = rowCards[i];
    const w = getCardSpan(c);
    const canShrink = Math.max(0, w - MIN_SPAN);
    const shrink = Math.min(overflow, canShrink);
    if (shrink > 0) {
      updates.set(c, w - shrink);
      overflow -= shrink;
    }
  }

  // 2. Falls noch Überlauf vorhanden: Karten links vom Ziel verkleinern
  if (overflow > 0) {
    for (let i = targetIndex - 1; i >= 0; i--) {
      const c = rowCards[i];
      const w = getCardSpan(c);
      const canShrink = Math.max(0, w - MIN_SPAN);
      const shrink = Math.min(overflow, canShrink);
      if (shrink > 0) {
        updates.set(c, w - shrink);
        overflow -= shrink;
      }
    }
  }

  // 3. Falls noch Überlauf vorhanden (alle anderen am Minimum): Ziel deckeln
  const finalW = desiredW - overflow;
  if (finalW < MIN_SPAN) return;
  updates.set(card, finalW);

  updates.forEach((newW, c) => {
    const s = getCardSize(c);
    s.w = newW;
    setCardSize(c, s);
    applyCardSize(c, s);
  });
  saveLayout();
  updateBoxCardsUI(box);
}

function updateCardUI(card) {
  const s = getCardSize(card);
  const w = (s && s.w) ? s.w : 6;
  const hText = (s && s.h) ? (s.h + "px") : t("layout.auto");
  const badge = card.querySelector(".card-dim-badge");
  if (badge) {
    badge.textContent = t("layout.badge", { w, h: hText });
  }

  card.querySelectorAll(".btn-ctrl-span-preset").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.span, 10) === w);
  });

  const btnAuto = card.querySelector(".btn-ctrl-height-auto");
  if (btnAuto) {
    btnAuto.classList.toggle("active", !s || !s.h);
  }

  const prev = card.previousElementSibling;
  const next = card.nextElementSibling;
  const btnPrev = card.querySelector(".btn-ctrl-move-prev");
  const btnNext = card.querySelector(".btn-ctrl-move-next");
  if (btnPrev) btnPrev.disabled = !prev || !prev.classList.contains("card");
  if (btnNext) btnNext.disabled = !next || !next.classList.contains("card");

  const btnMinus = card.querySelector(".btn-ctrl-span-minus");
  if (btnMinus) {
    btnMinus.disabled = w <= MIN_SPAN;
  }

  const btnPlus = card.querySelector(".btn-ctrl-span-plus");
  if (btnPlus) {
    if (w >= GRID_COLS) {
      btnPlus.disabled = true;
    } else {
      const rowCards = getRowCards(card);
      const rowTotal = rowCards.reduce((sum, c) => sum + getCardSpan(c), 0);
      const canGrow = (rowTotal < GRID_COLS) || rowCards.some(c => c !== card && getCardSpan(c) > MIN_SPAN);
      btnPlus.disabled = !canGrow;
    }
  }
}

function updateBoxCardsUI(box) {
  getBoxCards(box).forEach(card => updateCardUI(card));
}

// Initialisiere alle Karten
layoutBoxes.forEach(box => {
  const cards = getBoxCards(box);
  cards.forEach((card, i) => {
    const cardId = getCardId(card, box, i);
    card.dataset.card = cardId;
    card.dataset.pos = i;

    // Erstelle Edit-Toolbar (Texte über data-i18n, damit sie beim Sprachwechsel mitwechseln)
    if (!card.querySelector(".card-edit-bar")) {
      const bar = document.createElement("div");
      bar.className = "card-edit-bar";
      bar.innerHTML = `
        <div class="card-edit-header">
          <span class="card-drag-handle" data-i18n-title="layout.dragHold">
            <span class="drag-icon">⋮⋮</span>
            <span class="card-edit-title" data-i18n="${getCardTitleKey(card)}"></span>
          </span>
          <span class="card-dim-badge"></span>
        </div>
        <div class="card-edit-controls">
          <div class="card-edit-group" data-i18n-title="layout.posGroup">
            <span class="ctrl-label" data-i18n="layout.pos"></span>
            <button type="button" class="btn-ctrl btn-ctrl-move-prev" data-i18n-title="layout.movePrev" data-i18n-aria="layout.back">←</button>
            <button type="button" class="btn-ctrl btn-ctrl-move-next" data-i18n-title="layout.moveNext" data-i18n-aria="layout.forward">→</button>
          </div>
          <div class="card-edit-group" data-i18n-title="layout.widthGroup">
            <span class="ctrl-label" data-i18n="layout.width"></span>
            <button type="button" class="btn-ctrl btn-ctrl-span-minus" data-i18n-title="layout.narrower">−</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="4" data-i18n-title="layout.third">⅓</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="6" data-i18n-title="layout.half">½</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="8" data-i18n-title="layout.twoThirds">⅔</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="12" data-i18n-title="layout.full" data-i18n="layout.fullText"></button>
            <button type="button" class="btn-ctrl btn-ctrl-span-plus" data-i18n-title="layout.wider">+</button>
          </div>
          <div class="card-edit-group" data-i18n-title="layout.heightGroup">
            <span class="ctrl-label" data-i18n="layout.height"></span>
            <button type="button" class="btn-ctrl btn-ctrl-height-minus" data-i18n-title="layout.lower">−</button>
            <button type="button" class="btn-ctrl btn-ctrl-height-auto" data-i18n-title="layout.autoHeight" data-i18n="layout.auto"></button>
            <button type="button" class="btn-ctrl btn-ctrl-height-plus" data-i18n-title="layout.higher">+</button>
          </div>
        </div>
      `;
      card.insertBefore(bar, card.firstChild);
      applyI18n(bar);
    }

    // Resize-Griff
    let grip = card.querySelector(".card-resize");
    if (!grip) {
      grip = document.createElement("span");
      grip.className = "card-resize";
      grip.dataset.i18nTitle = "layout.grip";
      grip.title = t("layout.grip");
      card.appendChild(grip);
    }
  });
});

function applyLayout() {
  layoutBoxes.forEach(box => {
    const cfg = layout[box.id] || {};
    const order = Array.isArray(cfg.order) ? cfg.order : [];
    const cards = getBoxCards(box);
    const rank = c => {
      const idx = order.indexOf(c.dataset.card);
      return idx < 0 ? 1000 + +c.dataset.pos : idx;
    };
    cards.sort((a, b) => rank(a) - rank(b)).forEach(card => {
      box.appendChild(card);
    });
    sanitizeBoxSizes(box);
    getBoxCards(box).forEach(card => {
      const s = (cfg.size || {})[card.dataset.card];
      applyCardSize(card, s);
    });
    updateBoxCardsUI(box);
  });
}

// Interaktionen über Toolbar-Buttons
document.addEventListener("click", e => {
  if (!document.body.classList.contains("layout-edit")) return;

  const prevBtn = e.target.closest(".btn-ctrl-move-prev");
  if (prevBtn) {
    const card = prevBtn.closest(".card");
    const box = card?.parentElement;
    const prev = card?.previousElementSibling;
    if (box && prev && prev.classList.contains("card")) {
      box.insertBefore(card, prev);
      saveBoxOrder(box);
      updateBoxCardsUI(box);
    }
    return;
  }

  const nextBtn = e.target.closest(".btn-ctrl-move-next");
  if (nextBtn) {
    const card = nextBtn.closest(".card");
    const box = card?.parentElement;
    const next = card?.nextElementSibling;
    if (box && next && next.classList.contains("card")) {
      box.insertBefore(next, card);
      saveBoxOrder(box);
      updateBoxCardsUI(box);
    }
    return;
  }

  const spanPreset = e.target.closest(".btn-ctrl-span-preset");
  if (spanPreset) {
    const card = spanPreset.closest(".card");
    if (!card) return;
    const w = parseInt(spanPreset.dataset.span, 10);
    setCardSpanWithSiblings(card, w);
    return;
  }

  const spanMinus = e.target.closest(".btn-ctrl-span-minus");
  if (spanMinus) {
    const card = spanMinus.closest(".card");
    if (!card) return;
    const curW = getCardSpan(card);
    setCardSpanWithSiblings(card, Math.max(MIN_SPAN, curW - 1));
    return;
  }

  const spanPlus = e.target.closest(".btn-ctrl-span-plus");
  if (spanPlus) {
    const card = spanPlus.closest(".card");
    if (!card) return;
    const curW = getCardSpan(card);
    setCardSpanWithSiblings(card, Math.min(GRID_COLS, curW + 1));
    return;
  }

  const heightAuto = e.target.closest(".btn-ctrl-height-auto");
  if (heightAuto) {
    const card = heightAuto.closest(".card");
    if (!card) return;
    const s = getCardSize(card);
    delete s.h;
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateCardUI(card);
    return;
  }

  const heightMinus = e.target.closest(".btn-ctrl-height-minus");
  if (heightMinus) {
    const card = heightMinus.closest(".card");
    if (!card) return;
    const s = getCardSize(card);
    const curH = s.h || card.offsetHeight;
    s.h = Math.max(140, Math.round((curH - 40) / 10) * 10);
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateCardUI(card);
    return;
  }

  const heightPlus = e.target.closest(".btn-ctrl-height-plus");
  if (heightPlus) {
    const card = heightPlus.closest(".card");
    if (!card) return;
    const s = getCardSize(card);
    const curH = s.h || card.offsetHeight;
    s.h = Math.max(140, Math.round((curH + 40) / 10) * 10);
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateCardUI(card);
    return;
  }
});

// Drag & Drop
let draggedCard = null;

document.addEventListener("dragstart", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const card = e.target.closest(".page .card, .qview .card");
  if (!card || card.closest(".free-canvas")) return;
  draggedCard = card;
  card.classList.add("is-dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", card.dataset.card);
});

document.addEventListener("dragover", e => {
  if (!draggedCard) return;
  const target = e.target.closest(".page .card, .qview .card");
  if (!target || target === draggedCard || target.parentElement !== draggedCard.parentElement) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";

  const box = draggedCard.parentElement;
  const rect = target.getBoundingClientRect();
  const isAfter = (e.clientY > rect.top + rect.height / 2) || (e.clientX > rect.left + rect.width / 2);
  box.insertBefore(draggedCard, isAfter ? target.nextSibling : target);
});

document.addEventListener("dragend", () => {
  if (!draggedCard) return;
  const box = draggedCard.parentElement;
  draggedCard.classList.remove("is-dragging");
  draggedCard = null;
  if (box) {
    saveBoxOrder(box);
    updateBoxCardsUI(box);
  }
});

// Im Modus "Felder anordnen" ist die Seite verkleinert (CSS zoom). Mauswege und getBoundingClientRect
// sind Bildschirm-Pixel, Feldmasse (offset*, clientWidth, style) Seiten-Pixel – das ist der Faktor dazwischen.
function zoomOf(el) {
  return (el.getBoundingClientRect().width / el.offsetWidth) || 1;
}

// Resize über Griff unten rechts per Pointer Events
document.addEventListener("pointerdown", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const grip = e.target.closest(".card-resize");
  if (!grip || grip.closest(".free-canvas")) return;

  e.preventDefault();
  e.stopPropagation();

  const card = grip.closest(".card");
  const box = card.parentElement;
  const z = zoomOf(box);
  const rect = { width: card.offsetWidth, height: card.offsetHeight };
  const startX = e.clientX, startY = e.clientY;
  const gap = parseFloat(getComputedStyle(box).columnGap) || 16;
  const colW = (box.clientWidth - gap * (GRID_COLS - 1)) / GRID_COLS;
  const s = getCardSize(card);
  let touchedH = !!s.h;
  let newH = s.h;

  const rowCards = getRowCards(card);
  const targetIndex = rowCards.indexOf(card);
  const initialSpans = new Map(rowCards.map(c => [c, getCardSpan(c)]));
  const initialTargetW = initialSpans.get(card);
  const initialTotal = rowCards.reduce((sum, c) => sum + initialSpans.get(c), 0);
  const initialSizes = new Map(rowCards.map(c => [c, getCardSize(c)]));
  let currentSpans = new Map(initialSpans);

  document.body.style.cursor = "nwse-resize";
  document.body.style.userSelect = "none";
  if (e.pointerId) {
    try { grip.setPointerCapture(e.pointerId); } catch {}
  }

  function onPointerMove(pe) {
    const dx = (pe.clientX - startX) / z;
    const dy = (pe.clientY - startY) / z;

    // Höhe (px) wenn vertikal gezogen
    if (Math.abs(dy) > 8) touchedH = true;
    if (touchedH) {
      newH = Math.max(140, Math.round((rect.height + dy) / 10) * 10);
    }

    // Breite (Spalten)
    const targetW = rect.width + dx;
    const rawCols = Math.round((targetW + gap) / (colW + gap));
    let desiredW = Math.min(GRID_COLS, Math.max(MIN_SPAN, rawCols));

    currentSpans = new Map(initialSpans);

    if (rowCards.length <= 1) {
      currentSpans.set(card, desiredW);
    } else {
      const delta = desiredW - initialTargetW;

      if (delta > 0) {
        const desiredTotal = initialTotal + delta;
        if (desiredTotal <= GRID_COLS) {
          currentSpans.set(card, desiredW);
        } else {
          let overflow = desiredTotal - GRID_COLS;
          // 1. Karten rechts vom Ziel verkleinern
          for (let i = targetIndex + 1; i < rowCards.length; i++) {
            const c = rowCards[i];
            const initW = initialSpans.get(c);
            const canShrink = Math.max(0, initW - MIN_SPAN);
            const shrink = Math.min(overflow, canShrink);
            currentSpans.set(c, initW - shrink);
            overflow -= shrink;
          }
          // 2. Falls noch Überlauf vorhanden: Karten links vom Ziel verkleinern
          if (overflow > 0) {
            for (let i = targetIndex - 1; i >= 0; i--) {
              const c = rowCards[i];
              const initW = initialSpans.get(c);
              const canShrink = Math.max(0, initW - MIN_SPAN);
              const shrink = Math.min(overflow, canShrink);
              currentSpans.set(c, initW - shrink);
              overflow -= shrink;
            }
          }
          // 3. Ziel deckeln, damit keine Karte verdrängt wird
          const finalW = desiredW - overflow;
          currentSpans.set(card, Math.max(MIN_SPAN, finalW));
        }
      } else if (delta < 0) {
        currentSpans.set(card, desiredW);
        if (initialTotal === GRID_COLS) {
          // Die Reihe war voll: Freigegebener Platz geht an die rechte Nachbarkarte (verschiebt die Trennlinie)
          if (targetIndex < rowCards.length - 1) {
            const rightCard = rowCards[targetIndex + 1];
            const initW = initialSpans.get(rightCard);
            let otherSum = 0;
            for (let i = 0; i < rowCards.length; i++) {
              if (i !== targetIndex && i !== targetIndex + 1) {
                otherSum += initialSpans.get(rowCards[i]);
              }
            }
            const maxRightW = GRID_COLS - desiredW - otherSum;
            const newRightW = Math.min(maxRightW, initW + (-delta));
            currentSpans.set(rightCard, newRightW);
          }
        }
      }
    }

    rowCards.forEach(c => {
      const spanForC = currentSpans.get(c);
      const isTarget = (c === card);
      const sizeForC = {
        ...initialSizes.get(c),
        w: spanForC,
        ...(isTarget && touchedH ? { h: newH } : {})
      };
      applyCardSize(c, sizeForC);
      const badge = c.querySelector(".card-dim-badge");
      if (badge) {
        const hText = (sizeForC && sizeForC.h) ? (sizeForC.h + "px") : t("layout.auto");
        badge.textContent = t("layout.badge", { w: spanForC, h: hText });
      }
    });
  }

  function onPointerUp(pe) {
    if (pe && pe.pointerId) {
      try { grip.releasePointerCapture(pe.pointerId); } catch {}
    }
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("pointercancel", onPointerUp);

    rowCards.forEach(c => {
      const finalW = currentSpans.get(c) ?? getCardSpan(c);
      const isTarget = (c === card);
      const curSize = getCardSize(c);
      const newSize = {
        ...curSize,
        w: finalW,
        ...(isTarget && touchedH ? { h: newH } : {})
      };
      setCardSize(c, newSize);
      applyCardSize(c, newSize);
    });

    saveLayout();
    updateBoxCardsUI(box);
  }

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);
});

// Doppelklick auf Resize-Griff: Höhe zurücksetzen
document.addEventListener("dblclick", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const grip = e.target.closest(".card-resize");
  if (!grip || grip.closest(".free-canvas")) return;
  const card = grip.closest(".card");
  const s = getCardSize(card);
  delete s.h;
  setCardSize(card, s);
  applyCardSize(card, s);
  saveLayout();
  updateCardUI(card);
});

function setLayoutEdit(on) {
  document.body.classList.toggle("layout-edit", on);
  $("layoutBar").hidden = !on;
  if (on) placeLayoutBar();
  $("layoutEditBtn")?.classList.toggle("active", on);

  const timerBtn = $("timerLayoutToggleBtn");
  if (timerBtn) {
    timerBtn.classList.toggle("active", on);
    const label = timerBtn.querySelector(".btn-topbar-text");
    if (label) {
      label.dataset.i18n = on ? "top.done" : "top.adjust";
      label.textContent = t(label.dataset.i18n);
    }
  }

  // Felder im freien Layout werden per Pointer-Events verschoben, nicht per HTML5-Drag
  document.querySelectorAll(".page .card, .qview .card").forEach(card => {
    card.draggable = on && !card.closest(".free-canvas");
  });

  if (on) {
    layoutBoxes.forEach(box => updateBoxCardsUI(box));
  }
  freeRenderAll();
}

if ($("layoutEditBtn")) $("layoutEditBtn").onclick = () => setLayoutEdit(!document.body.classList.contains("layout-edit"));
if ($("timerLayoutToggleBtn")) $("timerLayoutToggleBtn").onclick = () => setLayoutEdit(!document.body.classList.contains("layout-edit"));
if ($("layoutDone")) $("layoutDone").onclick = () => setLayoutEdit(false);
if ($("layoutReset")) $("layoutReset").onclick = () => {
  layout = {};
  saveLayout();
  layoutBoxes.forEach(box => {
    const cards = getBoxCards(box);
    cards.sort((a, b) => (+a.dataset.pos) - (+b.dataset.pos)).forEach(card => {
      box.appendChild(card);
      applyCardSize(card, {});
    });
    updateBoxCardsUI(box);
  });
  freeResetAll();
};
document.addEventListener("keydown", e => { if (e.key === "Escape") setLayoutEdit(false); });

// Die Leiste "Layout bearbeiten" lässt sich an eine freie Stelle ziehen, damit sie keine Felder verdeckt.
// Gemerkt pro Gerät als Anteil des freien Platzes (fx/fy 0..1), Doppelklick = zurück an den Standardplatz.
const LBAR_KEY = "fokus_layoutbar_pos";
let lbarPos = null;
try { lbarPos = JSON.parse(localStorage.getItem(LBAR_KEY)); } catch {}

function placeLayoutBar() {
  const bar = $("layoutBar");
  const ok = lbarPos && typeof lbarPos.fx === "number" && typeof lbarPos.fy === "number";
  bar.classList.toggle("moved", !!ok);
  if (!ok) { bar.style.removeProperty("left"); bar.style.removeProperty("top"); return; }
  const clamp = v => Math.min(1, Math.max(0, v));
  bar.style.left = Math.round(clamp(lbarPos.fx) * Math.max(0, innerWidth - bar.offsetWidth)) + "px";
  bar.style.top = Math.round(clamp(lbarPos.fy) * Math.max(0, innerHeight - bar.offsetHeight)) + "px";
}
window.addEventListener("resize", () => { if (!$("layoutBar").hidden) placeLayoutBar(); });

$("layoutBar").addEventListener("pointerdown", e => {
  if (e.button !== 0 || e.target.closest("button")) return;
  const bar = $("layoutBar"), r = bar.getBoundingClientRect();
  const dx = e.clientX - r.left, dy = e.clientY - r.top;
  e.preventDefault();
  bar.setPointerCapture(e.pointerId);
  bar.classList.add("dragging");
  const move = ev => {
    const clamp = v => Math.min(1, Math.max(0, v));
    lbarPos = { fx: clamp((ev.clientX - dx) / Math.max(1, innerWidth - r.width)), fy: clamp((ev.clientY - dy) / Math.max(1, innerHeight - r.height)) };
    placeLayoutBar();
  };
  const up = () => {
    bar.classList.remove("dragging");
    bar.removeEventListener("pointermove", move);
    bar.removeEventListener("pointerup", up);
    bar.removeEventListener("pointercancel", up);
    try { lbarPos ? localStorage.setItem(LBAR_KEY, JSON.stringify(lbarPos)) : localStorage.removeItem(LBAR_KEY); } catch {}
  };
  bar.addEventListener("pointermove", move);
  bar.addEventListener("pointerup", up);
  bar.addEventListener("pointercancel", up);
});
$("layoutBar").addEventListener("dblclick", e => {
  if (e.target.closest("button")) return;
  lbarPos = null;
  try { localStorage.removeItem(LBAR_KEY); } catch {}
  placeLayoutBar();
});

applyLayout();

/* ============================================================
   FREIES LAYOUT (alle Seiten): Felder ohne Spalten frei platzieren
   - Felder liegen absolut positioniert im Container (.free-canvas)
   - Verschieben: Feld im Bearbeitungsmodus irgendwo anfassen und ziehen
   - Grösse: Griff unten rechts stufenlos ziehen, Doppelklick = Höhe automatisch
   - Magnetische Hilfslinien an Rändern anderer Felder (Alt gedrückt halten = aus)
   Gespeichert pro Feld in layout[containerId].free[kartenId]:
     { x, w: Anteil der Containerbreite (0..1), y: px von oben, h: px oder weggelassen (Auto), z: Ebene }
   ============================================================ */
const FREE_GAP = 16;          // Abstand, auf den neben andere Felder eingerastet wird
const FREE_SNAP = 8;          // Fangbereich der Hilfslinien in px
const FREE_MIN_W = 220;       // minimale Feldbreite in px
const FREE_MIN_H = 120;       // minimale Feldhöhe in px
const FREE_EDIT_EXTRA = 0;    // kein künstlicher Überhang im Bearbeitungsmodus
const freeStackedMQ = window.matchMedia("(max-width: 720px)");
const freeBoxes = [...document.querySelectorAll(".free-canvas")];

function freeGetInitialPositions() {
  return {
    "timer-clock": { x: 0, y: 0, w: 0.38, z: 1 },
    "timer-settings": { x: 0.395, y: 0, w: 0.33, z: 2 },
    "timer-today": { x: 0.74, y: 0, w: 0.26, z: 3 },
    "timer-quote": { x: 0.74, y: 285, w: 0.26, z: 4 }
  };
}

// Altes 2-Zeilen-Überlauf-Layout automatisch auf 1-Seiten-Ansicht migrieren
if (layout.timerCanvas?.free) {
  const tc = layout.timerCanvas.free;
  if (tc["timer-today"]?.y >= 500 || !tc["timer-clock"]?.w || tc["timer-clock"]?.w >= 0.45) {
    Object.assign(tc, freeGetInitialPositions());
    saveLayout();
  }
}

function freeCards(box) {
  return [...box.children].filter(el => el.classList.contains("card"));
}

function freeCfg(box) {
  const cfg = layout[box.id] || (layout[box.id] = {});
  if (!cfg.free || typeof cfg.free !== "object") cfg.free = {};
  return cfg.free;
}

function freeValid(p) {
  return !!p && [p.x, p.y, p.w].every(n => typeof n === "number" && isFinite(n)) && p.w > 0;
}

function freeIsComplete(box) {
  const cfg = freeCfg(box);
  return freeCards(box).every(c => freeValid(cfg[c.dataset.card]));
}

function freeClearStyles(card) {
  ["left", "top", "width", "height", "z-index", "order", "--span"].forEach(prop => card.style.removeProperty(prop));
  card.classList.remove("sized");
}

// Erste Anordnung: Felder anordnen (Timer-Seite auf 1 Seite optimiert)
function freeMeasureDefaults(box) {
  if (box.id === "timerCanvas") {
    box.classList.add("free-ready");
    const cfg = freeCfg(box);
    Object.assign(cfg, freeGetInitialPositions());
    return;
  }
  // Übernimmt die alte Raster-Anordnung (gespeichert unter der Seite bzw. dem Zitate-Tab)
  const legacy = layout[box.parentElement?.id || ""] || {};
  const order = Array.isArray(legacy.order) ? legacy.order : [];
  const sizes = legacy.size || {};
  const cards = freeCards(box);

  box.classList.remove("free-ready");
  box.style.removeProperty("height");
  cards.forEach(c => {
    freeClearStyles(c);
    const idx = order.indexOf(c.dataset.card);
    c.style.order = idx < 0 ? 1000 + +c.dataset.pos : idx;
    const s = sizes[c.dataset.card] || {};
    if (s.w) c.style.setProperty("--span", Math.min(12, Math.max(3, s.w)));
    if (s.h) c.style.height = s.h + "px";
  });

  const W = box.clientWidth;
  const bRect = box.getBoundingClientRect();
  const z = zoomOf(box);
  const cfg = freeCfg(box);
  const sorted = [...cards].sort((a, b) => (+a.style.order) - (+b.style.order));
  sorted.forEach((c, i) => {
    const r = c.getBoundingClientRect();
    const s = sizes[c.dataset.card] || {};
    cfg[c.dataset.card] = {
      x: (r.left - bRect.left) / z / W,
      y: Math.round((r.top - bRect.top) / z),
      w: r.width / z / W,
      ...(s.h ? { h: s.h } : {}),
      z: i + 1
    };
  });
  cards.forEach(c => { c.style.removeProperty("order"); c.style.removeProperty("--span"); });
}

// Neue Felder ohne gespeicherte Position unten anhängen
function freePlaceMissing(box) {
  const cfg = freeCfg(box);
  let bottom = 0;
  let maxZ = 0;
  freeCards(box).forEach(c => {
    const p = cfg[c.dataset.card];
    if (freeValid(p)) {
      bottom = Math.max(bottom, p.y + (p.h || c.offsetHeight));
      maxZ = Math.max(maxZ, p.z || 0);
    }
  });
  freeCards(box).forEach(c => {
    if (freeValid(cfg[c.dataset.card])) return;
    cfg[c.dataset.card] = { x: 0, y: bottom ? bottom + FREE_GAP : 0, w: 0.5, z: ++maxZ };
    bottom += FREE_GAP + 300;
  });
}

function freeSanitize(p) {
  p.w = Math.min(1, Math.max(0.05, p.w));
  p.x = Math.min(1 - p.w, Math.max(0, p.x));
  p.y = Math.max(0, Math.round(p.y));
  if (p.h) p.h = Math.max(FREE_MIN_H, Math.round(p.h));
  return p;
}

function freeApplyCard(card, p) {
  card.style.left = (p.x * 100) + "%";
  card.style.width = (p.w * 100) + "%";
  card.style.top = p.y + "px";
  card.style.zIndex = p.z || 1;
  if (p.h) {
    card.style.height = p.h + "px";
    card.classList.add("sized");
  } else {
    card.style.removeProperty("height");
    card.classList.remove("sized");
  }
}

function freeUpdateBadge(card, p) {
  const badge = card.querySelector(".card-dim-badge");
  if (badge) badge.textContent = `${Math.round(card.offsetWidth)} × ${p && p.h ? Math.round(p.h) : t("layout.auto")} px`;
  card.querySelector(".free-h-auto")?.classList.toggle("active", !(p && p.h));
}

// Containerhöhe an das unterste Feld anpassen (absolut positionierte Felder haben keine Flusshöhe)
function freeUpdateHeight(box) {
  if (!box.classList.contains("free-ready")) return;
  freeFitToScreen(box);
  let bottom = 0;
  freeCards(box).forEach(c => { bottom = Math.max(bottom, c.offsetTop + c.offsetHeight); });
  const extra = document.body.classList.contains("layout-edit") ? FREE_EDIT_EXTRA : 0;
  box.style.height = (bottom + extra) + "px";
  freeScreenLine(box);
}

// Timer- und Statistik-Seite: alles auf einem Bildschirm. Felder mit fester Höhe enden höchstens am
// unteren Rand, die untersten Felder reichen immer bis dorthin (nur Anzeige, gespeichert bleibt die
// eigene Höhe). Reicht das nicht, wird das ganze Raster verkleinert (CSS zoom) – bei mehr Platz wieder grösser.
const FREE_FIT_BOXES = new Set(["timerCanvas", "statsCanvas"]);
const FREE_FIT_MIN = 0.45;

// Platz vom Raster bis zum unteren Bildschirmrand in Bildschirm-Pixeln – so wie ohne Bearbeiten
// und ohne Scrollen (beim Bearbeiten sind Nicht-Timer-Seiten auf 0,8 verkleinert, das wird herausgerechnet)
function freeScreenRoom(box) {
  const main = box.closest("main"), page = box.closest(".page"), cs = getComputedStyle(main);
  const top = main.getBoundingClientRect().top + window.scrollY + main.scrollTop + parseFloat(cs.paddingTop)
    + (box.getBoundingClientRect().top - page.getBoundingClientRect().top) / zoomOf(page);
  return window.innerHeight - parseFloat(cs.paddingBottom) - top;
}
// Eigene Verkleinerung des Rasters (ohne die der Seite beim Bearbeiten)
const freeOwnZoom = box => zoomOf(box) / zoomOf(box.closest(".page"));

function freeFitToScreen(box) {
  if (!FREE_FIT_BOXES.has(box.id)) return;
  // Nicht während des Ziehens – sonst ändert sich der Massstab unter dem Zeiger
  if (document.body.classList.contains("free-dragging") || document.body.classList.contains("free-resizing")) return;
  box.style.removeProperty("zoom");
  if (freeStackedMQ.matches || document.body.classList.contains("zen") || !box.clientWidth) return;

  const bottom = () => Math.max(0, ...freeCards(box).map(c => c.offsetTop + c.offsetHeight));

  freeCapHeights(box);

  // Grösster Massstab, bei dem alles hineinpasst. Ein breiteres Raster bricht Text anders um,
  // darum wird gesucht statt gerechnet – so endet das unterste Feld genau am unteren Rand.
  const fits = () => bottom() * freeOwnZoom(box) <= freeScreenRoom(box) + 1;   // in Bildschirm-Pixeln
  let own = 1;
  if (!fits()) {
    let lo = FREE_FIT_MIN, hi = 1;
    for (let i = 0; i < 10; i++) {
      const mid = (lo + hi) / 2;
      box.style.zoom = mid;
      if (fits()) lo = mid; else hi = mid;
    }
    own = lo;
    box.style.zoom = own;
  }
  // Nach dem Verkleinern ist unten wieder Platz: gekürzte Felder bis zum selben unteren Rand verlängern
  if (own < 1) freeCapHeights(box);
}
window.addEventListener("resize", () => freeBoxes.forEach(freeFitToScreen));

// Feste Höhen, die über den unteren Bildschirmrand reichen, auf den Platz kürzen; Felder, unter denen
// nichts mehr liegt, bis zum unteren Rand verlängern (nur Anzeige)
function freeCapHeights(box) {
  if (!FREE_FIT_BOXES.has(box.id) || freeStackedMQ.matches || document.body.classList.contains("zen")) return;
  const room = freeScreenRoom(box) / freeOwnZoom(box);       // Platz in Seiten-Pixeln
  const cfg = freeCfg(box);
  const rects = freeCards(box).map(c => ({ c, l: c.offsetLeft, r: c.offsetLeft + c.offsetWidth, t: c.offsetTop }));
  rects.forEach(me => {
    const p = cfg[me.c.dataset.card];
    // Höchstens bis zum unteren Rand und nie in ein Feld darunter hinein
    let limit = room, below = false;
    rects.forEach(o => {
      if (o !== me && o.t > me.t && o.l < me.r - 1 && me.l < o.r - 1) { limit = Math.min(limit, o.t - FREE_GAP); below = true; }
    });
    const space = Math.floor(limit - me.t);
    let h;
    if (box.id !== "timerCanvas") {
      // Statistik: Ein Feld wird nie kleiner als sein Inhalt (sonst winzige Schrift und Scrollbalken).
      // Die eigene Höhe gilt als Mindesthöhe, das unterste Feld reicht bis zum Rand. Passt es insgesamt
      // nicht, verkleinert freeFitToScreen das ganze Raster gleichmässig.
      me.c.style.removeProperty("height");
      h = Math.max(me.c.offsetHeight, p?.h || 0, below ? 0 : space);
    } else if (!below) {
      // Unterstes Feld: immer bis zum unteren Rand. Ist ein Feld mit Auto-Höhe dafür zu hoch,
      // bleibt es so – dann verkleinert freeFitToScreen das ganze Raster.
      if (!p?.h) {
        me.c.style.removeProperty("height");
        if (me.c.offsetHeight > space) return;
      }
      h = Math.max(FREE_MIN_H, space);
    } else {
      if (!p?.h) return;
      h = Math.max(FREE_MIN_H, Math.min(p.h, space));
    }
    if (me.c.offsetHeight !== h) me.c.style.height = h + "px";
  });
}

function freeNormalizeZ(box) {
  const cfg = freeCfg(box);
  freeCards(box)
    .map(c => cfg[c.dataset.card])
    .filter(Boolean)
    .sort((a, b) => (a.z || 0) - (b.z || 0))
    .forEach((p, i) => { p.z = i + 1; });
}

function freeRender(box) {
  if (!box.clientWidth) return;                 // Seite gerade nicht sichtbar
  const cfg = freeCfg(box);
  const cards = freeCards(box);
  if (!freeIsComplete(box)) {
    const hasAny = cards.some(c => freeValid(cfg[c.dataset.card]));
    if (!hasAny) {
      if (freeStackedMQ.matches) return;        // erst messen, wenn genug Platz für das Raster da ist
      if (document.fonts && document.fonts.status !== "loaded") return; // fonts.ready rendert später erneut
      freeMeasureDefaults(box);
    } else {
      freePlaceMissing(box);
    }
    saveLayout();
  }
  box.classList.add("free-ready");
  cards.forEach(c => {
    const p = freeSanitize(cfg[c.dataset.card]);
    freeApplyCard(c, p);
  });
  box.style.removeProperty("zoom");   // gekürzt wird in normaler Grösse, verkleinert erst danach
  freeCapHeights(box);
  freeResolveOverlaps(box);
  freeUpdateHeight(box);
  cards.forEach(c => freeUpdateBadge(c, cfg[c.dataset.card]));
}

// Garantiert, dass sich keine Felder überlappen: Überlappende Felder werden nach unten geschoben.
// Nur Anzeige (z. B. wenn Inhalt wächst) – gespeichert wird beim nächsten Verschieben/Grösse ändern.
function freeResolveOverlaps(box) {
  const cfg = freeCfg(box);
  const W = box.clientWidth;
  const items = freeCards(box).map(c => {
    const p = cfg[c.dataset.card];
    return { c, l: p.x * W, r: (p.x + p.w) * W, t: p.y, h: c.offsetHeight };
  }).sort((a, b) => a.t - b.t || a.l - b.l);
  const placed = [];
  items.forEach(it => {
    let moved = true;
    while (moved) {
      moved = false;
      for (const o of placed) {
        if (it.l < o.r - 1 && o.l < it.r - 1 && it.t < o.t + o.h - 1 && o.t < it.t + it.h - 1) {
          it.t = o.t + o.h + FREE_GAP;
          moved = true;
        }
      }
    }
    placed.push(it);
    it.c.style.top = it.t + "px";
  });
}

function freeRenderAll() {
  // In der Nur-Timer-Ansicht sind die anderen Felder ausgeblendet – dann waeren
  // alle Messungen falsch und wuerden fehlerhafte Standardpositionen speichern.
  if (document.body.classList.contains("zen")) return;
  freeBoxes.forEach(freeRender);
}

function freeResetAll() {
  freeBoxes.forEach(box => {
    delete layout[box.id];
    box.classList.remove("free-ready");
    box.style.removeProperty("height");
    freeCards(box).forEach(freeClearStyles);
    freeRender(box);
  });
}

// Bearbeitungsleiste, Resize-Griff und Hilfslinien für jedes freie Feld anlegen
freeBoxes.forEach(box => {
  freeCards(box).forEach((card, i) => {
    card.dataset.card = card.dataset.cardId || (box.id + "-" + i);
    card.dataset.pos = i;

    if (!card.querySelector(".card-edit-bar")) {
      const bar = document.createElement("div");
      bar.className = "card-edit-bar";
      bar.innerHTML = `
        <div class="card-edit-header">
          <span class="card-drag-handle" data-i18n-title="layout.dragFree">
            <span class="drag-icon">⋮⋮</span>
            <span class="card-edit-title" data-i18n="${getCardTitleKey(card)}"></span>
          </span>
          <span class="card-dim-badge"></span>
        </div>
        <div class="card-edit-controls">
          <div class="card-edit-group">
            <button type="button" class="btn-ctrl free-h-auto" data-i18n-title="layout.autoHTitle" data-i18n="layout.autoH"></button>
          </div>
        </div>
      `;
      card.insertBefore(bar, card.firstChild);
      applyI18n(bar);
    }

    const FREE_HANDLES = [
      { dir: "n", cls: "free-h-n" },
      { dir: "s", cls: "free-h-s" },
      { dir: "w", cls: "free-h-w" },
      { dir: "e", cls: "free-h-e" },
      { dir: "nw", cls: "free-h-nw free-h-corner" },
      { dir: "ne", cls: "free-h-ne free-h-corner" },
      { dir: "sw", cls: "free-h-sw free-h-corner" },
      { dir: "se", cls: "free-h-se free-h-corner" }
    ];
    if (!card.querySelector(".free-handle")) {
      FREE_HANDLES.forEach(h => {
        const grip = document.createElement("span");
        grip.className = "free-handle " + h.cls;
        grip.dataset.dir = h.dir;
        card.appendChild(grip);
      });
    }
  });

  ["v", "h"].forEach(dir => {
    const g = document.createElement("div");
    g.className = "free-guide " + dir;
    box.appendChild(g);
  });
  const screen = document.createElement("div");
  screen.className = "free-screen";
  screen.innerHTML = `<span></span>`;
  box.appendChild(screen);
});

// Beim Bearbeiten: gestrichelte Linie dort, wo ein Bildschirm ohne Bearbeiten endet.
// Felder oberhalb sieht man ohne Scrollen (Timer/Statistik: ohne Verkleinern).
// Position in Feld-Pixeln (wie p.y), unabhängig von der Verkleinerung beim Bearbeiten.
function freeScreenLine(box) {
  const line = box.querySelector(".free-screen");
  box._screenY = null;
  if (!line) return;
  line.classList.remove("show");
  if (!document.body.classList.contains("layout-edit") || freeStackedMQ.matches || !box.clientWidth) return;
  const y = Math.round(freeScreenRoom(box));
  if (y <= 0) return;
  box._screenY = y;
  line.style.top = y + "px";
  line.classList.add("show");
  line.firstChild.textContent = t(FREE_FIT_BOXES.has(box.id) ? "layout.screenFit" : "layout.screenScroll");
}
window.addEventListener("resize", () => freeBoxes.forEach(freeScreenLine));

// Sucht die nächstgelegene Hilfslinie. pairs: [{ edge: aktuelle Kante, targets: [mögliche Linien] }]
function freeBestSnap(pairs) {
  let best = null;
  pairs.forEach(({ edge, targets }) => {
    targets.forEach(t => {
      const d = t - edge;
      if (Math.abs(d) <= FREE_SNAP && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, line: t };
    });
  });
  return best;
}

function freeShowGuides(box, sx, sy) {
  const gv = box.querySelector(".free-guide.v");
  const gh = box.querySelector(".free-guide.h");
  if (gv) { gv.classList.toggle("show", !!sx); if (sx) gv.style.left = sx.line + "px"; }
  if (gh) { gh.classList.toggle("show", !!sy); if (sy) gh.style.top = sy.line + "px"; }
}

// Überlappen sich zwei Rechtecke { l, t, w, h }? (1px Toleranz, aneinanderstossen ist erlaubt)
function freeOverlaps(a, b) {
  return a.l < b.l + b.w - 1 && b.l < a.l + a.w - 1 && a.t < b.t + b.h - 1 && b.t < a.t + a.h - 1;
}

// Sucht für ein verdrängtes Feld (b0) einen freien Platz, bevorzugt nahe dem frei gewordenen Platz (a0)
// oder seinem bisherigen Platz. Passt es nicht in voller Breite, wird es schmaler gemacht.
function freeFindSpot(b0, a0, occupied, W) {
  const minW = Math.min(FREE_MIN_W, b0.w);
  const xs = new Set([0, a0.l, b0.l, Math.max(0, W - b0.w)]);
  const ys = new Set([0, a0.t, b0.t]);
  occupied.forEach(o => { xs.add(o.l + o.w + FREE_GAP); ys.add(o.t + o.h + FREE_GAP); });
  let best = null;
  xs.forEach(x => {
    if (x < 0 || x > W - minW) return;
    ys.forEach(y => {
      if (y < 0) return;
      const h = b0.h;
      let w = Math.min(b0.w, W - x);
      for (const o of occupied) {
        if (y < o.t + o.h - 1 && o.t < y + h - 1) {                 // liegt im selben Höhenbereich
          if (o.l <= x + 1 && o.l + o.w > x + 1) { w = 0; break; }  // Platz ist belegt
          if (o.l > x) w = Math.min(w, o.l - FREE_GAP - x);          // rechts davon begrenzt die Breite
        }
      }
      if (w < minW) return;
      const dist = Math.min(Math.hypot(x - a0.l, y - a0.t), Math.hypot(x - b0.l, y - b0.t));
      const score = dist + (b0.w - w) * 1.5;                         // Verkleinern kostet etwas
      if (!best || score < best.score) best = { score, rect: { l: x, t: y, w, h } };
    });
  });
  if (best) return best.rect;
  // Notlösung: ganz unten anhängen
  const bottom = Math.max(0, ...occupied.map(o => o.t + o.h));
  return { l: Math.min(b0.l, Math.max(0, W - b0.w)), t: bottom + FREE_GAP, w: Math.min(b0.w, W), h: b0.h };
}

// Verschieben & Grösse ändern per Pointer Events (Maus, Stift, Touch)
document.addEventListener("pointerdown", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  if (e.button !== 0 || freeStackedMQ.matches) return;
  const card = e.target.closest(".free-canvas.free-ready > .card");
  if (!card) return;
  if (e.target.closest("button, input, select, textarea, a")) return;

  e.preventDefault();
  const box = card.parentElement;
  let handleEl = e.target.closest(".free-handle, .card-resize");
  let resizeDir = handleEl ? (handleEl.dataset.dir || "se") : null;

  // Auch bei Klick nahe am Rand (innerhalb von 20px) als Resize erkennen
  if (!resizeDir && !e.target.closest(".card-edit-bar, button, input, select, textarea, a")) {
    const cr = card.getBoundingClientRect();
    const relX = e.clientX - cr.left;
    const relY = e.clientY - cr.top;
    const THRESH = 20;

    const nearTop = relY <= THRESH;
    const nearBottom = relY >= cr.height - THRESH;
    const nearLeft = relX <= THRESH;
    const nearRight = relX >= cr.width - THRESH;

    let dir = "";
    if (nearTop) dir += "n";
    else if (nearBottom) dir += "s";
    if (nearLeft) dir += "w";
    else if (nearRight) dir += "e";

    if (dir) resizeDir = dir;
  }

  const mode = resizeDir ? "resize" : "move";
  const cfg = freeCfg(box);
  const id = card.dataset.card;
  const p = { ...cfg[id] };
  const W = box.clientWidth;
  const z = zoomOf(box);
  const rectOf = c => ({ l: c.offsetLeft, t: c.offsetTop, w: c.offsetWidth, h: c.offsetHeight });
  const a0 = rectOf(card);
  const startX = e.clientX + window.scrollX;
  const startY = e.clientY + window.scrollY;
  const hadH = !!p.h;

  // Alle anderen Felder mit ihrer Ausgangslage
  const others = freeCards(box).filter(c => c !== card).map(c => {
    const op = cfg[c.dataset.card] || {};
    return { c, r0: rectOf(c), origH: op.h || null };
  });
  const snapEdges = others.map(o => ({ l: o.r0.l, t: o.r0.t, r: o.r0.l + o.r0.w, b: o.r0.t + o.r0.h }));
  let preview = new Map(others.map(o => [o.c, { ...o.r0 }]));

  // Gezogenes Feld nach vorne holen, andere Felder weich mitgleiten lassen
  p.z = Math.max(0, ...freeCards(box).map(c => (cfg[c.dataset.card] || {}).z || 0)) + 1;
  card.classList.add("free-active");
  others.forEach(o => o.c.classList.add("free-anim"));
  document.body.classList.add(mode === "move" ? "free-dragging" : "free-resizing");
  if (mode === "resize") document.body.setAttribute("data-resize-dir", resizeDir);
  try { card.setPointerCapture(e.pointerId); } catch {}

  // Vorschau eines anderen Feldes anwenden (Höhe nur, wenn sie verändert wurde)
  function showPreview(o, r) {
    o.c.style.left = (r.l / W * 100) + "%";
    o.c.style.width = (r.w / W * 100) + "%";
    o.c.style.top = r.t + "px";
    const h = r.fixedH ? r.h : o.origH;
    if (h) {
      o.c.style.height = h + "px";
      o.c.classList.add("sized");
    } else {
      o.c.style.removeProperty("height");
      o.c.classList.remove("sized");
    }
    freeUpdateBadge(o.c, { h });
  }

  let lastX = e.clientX, lastY = e.clientY, alt = e.altKey, raf = 0, done = false;

  function tick() {
    raf = 0;
    if (done) return;

    // Auto-Scroll, wenn der Zeiger am oberen/unteren Fensterrand ist
    const edge = 48;
    let scrollDy = 0;
    if (lastY > window.innerHeight - edge) scrollDy = Math.ceil((lastY - (window.innerHeight - edge)) / 3);
    else if (lastY < edge) scrollDy = -Math.ceil((edge - lastY) / 3);
    const beforeScroll = window.scrollY;
    if (scrollDy) window.scrollBy(0, scrollDy);
    const scrolled = window.scrollY !== beforeScroll;

    const dx = (lastX + window.scrollX - startX) / z;
    const dy = (lastY + window.scrollY - startY) / z;
    let sx = null, sy = null;

    if (mode === "move") {
      // 1. Gezogenes Feld folgt frei dem Zeiger (mit Hilfslinien)
      let L = Math.min(Math.max(0, a0.l + dx), Math.max(0, W - a0.w));
      let T = Math.max(0, a0.t + dy);
      if (!alt) {
        sx = freeBestSnap([
          { edge: L, targets: [0, ...snapEdges.flatMap(o => [o.l, o.r, o.r + FREE_GAP])] },
          { edge: L + a0.w, targets: [W, ...snapEdges.flatMap(o => [o.r, o.l, o.l - FREE_GAP])] },
          { edge: L + a0.w / 2, targets: [W / 2, ...snapEdges.map(o => (o.l + o.r) / 2)] }
        ]);
        sy = freeBestSnap([
          { edge: T, targets: [0, ...snapEdges.flatMap(o => [o.t, o.b, o.b + FREE_GAP])] },
          { edge: T + a0.h, targets: [...snapEdges.flatMap(o => [o.b, o.t, o.t - FREE_GAP]), ...(box._screenY ? [box._screenY] : [])] }
        ]);
        if (sx) L = Math.min(Math.max(0, L + sx.d), Math.max(0, W - a0.w));
        if (sy) T = Math.max(0, T + sy.d);
      }
      p.x = L / W;
      p.y = Math.round(T);
      card.style.left = (p.x * 100) + "%";
      card.style.top = p.y + "px";

      // 2. Überdeckte Felder springen auf einen freien Platz (und werden bei Bedarf schmaler)
      const aRect = { l: L, t: p.y, w: a0.w, h: a0.h };
      const occupied = [aRect];
      const hit = [];
      preview = new Map();
      others.forEach(o => {
        if (freeOverlaps(aRect, o.r0)) hit.push(o);
        else { preview.set(o.c, { ...o.r0 }); occupied.push(o.r0); }
      });
      hit.sort((m, n) => m.r0.t - n.r0.t || m.r0.l - n.r0.l);
      hit.forEach(o => {
        const spot = freeFindSpot(o.r0, a0, occupied, W);
        preview.set(o.c, spot);
        occupied.push(spot);
      });
    } else {
      // 1. Grösse in alle 8 Richtungen ändern
      preview = new Map(others.map(o => [o.c, { ...o.r0 }]));
      let L = a0.l;
      let Wd = a0.w;
      let T = a0.t;
      let Hd = a0.h;
      let touchH = hadH;

      // === HORIZONTALE ÄNDERUNG ===
      if (resizeDir.includes("e")) {
        // Rechte Kante ziehen
        const maxW = W - a0.l;
        let targetW = Math.max(FREE_MIN_W, Math.min(maxW, a0.w + dx));
        if (!alt) {
          sx = freeBestSnap([{ edge: a0.l + targetW, targets: [W, ...snapEdges.flatMap(o => [o.r, o.l, o.l - FREE_GAP])] }]);
          if (sx) targetW = Math.max(FREE_MIN_W, Math.min(maxW, targetW + sx.d));
        }

        const a0r = a0.l + a0.w;
        const rightEdge = a0.l + targetW;
        const right = others.filter(o =>
          o.r0.l >= a0r - 1 && o.r0.t < a0.t + a0.h - 1 && a0.t < o.r0.t + o.r0.h - 1);

        right.forEach(o => {
          const gap = Math.max(0, Math.min(FREE_GAP, o.r0.l - a0r));
          if (rightEdge + gap > o.r0.l) {
            const newL = rightEdge + gap;
            const availableW = o.r0.l + o.r0.w - newL;
            if (availableW >= FREE_MIN_W) {
              preview.set(o.c, { ...preview.get(o.c), l: newL, w: availableW });
            } else {
              if (newL + FREE_MIN_W <= W) {
                preview.set(o.c, { ...preview.get(o.c), l: newL, w: Math.min(FREE_MIN_W, o.r0.w) });
              } else {
                const occupied = [{ l: a0.l, t: a0.t, w: targetW, h: a0.h }];
                others.forEach(oth => { if (oth !== o) occupied.push(preview.get(oth.c)); });
                const spot = freeFindSpot(o.r0, a0, occupied, W);
                preview.set(o.c, spot);
              }
            }
          }
        });

        L = a0.l;
        Wd = targetW;
      } else if (resizeDir.includes("w")) {
        // Linke Kante ziehen (rechte Kante R_fixed bleibt fix)
        const R_fixed = a0.l + a0.w;
        let targetL = Math.max(0, Math.min(R_fixed - FREE_MIN_W, a0.l + dx));
        if (!alt) {
          sx = freeBestSnap([{ edge: targetL, targets: [0, ...snapEdges.flatMap(o => [o.l, o.r, o.r + FREE_GAP])] }]);
          if (sx) targetL = Math.max(0, Math.min(R_fixed - FREE_MIN_W, targetL + sx.d));
        }

        const left = others.filter(o =>
          o.r0.l + o.r0.w <= a0.l + 1 && o.r0.t < a0.t + a0.h - 1 && a0.t < o.r0.t + o.r0.h - 1);

        left.forEach(o => {
          const gap = Math.max(0, Math.min(FREE_GAP, a0.l - (o.r0.l + o.r0.w)));
          if (targetL - gap < o.r0.l + o.r0.w) {
            const newR = targetL - gap;
            const availableW = newR - o.r0.l;
            if (availableW >= FREE_MIN_W) {
              const prev = preview.get(o.c);
              preview.set(o.c, { ...prev, w: availableW });
            } else {
              if (newR - FREE_MIN_W >= 0) {
                const prev = preview.get(o.c);
                preview.set(o.c, { ...prev, l: newR - FREE_MIN_W, w: FREE_MIN_W });
              } else {
                const occupied = [{ l: targetL, t: a0.t, w: R_fixed - targetL, h: a0.h }];
                others.forEach(oth => { if (oth !== o) occupied.push(preview.get(oth.c)); });
                const spot = freeFindSpot(o.r0, a0, occupied, W);
                preview.set(o.c, spot);
              }
            }
          }
        });

        L = targetL;
        Wd = R_fixed - targetL;
      }

      // === VERTIKALE ÄNDERUNG ===
      if (resizeDir.includes("s")) {
        // Untere Kante ziehen
        touchH = hadH || Math.abs(dy) > 4;
        let targetH = Math.max(FREE_MIN_H, a0.h + dy);
        if (!alt && touchH) {
          sy = freeBestSnap([{ edge: a0.t + targetH, targets: [...snapEdges.flatMap(o => [o.b, o.t, o.t - FREE_GAP]), ...(box._screenY ? [box._screenY] : [])] }]);
          if (sy) targetH = Math.max(FREE_MIN_H, targetH + sy.d);
        }

        if (touchH) {
          const a0b = a0.t + a0.h;
          const bottomEdge = a0.t + targetH;
          const below = others.filter(o => {
            const r = preview.get(o.c);
            return r.t >= a0b - 1 && r.l < L + Wd - 1 && L < r.l + r.w - 1;
          });

          below.forEach(o => {
            const r = preview.get(o.c);
            const gap = Math.max(0, Math.min(FREE_GAP, r.t - a0b));
            if (bottomEdge + gap > r.t) {
              const newT = bottomEdge + gap;
              const availableH = r.t + r.h - newT;
              if (availableH >= FREE_MIN_H) {
                preview.set(o.c, { ...r, t: newT, h: availableH, fixedH: true });
              } else {
                preview.set(o.c, { ...r, t: newT, h: Math.max(FREE_MIN_H, r.h), fixedH: true });
              }
            }
          });
        }

        T = a0.t;
        Hd = targetH;
      } else if (resizeDir.includes("n")) {
        // Obere Kante ziehen (untere Kante B_fixed bleibt fix)
        touchH = hadH || Math.abs(dy) > 4;
        const B_fixed = a0.t + a0.h;
        let targetT = Math.max(0, Math.min(B_fixed - FREE_MIN_H, a0.t + dy));
        if (!alt && touchH) {
          sy = freeBestSnap([{ edge: targetT, targets: [0, ...snapEdges.flatMap(o => [o.t, o.b, o.b + FREE_GAP])] }]);
          if (sy) targetT = Math.max(0, Math.min(B_fixed - FREE_MIN_H, targetT + sy.d));
        }

        if (touchH) {
          const above = others.filter(o => {
            const r = preview.get(o.c);
            return r.t + r.h <= a0.t + 1 && r.l < L + Wd - 1 && L < r.l + r.w - 1;
          });

          above.forEach(o => {
            const r = preview.get(o.c);
            const gap = Math.max(0, Math.min(FREE_GAP, a0.t - (r.t + r.h)));
            if (targetT - gap < r.t + r.h) {
              const newB = targetT - gap;
              const availableH = newB - r.t;
              if (availableH >= FREE_MIN_H) {
                preview.set(o.c, { ...r, h: availableH, fixedH: true });
              } else {
                const occupied = [{ l: L, t: targetT, w: Wd, h: B_fixed - targetT }];
                others.forEach(oth => { if (oth !== o) occupied.push(preview.get(oth.c)); });
                const spot = freeFindSpot(o.r0, a0, occupied, W);
                preview.set(o.c, spot);
              }
            }
          });
        }

        T = targetT;
        Hd = B_fixed - targetT;
      }

      p.x = L / W;
      p.w = Wd / W;
      card.style.left = (p.x * 100) + "%";
      card.style.width = (p.w * 100) + "%";

      p.y = Math.round(T);
      card.style.top = p.y + "px";

      if (touchH) {
        p.h = Math.round(Hd);
        card.style.height = p.h + "px";
        card.classList.add("sized");
      }
      freeUpdateBadge(card, p);
    }

    others.forEach(o => showPreview(o, preview.get(o.c)));
    freeShowGuides(box, sx, sy);
    freeUpdateHeight(box);
    if (scrolled) raf = requestAnimationFrame(tick);
  }

  function onMove(ev) {
    lastX = ev.clientX;
    lastY = ev.clientY;
    alt = ev.altKey;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onUp(ev) {
    done = true;
    if (raf) cancelAnimationFrame(raf);
    try { card.releasePointerCapture(ev.pointerId); } catch {}
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", onUp);
    document.removeEventListener("pointercancel", onUp);
    card.classList.remove("free-active");
    document.body.classList.remove("free-dragging", "free-resizing");
    document.body.removeAttribute("data-resize-dir");
    freeShowGuides(box, null, null);

    // Neue Lage aller Felder speichern
    cfg[id] = freeSanitize(p);
    others.forEach(o => {
      const r = preview.get(o.c) || o.r0;
      const op = { ...(cfg[o.c.dataset.card] || {}), x: r.l / W, y: Math.round(r.t), w: r.w / W };
      if (r.fixedH) op.h = Math.round(r.h);
      cfg[o.c.dataset.card] = freeSanitize(op);
    });
    freeNormalizeZ(box);
    saveLayout();
    others.forEach(o => o.c.classList.remove("free-anim"));
    freeRender(box);
  }

  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", onUp);
  document.addEventListener("pointercancel", onUp);
});

// Dynamischer Cursor beim Überfahren der Karten im Bearbeitungsmodus
document.addEventListener("pointermove", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  if (document.body.classList.contains("free-dragging") || document.body.classList.contains("free-resizing")) return;
  const card = e.target.closest(".free-canvas.free-ready > .card");
  if (!card) return;
  if (e.target.closest(".free-handle, .card-resize")) return;
  if (e.target.closest(".card-edit-bar, button, input, select, textarea, a")) {
    card.style.removeProperty("cursor");
    return;
  }
  const cr = card.getBoundingClientRect();
  const relX = e.clientX - cr.left;
  const relY = e.clientY - cr.top;
  const THRESH = 20;

  const nearTop = relY <= THRESH;
  const nearBottom = relY >= cr.height - THRESH;
  const nearLeft = relX <= THRESH;
  const nearRight = relX >= cr.width - THRESH;

  let dir = "";
  if (nearTop) dir += "n";
  else if (nearBottom) dir += "s";
  if (nearLeft) dir += "w";
  else if (nearRight) dir += "e";

  const cursorMap = {
    n: "ns-resize", s: "ns-resize",
    w: "ew-resize", e: "ew-resize",
    nw: "nwse-resize", se: "nwse-resize",
    ne: "nesw-resize", sw: "nesw-resize"
  };
  if (dir && cursorMap[dir]) {
    card.style.cursor = cursorMap[dir];
  } else {
    card.style.cursor = "grab";
  }
});

// "Auto-Höhe"-Knopf und Doppelklick auf einen Griff: Höhe wieder automatisch
function freeResetHeight(card) {
  const box = card.parentElement;
  const p = freeCfg(box)[card.dataset.card];
  if (!p) return;
  delete p.h;
  saveLayout();
  freeRender(box);
}
document.addEventListener("click", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const btn = e.target.closest(".free-canvas .free-h-auto");
  if (btn) freeResetHeight(btn.closest(".card"));
});
document.addEventListener("dblclick", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const grip = e.target.closest(".free-canvas .free-handle, .free-canvas .card-resize");
  if (grip) freeResetHeight(grip.closest(".card"));
});

// Neu berechnen, wenn sich Breite (Fenster, Seitenwechsel) oder Feldinhalte ändern
const freeScheduled = new Set();
function freeSchedule(box, full) {
  if (full) box._freeFull = true;
  if (freeScheduled.has(box)) return;
  freeScheduled.add(box);
  requestAnimationFrame(() => {
    freeScheduled.delete(box);
    if (document.body.classList.contains("free-dragging") || document.body.classList.contains("free-resizing")) return;
    if (box._freeFull) { box._freeFull = false; freeRender(box); }
    else {
      // Wächst ein Feld (z. B. neue Aufgaben), rutschen die Felder darunter mit
      if (box.classList.contains("free-ready") && freeIsComplete(box)) freeResolveOverlaps(box);
      freeUpdateHeight(box);
      const cfg = freeCfg(box);
      freeCards(box).forEach(c => freeUpdateBadge(c, cfg[c.dataset.card]));
    }
  });
}
if ("ResizeObserver" in window) {
  const freeRO = new ResizeObserver(entries => {
    entries.forEach(en => {
      const el = en.target;
      if (el.classList.contains("free-canvas")) {
        const w = el.clientWidth;
        if (w !== el._freeW) { el._freeW = w; freeSchedule(el, true); }
      } else if (el.parentElement) {
        freeSchedule(el.parentElement, false);
      }
    });
  });
  freeBoxes.forEach(box => {
    freeRO.observe(box);
    freeCards(box).forEach(c => freeRO.observe(c));
  });
} else {
  window.addEventListener("resize", freeRenderAll);
}
freeStackedMQ.addEventListener?.("change", freeRenderAll);

/* ============================================================
   INHALT WÄCHST MIT DEM FELD
   Schrift, Knöpfe, Timer-Kreis … werden mit dem Feld grösser oder kleiner (CSS zoom über --card-zoom).
   Massstab: Feldbreite im Vergleich zur Standardbreite. Kleiner wird es im gleichen Verhältnis,
   grösser nur gedämpft (1,5× so breit = ca. 1,2×) und höchstens bis CARD_ZOOM_MAX.
   Bei fester Feldhöhe wird nur so weit vergrössert, wie der Inhalt noch hineinpasst.
   ============================================================ */
const CARD_ZOOM_MIN = 0.5, CARD_ZOOM_MAX = 1.3;   // kleinster / grösster Massstab
const FREE_DEFAULTS = freeGetInitialPositions();

// Breite des Feldes geteilt durch seine Standardbreite
function cardWidthRatio(card) {
  const box = card.parentElement;
  if (!box) return 1;
  if (box.classList.contains("free-canvas")) {
    const p = freeCfg(box)[card.dataset.card];
    // Andere Seiten: Standard ist das Raster – halbe Breite, ein einzelnes Feld ganze Breite
    const def = box.id === "timerCanvas" ? FREE_DEFAULTS[card.dataset.card]?.w
      : (freeCards(box).length === 1 ? 1 : 0.5 - FREE_GAP / 2 / (box.clientWidth || 1));
    return p && def ? p.w / def : 1;
  }
  const s = getCardSize(card);
  if (!s.w) return 1;
  const onlyChild = box.querySelectorAll(":scope > .card").length === 1;
  return s.w / (onlyChild ? GRID_COLS : 6);
}

function setCardZoom(card, z) {
  const v = String(Math.floor(z * 100 + 1e-6) / 100);
  if (card.style.getPropertyValue("--card-zoom") === v) return false;
  card.style.setProperty("--card-zoom", v);
  return true;
}

const cardFits = card => card.scrollHeight <= card.clientHeight && card.scrollWidth <= card.clientWidth;

function applyCardZoom(card) {
  const before = card.style.getPropertyValue("--card-zoom");
  let z;
  if (card.classList.contains("sized") && card.parentElement?.id === "timerCanvas") {
    // Timer-Seite mit fester Feldgrösse: Inhalt füllt das Feld aus –
    // grösster Massstab, bei dem in Höhe und Breite noch alles hineinpasst
    let lo = CARD_ZOOM_MIN, hi = CARD_ZOOM_MAX;
    setCardZoom(card, lo);
    if (cardFits(card)) {
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2;
        setCardZoom(card, mid);
        if (cardFits(card)) lo = mid; else hi = mid;
      }
    }
    z = lo;
  } else {
    const r = cardWidthRatio(card);
    z = Math.min(CARD_ZOOM_MAX, Math.max(CARD_ZOOM_MIN, r < 1 ? r : Math.sqrt(r)));
    setCardZoom(card, z);
    // Feste Höhe: Vergrösserung zurücknehmen, bis nichts mehr übersteht (nie kleiner als normal)
    for (let i = 0; i < 3 && z > 1 && card.classList.contains("sized") && !cardFits(card); i++) {
      z = Math.max(1, z * card.clientHeight / card.scrollHeight);
      setCardZoom(card, z);
    }
  }
  setCardZoom(card, z);
  const changed = card.style.getPropertyValue("--card-zoom") !== before;
  // Im freien Layout ändert sich dadurch die Höhe – Nachbarfelder neu ausrichten
  if (changed && card.parentElement?.classList.contains("free-canvas")) freeSchedule(card.parentElement, true);
}

const allCards = () => document.querySelectorAll(".page .card, .qview .card");
if ("ResizeObserver" in window) {
  // Erst im nächsten Frame anwenden – sonst meldet der Browser eine ResizeObserver-Schleife
  const zoomRO = new ResizeObserver(entries => {
    const cards = entries.map(en => en.target);
    requestAnimationFrame(() => cards.forEach(applyCardZoom));
  });
  allCards().forEach(c => zoomRO.observe(c));
}
document.addEventListener("langchange", () => allCards().forEach(applyCardZoom));

// Gespeicherte Anordnung sofort anwenden; erste Messung erst nach dem Laden der Schrift
freeBoxes.forEach(box => { if (freeIsComplete(box)) freeRender(box); });
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(freeRenderAll);


/* ============================================================
   SPRACHE: Umschalten im Seitenmenü, danach alle Inhalte neu zeichnen
   ============================================================ */
function freeHandleTitles() {
  document.querySelectorAll(".free-handle").forEach(g => {
    g.title = t("layout.edgeHint", { edge: t("layout.edge." + g.dataset.dir) });
  });
}

$("langBtn").onclick = () => openLangMenu($("langBtn"));

/* ============================================================
   DESIGN: Original oder Coral, gemeinsam mit der Startseite (js/design-boot.js)
   ============================================================ */
function designLabel() {
  $("designLabel").textContent = designLabelText(design);
}

// Auch beim Umschalten in einem anderen Tab (storage-Event in design-boot.js)
document.addEventListener("designchange", e => {
  design = e.detail;
  designLabel();
  drawRing();
  // Schrift und Abstände ändern sich: Feldinhalte neu einpassen
  requestAnimationFrame(() => { allCards().forEach(applyCardZoom); freeRenderAll(); });
});

$("designBtn").onclick = () => saveDesign(design === "original" ? "coral" : "original");
designLabel();
document.addEventListener("langchange", designLabel);

document.addEventListener("langchange", () => {
  draw();
  if (!paintQuote("qText", "qAuthor", currentQuote)) showQuote();
  if (!paintQuote("tQuote", "tQuoteAuthor", timerQuote)) showTimerQuote();
  renderQuoteList();
  paintMonkQuote();
  renderMonkList();
  paintRevoQuote();
  renderRevoList();
  renderTodos();
  renderClocks();
  renderToday();
  renderStats();
  if (!$("menuModal").hidden) renderMenuEdit();
  layoutBoxes.forEach(updateBoxCardsUI);
  freeHandleTitles();
  freeRenderAll();
});

/* ============================================================
   START
   ============================================================ */
applyI18n();
freeHandleTitles();
draw();
applyTimer(load("pomo_timer", null));
showQuote();
renderQuoteList();
showMonkQuote();
renderMonkList();
showRevoQuote();
renderRevoList();
renderTodos();
clockCheckDone(true);
renderClocks();
renderToday();
showTimerQuote();

// Änderungen von anderen Geräten gleich anzeigen (Live-Sync, siehe cloud.js).
// Keys ohne Eintrag hier (Design, Layout, Zitate …) laden die Seite neu.
cloud.onRemote("pomo_timer", applyTimer);
cloud.onRemote("pomo_sessions", v => { sessions = Array.isArray(v) ? v : []; updateSubjectList(); renderToday(); renderStats(); renderTodos(); });
cloud.onRemote("pomo_breaks", v => { breaks = Array.isArray(v) ? v : []; renderStats(); });
cloud.onRemote("pomo_todos", v => { todos = Array.isArray(v) ? v : []; renderTodos(); });
cloud.onRemote("pomo_clocks", v => { clocks = Array.isArray(v) ? v : []; renderClocks(); });
cloud.onRemote("pomo_subject", v => { if (document.activeElement !== $("subject")) $("subject").value = v || ""; });

/* ============================================================
   NUR-TIMER-ANSICHT ("Zen")
   Zeigt nur das Timer-Feld gross auf dem ganzen Bildschirm.
   Beenden mit dem X oben rechts oder mit Esc.
   ============================================================ */
function setZen(on) {
  if (on) setLayoutEdit(false);          // Felder-Bearbeitung passt nicht zur Vollbild-Ansicht
  if (on) setTimerTab("timerCanvas");    // Vollbild zeigt immer den Pomodoro-Timer
  document.body.classList.toggle("zen", on);

  const btn = $("zenToggleBtn");
  if (btn) {
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", String(on));
  }

  if (!on) freeRenderAll();              // Felder nach dem Beenden neu platzieren
  else freeClearCanvasHeight();
}

// Die Canvas-Hoehe wird im freien Layout per Inline-Style gesetzt – in der
// Vollbild-Ansicht muss sie weg, damit das Timer-Feld den Platz ganz fuellt.
function freeClearCanvasHeight() {
  const box = $("timerCanvas");
  if (box) box.style.removeProperty("height");
}

if ($("zenToggleBtn")) $("zenToggleBtn").onclick = () => setZen(!document.body.classList.contains("zen"));
if ($("zenExitBtn")) $("zenExitBtn").onclick = () => setZen(false);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && document.body.classList.contains("zen")) setZen(false);
});

// Beim Wechsel auf eine andere Seite im Menue die Vollbild-Ansicht beenden
document.querySelectorAll("nav button").forEach(b => {
  b.addEventListener("click", () => {
    if (b.dataset.page !== "timer") setZen(false);
  });
});

/* ============================================================
   TASTENKÜRZEL (Pomodoro-Timer)
   Leertaste Start/Pause · R Reset · N Skip · F Nur-Timer-Ansicht
   Nicht beim Tippen, nicht bei offenen Dialogen oder im Layout-Modus.
   ============================================================ */
document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  if (e.target.closest?.("input, textarea, select, button, a, [contenteditable]")) return;
  if (!$("timer").classList.contains("active") || !document.body.classList.contains("tab-pomodoro")) return;
  if (document.body.classList.contains("layout-edit") || document.querySelector(".modal:not([hidden])")) return;
  const k = e.key.toLowerCase();
  const act = { " ": "startBtn", r: "resetBtn", n: "skipBtn" }[k];
  if (act) { e.preventDefault(); $(act).click(); }
  else if (k === "f") { e.preventDefault(); setZen(!document.body.classList.contains("zen")); }
});
