// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="#">Trading Circuit Academy</a>

        <div className="ms-auto">
          <Link href="/dashboard" className="btn btn-outline-light me-2">
            Dashboard
          </Link>
          <a href="#about" className="btn btn-warning">
            About Mentor
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center p-5 bg-light">
        <h1 className="display-4 fw-bold">
          Master Trading with Confidence 🚀
        </h1>
        <p className="lead mt-3">
          Learn position sizing, risk management, and real-world strategies.
        </p>

        <Link href="/dashboard/position-sizing" className="btn btn-primary btn-lg mt-4">
          Start Learning
        </Link>
      </section>

      {/* FEATURES */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <img
              src="https://img.freepik.com/free-vector/stock-market-concept-illustration_114360-1652.jpg"
              className="img-fluid mb-3"
            />
            <h4>Position Sizing</h4>
            <p>Calculate risk and manage trades like a pro.</p>
          </div>

          <div className="col-md-4">
            <img
              src="https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-797.jpg"
              className="img-fluid mb-3"
            />
            <h4>Analytics</h4>
            <p>Track performance and improve your strategy.</p>
          </div>

          <div className="col-md-4">
            <img
              src="https://img.freepik.com/free-vector/chatting-concept-illustration_114360-848.jpg"
              className="img-fluid mb-3"
            />
            <h4>Community</h4>
            <p>Discuss trades and learn from others.</p>
          </div>
        </div>
      </section>

      {/* ABOUT MENTOR */}
      <section id="about" className="bg-dark text-white text-center p-5">
        <h2>About the Mentor</h2>
        <p className="mt-3">
          Learn from an experienced trader who focuses on discipline, psychology,
          and risk management rather than just signals.
        </p>

        <img
          src="https://img.freepik.com/free-photo/businessman-working-laptop_23-2148478598.jpg"
          className="img-fluid mt-3 rounded"
          style={{ maxWidth: "300px" }}
        />
      </section>

      {/* CTA */}
      <section className="text-center p-5">
        <h3>Ready to become consistent?</h3>
        <Link href="/dashboard" className="btn btn-success btn-lg mt-3">
          Go to Dashboard
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center p-3">
        © 2026 Trading Mentor Platform
      </footer>
    </div>
  );
}