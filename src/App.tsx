import { ArrowRight, ChefHat, Heart, Home, Leaf, Search, Sparkles } from 'lucide-react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Header() {
  return (
    <header className="app-header">
      <NavLink className="brand" to="/">
        <span className="brand-mark">
          <ChefHat size={20} />
        </span>
        <span>PantryPal</span>
      </NavLink>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end><Home size={17} /> Home</NavLink>
        <NavLink to="/find-recipes"><Search size={17} /> Find recipes</NavLink>
        <NavLink to="/favorites"><Heart size={17} /> Favorites</NavLink>
      </nav>
    </header>
  )
}

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16} /> Cook what you have</p>
          <h1>Good meals start with <span>what&apos;s in your pantry.</span></h1>
          <p className="hero-text">
            Tell PantryPal what you have at home and discover simple recipes
            that make every ingredient count.
          </p>
          <button className="primary-button" type="button" onClick={() => navigate('/find-recipes')}>
            Start cooking <ArrowRight size={18} />
          </button>
          <div className="hero-note">
            <Leaf size={17} /> Less waste, more delicious ideas
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration of fresh ingredients">
          <div className="art-circle"></div>
          <div className="ingredient-card tomato">🍅</div>
          <div className="ingredient-card avocado">🥑</div>
          <div className="ingredient-card carrot">🥕</div>
          <div className="bowl">🥗</div>
        </div>
      </section>
      <section className="feature-strip">
        <div><strong>1.</strong><span>Add ingredients</span><small>Use what you already have</small></div>
        <div><strong>2.</strong><span>Find a recipe</span><small>Get ideas matched to you</small></div>
        <div><strong>3.</strong><span>Cook & enjoy</span><small>With nutrition details included</small></div>
      </section>
    </>
  )
}

function FindRecipesPage() {
  return (
    <section className="welcome-panel">
      <p className="eyebrow">Recipe finder</p>
      <h1>Find recipes from your pantry.</h1>
      <p>Your ingredient search will live on this screen.</p>
    </section>
  )
}

function FavoritesPage() {
  return (
    <section className="welcome-panel">
      <p className="eyebrow">Favorites</p>
      <h1>Keep your favorite recipes close.</h1>
      <p>Saved recipes will appear on this screen.</p>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-recipes" element={<FindRecipesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      <footer>PantryPal <span>·</span> Turn what you have into something delicious.</footer>
    </div>
  )
}

export default App
