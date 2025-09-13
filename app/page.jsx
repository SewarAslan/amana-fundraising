"use client";
import React, { useState } from "react";

// --- DATA ---
// In a real application, this data would come from an API.
// For this prototype, we'll include it directly.
const fundraisingData = {
  message: "Amana Fundraising causes data retrieved successfully",
  company_info: {
    name: "Amana Fundraising",
    founded: "2020",
    headquarters: "Amman, Jordan",
    industry: "Non-Profit Fundraising",
    description:
      "Leading fundraising platform connecting donors with impactful causes across the Middle East, specializing in education, agriculture, and small business initiatives that create lasting change in communities.",
  },
  fundraising_stats: {
    total_causes: 8,
    active_causes: 7,
    total_raised: 706640,
    total_goal: 970000,
    average_completion_rate: 74,
    top_category: "Education",
    total_donors: 359,
    average_donation: 1923,
  },
  causes: [
    {
      id: 1,
      title: "Digital Classroom Initiative for Gaza Schools",
      category: "Education",
      status: "Active",
      urgency_level: "High",
      short_description:
        "Providing laptops, tablets, and internet connectivity to 500 students in Gaza to ensure continuity of education despite ongoing challenges.",
      detailed_description:
        "The Digital Classroom Initiative aims to bridge the digital divide for Palestinian students in Gaza by providing essential technology and internet access. With over 70% of schools lacking adequate digital infrastructure, students are falling behind in essential 21st-century skills. This initiative will provide 300 laptops, 200 tablets, portable internet hotspots, and teacher training programs to serve 500 students across 10 schools in Gaza. The project includes a sustainability component with local technical support and maintenance training to ensure long-term success.",
      image_url: "https://placehold.co/600x400/3498db/ffffff?text=Education",
      location: {
        city: "Gaza",
        country: "Palestine",
      },
      metrics: {
        goal_amount: 75000,
        raised_amount: 52340,
        percentage_funded: 70,
        donor_count: 37,
        days_remaining: 32,
      },
      donors: [
        { id: 33, name: "Anonymous Donor", amount: 2403, date: "2025-09-12" },
        { id: 27, name: "Layla Hijazi", amount: 241, date: "2025-09-11" },
      ],
      updates: [
        {
          date: "2024-12-20",
          title: "70% Funding Milestone Reached!",
          description:
            "We're thrilled to announce we've reached 70% of our funding goal! The first batch of 150 laptops has been ordered and will arrive next month.",
        },
        {
          date: "2024-12-01",
          title: "Partnership with Local Tech Company",
          description:
            "We've partnered with Gaza Tech Solutions to provide ongoing technical support and maintenance for all devices.",
        },
      ],
    },
    {
      id: 2,
      title: "Vocational Training Center for Jordanian Youth",
      category: "Education",
      status: "Active",
      urgency_level: "Medium",
      short_description:
        "Establishing a modern vocational training center in Zarqa to provide technical skills training for 200 unemployed youth aged 18-25.",
      detailed_description:
        "Jordan faces a youth unemployment rate of over 50%, with many young people lacking the technical skills needed for available jobs. This project will establish a comprehensive vocational training center offering courses in electrical work, plumbing, automotive repair, carpentry, and computer skills. The center will include modern equipment, certified instructors, and job placement assistance. We aim to train 200 youth annually with a focus on hands-on learning and industry partnerships to ensure graduates find meaningful employment.",
      image_url: "https://placehold.co/600x400/2ecc71/ffffff?text=Youth+Skills",
      location: {
        city: "Zarqa",
        country: "Jordan",
      },
      metrics: {
        goal_amount: 120000,
        raised_amount: 89500,
        percentage_funded: 75,
        donor_count: 50,
        days_remaining: 49,
      },
      donors: [
        {
          id: 10,
          name: "Middle East Development Bank",
          amount: 4541,
          date: "2025-09-12",
        },
        { id: 20, name: "Anonymous Donor", amount: 72, date: "2025-09-12" },
      ],
      updates: [
        {
          date: "2024-12-18",
          title: "Construction of Main Hall Complete",
          description:
            "The main training hall has been constructed, and we are now moving to install the necessary equipment.",
        },
      ],
    },
  ],
};

// --- HELPER FUNCTIONS & COMPONENTS ---

