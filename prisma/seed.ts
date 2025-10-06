import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleAnimes = [
  {
    title: "Aharen-san wa Hakarenai",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, School, Shounen",
    year: 2022,
    bounty: 700,
    status: "active"
  },
  {
    title: "AI no Idenshi",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Drama, Sci-Fi, Shounen",
    year: 2023,
    bounty: 650,
    status: "active"
  },
  {
    title: "Assassination Classroom S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy, School",
    year: 2016,
    bounty: 950,
    status: "active"
  },
  {
    title: "Assassination Classroom",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy, School",
    year: 2015,
    bounty: 930,
    status: "active"
  },
  {
    title: "Ayaka",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Fantasy",
    year: 2023,
    bounty: 400,
    status: "active"
  },
  {
    title: "B Gata H Kei",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance, Ecchi",
    year: 2010,
    bounty: 550,
    status: "active"
  },
  {
    title: "Blue Period",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Drama, Slice of Life",
    year: 2021,
    bounty: 820,
    status: "active"
  },
  {
    title: "Bocchi The Rock!",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Music",
    year: 2022,
    bounty: 980,
    status: "active"
  },
  {
    title: "Buddy Daddies",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy",
    year: 2023,
    bounty: 780,
    status: "active"
  },
  {
    title: "Bungou Stray Dogs",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Mystery, Supernatural",
    year: 2016,
    bounty: 850,
    status: "active"
  },
  {
    title: "Bungou Stray Dogs S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Mystery, Supernatural",
    year: 2016,
    bounty: 870,
    status: "active"
  },
  {
    title: "Bungou Stray Dogs S3",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Mystery, Supernatural",
    year: 2019,
    bounty: 890,
    status: "active"
  },
  {
    title: "Bungou Stray Dogs S4",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Mystery, Supernatural",
    year: 2023,
    bounty: 910,
    status: "active"
  },
  {
    title: "Bungou Stray Dogs S5",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Mystery, Supernatural",
    year: 2023,
    bounty: 930,
    status: "active"
  },
  {
    title: "Burn The Witch",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Fantasy",
    year: 2020,
    bounty: 750,
    status: "active"
  },
  {
    title: "Chainsaw Man",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Dark Fantasy",
    year: 2022,
    bounty: 960,
    status: "active"
  },
  {
    title: "Dandadan",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy, Sci-Fi",
    year: 2024,
    bounty: 800,
    status: "active"
  },
  {
    title: "Domestic no Kanojo",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Drama, Romance",
    year: 2019,
    bounty: 500,
    status: "active"
  },
  {
    title: "Dr. Stone: Stone Wars",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Adventure, Sci-Fi",
    year: 2021,
    bounty: 880,
    status: "active"
  },
  {
    title: "Dr. Stone: New World",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Adventure, Sci-Fi",
    year: 2023,
    bounty: 900,
    status: "active"
  },
  {
    title: "Durarara!!",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Mystery, Supernatural",
    year: 2010,
    bounty: 860,
    status: "active"
  },
  {
    title: "Classroom of the Elite S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Psychological, Drama",
    year: 2022,
    bounty: 830,
    status: "active"
  },
  {
    title: "Classroom of the Elite S3",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Psychological, Drama",
    year: 2024,
    bounty: 850,
    status: "active"
  },
  {
    title: "Engage Kiss",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy, Romance",
    year: 2022,
    bounty: 680,
    status: "active"
  },
  {
    title: "Fuuto Tantei",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Mystery",
    year: 2022,
    bounty: 710,
    status: "active"
  },
  {
    title: "Gaikotsu Kishi-sama, Tadaima Isekai e Odekakechuu",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Isekai, Fantasy",
    year: 2022,
    bounty: 640,
    status: "active"
  },
  {
    title: "The Quintessential Quintuplets S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Harem, Comedy, Romance",
    year: 2021,
    bounty: 880,
    status: "active"
  },
  {
    title: "Great Pretender",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Crime, Comedy",
    year: 2020,
    bounty: 890,
    status: "active"
  },
  {
    title: "My Next Life as a Villainess: All Routes Lead to Doom!",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Isekai, Comedy, Romance",
    year: 2020,
    bounty: 780,
    status: "active"
  },
  {
    title: "The Devil Is a Part-Timer!",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Fantasy",
    year: 2013,
    bounty: 830,
    status: "active"
  },
  {
    title: "Heavenly Delusion",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Mystery, Sci-Fi",
    year: 2023,
    bounty: 870,
    status: "active"
  },
  {
    title: "High Card",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action",
    year: 2023,
    bounty: 660,
    status: "active"
  },
  {
    title: "Horimiya",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Romance, Slice of Life",
    year: 2021,
    bounty: 910,
    status: "active"
  },
  {
    title: "Horimiya: The Missing Pieces",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Romance, Slice of Life",
    year: 2023,
    bounty: 900,
    status: "active"
  },
  {
    title: "Isekai Suicide Squad",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Isekai",
    year: 2024,
    bounty: 700,
    status: "active"
  },
  {
    title: "Hell's Paradise: Jigokuraku",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Dark Fantasy",
    year: 2023,
    bounty: 880,
    status: "active"
  },
  {
    title: "The Eminence in Shadow S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Isekai, Action, Comedy",
    year: 2023,
    bounty: 900,
    status: "active"
  },
  {
    title: "Kaguya-sama: Love Is War",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2019,
    bounty: 920,
    status: "active"
  },
  {
    title: "Kaguya-sama: Love Is War S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2020,
    bounty: 940,
    status: "active"
  },
  {
    title: "Kaguya-sama: Love Is War -Ultra Romantic-",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2022,
    bounty: 980,
    status: "active"
  },
  {
    title: "Fena: Pirate Princess",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Adventure",
    year: 2021,
    bounty: 700,
    status: "active"
  },
  {
    title: "Ron Kamonohashi's Forbidden Deductions",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Mystery",
    year: 2023,
    bounty: 760,
    status: "active"
  },
  {
    title: "Rent-A-Girlfriend",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2020,
    bounty: 650,
    status: "active"
  },
  {
    title: "Rent-A-Girlfriend S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2022,
    bounty: 630,
    status: "active"
  },
  {
    title: "Rent-A-Girlfriend S3",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2023,
    bounty: 640,
    status: "active"
  },
  {
    title: "Demon Slayer: Entertainment District Arc",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Fantasy",
    year: 2021,
    bounty: 960,
    status: "active"
  },
  {
    title: "Insomniacs After School",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Romance, Slice of Life",
    year: 2023,
    bounty: 860,
    status: "active"
  },
  {
    title: "Kiss x Sis",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Ecchi, Harem, Comedy",
    year: 2010,
    bounty: 300,
    status: "active"
  },
  {
    title: "Komi Can't Communicate",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Slice of Life, Comedy",
    year: 2021,
    bounty: 870,
    status: "active"
  },
  {
    title: "Komi Can't Communicate S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Slice of Life, Comedy",
    year: 2022,
    bounty: 880,
    status: "active"
  },
  {
    title: "Lazarus",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Sci-Fi, Thriller",
    year: 2024,
    bounty: 800,
    status: "active"
  },
  {
    title: "Liar Liar",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Game, Ecchi",
    year: 2023,
    bounty: 550,
    status: "active"
  },
  {
    title: "Lookism",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Drama",
    year: 2022,
    bounty: 810,
    status: "active"
  },
  {
    title: "Lycoris Recoil",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action",
    year: 2022,
    bounty: 910,
    status: "active"
  },
  {
    title: "Gushing over Magical Girls",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Ecchi",
    year: 2024,
    bounty: 680,
    status: "active"
  },
  {
    title: "Wandering Witch: The Journey of Elaina",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Adventure, Fantasy",
    year: 2020,
    bounty: 790,
    status: "active"
  },
  {
    title: "The Café Terrace and Its Goddesses",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Harem, Comedy, Romance",
    year: 2023,
    bounty: 620,
    status: "active"
  },
  {
    title: "Mieruko-chan",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Horror",
    year: 2021,
    bounty: 770,
    status: "active"
  },
  {
    title: "Malevolent Spirits: Mononogatari",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Supernatural",
    year: 2023,
    bounty: 650,
    status: "active"
  },
  {
    title: "Oshi No Ko",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Drama, Supernatural",
    year: 2023,
    bounty: 990,
    status: "active"
  },
  {
    title: "Ousama Ranking",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Adventure, Fantasy",
    year: 2021,
    bounty: 930,
    status: "active"
  },
  {
    title: "Ousama Ranking: The Treasure Chest of Courage",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Adventure, Fantasy",
    year: 2023,
    bounty: 800,
    status: "active"
  },
  {
    title: "Platinum End",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Supernatural, Psychological",
    year: 2021,
    bounty: 600,
    status: "active"
  },
  {
    title: "Renai Flops",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Harem, Comedy, Sci-Fi",
    year: 2022,
    bounty: 610,
    status: "active"
  },
  {
    title: "School Days",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Drama, Horror, Romance",
    year: 2007,
    bounty: 250,
    status: "active"
  },
  {
    title: "The Saint's Magic Power is Omnipotent S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Fantasy, Romance",
    year: 2023,
    bounty: 730,
    status: "active"
  },
  {
    title: "Seirei Gensouki: Spirit Chronicles",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Isekai, Harem",
    year: 2021,
    bounty: 670,
    status: "active"
  },
  {
    title: "Shadows House",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Mystery, Supernatural",
    year: 2021,
    bounty: 810,
    status: "active"
  },
  {
    title: "Shadows House S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Mystery, Supernatural",
    year: 2022,
    bounty: 830,
    status: "active"
  },
  {
    title: "Shikimori's Not Just a Cutie",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Romance, Slice of Life",
    year: 2022,
    bounty: 700,
    status: "active"
  },
  {
    title: "The Testament of Sister New Devil",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Ecchi, Harem",
    year: 2015,
    bounty: 500,
    status: "active"
  },
  {
    title: "World's End Harem",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Sci-Fi, Ecchi, Harem",
    year: 2022,
    bounty: 350,
    status: "active"
  },
  {
    title: "Skip and Loafer",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Romance, Slice of Life",
    year: 2023,
    bounty: 890,
    status: "active"
  },
  {
    title: "My Dress-Up Darling",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Romance, Slice of Life",
    year: 2022,
    bounty: 920,
    status: "active"
  },
  {
    title: "Spy x Family",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy",
    year: 2022,
    bounty: 970,
    status: "active"
  },
  {
    title: "Spy x Family S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy",
    year: 2023,
    bounty: 940,
    status: "active"
  },
  {
    title: "Steins;Gate 0",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Sci-Fi, Thriller",
    year: 2018,
    bounty: 910,
    status: "active"
  },
  {
    title: "Steins;Gate",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Sci-Fi, Thriller",
    year: 2011,
    bounty: 1000,
    status: "active"
  },
  {
    title: "Summertime Render",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Mystery, Supernatural, Thriller",
    year: 2022,
    bounty: 930,
    status: "active"
  },
  {
    title: "The Rising of the Shield Hero S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Isekai, Fantasy",
    year: 2022,
    bounty: 580,
    status: "active"
  },
  {
    title: "The Rising of the Shield Hero S3",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Isekai, Fantasy",
    year: 2023,
    bounty: 720,
    status: "active"
  },
  {
    title: "Magical Sempai",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Ecchi",
    year: 2019,
    bounty: 520,
    status: "active"
  },
  {
    title: "Tokyo Revengers: Christmas Showdown",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Drama",
    year: 2023,
    bounty: 800,
    status: "active"
  },
  {
    title: "Tokyo Revengers: Tenjiku Arc",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Drama",
    year: 2023,
    bounty: 810,
    status: "active"
  },
  {
    title: "Tomodachi Game",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Game, Psychological",
    year: 2022,
    bounty: 790,
    status: "active"
  },
  {
    title: "Tonikawa: Over the Moon for You",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2020,
    bounty: 820,
    status: "active"
  },
  {
    title: "Tonikawa: Over the Moon for You S2",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Comedy, Romance",
    year: 2023,
    bounty: 810,
    status: "active"
  },
  {
    title: "Undead Girl Murder Farce",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Mystery, Supernatural",
    year: 2023,
    bounty: 780,
    status: "active"
  },
  {
    title: "Otherside Picnic",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Adventure, Mystery, Sci-Fi",
    year: 2021,
    bounty: 660,
    status: "active"
  },
  {
    title: "The Case Study of Vanitas",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Supernatural, Fantasy",
    year: 2021,
    bounty: 840,
    status: "active"
  },
  {
    title: "Wind Breaker",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action",
    year: 2024,
    bounty: 850,
    status: "active"
  },
  {
    title: "Encouragement of Climb S4",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Slice of Life",
    year: 2022,
    bounty: 820,
    status: "active"
  },
  {
    title: "Laid-Back Camp S3",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Slice of Life",
    year: 2024,
    bounty: 900,
    status: "active"
  },
  {
    title: "Zom 100: Bucket List of the Dead",
    description: "Deskripsi untuk anime ini akan segera ditambahkan.",
    genre: "Action, Comedy, Horror",
    year: 2023,
    bounty: 830,
    status: "active"
  }
];


async function main() {
  console.log('Deleting existing anime data...');
  await prisma.anime.deleteMany({});
  console.log('Existing data deleted.');

  console.log('Seeding sample anime data...');
  
  for (const anime of sampleAnimes) {
    await prisma.anime.create({
      data: anime
    });
  }
  
  console.log('Sample anime data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
