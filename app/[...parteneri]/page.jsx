import dynamic from "next/dynamic";
import GridV1 from "@/components/listing-grid/grid-v1";
import { handleGetFirestore } from "@/utils/firestoreUtils";

export const metadata = {
  title: "ExclusivMD",
  description: "ExclusivMD",
};

export async function getServerData() {
  let data = [];
  try {
    // Interoghează Firestore (sau orice altă bază de date) folosind 'locationPart'
    data = await handleGetFirestore("Judete");
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return {
      props: {
        error: "Failed to load data.",
      },
    };
  }
  return data; // Data will be available as props in your component
}

const index = async ({ params }) => {
  console.log("params.id...", params);
  const judete = await getServerData();

  return (
    <>
      <GridV1 params={params.parteneri} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
