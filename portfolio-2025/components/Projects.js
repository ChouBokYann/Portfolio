"use client";

import React from "react";
import Image from "next/image";

const projectImage = "/images/project-image.jpg"; // You'll need to add your project image

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#454545] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Rectangle Container */}
        <div className="bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden min-h-[800px]">
          <div className="flex flex-col lg:flex-row h-full">
            
            {/* Left Section - Image */}
            <div className="lg:w-1/3 bg-gray-200 p-8 flex items-center justify-center h-full">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={projectImage} 
                  alt="Project" 
                  width={500} 
                  height={400}
                  className="w-full h-auto max-w-md rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Right Section - Text Content */}
            <div className="lg:w-2/3 p-8 flex flex-col justify-center h-full">
              {/* Header */}
              <h2 className="text-3xl lg:text-4xl font-bold text-[#454545] font-headers text-center mb-6">
                PROJECTS
              </h2>
              
              {/* Orange Design Line */}
              <div className="w-32 h-1 bg-[#FF6000] mx-auto mb-8"></div>
              
              {/* Body Text */}
              <div className="text-[#454545] font-body leading-relaxed flex-1">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="mb-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-4">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p className="mb-4">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </p>
                <p>
                  Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
