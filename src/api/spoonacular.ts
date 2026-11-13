export type Recipe = {
  id: number
  title: string
  image: string
  servings: number
  readyInMinutes: number
  nutrition?: {
    nutrients: Array<{ name: string; amount: number; unit: string }>
  }
}

type SearchResponse = {
  results: Recipe[]
}

export async function searchRecipes(ingredients: string[]): Promise<Recipe[]> {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY
  if (!apiKey) {
    throw new Error('Add VITE_SPOONACULAR_API_KEY to your .env.local file before searching.')
  }

  const params = new URLSearchParams({
    apiKey,
    includeIngredients: ingredients.join(','),
    addRecipeNutrition: 'true',
    instructionsRequired: 'true',
    number: '12',
    ranking: '1',
  })
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params}`)
  if (!response.ok) {
    throw new Error('Spoonacular could not find recipes right now. Please try again.')
  }

  const data = (await response.json()) as SearchResponse
  return data.results
}

export function getNutrient(recipe: Recipe, nutrientName: string) {
  return recipe.nutrition?.nutrients.find((nutrient) => nutrient.name === nutrientName)
}
