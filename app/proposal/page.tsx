import StoreProposal from "@/components/store-proposal/StoreProposal";
import { MapCoordinateProvider } from "@/context/MapCoordinateProvider";

const StoreProposalPage = () => {
  return (
    <div>
      <MapCoordinateProvider>
        <StoreProposal />
      </MapCoordinateProvider>
    </div>
  );
};
export default StoreProposalPage;
