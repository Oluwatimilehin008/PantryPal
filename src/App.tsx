import { ArrowRight, ChefHat, Heart, Home, Leaf, Search, Sparkles, X } from 'lucide-react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { getNutrient, searchRecipes } from './api/spoonacular'
import type { Recipe } from './api/spoonacular'
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
  const [ingredients, setIngredients] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function addIngredient(event: React.FormEvent) {
    event.preventDefault()
    const value = input.trim().toLowerCase()
    if (value && !ingredients.includes(value)) {
      setIngredients([...ingredients, value])
      setInput('')
    }
  }

  async function findRecipes() {
    if (ingredients.length === 0) {
      setError('Add at least one ingredient first.')
      return
    }

    setError('')
    setIsLoading(true)
    try {
      setRecipes(await searchRecipes(ingredients))
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Something went wrong while searching.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow"><Search size={16} /> Recipe finder</p>
        <h1>What do you have on hand?</h1>
        <p>Add a few ingredients and we&apos;ll find recipes that fit your pantry.</p>
      </section>
      <section className="finder-card">
        <form className="ingredient-form" onSubmit={addIngredient}>
          <label htmlFor="ingredient">Your ingredients</label>
          <div className="input-row">
            <input
              id="ingredient"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="e.g. tomatoes, rice, eggs"
            />
            <button className="primary-button" type="submit">Add</button>
          </div>
        </form>
        <div className="ingredient-list" aria-live="polite">
          {ingredients.length === 0 && <p className="empty-message">Your ingredients will appear here.</p>}
          {ingredients.map((ingredient) => (
            <span className="ingredient-pill" key={ingredient}>
              {ingredient}
              <button
                type="button"
                aria-label={`Remove ${ingredient}`}
                onClick={() => setIngredients(ingredients.filter((item) => item !== ingredient))}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <button className="primary-button search-button" type="button" onClick={findRecipes} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Find recipes'} <Search size={17} />
        </button>
        {error && <p className="api-error" role="alert">{error}</p>}
        {recipes.length > 0 && !error && (
          <div className="recipe-grid">
            {recipes.map((recipe) => {
              const calories = getNutrient(recipe, 'Calories')
              const protein = getNutrient(recipe, 'Protein')
              return (
                <article className="recipe-card" key={recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />
                  <div className="recipe-card-body">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.readyInMinutes} min · serves {recipe.servings}</p>
                    <div className="nutrition-row">
                      <span>{calories ? `${Math.round(calories.amount)} ${calories.unit}` : 'Calories n/a'}</span>
                      <span>{protein ? `${Math.round(protein.amount)}${protein.unit} protein` : 'Protein n/a'}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
        {recipes.length === 0 && !error && !isLoading && (
          <div className="finder-placeholder">
            <ChefHat size={30} />
            <h2>Recipes will appear here</h2>
            <p>Connect your pantry to discover your next favorite meal.</p>
          </div>
        )}
      </section>
    </>
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
