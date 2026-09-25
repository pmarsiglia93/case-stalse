import batmanBanner from '../assets/hero-vigilante-v2.webp';
import batmanMobileBanner from '../assets/hero-vigilante-mobile-v2.webp';
import spiderManBanner from '../assets/hero-multiverse-v2.webp';
import spiderManMobileBanner from '../assets/hero-multiverse-mobile-v2.webp';
import avengersBanner from '../assets/hero-ensemble-v2.webp';
import avengersMobileBanner from '../assets/hero-ensemble-mobile-v2.webp';

const rawCatalog = [
  ['tt0011439', 'The Mark of Zorro', 1920, 'other', 'zorro', 'Precursores'],
  ['tt0015758', 'Don Q Son of Zorro', 1925, 'other', 'zorro', 'Precursores'],
  ['tt0029542', 'The Shadow Strikes', 1937, 'other', 'the-shadow', 'Precursores'],
  ['tt0032762', 'The Mark of Zorro', 1940, 'other', 'zorro', 'Precursores'],
  ['tt0036697', 'Captain America', 1944, 'marvel', 'captain-america', 'Marvel clássico'],
  ['tt0044091', 'Superman and the Mole-Men', 1951, 'dc', 'superman', 'DC clássico'],
  ['tt0060153', 'Batman: The Movie', 1966, 'dc', 'batman', 'Batman clássico'],
  ['tt0078346', 'Superman', 1978, 'dc', 'superman', 'Superman clássico'],
  ['tt0081573', 'Superman II', 1980, 'dc', 'superman', 'Superman clássico'],
  ['tt0084745', 'Swamp Thing', 1982, 'dc', 'swamp-thing', 'DC independente'],
  ['tt0086393', 'Superman III', 1983, 'dc', 'superman', 'Superman clássico'],
  ['tt0088206', 'Supergirl', 1984, 'dc', 'supergirl', 'Superman clássico', ['superman']],
  ['tt0091225', 'Howard the Duck', 1986, 'marvel', 'howard-the-duck', 'Marvel legado'],
  ['tt0094074', 'Superman IV: The Quest for Peace', 1987, 'dc', 'superman', 'Superman clássico'],
  ['tt0098141', 'The Punisher', 1989, 'marvel', 'punisher', 'Marvel legado'],
  ['tt0098193', 'The Return of Swamp Thing', 1989, 'dc', 'swamp-thing', 'DC independente'],
  ['tt0096895', 'Batman', 1989, 'dc', 'batman', 'Batman Burton/Schumacher'],
  ['tt0103923', 'Captain America', 1990, 'marvel', 'captain-america', 'Marvel legado'],
  ['tt0099365', 'Darkman', 1990, 'other', 'darkman', 'Heróis originais'],
  ['tt0102803', 'The Rocketeer', 1991, 'other', 'rocketeer', 'Quadrinhos independentes'],
  ['tt0103776', 'Batman Returns', 1992, 'dc', 'batman', 'Batman Burton/Schumacher'],
  ['tt0107563', 'The Meteor Man', 1993, 'other', 'meteor-man', 'Heróis originais'],
  ['tt0109506', 'The Crow', 1994, 'other', 'the-crow', 'Quadrinhos independentes'],
  ['tt0110475', 'The Mask', 1994, 'other', 'the-mask', 'Dark Horse'],
  ['tt0112462', 'Batman Forever', 1995, 'dc', 'batman', 'Batman Burton/Schumacher'],
  ['tt0113492', 'Judge Dredd', 1995, 'other', 'judge-dredd', '2000 AD'],
  ['tt0114614', 'Tank Girl', 1995, 'other', 'tank-girl', 'Quadrinhos independentes'],
  ['tt0115624', 'Barb Wire', 1996, 'other', 'barb-wire', 'Dark Horse'],
  ['tt0117331', 'The Phantom', 1996, 'other', 'the-phantom', 'Quadrinhos clássicos'],
  ['tt0118688', 'Batman & Robin', 1997, 'dc', 'batman', 'Batman Burton/Schumacher'],
  ['tt0120207', 'Steel', 1997, 'dc', 'steel', 'DC independente', ['superman']],
  ['tt0120177', 'Spawn', 1997, 'other', 'spawn', 'Image Comics'],
  ['tt0120611', 'Blade', 1998, 'marvel', 'blade', 'Marvel legado'],
  ['tt0132347', 'Mystery Men', 1999, 'other', 'mystery-men', 'Quadrinhos independentes'],
  ['tt0120903', 'X-Men', 2000, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt0217869', 'Unbreakable', 2000, 'other', 'unbreakable', 'Heróis originais'],
  ['tt0187738', 'Blade II', 2002, 'marvel', 'blade', 'Marvel legado'],
  ['tt0145487', 'Spider-Man', 2002, 'marvel', 'spider-man', 'Spider-Man/Raimi'],
  ['tt0287978', 'Daredevil', 2003, 'marvel', 'daredevil', 'Marvel/Fox'],
  ['tt0290334', 'X2: X-Men United', 2003, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt0286716', 'Hulk', 2003, 'marvel', 'hulk', 'Marvel legado'],
  ['tt0311429', 'The League of Extraordinary Gentlemen', 2003, 'other', 'league-extraordinary-gentlemen', 'Quadrinhos independentes'],
  ['tt0167190', 'Hellboy', 2004, 'other', 'hellboy', 'Dark Horse'],
  ['tt0330793', 'The Punisher', 2004, 'marvel', 'punisher', 'Marvel legado'],
  ['tt0316654', 'Spider-Man 2', 2004, 'marvel', 'spider-man', 'Spider-Man/Raimi'],
  ['tt0327554', 'Catwoman', 2004, 'dc', 'catwoman', 'DC independente', ['batman']],
  ['tt0359013', 'Blade: Trinity', 2004, 'marvel', 'blade', 'Marvel legado'],
  ['tt0317705', 'The Incredibles', 2004, 'other', 'incredibles', 'Pixar'],
  ['tt0357277', 'Elektra', 2005, 'marvel', 'daredevil', 'Marvel/Fox'],
  ['tt0372784', 'Batman Begins', 2005, 'dc', 'batman', 'Trilogia Nolan'],
  ['tt0120667', 'Fantastic Four', 2005, 'marvel', 'fantastic-four', 'Marvel/Fox'],
  ['tt0405325', 'Sky High', 2005, 'other', 'sky-high', 'Heróis originais'],
  ['tt0434409', 'V for Vendetta', 2006, 'dc', 'v-for-vendetta', 'DC/Vertigo'],
  ['tt0376994', 'X-Men: The Last Stand', 2006, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt0348150', 'Superman Returns', 2006, 'dc', 'superman', 'Superman Returns'],
  ['tt0432637', 'Krrish', 2006, 'other', 'krrish', 'Cinema indiano'],
  ['tt0259324', 'Ghost Rider', 2007, 'marvel', 'ghost-rider', 'Marvel/Sony'],
  ['tt0413300', 'Spider-Man 3', 2007, 'marvel', 'spider-man', 'Spider-Man/Raimi'],
  ['tt0486576', 'Fantastic Four: Rise of the Silver Surfer', 2007, 'marvel', 'fantastic-four', 'Marvel/Fox'],
  ['tt0371746', 'Iron Man', 2008, 'marvel', 'iron-man', 'MCU'],
  ['tt0800080', 'The Incredible Hulk', 2008, 'marvel', 'hulk', 'MCU'],
  ['tt0468569', 'The Dark Knight', 2008, 'dc', 'batman', 'Trilogia Nolan'],
  ['tt0448157', 'Hancock', 2008, 'other', 'hancock', 'Heróis originais'],
  ['tt0411477', 'Hellboy II: The Golden Army', 2008, 'other', 'hellboy', 'Dark Horse'],
  ['tt0450314', 'Punisher: War Zone', 2008, 'marvel', 'punisher', 'Marvel legado'],
  ['tt0409459', 'Watchmen', 2009, 'dc', 'watchmen', 'DC independente'],
  ['tt0458525', 'X-Men Origins: Wolverine', 2009, 'marvel', 'x-men', 'X-Men/Fox', ['wolverine']],
  ['tt1250777', 'Kick-Ass', 2010, 'other', 'kick-ass', 'Millarworld'],
  ['tt1228705', 'Iron Man 2', 2010, 'marvel', 'iron-man', 'MCU'],
  ['tt1075747', 'Jonah Hex', 2010, 'dc', 'jonah-hex', 'DC independente'],
  ['tt1001526', 'Megamind', 2010, 'other', 'megamind', 'Animação original'],
  ['tt0800369', 'Thor', 2011, 'marvel', 'thor', 'MCU'],
  ['tt1270798', 'X-Men: First Class', 2011, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt1133985', 'Green Lantern', 2011, 'dc', 'green-lantern', 'DC independente'],
  ['tt0458339', 'Captain America: The First Avenger', 2011, 'marvel', 'captain-america', 'MCU'],
  ['tt1562871', 'Ra.One', 2011, 'other', 'ra-one', 'Cinema indiano'],
  ['tt1706593', 'Chronicle', 2012, 'other', 'chronicle', 'Heróis originais'],
  ['tt0848228', 'The Avengers', 2012, 'marvel', 'avengers', 'MCU'],
  ['tt0948470', 'The Amazing Spider-Man', 2012, 'marvel', 'spider-man', 'The Amazing Spider-Man'],
  ['tt1345836', 'The Dark Knight Rises', 2012, 'dc', 'batman', 'Trilogia Nolan'],
  ['tt1343727', 'Dredd', 2012, 'other', 'judge-dredd', '2000 AD'],
  ['tt1300854', 'Iron Man 3', 2013, 'marvel', 'iron-man', 'MCU'],
  ['tt0770828', 'Man of Steel', 2013, 'dc', 'superman', 'DCEU'],
  ['tt1430132', 'The Wolverine', 2013, 'marvel', 'x-men', 'X-Men/Fox', ['wolverine']],
  ['tt1650554', 'Kick-Ass 2', 2013, 'other', 'kick-ass', 'Millarworld'],
  ['tt1981115', 'Thor: The Dark World', 2013, 'marvel', 'thor', 'MCU'],
  ['tt1029231', 'Krrish 3', 2013, 'other', 'krrish', 'Cinema indiano'],
  ['tt1843866', 'Captain America: The Winter Soldier', 2014, 'marvel', 'captain-america', 'MCU'],
  ['tt1872181', 'The Amazing Spider-Man 2', 2014, 'marvel', 'spider-man', 'The Amazing Spider-Man'],
  ['tt1877832', 'X-Men: Days of Future Past', 2014, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt2015381', 'Guardians of the Galaxy', 2014, 'marvel', 'guardians', 'MCU'],
  ['tt1291150', 'Teenage Mutant Ninja Turtles', 2014, 'other', 'tmnt', 'Teenage Mutant Ninja Turtles'],
  ['tt2245084', 'Big Hero 6', 2014, 'marvel', 'big-hero-6', 'Marvel/Disney Animation'],
  ['tt2395427', 'Avengers: Age of Ultron', 2015, 'marvel', 'avengers', 'MCU'],
  ['tt0478970', 'Ant-Man', 2015, 'marvel', 'ant-man', 'MCU'],
  ['tt1502712', 'Fantastic Four', 2015, 'marvel', 'fantastic-four', 'Marvel/Fox'],
  ['tt1431045', 'Deadpool', 2016, 'marvel', 'deadpool', 'X-Men/Fox', ['x-men']],
  ['tt2975590', 'Batman v Superman: Dawn of Justice', 2016, 'dc', 'superman', 'DCEU', ['batman', 'justice-league']],
  ['tt3498820', 'Captain America: Civil War', 2016, 'marvel', 'captain-america', 'MCU', ['avengers']],
  ['tt3385516', 'X-Men: Apocalypse', 2016, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt3949660', 'Teenage Mutant Ninja Turtles: Out of the Shadows', 2016, 'other', 'tmnt', 'Teenage Mutant Ninja Turtles'],
  ['tt1386697', 'Suicide Squad', 2016, 'dc', 'suicide-squad', 'DCEU'],
  ['tt1211837', 'Doctor Strange', 2016, 'marvel', 'doctor-strange', 'MCU'],
  ['tt4116284', 'The Lego Batman Movie', 2017, 'dc', 'batman', 'LEGO/DC'],
  ['tt3315342', 'Logan', 2017, 'marvel', 'x-men', 'X-Men/Fox', ['wolverine']],
  ['tt3717490', 'Power Rangers', 2017, 'other', 'power-rangers', 'Power Rangers'],
  ['tt3896198', 'Guardians of the Galaxy: Vol. 2', 2017, 'marvel', 'guardians', 'MCU'],
  ['tt0451279', 'Wonder Woman', 2017, 'dc', 'wonder-woman', 'DCEU'],
  ['tt2250912', 'Spider-Man: Homecoming', 2017, 'marvel', 'spider-man', 'MCU'],
  ['tt3501632', 'Thor: Ragnarok', 2017, 'marvel', 'thor', 'MCU'],
  ['tt0974015', 'Justice League', 2017, 'dc', 'justice-league', 'DCEU'],
  ['tt1825683', 'Black Panther', 2018, 'marvel', 'black-panther', 'MCU'],
  ['tt4154756', 'Avengers: Infinity War', 2018, 'marvel', 'avengers', 'MCU'],
  ['tt5463162', 'Deadpool 2', 2018, 'marvel', 'deadpool', 'X-Men/Fox', ['x-men']],
  ['tt3606756', 'Incredibles 2', 2018, 'other', 'incredibles', 'Pixar'],
  ['tt5095030', 'Ant-Man and the Wasp', 2018, 'marvel', 'ant-man', 'MCU'],
  ['tt1270797', 'Venom', 2018, 'marvel', 'venom', 'Sony/Marvel'],
  ['tt4633694', 'Spider-Man: Into the Spider-Verse', 2018, 'marvel', 'spider-man', 'Spider-Verse'],
  ['tt1477834', 'Aquaman', 2018, 'dc', 'aquaman', 'DCEU'],
  ['tt6129302', 'Bhavesh Joshi Superhero', 2018, 'other', 'bhavesh-joshi', 'Cinema indiano'],
  ['tt4154664', 'Captain Marvel', 2019, 'marvel', 'captain-marvel', 'MCU'],
  ['tt0448115', 'Shazam!', 2019, 'dc', 'shazam', 'DCEU'],
  ['tt4154796', 'Avengers: Endgame', 2019, 'marvel', 'avengers', 'MCU'],
  ['tt6565702', 'X-Men: Dark Phoenix', 2019, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt6320628', 'Spider-Man: Far from Home', 2019, 'marvel', 'spider-man', 'MCU'],
  ['tt2274648', 'Hellboy', 2019, 'other', 'hellboy', 'Dark Horse'],
  ['tt7286456', 'Joker', 2019, 'dc', 'joker', 'DC Elseworlds', ['batman']],
  ['tt7713068', 'Birds of Prey', 2020, 'dc', 'birds-of-prey', 'DCEU', ['suicide-squad']],
  ['tt4682266', 'The New Mutants', 2020, 'marvel', 'x-men', 'X-Men/Fox'],
  ['tt7126948', 'Wonder Woman 1984', 2020, 'dc', 'wonder-woman', 'DCEU'],
  ['tt1634106', 'Bloodshot', 2020, 'other', 'bloodshot', 'Valiant'],
  ['tt12361974', "Zack Snyder's Justice League", 2021, 'dc', 'justice-league', 'DCEU'],
  ['tt3480822', 'Black Widow', 2021, 'marvel', 'black-widow', 'MCU'],
  ['tt6334354', 'The Suicide Squad', 2021, 'dc', 'suicide-squad', 'DCEU'],
  ['tt9376612', 'Shang-Chi and the Legend of the Ten Rings', 2021, 'marvel', 'shang-chi', 'MCU'],
  ['tt7097896', 'Venom: Let There Be Carnage', 2021, 'marvel', 'venom', 'Sony/Marvel'],
  ['tt9032400', 'Eternals', 2021, 'marvel', 'eternals', 'MCU'],
  ['tt10872600', 'Spider-Man: No Way Home', 2021, 'marvel', 'spider-man', 'MCU'],
  ['tt7268738', 'Minnal Murali', 2021, 'other', 'minnal-murali', 'Cinema indiano'],
  ['tt1877830', 'The Batman', 2022, 'dc', 'batman', 'The Batman'],
  ['tt5108870', 'Morbius', 2022, 'marvel', 'morbius', 'Sony/Marvel'],
  ['tt9419884', 'Doctor Strange in the Multiverse of Madness', 2022, 'marvel', 'doctor-strange', 'MCU'],
  ['tt10648342', 'Thor: Love and Thunder', 2022, 'marvel', 'thor', 'MCU'],
  ['tt8912936', 'DC League of Super-Pets', 2022, 'dc', 'dc-super-pets', 'DC Animation', ['justice-league']],
  ['tt6443346', 'Black Adam', 2022, 'dc', 'black-adam', 'DCEU', ['shazam']],
  ['tt9114286', 'Black Panther: Wakanda Forever', 2022, 'marvel', 'black-panther', 'MCU'],
  ['tt10954600', 'Ant-Man and the Wasp: Quantumania', 2023, 'marvel', 'ant-man', 'MCU'],
  ['tt10151854', 'Shazam! Fury of the Gods', 2023, 'dc', 'shazam', 'DCEU'],
  ['tt6791350', 'Guardians of the Galaxy Vol. 3', 2023, 'marvel', 'guardians', 'MCU'],
  ['tt9362722', 'Spider-Man: Across the Spider-Verse', 2023, 'marvel', 'spider-man', 'Spider-Verse'],
  ['tt0439572', 'The Flash', 2023, 'dc', 'the-flash', 'DCEU'],
  ['tt9362930', 'Blue Beetle', 2023, 'dc', 'blue-beetle', 'DCEU'],
  ['tt10676048', 'The Marvels', 2023, 'marvel', 'captain-marvel', 'MCU'],
  ['tt9663764', 'Aquaman and the Lost Kingdom', 2023, 'dc', 'aquaman', 'DCEU'],
  ['tt22543326', 'Maaveeran', 2023, 'other', 'maaveeran', 'Cinema indiano'],
  ['tt11057302', 'Madame Web', 2024, 'marvel', 'madame-web', 'Sony/Marvel'],
  ['tt6263850', 'Deadpool & Wolverine', 2024, 'marvel', 'deadpool', 'MCU', ['x-men', 'wolverine']],
  ['tt11315808', 'Joker: Folie à Deux', 2024, 'dc', 'joker', 'DC Elseworlds', ['batman']],
  ['tt16366836', 'Venom: The Last Dance', 2024, 'marvel', 'venom', 'Sony/Marvel'],
  ['tt8790086', 'Kraven the Hunter', 2024, 'marvel', 'kraven', 'Sony/Marvel'],
  ['tt15433956', 'Hanu Man', 2024, 'other', 'hanu-man', 'Cinema indiano'],
  ['tt15380608', 'Bagheera', 2024, 'other', 'bagheera', 'Cinema indiano'],
  ['tt14513804', 'Captain America: Brave New World', 2025, 'marvel', 'captain-america', 'MCU'],
  ['tt20969586', 'Thunderbolts*', 2025, 'marvel', 'thunderbolts', 'MCU'],
  ['tt5950044', 'Superman', 2025, 'dc', 'superman', 'DCU'],
  ['tt10676052', 'The Fantastic Four: First Steps', 2025, 'marvel', 'fantastic-four', 'MCU'],
  ['tt33372494', 'Lokah Chapter One: Chandra', 2025, 'other', 'lokah', 'Cinema indiano'],
  ['tt8814476', 'Supergirl', 2026, 'dc', 'supergirl', 'DCU', ['superman']],
  ['tt22084616', 'Spider-Man: Brand New Day', 2026, 'marvel', 'spider-man', 'MCU'],
];

export const catalogEntries = rawCatalog.map(([
  imdbID,
  title,
  year,
  universe,
  franchise,
  collection,
  relatedFranchises = [],
]) => ({ imdbID, title, year, universe, franchise, collection, relatedFranchises }));

const catalogIds = new Set(catalogEntries.map(({ imdbID }) => imdbID));

export const belongsToFranchise = (movie, franchise) => movie.franchise === franchise || movie.relatedFranchises?.includes(franchise);

export const getCatalogEntries = ({ universe, franchise, decade, ids } = {}) => {
  if (ids) {
    const requestedIds = new Set(ids);
    return catalogEntries.filter(({ imdbID }) => requestedIds.has(imdbID));
  }
  return catalogEntries.filter((entry) => {
    if (universe && entry.universe !== universe) return false;
    if (franchise && !belongsToFranchise(entry, franchise)) return false;
    if (decade && Math.floor(entry.year / 10) * 10 !== Number(decade)) return false;
    return true;
  });
};

export const isCatalogMovie = (imdbID) => catalogIds.has(imdbID);

export const featuredMovies = [
  {
    imdbID: 'tt4154796',
    eyebrow: 'Destaque da semana',
    title: 'Avengers: Endgame',
    year: 2019,
    description: 'Os heróis restantes se unem para restaurar o universo e enfrentar uma última batalha.',
    desktopImage: avengersBanner,
    mobileImage: avengersMobileBanner,
  },
  {
    imdbID: 'tt1877830',
    eyebrow: 'Universo DC',
    title: 'The Batman',
    year: 2022,
    description: 'Uma investigação sombria leva Batman ao coração da corrupção de Gotham.',
    desktopImage: batmanBanner,
    mobileImage: batmanMobileBanner,
  },
  {
    imdbID: 'tt10872600',
    eyebrow: 'Favorito dos fãs',
    title: 'Spider-Man: No Way Home',
    year: 2021,
    description: 'Peter Parker enfrenta ameaças de outros universos e redefine o que significa ser um herói.',
    desktopImage: spiderManBanner,
    mobileImage: spiderManMobileBanner,
  },
];

export const collections = {
  featured: {
    title: 'Em destaque',
    description: 'Histórias essenciais para começar sua maratona.',
    href: '/movies',
    ids: ['tt4154796', 'tt1877830', 'tt10872600', 'tt0468569', 'tt1825683', 'tt0770828', 'tt0451279', 'tt0371746'],
  },
  marvel: {
    title: 'Universo Marvel',
    description: 'Dos clássicos ao MCU, X-Men, Spider-Verse e Sony/Marvel.',
    href: '/marvel',
    ids: ['tt4154796', 'tt4154756', 'tt6791350', 'tt3498820', 'tt10872600', 'tt6263850', 'tt2015381', 'tt1825683', 'tt0145487', 'tt0120903', 'tt0371746', 'tt0458339'],
  },
  dc: {
    title: 'Universo DC',
    description: 'Lendas de Gotham, Metrópolis, DCEU, DCU e Elseworlds.',
    href: '/dc',
    ids: ['tt0468569', 'tt1345836', 'tt1877830', 'tt12361974', 'tt0451279', 'tt7286456', 'tt0078346', 'tt5950044', 'tt0409459', 'tt1477834', 'tt0974015', 'tt0448115'],
  },
  others: {
    title: 'Além de Marvel e DC',
    description: 'Quadrinhos independentes, heróis originais, animações e cinema internacional.',
    href: '/movies?universe=other',
    ids: ['tt0109506', 'tt0120177', 'tt0167190', 'tt0110475', 'tt0317705', 'tt1001526', 'tt1250777', 'tt7268738', 'tt15433956', 'tt33372494', 'tt1343727', 'tt0217869'],
  },
};

export const universeOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'marvel', label: 'Marvel' },
  { value: 'dc', label: 'DC' },
  { value: 'other', label: 'Outros' },
];

const franchiseLabels = {
  'ant-man': 'Ant-Man', 'aquaman': 'Aquaman', 'avengers': 'Avengers', 'batman': 'Batman',
  'black-panther': 'Pantera Negra', 'blade': 'Blade', 'captain-america': 'Capitão América',
  'captain-marvel': 'Capitã Marvel', 'daredevil': 'Demolidor', 'deadpool': 'Deadpool',
  'doctor-strange': 'Doutor Estranho', 'fantastic-four': 'Quarteto Fantástico', 'guardians': 'Guardiões da Galáxia',
  'hellboy': 'Hellboy', 'incredibles': 'Os Incríveis', 'iron-man': 'Homem de Ferro', 'joker': 'Coringa',
  'justice-league': 'Liga da Justiça', 'krrish': 'Krrish', 'punisher': 'Justiceiro', 'shazam': 'Shazam',
  'spider-man': 'Spider-Man', 'suicide-squad': 'Esquadrão Suicida', 'supergirl': 'Supergirl',
  'superman': 'Superman', 'swamp-thing': 'Monstro do Pântano', 'thor': 'Thor', 'tmnt': 'Tartarugas Ninja',
  'venom': 'Venom', 'wonder-woman': 'Mulher-Maravilha', 'x-men': 'X-Men', 'zorro': 'Zorro',
};

const formatFranchiseLabel = (value) => franchiseLabels[value] || value
  .split("-")
  .map((word) => ({ dc: "DC", ra: "Ra" }[word] || `${word.charAt(0).toUpperCase()}${word.slice(1)}`))
  .join(" ");

const franchiseValues = [...new Set(catalogEntries.flatMap(({ franchise, relatedFranchises }) => [franchise, ...relatedFranchises]))];

export const franchiseOptions = franchiseValues
  .map((value) => ({ value, label: formatFranchiseLabel(value) }))
  .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));

export const decadeOptions = [...new Set(catalogEntries.map(({ year }) => Math.floor(year / 10) * 10))]
  .sort((a, b) => b - a)
  .map((value) => ({ value: String(value), label: `${value}–${value + 9}` }));
