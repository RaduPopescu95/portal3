"use client";

import Link from "next/link";
import Pagination from "../../common/blog/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLength,
  lengthLoad,
} from "../../../features/properties/propertiesSlice";
import properties from "../../../data/properties";
import Image from "next/image";
import {
  calculateDistance,
  filtrareCadreMedicale,
  filtrareClinici,
  filtrareOferte,
  filtrareParteneri,
  generateRandomGradient,
  getAllOffersWithoutDistance,
  handleGetAnunturiArray,
  processParams,
  toUrlSlug,
} from "@/utils/commonUtils";
import { fetchLocation } from "@/app/services/geocoding";
import { handleDiacrtice } from "@/utils/strintText";
import {
  handleQueryDoubleParam,
  handleQueryFirestore,
  handleQueryFirestoreSubcollection,
  handleQueryFirestoreSubcollectionCinciParam,
  handleQueryFirestoreSubcollectionPatruParam,
  handleQueryFirestoreSubcollectionSaseParam,
  handleQueryFirestoreSubcollectionTripleParam,
  handleQueryFirestoreSubcollectionVariableParams,
  handleQueryPatruParam,
  handleQueryTripleParam,
} from "@/utils/firestoreUtils";
import FeaturedProperty from "./Item";
import { useAuth } from "@/context/AuthContext";
import SkeletonLoader from "@/components/common/SkeletonLoader";

const FeaturedItem = ({ params, searchQuery }) => {
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );
  const {
    currentUser,
    setSearchQueryPateneri,
    searchQueryParteneri,
    tipAnunt,
    tipProgram,
    setTipAnunt,
    setTipProgram,
    judete,
    judet,
    setSelectedJudet,
    localitate,
    setSelectedLocalitate,
    specialitate,
    setSelectedSpecialty,
    titulatura,
    setSelectedCategory,
  } = useAuth();

  const [parteneri, setParteneri] = useState([]);
  const [anunturiCadre, setAnunturiCadre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;

  const dispatch = useDispatch();

  const handleGetAnunturi = async () => {
    try {
      const processedParams = processParams(params);
      console.log("Processed Params:-----------------------------------------");
      console.log("Processed Params:titulatura", titulatura);
      console.log("Processed Params:specialitate", specialitate);
      console.log("Processed Params:judet", judet);
      console.log("Processed Params:localitate", localitate);
      console.log("Processed Params:tipAnunt", tipAnunt);
      let anunturi = [];
      console.log("is.....clinica");
      let tAnunt;

      if (tipAnunt === "Clinica" || tipAnunt === "Anunturi Clinici") {
        console.log("is.....clinica");
        if (tipAnunt === "Clinica" || tipAnunt === "Anunturi Clinici") {
          tAnunt = "Clinica";
        }
        // FUNCTIE CLINICI
        anunturi = await handleGetAnunturiArray(
          titulatura,
          specialitate,
          judet,
          localitate,
          tAnunt
        );
        console.log("is.....clinica", anunturi);
      } else {
        console.log("is.....cadru");
        // FUNCTIE CADRE MEDICALE
        let tAnunt;
        if (tipAnunt === "Anunturi Cadre Medicale") {
          tAnunt = "CadruMedical";
        }
        anunturi = await handleGetAnunturiArray(
          titulatura,
          specialitate,
          judet,
          localitate,
          tAnunt
        );
        console.log("is.....cadru", anunturi);
      }

      if (anunturi.length === 0) {
        anunturi = await handleQueryFirestoreSubcollection(
          "Anunturi",
          "status",
          "Activa",
          "tipAnunt",
          tAnunt
        );
      }

      let anunturiCuDistanta = await Promise.all(
        anunturi.map(async (anunt) => {
          const clinicaCadru = await handleQueryFirestore(
            "Users",
            "user_uid",
            anunt.collectionId
          );
          // const distanta = calculateDistance(
          //   latitude,
          //   longitude,
          //   anunt.coordonate.lat,
          //   anunt.coordonate.lng
          // );
          if (tipAnunt === "Clinica" || tipAnunt === "Anunturi Clinici") {
            return {
              ...anunt,
              // distanta: Math.floor(distanta),
              clinica: clinicaCadru[0],
            };
          } else {
            return {
              ...anunt,
              // distanta: Math.floor(distanta),
              cadruMedical: clinicaCadru[0],
            };
          }
        })
      );

      // let anunturiOrdonati = anunturiCuDistanta.sort(
      //   (a, b) => a.distanta - b.distanta

      if (searchQueryParteneri) {
        if (tAnunt === "Clinica") {
          const rezultatFiltrare = filtrareClinici(
            anunturiCuDistanta,
            searchQueryParteneri
          );
        } else {
          const rezultatFiltrare = filtrareCadreMedicale(
            anunturiCuDistanta,
            searchQueryParteneri
          );
          setParteneri(rezultatFiltrare);
        }
      } else {
        setParteneri(anunturiCuDistanta);
      }

      setIsLoading(false);
      // Logarea rezultatelor pentru a vedea structura
    } catch (error) {
      console.error("Error handleGetAnunturi data: ", error);
    }
  };

  useEffect(() => {
    handleGetAnunturi();
  }, []);

  // Funcție pentru schimbarea paginilor
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginatedParteneri = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return parteneri.slice(startIndex, endIndex);
  };

  // status handler

  let content = paginatedParteneri().map((item) => {
    const pathname =
      item.tipAnunt === "Clinica"
        ? `/partener/${toUrlSlug(item?.titluOferta)}`
        : `/cadru-medical/${toUrlSlug(item?.titulatura)}`;

    return (
      <div
        className={`${
          isGridOrList ? "col-12 feature-list" : "col-md-6 col-lg-6"
        } `}
        key={item?.id}
      >
        {currentUser ? (
          <Link
            href={{
              pathname: pathname,
              query: {
                id: item.cadruMedical
                  ? item.cadruMedical?.id
                  : item?.clinica?.id,
              },
            }}
            passHref
          >
            <FeaturedProperty item={item} isGridOrList={isGridOrList} />
          </Link>
        ) : (
          <a data-bs-toggle="modal" data-bs-target=".bd-utilizator-modal-lg">
            <FeaturedProperty item={item} isGridOrList={isGridOrList} />
          </a>
        )}
      </div>
    );
  });

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content.length));
    dispatch(lengthLoad(isLoading));
  }, [dispatch, content]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      {content}

      <div className="row">
        <div className="col-lg-12 mt20">
          <div className="mbp_pagination">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={parteneri.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
        {/* End paginaion .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default FeaturedItem;
