import { getAllWorkoutsData } from "@/utils/api";
import WorkoutCard from "./WorkoutCard";
import { IWorkout } from "@/types";

const LibrarySection = async () => {
  const libraryData = await getAllWorkoutsData();

  const workouts: IWorkout[] = libraryData;

  return (
    <section id="library" className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">THE LIBRARY</h2>
        <p className="text-gray-400 mt-2">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout: IWorkout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default LibrarySection;
