import "./WhyChooseUs.css";

const values = [
  {
    number: "01",
    title: "Customer First",
    description: "Your needs guide how we plan and arrange every journey.",
  },
  {
    number: "02",
    title: "Dependable Service",
    description:
      "Clear communication and thoughtful coordination from enquiry to arrival.",
  },
  {
    number: "03",
    title: "Personalised Travel",
    description:
      "Transport arrangements shaped around your schedule and requirements.",
  },
  {
    number: "04",
    title: "African Hospitality",
    description:
      "A welcoming, respectful and professional approach to every traveller.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="values-section section-padding">
      <div className="container">
        <div className="values-heading">
          <p className="eyebrow">THE JAMBINNO DIFFERENCE</p>
          <h2 className="section-title">
            Thoughtful travel.
            <br />
            <span className="gold-text">Meaningful experiences.</span>
          </h2>
        </div>

        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.number}>
              <span className="value-number">{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
