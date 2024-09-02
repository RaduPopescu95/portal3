import {
  getFirestoreCollectionLength,
  getFirestoreQueryLength,
} from "@/utils/firestoreUtils";
import Header from "../../common/header/dashboard-master/Header";
import SidebarMenu from "../../common/header/dashboard-master/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";

const index = ({ numarParteneri, numarDoctori }) => {
  // const { userData } = useAuth();

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Navigatie Panou de
                        Administrare
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Salut!</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <AllStatistics
                  numarDoctori={numarDoctori}
                  numarParteneri={numarParteneri}
                />
              </div>
              {/* End .row Dashboard top statistics */}

              <div className="row">
                {/* <div className="col-xl-7">
                  <div className="application_statics">
                    <h4 className="mb-4">View Statistics</h4>
                    <StatisticsChart />
                  </div>
                </div> */}
                {/* End statistics chart */}

                {/* <div className="col-xl-12">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">Oferte accesate recent</h4>
                    <Activities />
                  </div>
                </div> */}
              </div>
              {/* End .row  */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
