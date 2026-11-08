"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

const MyPlan = () => {
  const { plan, saved, metrics, markAsDone, removeFromPlan, removeFromSaved } =
    usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // Select workouts according to active tab
  const currentList = activeTab === "plan" ? plan : saved;

  // Sort workouts
  const sortedWorkouts = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <section className="container mx-auto px-4 py-8 md:py-10">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold">MY PLAN</h1>

        <p className="text-gray-500 text-xs mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Card */}
      <div className="grid grid-cols-3 mt-6 bg-[#15171D] border border-[#252830] rounded-lg py-4">
        <div className="px-4 border-r border-[#252830]">
          <p className="text-gray-500 text-[10px]">Exercises</p>
          <h2 className="text-xl font-bold text-[#C2F800] mt-1">
            {metrics.totalExercises}
          </h2>
        </div>

        <div className="px-4 border-r border-[#252830]">
          <p className="text-gray-500 text-[10px]">Minutes</p>
          <h2 className="text-xl font-bold mt-1">{metrics.totalMinutes}</h2>
        </div>

        <div className="px-4">
          <p className="text-gray-500 text-[10px]">Calories</p>
          <h2 className="text-xl font-bold mt-1">{metrics.totalCalories}</h2>
        </div>
      </div>

      {/* Tabs and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-6">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#15171D] border border-[#252830] rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab("plan")}
            className={`text-[11px] px-3 py-2 rounded-md transition ${
              activeTab === "plan"
                ? "bg-[#252830] text-white font-semibold"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`text-[11px] px-3 py-2 rounded-md transition ${
              activeTab === "saved"
                ? "bg-[#252830] text-white font-semibold"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-[10px] text-gray-500">
            Sort By:
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#15171D] border border-[#252830] rounded-md text-xs text-white px-2 py-2 outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Workout List */}
      <div className="mt-5 space-y-3">
        {sortedWorkouts.length === 0 ? (
          /* Empty State */
          <div className="bg-[#15171D] border border-[#252830] rounded-lg text-center py-12 px-4">
            <h2 className="text-xl font-bold mb-2">NOTHING HERE YET</h2>

            <p className="text-gray-500 text-sm mb-5">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save a workout from the library to find it here later."}
            </p>

            <Link
              href="/"
              className="btn btn-sm bg-[#C2F800] hover:bg-[#b4e600] text-black border-none"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards */
          sortedWorkouts.map((workout) => {
            // Check workout completion status
            const isDone = "isDone" in workout ? workout.isDone : false;

            return (
              <div
                key={workout.id}
                className="bg-[#15171D] border border-[#252830] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                {/* Workout Image */}
                <div className="relative w-full sm:w-[120px] h-[100px] sm:h-[68px] shrink-0">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 120px"
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Workout Information */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold">{workout.name}</h2>

                  <p className="text-gray-500 text-[10px] mt-1">
                    {workout.muscleGroups.join(", ")}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 mt-2">
                    <span>◷ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>★ {workout.rating}</span>
                  </div>

                  {/* Completed Status */}
                  {isDone && (
                    <p className="text-[#C2F800] text-[10px] mt-1 font-semibold">
                      ✓ COMPLETED
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:ml-auto">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="text-[10px] border border-[#2D313B] rounded-full px-3 py-2 text-white hover:bg-[#252830] whitespace-nowrap"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done - Only Today's Plan */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      disabled={isDone}
                      className="text-[10px] bg-[#C2F800] hover:bg-[#b4e600] text-black font-semibold rounded-full px-3 py-2 whitespace-nowrap disabled:opacity-50"
                    >
                      {isDone ? "Completed" : "✓ Mark as Done"}
                    </button>
                  )}

                  {/* Remove Workout */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    aria-label={`Remove ${workout.name}`}
                    className="text-gray-500 hover:text-red-400 px-1 text-sm"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default MyPlan;
