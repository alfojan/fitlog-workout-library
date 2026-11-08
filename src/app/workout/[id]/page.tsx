import { getSingleWorkoutData } from "@/utils/api";
import Image from "next/image";
import WorkoutActions from "@/components/WorkoutActions";

interface IWorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}
const WorkoutDetailsPage = async ({ params }: IWorkoutDetailsPageProps) => {
  const { id } = await params;
  const data = await getSingleWorkoutData(id);
  const workout = data;
  console.log(workout);
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#0c0d10]">
        {/* Workout Image */}
        <div className="relative w-full h-[775px] md:h-[450px] lg:h-[600px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover rounded-xl"
          />
        </div>

        {/* Workout Information */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{workout.name}</h1>

          <p className="text-sm text-gray-400 mb-4">{workout.description}</p>

          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-2 mb-5">
            {workout.muscleGroups.map((group: string) => (
              <span
                key={group}
                className="bg-[#C2F800] text-black text-xs font-semibold px-3 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Specifications */}
          <div className="bg-[#15171D] border border-gray-800 rounded-xl divide-y divide-gray-800">
            <div className="flex justify-between p-3 text-sm">
              <span className="text-gray-400">EQUIPMENT</span>
              <span>{workout.equipment}</span>
            </div>

            <div className="flex justify-between p-3 text-sm">
              <span className="text-gray-400">DIFFICULTY</span>
              <span>{workout.difficulty}</span>
            </div>

            <div className="flex justify-between p-3 text-sm">
              <span className="text-gray-400">SETS</span>
              <span>{workout.sets}</span>
            </div>

            <div className="flex justify-between p-3 text-sm">
              <span className="text-gray-400">REPS</span>
              <span>{workout.reps}</span>
            </div>

            <div className="flex justify-between p-3 text-sm">
              <span className="text-gray-400">DURATION</span>
              <span>{workout.duration} min</span>
            </div>

            <div className="flex justify-between p-3 text-sm">
              <span className="text-gray-400">CALORIES</span>
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex justify-between p-3 text-sm">
              <span className="text-gray-400">RATING</span>
              <span>{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <h2 className="font-bold text-sm mb-3">INSTRUCTIONS</h2>

            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
              {workout.instructions.map(
                (instruction: string, index: number) => (
                  <li key={index}>{instruction}</li>
                ),
              )}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-7">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsPage;
