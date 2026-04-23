import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Layout from './Layout';
import { buildImageUrl, MEMBER_ENDPOINT } from '../api';

function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchMember() {
      try {
        setLoading(true);
        const response = await axios.get(`${MEMBER_ENDPOINT}/${id}`);
        if (!ignore) {
          setMember(response.data);
          setError('');
        }
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError.response?.data?.error ||
              'Unable to load this profile. Check the member ID and backend server.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchMember();
    return () => {
      ignore = true;
    };
  }, [id]);

  const hobbies = useMemo(() => {
    if (!member?.hobbies) {
      return [];
    }

    return member.hobbies
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }, [member?.hobbies]);

  return (
    <Layout
      eyebrow="Member Details"
      title={member?.name || 'Team member profile'}
      description="This screen reads a single member from the backend and presents every available field in a structured, demo-ready layout."
      actions={
        <>
          <Link className="button button-secondary" to="/view">
            Back to members
          </Link>
          <Link className="button button-primary" to="/add">
            Add another member
          </Link>
        </>
      }
    >
      {loading ? (
        <section className="surface-card state-card">
          <h2>Loading profile...</h2>
          <p>Fetching the selected member from the backend.</p>
        </section>
      ) : null}

      {!loading && error ? (
        <section className="surface-card state-card">
          <h2>Profile unavailable</h2>
          <p>{error}</p>
        </section>
      ) : null}

      {!loading && !error && member ? (
        <section className="details-layout">
          <article className="surface-card profile-hero-card">
            <div className="profile-image-shell">
              {member.image ? (
                <img src={buildImageUrl(member.image)} alt={`${member.name} profile`} />
              ) : (
                <div className="member-image member-image-fallback profile-fallback">
                  <span>{member.name?.charAt(0).toUpperCase() || 'M'}</span>
                </div>
              )}
            </div>

            <div className="profile-main-copy">
              <span className="section-kicker">Team profile</span>
              <h2>{member.name}</h2>
              <p className="profile-meta">
                {[member.degree, member.year].filter(Boolean).join(' • ') || 'Academic details pending'}
              </p>
              <div className="detail-chip-row">
                <span className="detail-chip">Roll: {member.roll}</span>
                {member.certificate ? <span className="detail-chip">{member.certificate}</span> : null}
                {member.internship ? <span className="detail-chip">{member.internship}</span> : null}
              </div>
            </div>
          </article>

          <article className="surface-card detail-section">
            <span className="section-kicker">Project</span>
            <h3>About Project</h3>
            <p>{member.project || 'No project summary has been added for this member.'}</p>
          </article>

          <article className="surface-card detail-section">
            <span className="section-kicker">Ambition</span>
            <h3>About Your Aim</h3>
            <p>{member.aboutYourAim || 'No personal aim has been recorded yet.'}</p>
          </article>

          <article className="surface-card detail-section">
            <span className="section-kicker">Interests</span>
            <h3>Hobbies</h3>
            {hobbies.length > 0 ? (
              <div className="tag-row">
                {hobbies.map((hobby) => (
                  <span className="tag-pill" key={hobby}>
                    {hobby}
                  </span>
                ))}
              </div>
            ) : (
              <p>No hobbies have been listed yet.</p>
            )}
          </article>
        </section>
      ) : null}
    </Layout>
  );
}

export default MemberDetails;
