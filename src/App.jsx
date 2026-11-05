import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Bookmark, Check, ChevronDown, Clock3, Heart, Leaf, Menu, Search, Sparkles, Star, X } from "lucide-react";

const recipes = [
  { id: 1, name: "Green goddess nourish bowl", category: "Detox", time: 20, calories: 380, rating: "4.9", image: "photo-1512621776951-a57141f2eefd", description: "A bright, satisfying bowl packed with crisp greens, avocado, herby dressing and seeds.", ingredients: ["1 ripe avocado", "2 cups baby spinach", "1 cup cooked quinoa", "½ cucumber", "2 tbsp green goddess dressing"], steps: ["Add the spinach and quinoa to a wide bowl.", "Slice the avocado and cucumber, then arrange over the greens.", "Finish with dressing, herbs and a pinch of flaky salt."] },
  { id: 2, name: "Citrus sunshine smoothie", category: "Drink", time: 8, calories: 240, rating: "4.8", image: "photo-1505252585461-04db1eb84625", description: "A refreshing blend of orange, mango and ginger for a naturally bright start.", ingredients: ["1 orange, peeled", "1 cup frozen mango", "½ banana", "½ tsp fresh ginger", "¾ cup oat milk"], steps: ["Add all ingredients to a blender.", "Blend until smooth and creamy.", "Pour into a chilled glass and enjoy right away."] },
  { id: 3, name: "Roasted tomato & basil toast", category: "Wellness", time: 25, calories: 310, rating: "4.9", image: "photo-1525351484163-7529414344d8", description: "Sweet roasted tomatoes and garden basil over creamy whipped ricotta and toast.", ingredients: ["2 thick slices sourdough", "1 cup cherry tomatoes", "¼ cup ricotta", "Fresh basil", "1 tsp olive oil"], steps: ["Roast tomatoes with olive oil at 200°C until soft.", "Toast the sourdough and spread with ricotta.", "Pile on tomatoes and finish with torn basil."] },
  { id: 4, name: "Creamy lemon herb pasta", category: "Wellness", time: 30, calories: 460, rating: "4.7", image: "photo-1476124369491-e7addf5db371", description: "A comforting weeknight pasta with lemon, greens and a light, silky sauce.", ingredients: ["200g pasta", "1 lemon", "2 cups baby kale", "⅓ cup parmesan", "2 tbsp Greek yogurt"], steps: ["Cook pasta until just al dente, reserving a mug of water.", "Stir lemon, yogurt and parmesan into the warm pasta.", "Fold in kale until just wilted and loosen with pasta water."] },
  { id: 5, name: "Berry & oat breakfast bowl", category: "Snack", time: 10, calories: 290, rating: "4.8", image: "photo-1490474418585-ba9bad8fd0ea", description: "Creamy oats with sweet berries, crunchy seeds and a little maple.", ingredients: ["½ cup rolled oats", "¾ cup milk of choice", "½ cup mixed berries", "1 tbsp chia seeds", "1 tsp maple syrup"], steps: ["Simmer oats and milk until creamy.", "Spoon into a bowl and add berries and chia.", "Drizzle with maple and serve warm."] },
  { id: 6, name: "Golden roasted veggie plate", category: "Detox", time: 35, calories: 420, rating: "4.9", image: "photo-1547592180-85f173990554", description: "Colorful seasonal vegetables with tahini, lemon and warming spices.", ingredients: ["1 sweet potato", "1 red pepper", "1 cup chickpeas", "2 tbsp tahini", "½ tsp smoked paprika"], steps: ["Chop vegetables and toss with paprika and olive oil.", "Roast with chickpeas at 210°C until golden.", "Drizzle with lemon tahini and serve." ] },
];
const categories = ["All recipes", "Detox", "Drink", "Wellness", "Snack"];
const nav = ["Detox", "Drink", "Wellness", "Snack", "Learn"];
const img = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function App() {
  const [activeCategory, setActiveCategory] = useState("All recipes");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const visibleRecipes = useMemo(() => recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "All recipes" || recipe.category === activeCategory;
    const matchesSaved = !showSaved || saved.includes(recipe.id);
    const matchesQuery = `${recipe.name} ${recipe.category} ${recipe.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSaved && matchesQuery;
  }), [activeCategory, query, showSaved, saved]);

  const toggleSaved = (id) => setSaved((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  const chooseCategory = (category) => {
    setActiveCategory(category);
    setShowSaved(false);
    document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" });
  };
  const submitNewsletter = (event) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <main className="site-shell" id="top">
      <div className="announcement"><span className="announcement-icon">✳</span> A happier plate starts with the little things <span className="announcement-divider">·</span> Fresh ideas, every week</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NutriNest home"><span className="brand-mark"><Leaf size={19} /></span><span>nutri<span className="brand-light">nest</span><i>.</i></span></a>
        <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          {nav.map((item) => <a key={item} href={item === "Learn" ? "#about" : "#recipes"} onClick={() => { setMenuOpen(false); if (item === "Learn") document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); else chooseCategory(item); }}>{item}</a>)}
          <a href="#rewards" onClick={() => setMenuOpen(false)}>Jus Jus Rewards</a>
        </nav>
        <div className="header-actions">
          <button className={`saved-link ${showSaved ? "saved-link-active" : ""}`} onClick={() => { setShowSaved(!showSaved); setActiveCategory("All recipes"); document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" }); }}><Bookmark size={15} /> <span>My recipes</span>{saved.length > 0 && <b>{saved.length}</b>}</button>
          <button className="search-toggle" aria-label="Search recipes" onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => document.getElementById("recipe-search")?.focus(), 0); }}>{searchOpen ? <X size={19} /> : <Search size={19} />}</button>
          <a className="header-cta" href="#recipes">Get inspired <ArrowRight size={14} /></a>
          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>
      {searchOpen && <div className="search-drawer"><Search size={19} /><input id="recipe-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search recipes, ingredients, or moods..." /><button onClick={() => { setQuery(""); setSearchOpen(false); }} aria-label="Close search"><X size={18} /></button></div>}

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-line" /> FOOD THAT FEELS LIKE YOU <span className="kicker-star">✳</span></div>
          <h1>A place you<br /><em>eat healthy.</em></h1>
          <p>Good food brings us closer. Come join our little community of feel-good cooks, curious eaters, and everyday wellness seekers.</p>
          <a className="button button-dark" href="#recipes">Explore the menu <ArrowRight size={16} /></a>
          <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><div className="proof-stars"><Star/><Star/><Star/><Star/><Star/></div><span>Good food, shared by <b>2,400+</b> happy eaters</span></div></div>
          <div className="hero-note"><span>✳</span> A little more joy in every bite</div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
          <div className="hero-image"><img src={img("photo-1512621776951-a57141f2eefd", 1400)} alt="Colorful fresh salad with avocado, tomatoes, greens and grains" /></div>
          <div className="hero-float float-top"><span className="float-icon">✿</span><span><b>Fresh picks</b><small>Made with good things</small></span></div>
          <div className="hero-float float-bottom"><span className="float-leaf"><Leaf size={19}/></span><span><b>Feel-good food</b><small>Every day, your way</small></span></div>
          <div className="hero-sticker"><span>GOOD<br/>MOOD<br/>FOOD</span><span className="sticker-star">✳</span></div>
          <div className="hero-caption"><span className="caption-dot"/> OUR KIND OF COLORFUL</div>
        </div>
        <a className="scroll-cue" href="#recipes"><ArrowDown size={14}/> SCROLL FOR A LITTLE GOODNESS</a>
        <span className="hero-side-note">NOURISH · ENJOY · REPEAT</span>
      </section>

      <section className="values-strip" aria-label="Our values"><div><span>01</span><b>Real ingredients</b><small>Nothing weird, just good</small></div><div><span>02</span><b>Made with joy</b><small>Healthy can be happy</small></div><div><span>03</span><b>For every day</b><small>Simple enough for real life</small></div><div><span className="values-flower">✳</span><b>Always a little fresh</b><small>Come as you are</small></div></section>

      <section className="recipe-section" id="recipes">
        <div className="section-top"><div><div className="section-kicker"><span/> THE GOOD STUFF</div><h2>Something lovely<br/><em>for your table.</em></h2></div><p className="section-intro">A collection of feel-good favorites—fresh, simple, and full of things your body loves.</p></div>
        <div className="recipe-tools"><div className="filter-pills">{categories.map((category) => <button key={category} className={`filter ${activeCategory === category && !showSaved ? "active" : ""}`} onClick={() => { setActiveCategory(category); setShowSaved(false); }}>{category}{category === "All recipes" && <span>{recipes.length}</span>}</button>)}</div><button className={`saved-filter ${showSaved ? "is-selected" : ""}`} onClick={() => setShowSaved(!showSaved)}><Bookmark size={14}/>{showSaved ? "All recipes" : `Saved${saved.length ? ` (${saved.length})` : ""}`}</button></div>
        <div className="recipe-grid">
          {visibleRecipes.map((recipe, index) => <article className={`recipe-card recipe-card-${index % 3}`} key={recipe.id}>
            <button className="recipe-image" onClick={() => setSelectedRecipe(recipe)} aria-label={`View ${recipe.name}`}><img src={img(recipe.image, 850)} alt={recipe.name} loading="lazy"/><span className="category-tag">{recipe.category}</span><span className="recipe-rating"><Star size={12} fill="currentColor"/> {recipe.rating}</span></button>
            <button className={`save-button ${saved.includes(recipe.id) ? "is-saved" : ""}`} onClick={() => toggleSaved(recipe.id)} aria-label={saved.includes(recipe.id) ? `Remove ${recipe.name} from saved` : `Save ${recipe.name}`}><Heart size={17} fill={saved.includes(recipe.id) ? "currentColor" : "none"}/></button>
            <div className="recipe-meta"><span><Clock3 size={13}/> {recipe.time} min</span><span>{recipe.calories} kcal</span></div><h3>{recipe.name}</h3><p>{recipe.description}</p><button className="card-link" onClick={() => setSelectedRecipe(recipe)}>See the recipe <ArrowRight size={14}/></button>
          </article>)}
          {visibleRecipes.length === 0 && <div className="empty-state"><span>✳</span><h3>{showSaved ? "Your saved recipes will live here." : "No recipes found just yet."}</h3><p>{showSaved ? "Tap the little heart on anything that looks good." : "Try a different search or category."}</p><button onClick={() => { setQuery(""); setShowSaved(false); setActiveCategory("All recipes"); }}>Show all recipes</button></div>}
        </div>
        {!showSaved && <button className="more-button" onClick={() => setActiveCategory("All recipes")}>You’re all caught up <span>✳</span></button>}
      </section>

      <section className="wellness-section" id="about">
        <div className="wellness-image"><img src={img("photo-1547592180-85f173990554", 1200)} alt="A table of fresh plant-based ingredients" loading="lazy"/><span className="image-label">A GOOD PLACE TO BEGIN</span><div className="wellness-stamp"><span>GOOD<br/>FOOD<br/>CLUB</span><Sparkles size={18}/></div></div>
        <div className="wellness-copy"><div className="section-kicker"><span/> A LITTLE ABOUT US</div><h2>Wellness looks<br/>good <em>on you.</em></h2><p>We believe eating well should feel like an invitation, not a rulebook. That’s why we make recipes for real kitchens, real cravings, and every kind of day.</p><p>Pull up a chair. There’s always room for one more at our table.</p><a href="#newsletter" className="button button-outline">Come on in <ArrowRight size={15}/></a><div className="wellness-signature">Made with love & a little lemon <span>✳</span></div></div>
      </section>

      <section className="rewards-section" id="rewards"><span className="rewards-spark">✳</span><div className="rewards-copy"><div className="section-kicker"><span/> THE LITTLE JOY CLUB</div><h2>Good things grow<br/>when we <em>share.</em></h2><p>Save your favorites, find your next feel-good meal, and collect little rewards along the way.</p><a href="#recipes" className="button button-light">Find your feel-good <ArrowRight size={15}/></a></div><div className="rewards-card"><div className="reward-top"><span>YOUR GOOD MOOD BOARD</span><span className="reward-icon">✿</span></div><div className="reward-score"><strong>{saved.length.toString().padStart(2,"0")}</strong><span>lovely little<br/>recipes saved</span></div><div className="reward-progress"><span style={{width:`${Math.min(100, saved.length * 20)}%`}}/></div><div className="reward-foot"><span>Keep exploring</span><span>Next perk <ArrowRight size={13}/></span></div></div></section>

      <section className="newsletter-section" id="newsletter"><div className="newsletter-spark">✳</div><div className="section-kicker"><span/> A NOTE FROM OUR KITCHEN</div><h2>A little good<br/>in your <em>inbox.</em></h2><p>New recipes, fresh ideas, and the occasional reminder to enjoy your lunch. No noise, promise.</p>{subscribed ? <div className="subscribe-success"><Check size={17}/> You’re on the list. See you in your inbox!</div> : <form className="newsletter-form" onSubmit={submitNewsletter}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)}/><button type="submit">Count me in <ArrowRight size={15}/></button></form>}<small>By signing up, you agree to receive our occasional good things.</small></section>

      <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><Leaf size={18}/></span><span>nutri<span className="brand-light">nest</span><i>.</i></span></a><span className="footer-note">Good food, good mood, every day.</span><nav><a href="#about">Our story</a><a href="#recipes">Recipes</a><a href="#newsletter">Say hello</a></nav><span className="footer-copy">© 2025 NutriNest · Made with a little love <span>✳</span></span></footer>

      {selectedRecipe && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedRecipe(null); }}><section className="recipe-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setSelectedRecipe(null)} aria-label="Close recipe"><X size={20}/></button><div className="modal-image"><img src={img(selectedRecipe.image, 1200)} alt={selectedRecipe.name}/><span className="category-tag">{selectedRecipe.category}</span></div><div className="modal-body"><div className="modal-kicker">✳ A NUTRINEST FAVORITE</div><h2 id="modal-title">{selectedRecipe.name}</h2><p className="modal-description">{selectedRecipe.description}</p><div className="modal-stats"><span><Clock3 size={15}/>{selectedRecipe.time} min</span><span>◉ {selectedRecipe.calories} kcal</span><span><Star size={14} fill="currentColor"/>{selectedRecipe.rating}</span></div><div className="modal-columns"><div><h3>What you’ll need</h3><ul>{selectedRecipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul></div><div><h3>Let’s make it</h3><ol>{selectedRecipe.steps.map((step) => <li key={step}>{step}</li>)}</ol></div></div><button className={`modal-save ${saved.includes(selectedRecipe.id) ? "is-saved" : ""}`} onClick={() => toggleSaved(selectedRecipe.id)}><Heart size={16} fill={saved.includes(selectedRecipe.id) ? "currentColor" : "none"}/>{saved.includes(selectedRecipe.id) ? "Saved to my recipes" : "Save this recipe"}</button></div></section></div>}
    </main>
  );
}

export default App;
