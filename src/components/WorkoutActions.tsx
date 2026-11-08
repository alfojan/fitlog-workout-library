"use client";

import { usePlan } from "@/context/PlanContext";
import type { IWorkout } from "@/types";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() => addToPlan(workout)}
        className="btn bg-[#C2F800] hover:bg-[#b4e600] text-black border-none font-semibold"
      >
        Add to Today's Plan
      </button>

      <button
        onClick={() => addToSaved(workout)}
        className="btn bg-transparent border border-[#2D313B] text-white hover:bg-[#252830]"
      >
        Save for Later
      </button>
    </div>
  );
};

export default WorkoutActions;
