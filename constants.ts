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
} from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const CARS: Car[] = [
  {
    id: "1",
    name: "Compact city cruiser",
    type: "Compact",
    brand: "Fiat",
    year: 2022,
    fuel: "Petrol",
    price: 150,
    image: "https://picsum.photos/seed/car1/600/350",
    seats: 4,
    transmission: "Manual",
    luggage: 2,
    description:
      "Perfect for navigating tight city streets with ease and style. This compact cruiser offers great mileage and easy parking.",
    features: ["Bluetooth", "A/C", "Power steering", "ABS", "Air bags"],
    gallery: [
      "https://picsum.photos/seed/car1g1/600/400",
      "https://picsum.photos/seed/car1g2/600/400",
      "https://picsum.photos/seed/car1g3/600/400",
    ],
    category: "Family",
  },
  {
    id: "2",
    name: "Spacious SUV",
    type: "Suv car",
    brand: "Toyota",
    year: 2020,
    fuel: "CNG",
    price: 195,
    image: "https://picsum.photos/seed/car2/800/500",
    seats: 7,
    transmission: "Automatic",
    luggage: 4,
    description:
      "Whether you're on a business trip or a family getaway, this mid-size sedan offers spacious interiors, advanced safety features, and excellent fuel efficiency. Drive confidently with a car that delivers smooth handling, modern tech.",
    features: [
      "Bluetooth",
      "Wireless charging",
      "Cruise control",
      "ABS",
      "A/C",
      "Built-in GPS",
      "Parking sensors",
      "HD audio system",
      "Air bags",
      "Power steering",
    ],
    gallery: [
      "https://picsum.photos/seed/suvinterior/800/500",
      "https://picsum.photos/seed/suvdash/800/500",
      "https://picsum.photos/seed/suvexterior/800/500",
    ],
    category: "Family",
  },
  {
    id: "3",
    name: "Luxury Sedan",
    type: "Sedan",
    brand: "Audi",
    year: 2023,
    fuel: "Diesel",
    price: 175,
    image: "https://picsum.photos/seed/car3/600/350",
    seats: 5,
    transmission: "Automatic",
    luggage: 3,
    description:
      "Experience premium comfort and performance. Ideally suited for business travel or special occasions where style matters.",
    features: [
      "Bluetooth",
      "Leather seats",
      "Cruise control",
      "GPS",
      "Climate control",
    ],
    gallery: [
      "https://picsum.photos/seed/car3g1/600/400",
      "https://picsum.photos/seed/car3g2/600/400",
    ],
    category: "Business",
  },
  {
    id: "4",
    name: "Mercedes-Benz S-Class",
    type: "Sedan",
    brand: "Mercedes",
    year: 2023,
    fuel: "Hybrid",
    price: 250,
    image: "https://picsum.photos/seed/car4/600/350",
    seats: 5,
    transmission: "Automatic",
    luggage: 3,
    description:
      "The epitome of luxury and status. This vehicle offers a smooth ride with top-tier technology and comfort features.",
    features: [
      "Massage seats",
      "Rear entertainment",
      "Ambient lighting",
      "Burmester Sound",
    ],
    category: "Business",
  },
  {
    id: "5",
    name: "Range Rover Sport",
    type: "SUV",
    brand: "Land Rover",
    year: 2022,
    fuel: "Diesel",
    price: 220,
    image: "https://picsum.photos/seed/car5/600/350",
    seats: 5,
    transmission: "Automatic",
    luggage: 5,
    description:
      "Go anywhere in style. The Range Rover Sport combines off-road capability with on-road luxury.",
    features: ["4WD", "Panoramic roof", "Air suspension", "Terrain response"],
    category: "Adventure",
  },
  {
    id: "6",
    name: "Vintage Convertible",
    type: "Convertible",
    brand: "Rolls Royce",
    year: 1975,
    fuel: "Petrol",
    price: 400,
    image: "https://picsum.photos/seed/car6/600/350",
    seats: 4,
    transmission: "Automatic",
    luggage: 2,
    description:
      "Make your special day unforgettable with this classic beauty. Perfect for weddings and photo shoots.",
    features: ["Classic leather", "Soft top", "Chauffeur available"],
    category: "Wedding",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Business",
    image: "https://picsum.photos/seed/business/300/300",
  },
  {
    id: "2",
    name: "Family",
    image: "https://picsum.photos/seed/family/300/300",
  },
  {
    id: "3",
    name: "Adventure",
    image: "https://picsum.photos/seed/adventure/300/300",
  },
  {
    id: "4",
    name: "Wedding",
    image: "https://picsum.photos/seed/wedding/300/300",
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
    name: "Emily Johnson",
    role: "Customer Service Manager",
    image: "https://picsum.photos/seed/emily/200/200",
  },
  {
    id: "2",
    name: "Michael Smith",
    role: "Fleet Operations Supervisor",
    image: "https://picsum.photos/seed/michael/200/200",
  },
  {
    id: "3",
    name: "Sarah Davis",
    role: "Marketing Director",
    image: "https://picsum.photos/seed/sarah/200/200",
  },
  {
    id: "4",
    name: "David Lee",
    role: "Business Development Manager",
    image: "https://picsum.photos/seed/david/200/200",
  },
];

