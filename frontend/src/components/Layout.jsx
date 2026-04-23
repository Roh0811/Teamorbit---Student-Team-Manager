import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/add', label: 'Add Member' },
  { to: '/view', label: 'View Members' },
];

function Layout({ title, eyebrow, description, children, actions }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand-mark" to="/">
          TeamOrbit
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-shell">
        <section className="page-hero">
          <div className="page-copy">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {actions ? <div className="page-actions">{actions}</div> : null}
        </section>

        {children}
      </main>
    </div>
  );
}

export default Layout;
