import { PRIVACY_SECTIONS } from "@/constants";

export default function Privacy() {
  return (
    <div className="bg-white min-h-screen pt-56 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-semibold text-carent-text mb-4">
            Privacy Policy
          </h1>

          <div className="space-y-12 mt-12">
            {PRIVACY_SECTIONS.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h2 className="text-3xl font-semibold text-carent-text mb-6">
                    {section.title}
                  </h2>
                )}
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
                {section.list && (
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 text-lg">
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
