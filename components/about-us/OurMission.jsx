import Image from "next/image";
import PopupVideo from "../common/PopupVideo";

const OurMission = () => {
  const missionContent = [
    {
      id: 1,
      icon: "flaticon-user",
      number: "80,123",
      meta: "Vizitatori zilnic",
    },
    {
      id: 2,
      icon: "flaticon-home",
      number: "1,000",
      meta: "Clinici înregistrate",
    },
    {
      id: 3,
      icon: "flaticon-transfer",
      number: "100,000 RON",
      meta: "În discount",
    },
  ];

  return (
    <>
      <div className="col-lg-12 col-xl-12">
        <div className="about_content">
          <p className="large">
            Suntem o echipă de IT ce s-a remarcat prin compania Credite
            Medicale, respectiv site-ul www.creditemedicale.ro, ajungând astfel
            să ne clasăm printre primii 3 din țară în categoria activităților
            desfășurate pentru cadrele medicale de pretutindeni. Fiindcă ne
            desfășurăm activitatea în acest domeniu, știm și înțelegem foarte
            bine dificultatea pe care o reprezintă timpul pentru cadrele
            medicale, iar astfel ne dorim să sărim în ajutorul lor. Punem la
            dispoziție o platformă adresată exclusiv lor prin care pot găsi ușor
            oferte, discount-uri, beneficii în diferite locații aflate în
            împrejurimea lor.
          </p>
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

export default OurMission;
