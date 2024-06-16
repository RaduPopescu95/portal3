const WhyChoose = ({ style = "" }) => {
  const whyCooseContent = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: "Încrederea a Mii de Clienti",
      descriptions: `Platforma noastră este locul unde mii de doctori găsesc parteneri economici potriviți pentru nevoile lor , graţie unei selecții riguroase . Prioritizăm încrederea şi satisfacția fiecarui cadru medical, asigurându-ne că fiecare partener înregistrat îndeplinește standarde înalte de calitate.`,
    },
    // {
    //   id: 2,
    //   icon: "flaticon-home-1",
    //   title: "O Gamă Variată de Clinici",
    //   descriptions: `Cu o diversitate impresionantă de clinici înregistrate, hub-ul nostru asigură accesul pacienților la o varietate largă de specialități medicale și tratamente. Indiferent de complexitatea nevoilor lor de sănătate, pacienții pot găsi cu ușurință opțiuni de îngrijire medicală adecvate, oferite de echipe de specialiști dedicați.`,
    // },
    {
      id: 3,
      icon: "flaticon-profit",
      title: "Creștere Profit prin Discounturi Exclusiviste",
      descriptions: `Cadrele medicale beneficiază de acces exclusiv la discounturi, în timp ce partenerii noștri au la dispoziție o soluție simplă pentru a construi loialitatea clienților viitori. Prin participarea la sistemul nostru de discounturi, partenerii pot atrage și fideliza beneficiarii serviciilor lor, maximizând astfel profitul și consolidând relațiile de afaceri.`,
    },
  ];

  return (
    <>
      {whyCooseContent.map((item) => (
        <div className="col-md-6 col-lg-6 col-xl-6" key={item.id}>
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.descriptions}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
