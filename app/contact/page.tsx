import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactMap } from "@/components/contact/ContactMap";

export default function Contact() {
  return (
    <div className="bg-white pt-24 sm:pt-32 md:pt-40 lg:pt-56">
      <ContactHero />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 pb-12 sm:pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
        <ContactMap />
      </div>
    </div>
  );
}
