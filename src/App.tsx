import { ChefHat, Heart, Home, Search } from 'lucide-react'
import './App.css'

function Header() {
  return (
    <header className="app-header">
      <a className="brand" href="/">
        <span className="brand-mark">
          <ChefHat size={20} />
        </span>
        <span>PantryPal</span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/"><Home size={17} /> Home</a>
        <a href="/find-recipes"><Search size={17} /> Find recipes</a>
        <a href="/favorites"><Heart size={17} /> Favorites</a>
      </nav>
    </header>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">
        <section className="welcome-panel">
          <p className="eyebrow">PantryPal</p>
          <h1>Your pantry, your next great meal.</h1>
          <p>The recipe finder is coming together one step at a time.</p>
        </section>
      </main>
      <footer>PantryPal <span>·</span> Turn what you have into something delicious.</footer>
    </div>
  )
}

export default App
