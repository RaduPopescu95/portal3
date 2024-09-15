"use client";

import { AlertModal } from "@/components/common/AlertModal";
import AutocompleteInput from "@/components/common/AutocompleteInput";
import CommonLoader from "@/components/common/CommonLoader";
import { useAuth } from "@/context/AuthContext";
import useDataNasterii from "@/hooks/useDataNasterii";
import {
  handleQueryFirestoreSubcollection,
  handleUpdateFirestore,
} from "@/utils/firestoreUtils";
import { emailWithoutSpace, formatTitulatura } from "@/utils/strintText";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import LogoUpload from "./LogoUpload";
import { uploadImage } from "@/utils/storageUtils";
import { TITLES_AND_SPECIALTIES } from "@/utils/constanteTitulatura";

const ProfileInfo = () => {
  const [initialData, setInitialData] = useState({});
  const { userData, currentUser, setCurrentUser, setUserData, judete } =
    useAuth();
  const {
    dataNasterii,
    handleDayChange,
    handleMonthChange,
    handleYearChange,
    setDataNasterii,
  } = useDataNasterii(userData?.dataNasterii || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numeUtilizator, setNumeUtilizator] = useState(
    userData?.numeUtilizator || ""
  );
  const [isNoCuimCifCodParafa, setIsNoCuimCifCodParafa] = useState(false);
  const [telefon, setTelefon] = useState(userData?.telefon || "");

  const [judet, setJudet] = useState(userData?.judet || "");
  const [localitate, setLocalitate] = useState(userData?.localitate || "");
  const [sector, setSector] = useState(userData?.sector || "");
  const [titulatura, setTitulatura] = useState(userData?.titulatura || "");
  const [specialitate, setSpecialitate] = useState(userData?.specialitate || "");
  const [specialitati, setSpecialitati] = useState(
    userData?.titulatura ? TITLES_AND_SPECIALTIES[userData?.titulatura] : []
  );
  const [specializare, setSpecializare] = useState(
    userData?.specializare || ""
  );
  const [cuim, setCuim] = useState(userData?.cuim || "");
  const [cif, setCIF] = useState(userData?.cif || "");
  const [tipEnitate, setTipEnitate] = useState(userData?.tipEnitate || "");
  const [codParafa, setCodParafa] = useState(userData?.codParafa || "");
  const [localitati, setLocalitati] = useState([]);
  const [isJudetSelected, setIsJudetSelected] = useState(true);
  const [isLocalitateSelected, setIsLocalitateSelected] = useState(true);
  const [isCateogireSelected, setIsCategorieSelected] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adresaSediu, setAdresaSediu] = useState(userData?.adresaSediu || "");
  const [googleMapsLink, setGoogleMapsLink] = useState(
    userData?.googleMapsLink || ""
  );
  const [coordonate, setCoordonate] = useState(userData?.coordonate || {});
  const [isNewLogo, setIsNewLogo] = useState(false);
  const [logo, setLogo] = useState(userData?.logo ? [userData?.logo] : []);
  const [deletedLogo, setDeletedLogo] = useState(null);
  const [acceptaEmail, setAcceptEmail] = useState(userData?.acceptaEmail || true); // Starea checkbox-ului


  const handleLocationSelect = (lat, lng, adresa, urlMaps) => {
    console.log(`Selected location - Lat: ${lat}, Lng: ${lng}`);
    setAdresaSediu(adresa);
    setGoogleMapsLink(urlMaps);
    setCoordonate({ lat, lng });
    // Aici poți actualiza starea sau trimite aceste date către backend
  };

  let isEdit = userData?.logo?.finalUri ? true : false;

  // Setează starea inițială
  useEffect(() => {
    setInitialData({
      email: userData?.email || "",
      numeUtilizator: userData?.numeUtilizator || "",
      telefon: userData?.telefon || "",
      dataNasterii: userData?.dataNasterii || "",
      judet: userData?.judet || "",
      localitate: userData?.localitate || "",
      titulatura: userData?.titulatura || "",
      specializare: userData?.specializare || "",
      cuim: userData?.cuim || "",
      adresaSediu: userData?.adresaSediu || "",
      googleMapsLink: userData?.googleMapsLink || "",
      coordonate: userData?.coordonate || {},
    });
  }, [userData]);

  const describeChanges = () => {
    let changes = [];
    Object.entries(initialData).forEach(([key, value]) => {
      let currentValue = eval(key);
      if (value !== currentValue) {
        changes.push(`${key} de la '${value}' la '${currentValue}'`);
      }
    });
    if (changes.length > 0) {
      return `${userData.numeUtilizator} a actualizat: ${changes.join(", ")}`;
    }
    return null;
  };

  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setButtonPressed(true);
    setIsLoading(true);
    const emailNew = emailWithoutSpace(email);
    // Verifică dacă parola este confirmată corect și apoi creează utilizatorul
    // if (titulatura === "Asistent Medical") {
    //   setSpecializare("");
    // }
    try {
      let lg = {};
      let user_uid = currentUser.uid;
      if (logo.length === 0) {
        setIsLoading(false);
        setButtonPressed(false);
        showAlert("Selelctati imagine profil", "danger");
        return;
      }
      if (isNewLogo) {
        lg = await uploadImage(logo, true, "ProfileImage", deletedLogo);
      } else {
        if (!logo[0].fileName) {
          lg = await uploadImage(logo, false, "ProfileImage");
        } else {
          lg = logo[0];
        }
      }

      let data = {
        ...userData,
        cuim,
        cif,
        codParafa,
        specializare,
        specialitate,
        titulatura,
        localitate: judet === "Bucuresti" ? "Bucuresti" : localitate,
        sector: judet === "Bucuresti" ? sector : "",
        judet,
        dataNasterii,
        email: emailNew,
        telefon,
        user_uid,
        userType: "Doctor",
        numeUtilizator,
        tipEnitate,
        adresaSediu,
        googleMapsLink,
        coordonate,
        logo: lg,
        acceptaEmail
      };
      if (
        !numeUtilizator ||
        !titulatura ||
        !specialitate ||
        // titulatura === "Titulatura" ||
        !telefon ||
        !judet ||
        !localitate ||
        !dataNasterii ||
        !adresaSediu
        // !tipEnitate ||
        // tipEnitate === "Tip de entitate"
      ) {
        setIsLoading(false);
        return;
      }

      setUserData(data);

      const actionText = describeChanges();

      await handleUpdateFirestore(
        `UsersJobs/${user_uid}`,
        data,
        actionText
      ).then(() => {
        console.log("update succesfully....");
        setIsLoading(false);
        showAlert("Actualizare cu succes!", "success");
      });
    } catch (error) {
      showAlert(`Eroare la Actalizare: ${error.message}`, "danger");
      setIsLoading(false);
      console.error("Error signing up: ", error);
    }
  };

  
  const handleTitleChange = (event) => {
    let title = event.target.value;
    if(title === "Selectează o titulatură"){
      title = ""
    }
    setTitulatura(title);
    setSpecialitati(TITLES_AND_SPECIALTIES[title] || []);
    setSpecialitate(""); // Reset specialty when title changes
  };

  const handleSpecialtyChange = (event) => {
    let spec = event.target.value
    if(spec === "Selectează o specialitate"){
      spec = ""
    }
    setSpecialitate(event.target.value);
  };


  const handleJudetChange = async (e) => {
    const judetSelectedName = e; // Numele județului selectat, un string
    setJudet(judetSelectedName);
    setIsJudetSelected(!!judetSelectedName);
    
    console.log("judetSelectedName...", judete);
    // Găsește obiectul județului selectat bazat pe `judet`
    const judetSelected = judete.find(
      (judet) => judet.judet === judetSelectedName
    );
    
    console.log("fetch localitati...", judetSelected);
    if (judetSelected) {
      try {
        // Utilizăm judet pentru a interoga Firestore
        const localitatiFromFirestore = await handleQueryFirestoreSubcollection(
          "Localitati",
          "judet",
          judetSelected.judet
        );
        console.log("localitatile...", localitatiFromFirestore)
        // Presupunem că localitatiFromFirestore este array-ul corect al localităților
        setLocalitati(localitatiFromFirestore);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setLocalitati([]); // Resetează localitățile în caz de eroare
      }
    } else {
      // Dacă nu găsim județul selectat, resetăm localitățile
      setLocalitati([]);
    }
  };
  const handleGetLocalitatiJudet = async () => {
    const judetSelectedName = judet; // Numele județului selectat, un string
    console.log("judetSelectedName...", judetSelectedName);
    setJudet(judetSelectedName);
    setIsJudetSelected(!!judetSelectedName);

    // Găsește obiectul județului selectat bazat pe `judet`
    const judetSelected = judete.find(
      (judet) => judet.judet === judetSelectedName
    );

    if (judetSelected) {
      try {
        // Utilizăm judet pentru a interoga Firestore
        const localitatiFromFirestore = await handleQueryFirestoreSubcollection(
          "Localitati",
          "judet",
          judetSelected.judet
        );
        // Presupunem că localitatiFromFirestore este array-ul corect al localităților
        setLocalitati(localitatiFromFirestore);
  
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setLocalitati([]); // Resetează localitățile în caz de eroare
      }
    } else {
      // Dacă nu găsim județul selectat, resetăm localitățile
      setLocalitati([]);
    }
  };
  const handlePutLocalitat = async (judet) => {
    await handleJudetChange(judet).then(() => {
      if(userData?.localitate === "Bucuresti"){

        setLocalitate(userData?.localitate);
        setSector(userData?.sector)
      }else{

        setLocalitate(userData?.localitate);
      }
    });
  };

  useEffect(() => {
    if (judet.length > 0) {
      handlePutLocalitat(userData?.judet)
    }
  }, []);

  const deleteLogo = (name) => {
    if (logo[0].fileName) {
      setLogo([]); // Clear the selection when deleting
      setDeletedLogo(logo[0].fileName);
    } else {
      setLogo([]); // Clear the selection when deleting
    }
  };

  const singleImage = (e) => {
    const file = e.target.files[0]; // Get the selected file
    console.log("test..here...", file.name);
    if (file) {
      // Check if the file is already selected
      const isExist = logo.some(
        (existingFile) => existingFile.name === file.name
      );

      if (!isExist) {
        setLogo([file]); // Replace the current file
        setIsNewLogo(true);
      } else {
        alert("This image is already selected!");
      }
    }
  };

  return (
    <div className="row">


      <div className="col-lg-12">
        <h3 className="mb30">Imagine Profil</h3>
      </div>
      {/* End .col */}

      <LogoUpload
        singleImage={singleImage}
        deleteLogo={deleteLogo}
        logoImg={logo}
        isEdit={isEdit}
        isNewImage={isNewLogo}
        text={"Adauga imagine profil"}
      />
      {/* End .col */}

      <div className="col-lg-12 col-xl-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput1">Nume utilizator</label>
          <input
            type="text"
            className={`form-control ${
              !numeUtilizator && buttonPressed && "border-danger"
            }`}
            id="formGroupExampleInput1"
            placeholder="Nume Utilizator"
            value={numeUtilizator}
            onChange={(e) => setNumeUtilizator(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}





      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Titulatura</label>
          <select
            className={`selectpicker form-select ${
              (!titulatura && buttonPressed)
                ? "border-danger"
                : null
            }`}
            data-live-search="true"
            data-width="100%"
            value={titulatura}
            onChange={handleTitleChange}
          >
                 <option value="">Selectează o titulatură</option>
            {Object.keys(TITLES_AND_SPECIALTIES).map((title) => (
              <option key={title} value={title}>
                {formatTitulatura(title)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Specialitate</label>
          <select
            className={`selectpicker form-select ${
              (!specialitate && buttonPressed)
                ? "border-danger"
                : null
            }`}
            data-live-search="true"
            data-width="100%"
            value={specialitate}
            onChange={handleSpecialtyChange}
          >
            <option value="">Selectează o specialitate</option>
            {specialitati.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* End .col */}



      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Judet</label>
          <select
            className={`selectpicker form-select ${
              (!judet && buttonPressed) || (judet === "Judet" && buttonPressed)
                ? "border-danger"
                : null
            }`}
            data-live-search="true"
            data-width="100%"
            value={judet}
            onChange={(e) => handleJudetChange(e.target.value)}
          >
            <option data-tokens="SelectRole">Judet</option>
            {judete &&
              judete.map((judet, index) => (
                <option key={index} value={judet.judet}>
                  {judet.judet}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Localitate</label>
          <select
            className={`selectpicker form-select ${
              (!localitate && buttonPressed) ||
              (localitate === "Localitate" && buttonPressed)
                ? "border-danger"
                : null
            }`}
            data-live-search="true"
            data-width="100%"
            value={localitate}
            onChange={(e) => {
              console.log("Test...");
              if (e.target.value.includes("Sector")) {
                setLocalitate(e.target.value);
                setSector(e.target.value);
              } else {
                setLocalitate(e.target.value);
              }
            }}
          >
            {localitati.map((location, index) => (
              <option key={index} value={location.localitate}>
                {location.localitate}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput5">Telefon</label>
          <input
            type="text"
            className={`form-control ${
              !telefon && buttonPressed && "border-danger"
            }`}
            id="formGroupExampleInput5"
            placeholder="Telefon"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput7">Data nașterii</label>
     
          <div
            className={`form-control d-flex align-items-center ${
              !dataNasterii && buttonPressed && "border-danger"
            }`}
          >
            <select
              value={new Date(dataNasterii).getDate()}
              onChange={handleDayChange}
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              value={new Date(dataNasterii).getMonth()}
              onChange={handleMonthChange}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              value={new Date(dataNasterii).getFullYear()}
              onChange={handleYearChange}
            >
              {Array.from({ length: 120 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

    
      {/* End .col */}
      <div className="col-lg-12">
        <h4 className="mb30">Introduceti zona de interes</h4>
      </div>
      <AutocompleteInput
        onPlaceChanged={handleLocationSelect}
        adresa={adresaSediu}
        buttonPressed={buttonPressed}
      />
      {/* End .col */}
      <div className="col-lg-12 col-xl-12">
      <div className="form-check mb-4">
      <label className="form-check-label" htmlFor="trimiteNotificariEmail">
    Trimite Notificări E-mail
  </label>
  <input
    className="form-check-input"
    type="checkbox"
    id="trimiteNotificariEmail"
    checked={acceptaEmail}
    onChange={() => setAcceptEmail(!acceptaEmail)}
  />

</div>
</div>

      <div className="col-xl-12 text-right">
        <div className="my_profile_setting_input">
          {/* <button className="btn btn1">View Public Profile</button> */}
          <button className="btn btn2" onClick={handleUpdateProfile}>
            {isLoading ? <CommonLoader /> : "Actualizeaza Profil"}
          </button>
        </div>
      </div>
      {/* End .col */}
      <AlertModal
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </div>
  );
};

export default ProfileInfo;
