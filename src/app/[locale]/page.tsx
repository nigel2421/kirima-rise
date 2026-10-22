'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import BecomingSection from '@/components/home/BecomingSection';
import VideoUpdates from '@/components/home/VideoUpdates';

export default function HomePage() {
  return (
    <div className="home-page-content">
      {/* 1. Official Hero Section */}
      <HeroSection />

      {/* 2. What Kirima Rise Is Becoming */}
      <BecomingSection />

      {/* 3. Official Video Updates & Community Engagement */}
      <VideoUpdates />
    </div>
  );
}
