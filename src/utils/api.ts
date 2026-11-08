export const getAllWorkoutsData = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/fitlog");

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
}

export const getSingleWorkoutData = async (id: string) => {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
}