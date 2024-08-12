import Image from "next/image";
import PopupVideo from "../common/PopupVideo";

const Servicii = () => {
  const missionContent = [
    {
      id: 1,
      icon: "flaticon-user",
      number: "Creează-ți un Cont",
      meta: "Completați formularul nostru de înscriere cu informațiile de bază despre dumneavoastră sau compania pe care o reprezentați.",
    },
    {
      id: 2,
      icon: "flaticon-tick",
      number: "Verificare și Aprobare",
      meta: "Echipa noastră va verifica manual informațiile furnizate pentru a ne asigura că îndepliniți criteriile noastre de calitate.",
    },
    {
      id: 3,
      icon: "flaticon-college-graduation",
      number: "Publică Anunțuri",
      meta: "După aprobare, puteți începe să postați anunțuri de locuri de muncă și să căutați candidați potriviți.",
    },
  ];

  return (
    <>
      <div className="col-lg-12 col-xl-12">
        <div className="about_content">
          {/* <p className="large">
            Pentru a adăuga anunțuri pe platforma noastră, este necesar să vă
            creați un cont. Acest proces este simplu și rapid, dar important
            pentru a menține calitatea serviciilor noastre. JobsMD este dedicat
            doar persoanelor fizice și juridice care activează în sfera medicală
            sau furnizează servicii relevante pentru acest sector.
          </p> */}
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            quis ligula eu lectus vulputate porttitor sed feugiat nunc. Mauris
            ac consectetur ante, dapibus gravida tellus. Nullam aliquet eleifend
            dapibus. Cras sagittis, ex euismod lacinia tempor, lectus orci
            elementum augue, eget auctor metus ante sit amet velit.
          </p>
          <p>
            Maecenas quis viverra metus, et efficitur ligula. Nam congue augue
            et ex congue, sed luctus lectus congue. Integer convallis
            condimentum sem. Duis elementum tortor eget condimentum tempor.
            Praesent sollicitudin lectus ut pharetra pulvinar. Donec et libero
            ligula. Vivamus semper at orci at placerat.Placeat Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Quod libero amet, laborum
            qui nulla quae alias tempora.
          </p> */}

          <ul className="ab_counting">
            {missionContent.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <div className="about_counting">
                  <div className="icon">
                    <span className={`${item.icon}`}></span>
                  </div>
                  <div className="details">
                    <h3>{item.number}</h3>
                    <p>{item.meta}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* End .ab_counting */}
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-5">
        <div className="about_thumb">
          <Image
            width={461}
            height={509}
            priority
            className="img-fluid w100 cover"
            src="/assets/images/about/1.jpg"
            alt="1.jpg"
          />
          <PopupVideo />
        </div>
      </div> */}
    </>
  );
};

export default Servicii;