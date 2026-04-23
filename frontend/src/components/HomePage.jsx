import { Link } from 'react-router-dom';
import heroImage from '../assets/team-hero.png';
import Layout from './Layout';

const highlights = [
  {
    title: 'Image-ready profiles',
    body: 'Connect directly with the backend upload flow so each member can have a visible profile card.',
  },
  {
    title: 'Assessment-aligned routes',
    body: 'The UI mirrors the required backend contract for adding members, listing them, and reading full details.',
  },
  {
    title: 'Mobile-first layout',
    body: 'Every section collapses cleanly from desktop down to phone screens without losing context or usability.',
  },
];

const routeCards = [
  { method: 'POST', path: '/api/members', label: 'Create a new member with photo upload' },
  { method: 'GET', path: '/api/members', label: 'Fetch and render the full team directory' },
  { method: 'GET', path: '/api/members/:id', label: 'Open one profile with all stored fields' },
];

function HomePage() {
  return (
    <Layout
      eyebrow="Student Team Manager"
      title="Build, review, and celebrate your team in one frontend."
      description="A polished React interface designed around your backend schema so you can add members, browse the roster, and open rich profile pages without fighting the API contract."
      actions={
        <>
          <Link className="button button-primary" to="/add">
            Start adding members
          </Link>
          <Link className="button button-secondary" to="/view">
            Browse team directory
          </Link>
        </>
      }
    >
      <section className="hero-panel surface-card">
        <div className="hero-panel-copy">
          <span className="section-kicker">Backend-aware homepage</span>
          <h2>Designed for the exact flows in your assessment brief.</h2>
          <p>
            This frontend follows the backend fields for name, roll, year, degree,
            project summary, hobbies, achievements, internship, personal aim, and
            image uploads. You can point it at your server and start using it.
          </p>
          <div className="inline-stat-group">
            <div className="inline-stat">
              <strong>3</strong>
              <span>Core API routes</span>
            </div>
            <div className="inline-stat">
              <strong>9</strong>
              <span>Profile fields + image</span>
            </div>
            <div className="inline-stat">
              <strong>100%</strong>
              <span>Responsive screens</span>
            </div>
          </div>
        </div>

        <div className="hero-media-frame">
          <img
            className="hero-art"
            src={heroImage}
            alt="Illustration of students collaborating around a digital team management dashboard"
          />
        </div>
      </section>

      <section className="content-grid">
        <article className="surface-card">
          <span className="section-kicker">Why this frontend works</span>
          <h2>Clean structure with room to demo confidently.</h2>
          <div className="feature-stack">
            {highlights.map((item) => (
              <div className="feature-row" key={item.title}>
                <div className="feature-dot" aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-card route-card">
          <span className="section-kicker">API wiring</span>
          <h2>Frontend routes mapped to backend endpoints.</h2>
          <div className="route-list">
            {routeCards.map((route) => (
              <div className="route-row" key={route.path}>
                <span className="route-method">{route.method}</span>
                <div>
                  <code>{route.path}</code>
                  <p>{route.label}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </Layout>
  );
}

export default HomePage;
