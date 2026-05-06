import { useEffect, useId, useState } from 'react';
import { ArrowRight, ArrowUpRight, Eye, EyeOff, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import wallpaper from './media/wallpaper.png';

const IMAGES = {
  defaultHeroSlides: [
    wallpaper,
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1600&q=80',
  ],
};

const roles = [
  { id: 'student', label: 'Student' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'admin', label: 'Admin' },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState(IMAGES.defaultHeroSlides);
  const emailId = useId();
  const passwordId = useId();
  const [schoolName, setSchoolName] = useState('School Name');
  const [schoolLogo, setSchoolLogo] = useState(`${process.env.PUBLIC_URL}/images/school-logo-mark.png`);

  useEffect(() => {
    fetch('/school.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.schoolName) setSchoolName(data.schoolName);
        if (data.schoolLogo) setSchoolLogo(data.schoolLogo);
        if (Array.isArray(data.heroSlides) && data.heroSlides.length > 0) {
          setHeroSlides(data.heroSlides);
        }
      })
      .catch((error) => {
        console.error('Error fetching school data:', error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [heroSlides]);

  useEffect(() => {
    if (activeSlide >= heroSlides.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, heroSlides]);

  return (
    <div className="login">
      <div className="login__shell">
        <section className="login__panel" aria-label="Sign in">
          <div className="login__panel-inner">
            <header className="login__brand">
              <img className="login__brand-mark" src={schoolLogo} alt={`${schoolName} logo`} />
              <span className="login__brand-name">{schoolName}</span>
            </header>

            <div className="login__roles" role="tablist" aria-label="Account type">
              {roles.map((item) => {
                const isActive = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`login__role${isActive ? ' login__role--active' : ''}`}
                    onClick={() => setRole(item.id)}
                  >
                    <UserRound className="login__role-icon" size={16} strokeWidth={2} aria-hidden />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <h1 className="login__title">Login to your account</h1>
            <p className="login__subtitle">Welcome back!</p>

            <form
              className="login__form"
              onSubmit={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <div className="login__field">
                <label className="visually-hidden" htmlFor={emailId}>
                  Email
                </label>
                <input
                  id={emailId}
                  className="login__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                />
              </div>

              <div className="login__field login__field--password">
                <label className="visually-hidden" htmlFor={passwordId}>
                  Password
                </label>
                <input
                  id={passwordId}
                  className="login__input login__input--with-toggle"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="login__toggle-password"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye size={18} strokeWidth={2} aria-hidden /> : <EyeOff size={18} strokeWidth={2} aria-hidden />}
                </button>
              </div>

              <div className="login__row">
                <label className="login__remember">
                  <input className="login__checkbox" type="checkbox" name="remember" defaultChecked />
                  <span>Remember me</span>
                </label>
                <a className="login__link login__link--muted" href="#forgot">Forgot Password?</a>
              </div>

              <button type="submit" className="login__submit">
                Log in
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
              </button>
            </form>

            <p className="login__footer">
              Don&apos;t have an account? <a className="login__link login__link--primary" href="#create">Create an account</a>
            </p>
          </div>
        </section>

        <aside className="login__hero" aria-label="Welcome">
          <div className="login__hero-media">
            <img className="login__hero-img" src={heroSlides[activeSlide]} alt="" />
            <div className="login__hero-scrim" />
          </div>

          <div className="login__hero-frame">
            <div className="login__hero-top">
              <span className="login__hero-school">{schoolName}</span>
              <a className="login__hero-back" href="/">
                Back to website
                <ArrowRight size={14} strokeWidth={2} aria-hidden />
              </a>
            </div>
            <div className="login__hero-slide">
              <p className="login__hero-tagline">Streamlining Education, Empowering Every Role.</p>
              <div className="login__hero-dots" aria-hidden>
                {heroSlides.map((slide, index) => (
                  <span
                    key={slide}
                    className={`login__hero-dot${index === activeSlide ? ' login__hero-dot--active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
