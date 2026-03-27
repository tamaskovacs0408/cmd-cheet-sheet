import { categories } from "@/data";
import { CategoryCard } from "@/components/ui/CategoryCard/CategoryCard";
import "./home-page.scss";

export default function HomePage() {
  return (
    <div className='home-page'>
      <section className='home-page__hero'>
        <h1 className='home-page__title'>
          Command <span className='home-page__title-accent'>Cheat Sheet</span>
        </h1>
        <p className='home-page__subtitle'>
          Your developer command reference. Browse, search, and copy the CLI
          commands you need.
        </p>
      </section>

      <section className='home-page__categories'>
        <h2 className='home-page__section-title'>Choose a category</h2>
        <div className='home-page__grid'>
          {categories.map(category => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