// A simple component for displaying a progress bar
const ProgressBar = ({ percentage }) => {
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-teal-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// A card component to display summary information for each cause
const CauseCard = ({ cause, onSelectCause }) => {
  const { title, category, short_description, image_url, metrics, location } =
    cause;
  const { raised_amount, goal_amount, donor_count, percentage_funded } =
    metrics;

  return (
    <div
      className="border rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
      onClick={() => onSelectCause(cause)}
    >
      <img src={image_url} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <span className="text-sm text-teal-700 font-semibold bg-teal-100 px-2 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-xl font-bold mt-3 mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{short_description}</p>

        <ProgressBar percentage={percentage_funded} />

        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <div>
            <span className="font-bold text-teal-600">
              ${raised_amount.toLocaleString()}
            </span>{" "}
            raised
          </div>
          <div>
            <span className="font-bold">${goal_amount.toLocaleString()}</span>{" "}
            goal
          </div>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          <span className="font-bold">{donor_count}</span> Donors from{" "}
          {location.city}, {location.country}
        </div>
      </div>
    </div>
  );
};

// The view for the homepage, displaying all causes
const HomePage = ({ causes, onSelectCause }) => {
  const stats = fundraisingData.fundraising_stats;

  return (
    <div>
      <header className="bg-white shadow-md p-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-teal-700">
            {fundraisingData.company_info.name}
          </h1>
          <p className="text-gray-600 mt-1">
            {fundraisingData.company_info.description}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-teal-800">
              ${stats.total_raised.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Raised</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-800">
              {stats.active_causes}
            </p>
            <p className="text-sm text-gray-600">Active Causes</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-800">
              {stats.total_donors}
            </p>
            <p className="text-sm text-gray-600">Total Donors</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-800">
              {stats.average_completion_rate}%
            </p>
            <p className="text-sm text-gray-600">Avg. Completion</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Causes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause) => (
            <CauseCard
              key={cause.id}
              cause={cause}
              onSelectCause={onSelectCause}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

// The detailed view for a single cause
const CauseDetailPage = ({ cause, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
      >
        &larr; Back to All Causes
      </button>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <img
          src={cause.image_url}
          alt={cause.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          <span className="text-sm text-teal-700 font-semibold bg-teal-100 px-3 py-1 rounded-full">
            {cause.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">
            {cause.title}
          </h1>
          <p className="text-gray-500 mb-6">
            {cause.location.city}, {cause.location.country}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Funding Progress
            </h3>
            <ProgressBar percentage={cause.metrics.percentage_funded} />
            <div className="flex justify-between items-center mt-3 text-lg">
              <div className="text-teal-600 font-bold">
                ${cause.metrics.raised_amount.toLocaleString()}{" "}
                <span className="text-sm font-normal text-gray-600">
                  raised
                </span>
              </div>
              <div className="text-gray-700 font-bold">
                ${cause.metrics.goal_amount.toLocaleString()}{" "}
                <span className="text-sm font-normal text-gray-600">goal</span>
              </div>
            </div>
            <div className="text-center mt-4 text-gray-600">
              <span className="font-bold">{cause.metrics.donor_count}</span>{" "}
              donors &bull;{" "}
              <span className="font-bold">{cause.metrics.days_remaining}</span>{" "}
              days left
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-semibold text-gray-700">
              About this cause
            </h3>
            <p>{cause.detailed_description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Recent Updates
            </h3>
            {cause.updates.map((update, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-800">{update.title}</p>
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(update.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">{update.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Recent Donors
            </h3>
            <ul className="space-y-3">
              {cause.donors.map((donor) => (
                <li
                  key={donor.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{donor.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(donor.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-bold text-green-600">
                    ${donor.amount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
// This is the root component of our application.
// It manages the state to decide which view to show.
export default function App() {
  // `useState` is a React Hook. It lets us add a "state variable" to our component.
  // `selectedCause` will hold the cause object when a user clicks on one, or `null` otherwise.
  // `setSelectedCause` is the function we use to update this state.
  const [selectedCause, setSelectedCause] = useState(null);

  // This function is passed down to the `CauseCard` components.
  // When a card is clicked, it calls this function with the cause data.
  const handleSelectCause = (cause) => {
    setSelectedCause(cause);
    window.scrollTo(0, 0); // Scroll to top on view change
  };

  // This function is passed to the `CauseDetailPage`.
  // It resets the state to `null`, taking the user back to the homepage.
  const handleBack = () => {
    setSelectedCause(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* This is conditional rendering.
          If `selectedCause` has a value (is "truthy"), we show the detail page.
          Otherwise, we show the homepage. */}
      {selectedCause ? (
        <CauseDetailPage cause={selectedCause} onBack={handleBack} />
      ) : (
        <HomePage
          causes={fundraisingData.causes}
          onSelectCause={handleSelectCause}
        />
      )}

      <footer className="text-center py-6 mt-10 bg-white border-t">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} {fundraisingData.company_info.name}.
          All Rights Reserved.
        </p>
        <p className="text-sm text-gray-500">
          {fundraisingData.company_info.headquarters}
        </p>
      </footer>
    </div>
  );
}
