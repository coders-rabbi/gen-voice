import React from 'react';

export default function RepoterSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-12 animate-pulse">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* 1. Cover Photo Skeleton */}
        <div className="w-full h-48 sm:h-64 md:h-72 bg-gray-200 rounded-2xl mb-6 shadow-sm"></div>

        {/* 2. Profile Info Section Skeleton */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-2xl flex-shrink-0"></div>
            <div className="space-y-2">
              <div className="w-36 h-6 bg-gray-200 rounded-md"></div>
              <div className="w-24 h-4 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          {/* Stats & Action Buttons */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 w-full md:w-auto justify-between md:justify-end">
            <div className="hidden lg:flex items-center gap-6 text-sm">
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <div className="w-24 h-10 bg-gray-200 rounded-xl"></div>
              <div className="w-28 h-10 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* 3. Main Content Grid (Chart + Satisfaction) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Post Analysis Chart Skeleton (Takes 2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 bg-gray-300 rounded-full"></div>
              <div className="w-32 h-5 bg-gray-200 rounded"></div>
            </div>
            
            {/* Chart Area Box */}
            <div className="w-full h-72 sm:h-80 bg-gray-100 rounded-xl flex items-end justify-between p-6">
              {/* Fake wave/bar elements inside chart */}
              <div className="w-full h-full bg-gray-200/60 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Right: Satisfaction of Posts Skeleton (Takes 1 column) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 bg-gray-300 rounded-full"></div>
              <div className="w-40 h-5 bg-gray-200 rounded"></div>
            </div>

            {/* Grid of Small Cards */}
            <div className="grid grid-cols-3 gap-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-3 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-10 h-3 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. My Posts Section Skeleton */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-28 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-0.5 bg-gray-100 mb-6"></div>
          
          {/* Post item placeholders */}
          <div className="space-y-4">
            <div className="w-full h-24 bg-gray-100 rounded-xl"></div>
            <div className="w-full h-24 bg-gray-100 rounded-xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}