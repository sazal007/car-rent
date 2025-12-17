"use client";

import React from "react";
import Image from "next/image";
import { useGetTeam } from "@/hooks/use-team";

export const AboutTeam: React.FC = () => {
  const { data: teamMembers, isLoading, isError } = useGetTeam();

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-semibold text-center text-carent-text mb-16">
            Our team
          </h2>
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500 text-lg">Loading team members...</div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !teamMembers || teamMembers.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-semibold text-center text-carent-text mb-16">
            Our team
          </h2>
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500 text-lg">
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-semibold text-center text-carent-text mb-16">
          Our team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {sortedMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-100 relative">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-carent-text mb-2">
                {member.name}
              </h3>
              <p className="text-gray-500 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
