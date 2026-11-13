import { ChefHat, Heart, Home, Search } from 'lucide-react'
import { NavLink, Route, Routes } from 'react-router-dom'
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
  return (
    <section className="welcome-panel">
      <p className="eyebrow">Home</p>
      <h1>Your pantry, your next great meal.</h1>
      <p>Start with the ingredients you already have.</p>
    </section>
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
