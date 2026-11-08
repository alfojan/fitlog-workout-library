import Image from "next/image";
import { IWorkout } from "@/types";
import Link from "next/link";

interface IWorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="w-full bg-[#15171D] rounded-xl overflow-hidden border border-gray-800">
        {/* Workout Image */}
        <div className="relative h-52">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Workout Information */}
        <div className="p-5">
          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-[#C2F800] text-black text-xs font-semibold px-3 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h2 className="text-xl font-bold mb-1">{workout.name}</h2>

          {/* Equipment */}
          <p className="text-gray-400 text-sm">{workout.equipment}</p>

          <hr className="border-gray-700 my-4" />

          {/* Workout Statistics */}
          <div className="flex flex-wrap justify-between gap-3 text-sm text-gray-400">
            <div>🕒 {workout.duration} min</div>

            <div>🔥 {workout.caloriesBurned} kcal</div>

            <div>⭐ {workout.rating}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
