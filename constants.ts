import {
  Car,
  Category,
  Review,
  NavLink,
  TeamMember,
  Stat,
  ValueItem,
  FaqItem,
  PolicySection,
  BlogPost,
  Tour,
} from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/cars" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const CARS: Car[] = [
  {
    id: "1",
    name: "EV Scooter - City Lite",
    type: "EV Scooter",
    brand: "NIU",
    year: 2024,
    fuel: "Electric",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1554223789-df81106a45ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nvb3RlcnxlbnwwfHwwfHx8MA%3D%3D",
    seats: 2,
    transmission: "Automatic",
    luggage: 1,
    description:
      "Ideal for solo or couple city rides. Lightweight EV scooter with strong pickup, easy handling, and a comfortable seat height.",
    features: [
      "90-110 km range",
      "Dual disc brakes",
      "LED headlamp",
      "USB charging port",
      "Helmet included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    ],
    category: "Self-ride Scooter",
  },
  {
    id: "2",
    name: "EV Scooter - Dual Battery",
    type: "EV Scooter",
    brand: "Horwin",
    year: 2024,
    fuel: "Electric",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1648204834832-78e68052c04f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3RyaWMlMjBzY29vdGVyfGVufDB8fDB8fHww",
    seats: 2,
    transmission: "Automatic",
    luggage: 1,
    description:
      "Long-range dual battery setup perfect for day trips around Kathmandu Valley. Smooth acceleration with regen braking.",
    features: [
      "130-150 km range",
      "Fast charger ready",
      "CBS brakes",
      "Anti-theft alarm",
      "2 helmets included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1529429617124-aee3c7c2f2ad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    ],
    category: "Guide with Scooter",
  },
  {
    id: "3",
    name: "Guided EV Scooter Ride",
    type: "EV Scooter + Rider",
    brand: "Ather",
    year: 2024,
    fuel: "Electric",
    price: 2800,
    image:
      "https://nepaldrives.com/wp-content/uploads/2023/06/TVS-iQube-Electric-Scooter-Nepal-1.jpg",
    seats: 2,
    transmission: "Automatic",
    luggage: 1,
    description:
      "Ride pillion while our local rider navigates. Perfect if you don’t hold a license or prefer hands-free sightseeing.",
    features: [
      "Licensed rider provided",
      "2 DOT helmets",
      "Rain poncho",
      "Phone mount",
      "Insurance included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502877828070-33b167ad6860?auto=format&fit=crop&w=900&q=80",
    ],
    category: "Guide with Scooter",
  },
  {
    id: "4",
    name: "EV Taxi - Sedan (AC)",
    type: "EV Sedan",
    brand: "Hyundai Ioniq",
    year: 2023,
    fuel: "Electric",
    price: 3500,
    image:
      "https://www.fiscalnepal.com/wp-content/uploads/2025/04/taxi-nepal.jpg",
    seats: 4,
    transmission: "Automatic",
    luggage: 3,
    description:
      "Comfortable AC sedan for airport runs, business travel, and small family trips within the valley.",
    features: [
      "Fast charging ready",
      "A/C with rear vents",
      "Child seat on request",
      "Bottled water",
      "Professional company driver",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    ],
    category: "Ev Taxi",
  },
  {
    id: "5",
    name: "EV Taxi - SUV / MPV",
    type: "EV SUV",
    brand: "Kia Niro",
    year: 2023,
    fuel: "Electric",
    price: 5200,
    image:
      "https://www.fiscalnepal.com/wp-content/uploads/2025/04/taxi-nepal.jpg",
    seats: 6,
    transmission: "Automatic",
    luggage: 5,
    description:
      "Spacious EV with captain seats ideal for families or small groups. Great for day-long sightseeing and airport transfers.",
    features: [
      "Tri-zone A/C",
      "USB-C charging ports",
      "Roof rails",
      "Bottled water & tissues",
      "Professional company driver",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1502877828070-33b167ad6860?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    ],
    category: "Ev Taxi",
  },
  {
    id: "6",
    name: "Kathmandu Heritage Tour (EV Taxi)",
    type: "Guided Tour",
    brand: "Guided",
    year: 2024,
    fuel: "Electric",
    price: 6500,
    image:
      "https://www.en.meroauto.com/wp-content/uploads/2025/04/EV-EASY-Taxi.jpg",
    seats: 4,
    transmission: "Automatic",
    luggage: 2,
    description:
      "6-hour curated circuit covering Swayambhu, Patan, and Boudha in a comfortable EV with a certified city guide.",
    features: [
      "Guide included",
      "Monument tickets",
      "A/C EV taxi",
      "Bottled water",
      "Flexible pickup points",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502877828070-33b167ad6860?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    ],
    category: "Tours",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Scooter",
    image: "/images/self-ride.jpeg",
  },
  {
    id: "2",
    name: "Ev Taxi",
    image: "/images/batoma-cab.jpeg",
  },
  {
    id: "3",
    name: "Tours",
    image: "/images/roads.jpg",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "1",
    text: "I needed a reliable car for my business trip, and this service exceeded my expectations. The booking process was seamless.",
    author: "Mark Stevens",
    avatar: "https://picsum.photos/seed/u1/100/100",
    rating: 5,
  },
  {
    id: "2",
    text: "As a frequent traveler for work, I rely on car rental services often. This company has become my go-to choice because of their reliable vehicles.",
    author: "Lisa Anderson",
    avatar: "https://picsum.photos/seed/u2/100/100",
    rating: 4,
  },
  {
    id: "3",
    text: "It was fuel-efficient and environmentally friendly, which is important to me. I loved that this company offers sustainable options.",
    author: "Brian T",
    avatar: "https://picsum.photos/seed/u3/100/100",
    rating: 4,
  },
  {
    id: "4",
    text: "I needed a rental for a last-minute trip, and this service made it so easy! The car was clean, the rates were affordable.",
    author: "Emma Johnson",
    avatar: "https://picsum.photos/seed/u4/100/100",
    rating: 5,
  },
  {
    id: "5",
    text: "There is plenty of room for everyone and all our luggage. The process was easy, and the customer service was top-notch.",
    author: "Jessica Ramirez",
    avatar: "https://picsum.photos/seed/u5/100/100",
    rating: 5,
  },
  {
    id: "6",
    text: "The rates were competitive, and the team made it easy to extend my rental when my plans changed. Highly recommended!",
    author: "Laura J.",
    avatar: "https://picsum.photos/seed/u6/100/100",
    rating: 5,
  },
  {
    id: "7",
    text: "I frequently travel for work and have used many rental services, but this one stands out. Fast booking, great vehicles.",
    author: "Daniel Lee",
    avatar: "https://picsum.photos/seed/u7/100/100",
    rating: 4,
  },
  {
    id: "8",
    text: "The vehicle was in great condition, and the 24/7 support was a huge plus. I felt confident the entire trip.",
    author: "Kevin Thompson",
    avatar: "https://picsum.photos/seed/u8/100/100",
    rating: 5,
  },
  {
    id: "9",
    text: "The car was delivered quickly, and everything was handled professionally. A true lifesaver in a stressful moment.",
    author: "Chris P",
    avatar: "https://picsum.photos/seed/u9/100/100",
    rating: 4,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Anish Shrestha",
    role: "Fleet & Safety Lead",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Sujata Karki",
    role: "Guest Experience",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Rabindra Lama",
    role: "Guided Tours Lead",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    name: "Priyanka Gurung",
    role: "Operations & Support",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
];

export const COMPANY_VALUES: ValueItem[] = [
  {
    title: "Sustainability",
    description:
      "We operate an all-electric fleet and promote responsible routes to keep Kathmandu’s air cleaner while you explore.",
  },
  {
    title: "Safety First",
    description:
      "Helmets, safety kits, licensed guides, and trained drivers come standard so every ride feels secure.",
  },
  {
    title: "Local Expertise",
    description:
      "Kathmandu locals lead our operations, crafting routes and support that respect the city and its culture.",
  },
  {
    title: "Hospitality",
    description:
      "Friendly, responsive service with clear communication, upfront pricing, and flexible options for guests and locals.",
  },
  {
    title: "Reliability",
    description:
      "Well-maintained EVs, on-time pickups, and dedicated support ensure smooth journeys every time.",
  },
];

export const ABOUT_STATS: Stat[] = [
  { value: "1,500+", label: "Electric rides completed in Kathmandu" },
  { value: "120+", label: "Guided scooter experiences delivered" },
  { value: "25 t", label: "CO₂ emissions avoided via EV fleet" },
  { value: "24/7", label: "Local support for bookings and changes" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What license do I need to rent a vehicle?",
    answer:
      "For self-ride scooters you need a valid two-wheeler license plus a government-issued ID. International riders should bring their passport and an International Driving Permit. Guided scooter rides do not require you to hold a license.",
  },
  {
    question: "What areas are covered for pickups and rides?",
    answer:
      "Pickups and drop-offs are available within Kathmandu Valley service zones shown at checkout. Rides should stay within the approved coverage area; cross-border or restricted-zone travel needs prior approval from our support team.",
  },
  {
    question: "Is safety gear provided with the rental?",
    answer:
      "Yes. Every booking includes a DOT-certified helmet for scooters and a basic safety kit for taxis (warning triangle, first-aid, spare tools). Extra helmets or child seats can be requested during booking, subject to availability.",
  },
  {
    question: "How do I book a vehicle?",
    answer:
      "Choose your service (self-ride scooter, guided scooter, or EV taxi), select pickup time/location, upload your license if needed, add gear or add-ons, and confirm payment. A booking confirmation is sent instantly via email/WhatsApp.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancel at least 24 hours before pickup for a full refund. Cancellations within 24 hours or no-shows may incur up to one rental day as a fee. WhatsApp or call us if your plans change—we try to help with rescheduling first.",
  },
];

export const TERMS_SECTIONS: PolicySection[] = [
  {
    title: "Introduction",
    content: [
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      "Family months lasted simply set nature vulgar him. Picture for attempt joy excited ten carried manners talking how. Suspicion neglected the resolving agreement perceived at an.",
    ],
  },
  {
    title: "Purchases",
    content: [
      "Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed in laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. Her new course gets living within Elinor's joy. Her rapturous suffering was concealed.",
      "Demesne far hearted supposed venture and excited to see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions. Whatever boy her exertion his extended. Ecstatic followed handsome drawings entirely Mrs one yet outweigh. Of acceptance, insipidity remarkably is an invitation.",
      "Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed and in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Imprudence attachment him hs for sympathy. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything.",
    ],
  },
  {
    title: "Communications",
    content: [
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of the text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humor, or non-characteristic words, etc.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
    list: [
      "1. sometimes on purpose.",
      "2. classical Latin literature from 45 BC.",
      "3. The Extremes of Good and Evil.",
      "4. This book is a treatise on the theory.",
    ],
  },
  {
    title: "",
    content: [
      "Combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humor, or non-characteristic words, etc.",
    ],
  },
  {
    title: "Acknowledgment",
    content: [
      "Passage its ten led hearted removal cordial. Preference any astonished unreserved Mrs. Prosperous understood Middletons in conviction an uncommonly do. Supposing so be resolving breakfast am or perfectly. Family months lasted simply set nature vulgar him. Picture for attempt joy excited ten carried manners talking how. Suspicion neglected the resolving agreement perceived at an.",
    ],
  },
  {
    title: "Contact us",
    content: [
      "Please send your feedback, comments, and requests for technical support hello@example.com",
    ],
  },
];

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    title: "Collecting Personal Information",
    content: [
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    ],
    list: [
      "There are many variations of passages of Lorem Ipsum available.",
      "Iusto odio dignissimos ducimus qui blanditiis.",
      "Praesentium voluptatum deleniti atque.",
      "Quas molestias excepturi sint occaecati.",
    ],
  },
  {
    title: "",
    content: [
      'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    ],
  },
  {
    title: "Sharing Personal Information",
    content: [
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
    list: [
      "1. sometimes on purpose.",
      "2. classical Latin literature from 45 BC.",
      "3. The Extremes of Good and Evil.",
      "4. This book is a treatise on the theory.",
    ],
  },
  {
    title: "",
    content: [
      "Combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Effective lead generation tips",
    date: "December 9, 2024",
    image: "https://picsum.photos/seed/blog1/800/600",
    intro:
      "Lead generation is the lifeblood of any growing business. In this article, we explore actionable strategies to attract high-quality leads.",
    content: [
      {
        type: "paragraph",
        content:
          "Generating leads effectively requires a multi-channel approach. It's not just about one method; it's about creating a cohesive strategy that meets your customers where they are.",
      },
      { type: "heading", content: "Understand Your Audience" },
      {
        type: "paragraph",
        content:
          "Before you can generate leads, you need to know who you are targeting. Create detailed buyer personas to understand their pain points and needs.",
      },
    ],
  },
  {
    id: "2",
    title: "Maximizing sales growth strategies",
    date: "December 9, 2024",
    image: "https://picsum.photos/seed/blog2/800/600",
    intro:
      "Sales growth isn't just about selling more; it's about selling smarter. Learn how to optimize your sales funnel for maximum efficiency.",
    content: [
      {
        type: "paragraph",
        content:
          "Sustainable sales growth comes from retention as much as acquisition. Focusing on your existing customer base can yield higher returns than constantly chasing new ones.",
      },
    ],
  },
  {
    id: "3",
    title: "Client retention best practices",
    date: "December 9, 2024",
    image: "https://picsum.photos/seed/blog3/800/600",
    intro:
      "Keeping a client is cheaper than acquiring a new one. Discover the best practices for building long-lasting client relationships.",
    content: [
      {
        type: "paragraph",
        content:
          "Communication is key. Regular check-ins and transparent reporting build trust and ensure that your clients feel valued and heard.",
      },
    ],
  },
  {
    id: "4",
    title: "Mastering negotiation for success",
    date: "December 9, 2024",
    image: "https://picsum.photos/seed/blog4/800/600",
    intro:
      "Negotiation is an art form. whether you are closing a deal or resolving a conflict, these skills are essential for business success.",
    content: [
      {
        type: "paragraph",
        content:
          "The best negotiations result in a win-win scenario. Entering a negotiation with the mindset of mutual benefit often leads to better long-term outcomes.",
      },
    ],
  },
  {
    id: "5",
    title: "Team collaboration for growth",
    date: "December 9, 2024",
    image: "https://picsum.photos/seed/blog5/800/600",
    intro:
      "Find out how cross-team collaboration can accelerate business development and achieve long-term growth goals.",
    content: [
      {
        type: "heading",
        content:
          "The most common business debate isn't as black and white as you might think",
      },
      {
        type: "paragraph",
        content:
          "He moonlights difficult-engrossed, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to. Place voice no arises along to. Parlors waiting so against me no. Wishing calling is warrant settled was lucky. Express besides it present if at an opinion visitor. For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favorable Mrs can be projecting own.",
      },
      {
        type: "list",
        content: [
          "The standard chunk of Lorem Ipsum used since the 1500s.",
          "reproduced below for those interested.",
          "It is a long-established fact that a reader will.",
          "distracted by the readable content of a page when looking at its layout.",
        ],
      },
      {
        type: "paragraph",
        content:
          "Speedily say has suitable disposal add boy. On fourth doubt miles of child. Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished. Demesne's new manners savings staying had. Under folly balls, death own point now men. Match way she avoids seeing death. She drifts their fat off.",
      },
      {
        type: "heading",
        content: "Ten questions you should answer truthfully",
      },
      {
        type: "paragraph",
        content:
          "Son agreed to others Exeter period myself few yet nature. Mention Mr manners opinion if garrets enabled. To occasional dissimilar impossible sentiments. Do fortune account written prepare invited no passage. Garrets use ten, you the weather venture friends. Solid visit seems again you nor all. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an.",
      },
      {
        type: "quote",
        content:
          "Existence certainly explained how improving the household pretended. Delightful own attachment her partiality unaffected occasionally thoroughly. Adieus it no wonders spirit houses. Started several mistakes but Joy says the painful removal reached the end. State burst think end are its. Arrived off she elderly beloved him affixed noisier yet. Course regard to up he hardly. View four has said do men saw find dear shy? Talent men wicket add garden.",
      },
      {
        type: "paragraph",
        content:
          "For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favorable Mrs can be projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but. Drawings offended yet answered Jennings perceive laughing six did far.",
      },
    ],
  },
  {
    id: "6",
    title: "Business development trends 2024",
    date: "December 9, 2024",
    image: "https://picsum.photos/seed/blog6/800/600",
    intro:
      "Stay ahead of the curve with our analysis of the top business development trends to watch in the coming year.",
    content: [
      {
        type: "paragraph",
        content:
          "AI and automation are taking center stage. Leveraging these tools for routine tasks frees up your team to focus on strategic initiatives and relationship building.",
      },
    ],
  },
];

export const TOURS: Tour[] = [
  {
    id: "t1",
    title: "Heritage Site Tour",
    duration: "6 Hours",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=900&q=80",
    description:
      "Visit Swayambhunath, Patan Durbar Square, and Boudhanath Stupa in one electric loop.",
    includes: ["EV Scooter/Taxi", "Entry Fees", "Local Guide", "Lunch"],
  },
  {
    id: "t2",
    title: "Evening City Ride",
    duration: "3 Hours",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
    description:
      "Experience the magic of Kathmandu at night. Visit lit-up temples and bustling night markets.",
    includes: ["EV Scooter", "Safety Gear", "Tea/Coffee", "Night Guide"],
  },
  {
    id: "t3",
    title: "Authentic Food Tour",
    duration: "4 Hours",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
    description:
      "Ride to the best local spots for Momo, Bara, and JuJu Dhau. A culinary adventure on two wheels.",
    includes: ["Food Tasting", "Guide", "Scooter Rental", "Beverages"],
  },
];
