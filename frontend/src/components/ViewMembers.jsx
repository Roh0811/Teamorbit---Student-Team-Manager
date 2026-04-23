import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { buildImageUrl, MEMBER_ENDPOINT } from '../api';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchMembers() {
      try {
        setLoading(true);
        const response = await axios.get(MEMBER_ENDPOINT);
        if (!ignore) {
          setMembers(Array.isArray(response.data) ? response.data : []);
          setError('');
        }
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError.response?.data?.error ||
              'Unable to load members. Start the backend and verify the API base URL.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchMembers();
    return () => {
      ignore = true;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return members;
    }

    return members.filter((member) =>
      [member.name, member.roll, member.degree, member.year]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [members, searchTerm]);

  return (
    <Layout
      eyebrow="View Members"
      title="Explore the full team directory."
      description="Cards are populated from the `GET /api/members` route, with support for uploaded images, quick scanning, and direct navigation to the full profile."
      actions={
        <label className="search-shell" htmlFor="member-search">
          <span className="sr-only">Search members</span>
          <input
            id="member-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, roll, degree, or year"
          />
        </label>
      }
    >
      {loading ? (
        <section className="surface-card state-card">
          <h2>Loading member directory...</h2>
          <p>The page is waiting for the backend response.</p>
        </section>
      ) : null}

      {!loading && error ? (
        <section className="surface-card state-card">
          <h2>Could not load members</h2>
          <p>{error}</p>
        </section>
      ) : null}

      {!loading && !error && filteredMembers.length === 0 ? (
        <section className="surface-card state-card">
          <h2>No matching members yet</h2>
          <p>
            Add a team member first or adjust the search term to see more results in the
            directory.
          </p>
          <Link className="button button-primary" to="/add">
            Add the first member
          </Link>
        </section>
      ) : null}

      {!loading && !error && filteredMembers.length > 0 ? (
        <section className="member-grid">
          {filteredMembers.map((member) => (
            <article className="surface-card member-card" key={member._id}>
              <div className="member-image-wrap">
                {member.image ? (
                  <img
                    className="member-image"
                    src={buildImageUrl(member.image)}
                    alt={`${member.name} profile`}
                  />
                ) : (
                  <div className="member-image member-image-fallback">
                    <span>{member.name?.charAt(0).toUpperCase() || 'M'}</span>
                  </div>
                )}
              </div>

              <div className="member-card-body">
                <div className="member-card-top">
                  <span className="member-roll">{member.roll}</span>
                  <h2>{member.name}</h2>
                  <p>{[member.degree, member.year].filter(Boolean).join(' • ') || 'Academic details unavailable'}</p>
                </div>

                <p className="member-card-summary">
                  {member.project || 'No project summary added yet for this member.'}
                </p>

                <Link className="button button-primary button-block" to={`/members/${member._id}`}>
                  View details
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </Layout>
  );
}

export default ViewMembers;
