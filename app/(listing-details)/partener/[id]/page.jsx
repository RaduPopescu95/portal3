import "photoswipe/dist/photoswipe.css";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import properties from "@/data/properties";
import DetailsContent from "@/components/listing-details-v1/DetailsContent";
import Sidebar from "@/components/listing-details-v1/Sidebar";
import ListingOne from "@/components/listing-single/ListingOne";
import TabDetailsContent from "@/components/agency-details/TabDetailsContent";
import {
  handleGetFirestore,
  handleQueryFirestore,
  handleQueryFirestoreSubcollection,
} from "@/utils/firestoreUtils";

const ListingDynamicDetailsV1 = async ({ params, searchParams }) => {
  const id = params.id;

  const number = parseFloat(searchParams.id);
  const titluOferta = searchParams.slug;
  let partenerId = number;
  console.log("searchParams", searchParams);
  console.log("id.parts..", partenerId);
  let partener = await handleQueryFirestore("Users", "id", partenerId);
  console.log("id.parts..", partener);

  let oferte = await handleQueryFirestoreSubcollection(
    `Oferte`,
    "collectionId",
    partener[0].user_uid,
    "titluOferta",
    titluOferta
  );

  console.log("test oferte...", oferte);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}
      <ListingOne partener={partener[0]} />
      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <DetailsContent
                partener={partener[0]}
                oferta={oferte[0]}
                titluOferta={titluOferta}
              />
            </div>

            {/* End details content .col-lg-8 */}

            {/* <div className="col-lg-4 col-xl-4">
              <Sidebar />
            </div> */}
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      {/* <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section> */}
    </>
  );
};

export default ListingDynamicDetailsV1;