export const COMPANY_VALUES: ValueItem[] = [
  {
    title: "Customer Focus",
    description:
      "We put our customers at the heart of everything we do. Your satisfaction is our top priority, and we strive to exceed your expectations with every rental experience.",
  },
  {
    title: "Integrity",
    description:
      "Honesty and transparency are the cornerstones of our business. We believe in building trust through clear communication and fair pricing without hidden fees.",
  },
  {
    title: "Reliability",
    description:
      "Our customers rely on us for safe and dependable transportation. We maintain our vehicles to the highest standards to ensure you have a worry-free driving experience.",
  },
  {
    title: "Innovation",
    description:
      "We embrace new technologies and ideas to enhance our services. From easy online booking to vehicle tracking, we are always looking for ways to improve.",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to reducing our environmental impact. Our fleet includes eco-friendly vehicles, and we promote responsible driving practices to protect our planet.",
  },
];

export const ABOUT_STATS: Stat[] = [
  { value: "15+", label: "Happy customers who have trusted us" },
  { value: "99%", label: "Our customers agree with our offer value" },
  { value: "5,000+", label: "Trusted by thousands of satisfied clients" },
  { value: "24/7", label: "Our dedicated support team is available" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What documents are required to rent a car?",
    answer:
      "You'll need a valid driver's license, a government-issued ID, and a credit or debit card. Some rentals may require additional documents based on location or vehicle type.",
  },
  {
    question: "How do I book a car rental?",
    answer:
      "You can book directly through our website by selecting your vehicle and dates. Alternatively, you can call our support hotline for assistance with your reservation.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We do not offer free trials for car rentals. However, we have flexible rental periods starting from just one day, so you can try out our service with minimal commitment.",
  },
  {
    question: "Can someone else drive the rental car?",
    answer:
      "Yes, additional drivers can be added to the rental agreement. They must meet the same age and licensing requirements as the primary renter and be present at pick-up.",
  },
  {
    question:
      "Can I take the rental car across state or international borders?",
    answer:
      "Cross-border travel depends on the specific vehicle and policy. Please check the terms for your specific booking or contact our support team for authorization.",
  },
  {
    question: "What happens if I return the car late?",
    answer:
      "Returning the car late may incur additional charges. We typically offer a grace period of 29 minutes, after which hourly or daily rates may apply.",
  },
  {
    question: "What is the minimum age to rent a car?",
    answer:
      "The minimum age is generally 21 years old. Drivers under 25 may be subject to a young driver surcharge. Luxury vehicles may have higher age requirements.",
  },
  {
    question: "Are there any discounts available?",
    answer:
      "Yes, we offer discounts for long-term rentals, early bookings, and corporate clients. Check our website periodically for seasonal promotions.",
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
