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
  { label: "Rentals", href: "/cars" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];



export const REVIEWS: Review[] = [
  {
    id: "1",
    text: "I needed a reliable car for my business trip, and this service exceeded my expectations. The booking process was seamless.",
    author: "Mark Stevens",
    avatar: "https://picsum.photos/seed/u1/100/100",
  },
  {
    id: "2",
    text: "As a frequent traveler for work, I rely on car rental services often. This company has become my go-to choice because of their reliable vehicles.",
    author: "Lisa Anderson",
    avatar: "https://picsum.photos/seed/u2/100/100",
  },
  {
    id: "3",
    text: "It was fuel-efficient and environmentally friendly, which is important to me. I loved that this company offers sustainable options.",
    author: "Brian T",
    avatar: "https://picsum.photos/seed/u3/100/100",
  },
  {
    id: "4",
    text: "I needed a rental for a last-minute trip, and this service made it so easy! The car was clean, the rates were affordable.",
    author: "Emma Johnson",
    avatar: "https://picsum.photos/seed/u4/100/100",
  },
  {
    id: "5",
    text: "There is plenty of room for everyone and all our luggage. The process was easy, and the customer service was top-notch.",
    author: "Jessica Ramirez",
    avatar: "https://picsum.photos/seed/u5/100/100",
  },
  {
    id: "6",
    text: "The rates were competitive, and the team made it easy to extend my rental when my plans changed. Highly recommended!",
    author: "Laura J.",
    avatar: "https://picsum.photos/seed/u6/100/100",
  },
  {
    id: "7",
    text: "I frequently travel for work and have used many rental services, but this one stands out. Fast booking, great vehicles.",
    author: "Daniel Lee",
    avatar: "https://picsum.photos/seed/u7/100/100",
  },
  {
    id: "8",
    text: "The vehicle was in great condition, and the 24/7 support was a huge plus. I felt confident the entire trip.",
    author: "Kevin Thompson",
    avatar: "https://picsum.photos/seed/u8/100/100",
  },
  {
    id: "9",
    text: "The car was delivered quickly, and everything was handled professionally. A true lifesaver in a stressful moment.",
    author: "Chris P",
    avatar: "https://picsum.photos/seed/u9/100/100",
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
  { value: "1,000+", label: "Electric rides completed in Kathmandu" },
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
    title: "1. Introduction",
    content: [
      "Welcome to Bato Ma. These Terms & Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. Bato Ma is a trustable and affordable rental service provider for two and four-wheeler EVs in Kathmandu, Nepal, offering EV scooters, taxis, and customized tour packages.",
      "Please read these terms carefully before booking any service. If you do not agree with any part of these terms, you must not use our services.",
    ],
  },
  {
    title: "2. Services Offered",
    content: [
      "Bato Ma provides the following services:",
      "• EV Scooter Rentals: Short-term and long-term rentals for personal use.",
      "• EV Taxi Services: On-demand and pre-booked rides within Kathmandu Valley.",
      "• Tour Packages: Customized guided tours using our electric fleet.",
    ],
    list: [
      "All rentals are subject to vehicle availability.",
      "We reserve the right to refuse service to anyone for any reason at any time.",
    ],
  },
  {
    title: "3. User Responsibilities",
    content: [
      "By renting a vehicle or booking a tour, you agree to:",
      "• Possess a valid driver's license appropriate for the vehicle type (two-wheeler or four-wheeler).",
      "• Provide accurate personal and contact information.",
      "• Use the vehicle responsibly and in accordance with local traffic laws.",
      "• Not use the vehicle for illegal purposes, racing, or off-road driving unless authorized.",
      "• Return the vehicle in the same condition as received, normal wear and tear excepted.",
    ],
  },
  {
    title: "4. Payments and Cancellations",
    content: [
      "Prices are listed in the booking section and may change without notice. Full payment or a security deposit may be required before rental.",
    ],
    list: [
      "Cancellations made 24 hours prior to the booking time are eligible for a full refund.",
      "Cancellations made within 24 hours may incur a cancellation fee.",
      "Security deposits will be refunded upon safe return of the vehicle.",
    ],
  },
  {
    title: "5. Liability and Insurance",
    content: [
      "Bato Ma maintains insurance for its fleet as required by Nepalese law. However, the renter is responsible for any damage caused due to negligence or violation of terms.",
      "Bato Ma is not liable for personal injuries or loss of personal belongings during the rental period or tour.",
    ],
  },
  {
    title: "6. Contact Us",
    content: [
      "If you have any questions about these Terms, please contact us at bato1111ma@gmail.com or visit our office in Kathmandu.",
    ],
  },
];

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    title: "1. Information We Collect",
    content: [
      "At Bato Ma, we prioritize your privacy. We collect information necessary to provide our rental and tour services, including:",
    ],
    list: [
      "Personal identification (Name, Address, Phone Number, Email).",
      "Driver's License and Government ID details for verification.",
      "Payment information for processing bookings.",
      "Location data during the use of our EV fleet for safety and tracking.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use your data to:",
      "• Process your bookings and payments.",
      "• Verify your identity and driving eligibility.",
      "• Communicate with you regarding your rental or tour.",
      "• Improve our fleet management and service quality.",
      "• Comply with local legal requirements.",
    ],
  },
  {
    title: "3. Data Protection",
    content: [
      "We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure. Your payment data is processed securely through standard encryption protocols.",
    ],
  },
  {
    title: "4. Sharing of Information",
    content: [
      "We do not sell your personal data. We may share information with:",
      "• Third-party service providers (e.g., payment processors).",
      "• Law enforcement agencies if required by law or in case of traffic violations/accidents.",
    ],
  },
  {
    title: "5. Contact Us",
    content: [
      "If you have questions about our Privacy Policy, please contact us at bato1111ma@gmail.com.",
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
