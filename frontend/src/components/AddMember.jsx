import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { MEMBER_ENDPOINT } from '../api';

const initialState = {
  name: '',
  roll: '',
  year: '',
  degree: '',
  project: '',
  hobbies: '',
  certificate: '',
  internship: '',
  aboutYourAim: '',
};

const fieldGroups = [
  [
    { key: 'name', label: 'Name', type: 'text', placeholder: 'Enter full name', required: true },
    { key: 'roll', label: 'Roll Number', type: 'text', placeholder: 'Enter roll number', required: true },
  ],
  [
    { key: 'year', label: 'Year', type: 'text', placeholder: 'III Year' },
    { key: 'degree', label: 'Degree', type: 'text', placeholder: 'B.Tech CSE' },
  ],
  [
    { key: 'certificate', label: 'Certificate', type: 'text', placeholder: 'AWS Cloud Practitioner' },
    { key: 'internship', label: 'Internship', type: 'text', placeholder: 'Frontend Intern at Acme' },
  ],
];

function AddMember() {
  const [formState, setFormState] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const canSubmit = useMemo(
    () => Boolean(formState.name.trim() && formState.roll.trim()) && !submitting,
    [formState.name, formState.roll, submitting]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  }

  function handleFileChange(event) {
    const [file] = event.target.files || [];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(file || null);
    setPreviewUrl(file ? URL.createObjectURL(file) : '');
  }

  function resetForm(clearFeedback = true) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFormState(initialState);
    setImageFile(null);
    setPreviewUrl('');
    if (clearFeedback) {
      setMessage({ type: '', text: '' });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formState.name.trim() || !formState.roll.trim()) {
      setMessage({
        type: 'error',
        text: 'Name and roll number are required before submitting.',
      });
      return;
    }

    const payload = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      payload.append(key, value);
    });
    if (imageFile) {
      payload.append('image', imageFile);
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post(MEMBER_ENDPOINT, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({
        type: 'success',
        text: 'Member added successfully. You can add another one or open the directory.',
      });
      resetForm(false);
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error.response?.data?.error ||
          'The member could not be added. Check that the backend is running on port 5000.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout
      eyebrow="Add Member"
      title="Collect every profile field your backend expects."
      description="The form submits multipart data to the member API, including optional image upload and the text-heavy profile sections required by the brief."
      actions={
        <>
          <button className="button button-primary" type="submit" form="member-form" disabled={!canSubmit}>
            {submitting ? 'Submitting...' : 'Submit member'}
          </button>
          <button className="button button-secondary" type="button" onClick={resetForm}>
            Reset form
          </button>
        </>
      }
    >
      <section className="form-layout">
        <form className="surface-card member-form" id="member-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <span className="section-kicker">Identity</span>
            <h2>Core profile information</h2>
            <div className="field-grid">
              {fieldGroups.flat().map((field) => (
                <label className="field" key={field.key}>
                  <span>{field.label}</span>
                  <input
                    name={field.key}
                    type={field.type}
                    value={formState[field.key]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <span className="section-kicker">Story</span>
            <h2>Project and ambitions</h2>
            <div className="field-grid field-grid-single">
              <label className="field">
                <span>About Project</span>
                <textarea
                  name="project"
                  value={formState.project}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the project or contribution"
                />
              </label>

              <label className="field">
                <span>Hobbies (comma separated)</span>
                <input
                  name="hobbies"
                  type="text"
                  value={formState.hobbies}
                  onChange={handleChange}
                  placeholder="Design, chess, hackathons"
                />
              </label>

              <label className="field">
                <span>About Your Aim</span>
                <textarea
                  name="aboutYourAim"
                  value={formState.aboutYourAim}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Share goals, ambitions, or the direction this student is working toward"
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <span className="section-kicker">Media</span>
            <h2>Profile image upload</h2>
            <label className="upload-panel" htmlFor="image-upload">
              <input
                id="image-upload"
                className="sr-only"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <span className="upload-label">Choose image</span>
              <span className="upload-help">
                Upload a profile photo to store through the backend `uploads/` flow.
              </span>
            </label>
          </div>

          {message.text ? (
            <div className={message.type === 'error' ? 'alert alert-error' : 'alert alert-success'}>
              {message.text}
            </div>
          ) : null}
        </form>

        <aside className="surface-card preview-panel">
          <span className="section-kicker">Preview</span>
          <h2>What the card starts to feel like</h2>
          <div className="preview-card">
            <div className="preview-avatar">
              {previewUrl ? (
                <img src={previewUrl} alt={formState.name || 'Profile preview'} />
              ) : (
                <span>{formState.name ? formState.name.charAt(0).toUpperCase() : 'T'}</span>
              )}
            </div>
            <div>
              <h3>{formState.name || 'Team member name'}</h3>
              <p>{formState.roll || 'Roll number appears here'}</p>
              <p>{[formState.degree, formState.year].filter(Boolean).join(' • ') || 'Degree and year'}</p>
            </div>
          </div>

          <div className="preview-notes">
            <p>
              The submit action uses <code>FormData</code> so your backend can receive both
              the text fields and the image in one request.
            </p>
            <p>
              If the backend is offline, the page surfaces the API error instead of failing
              silently.
            </p>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

export default AddMember;
