import Layout from "@/src/layouts/Layout";
import Link from "next/link";

const E404 = () => {
  return (
    <Layout>
      <section className="error-section">
        <div className="container">
          <div className="error-page-centered">
            <img
              alt="404 Not Found"
              src="assets/img/404.webp"
              className="error-image"
              data-aos="fade-in"
              data-aos-delay={200}
              data-aos-duration={400}
            />
            <h2>404</h2>
            <h4 data-aos="fade-up" data-aos-delay={300} data-aos-duration={400}>
              Page Not Found
            </h4>
            <p data-aos="fade-up" data-aos-delay={400} data-aos-duration={500}>
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/" className="button button-2">
              <i className="fa-solid fa-house" /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default E404;
