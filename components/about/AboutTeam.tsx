"use client";

import React from "react";
import Image from "next/image";
import { useGetTeam } from "@/hooks/use-team";

export const AboutTeam: React.FC = () => {
  const { data: teamMembers, isLoading, isError } = useGetTeam();

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-carent-text mb-10 sm:mb-12 md:mb-16">
            Our team
          </h2>
          <div className="flex justify-center items-center py-8 sm:py-10">
            <div className="text-gray-500 text-sm sm:text-base md:text-lg">Loading team members...</div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !teamMembers || teamMembers.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-carent-text mb-10 sm:mb-12 md:mb-16">
            Our team
          </h2>
          <div className="flex justify-center items-center py-8 sm:py-10">
            <div className="text-gray-500 text-sm sm:text-base md:text-lg">
              No team members available.
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Sort by order if available
  const sortedMembers = [...teamMembers].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-carent-text mb-8 sm:mb-12 md:mb-16">
          Our team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {sortedMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 sm:mb-5 md:mb-6 border-2 sm:border-2 md:border-4 border-gray-100 relative">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-carent-text mb-1 sm:mb-2">
                {member.name}
              </h3>
              <p className="text-gray-500 font-medium text-sm sm:text-base">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
