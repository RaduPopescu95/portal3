import dynamic from "next/dynamic";
import AgencyV2 from "@/components/agency-view/agency-v2";

export const metadata = {
  title: 'Simple Listing – AgencyV2 || Portal',
  description:
    'Portal',
}

const index = () => {
  return (
    <>
      <AgencyV2 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
