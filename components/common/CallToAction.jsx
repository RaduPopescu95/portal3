import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2>Devino partenerul nostru</h2>
          <p>
            Alătură-te rețelei noastre de elită și accesează noi oportunități de
            creștere. Împreună, putem oferi cadrelor medicale acces exclusiv la
            produse și servicii de calitate și oferte competitive.
            Contactează-ne pentru a începe!
          </p>{" "}
        </div>
        {/* End .col */}
      </div>
      <div className="col-lg-4">
        <div className="parner_reg_btn text-right tac-smd">
          <Link href="/contact" className="btn btn-thm2">
            Înregistrează-te
          </Link>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CallToAction;
