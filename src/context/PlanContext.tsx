"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IWorkout, PlanWorkout } from "@/types";
import toast from "react-hot-toast";

// Context এর Type
interface IPlanContext {
  plan: PlanWorkout[];
  saved: IWorkout[];

  setPlan: React.Dispatch<React.SetStateAction<PlanWorkout[]>>;
  setSaved: React.Dispatch<React.SetStateAction<IWorkout[]>>;

  addToPlan: (workout: IWorkout) => void;
  addToSaved: (workout: IWorkout) => void;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  metrics: {
    totalExercises: number;
    totalMinutes: number;
    totalCalories: number;
  };
}

// Create Context
const PlanContext = createContext<IPlanContext | null>(null);

// Custom Hook
export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};

// Plan Provider
const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }

    setIsLoaded(true);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [plan, saved, isLoaded]);

  // Add workout to today's plan
  const addToPlan = (workout: IWorkout) => {
    const alreadyAdded = plan.find((item) => item.id === workout.id);

    if (alreadyAdded) {
      toast.error("Workout already added!");
      return;
    }

    if (plan.length >= 5) {
      toast.error("You can add maximum 5 workouts!");
      return;
    }

    const newWorkout = {
      ...workout,
      isDone: false,
    };

    setPlan([...plan, newWorkout]);
    toast.success("Workout added to your plan!");
  };

  // Add workout to saved list
  const addToSaved = (workout: IWorkout) => {
    const alreadySaved = saved.find((item) => item.id === workout.id);

    if (alreadySaved) {
      toast.error("Workout already saved!");
      return;
    }

    setSaved([...saved, workout]);
    toast.success("Workout saved for later!");
  };

  // Remove workout from plan
  const removeFromPlan = (id: number) => {
    const updatedPlan = plan.filter((item) => item.id !== id);

    setPlan(updatedPlan);
    toast.success("Workout removed from your plan!");
  };

  // Remove workout from saved
  const removeFromSaved = (id: number) => {
    const updatedSaved = saved.filter((item) => item.id !== id);

    setSaved(updatedSaved);
    toast.success("Workout removed from Saved!");
  };

  // Mark workout as completed
  const markAsDone = (id: number) => {
    const updatedPlan = plan.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: true };
      }

      return item;
    });

    setPlan(updatedPlan);
    toast.success("Workout marked as done!");
  };

  // Calculate workout information
  let totalExercises = plan.length;
  let totalMinutes = 0;
  let totalCalories = 0;

  plan.forEach((item) => {
    totalMinutes += item.duration;
    totalCalories += item.caloriesBurned;
  });

  const metrics = {
    totalExercises,
    totalMinutes,
    totalCalories,
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        setPlan,
        setSaved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        metrics,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
