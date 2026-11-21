import Link from "next/link"
import { Search } from "lucide-react"
import { TreatmentPicker } from "@/components/home/TreatmentPicker"

const serviceCategories = [
  { label: "Hair", value: "Haircut & styling" },
  { label: "Color", value: "Hair coloring" },
  { label: "Nails", value: "Manicure & pedicure" },
  { label: "Skin care", value: "Facial & skincare" },
  { label: "Brows & lashes", value: "Brows & lashes" },
  { label: "Massage", value: "Spa & massage" },
  { label: "Makeup", value: "Makeup" },
  { label: "Wellness & spa", value: "Spa & massage" },
]

export default function Home() {
  return (
    <main className="home-page">
      <section className="discovery-hero" aria-labelledby="discovery-title">
        <div className="discovery-content">
          <h1 id="discovery-title">Your next favorite look starts here</h1>
          <p className="discovery-description">
            Discover and book thoughtful salon services, all in one place.
          </p>

          <form className="discovery-search" action="/services" method="get">
            <label className="discovery-service-query">
              <Search size={20} aria-hidden="true" />
              <input
                type="search"
                name="search"
                placeholder="Search services or businesses"
                aria-label="Search services or businesses"
              />
            </label>
            <TreatmentPicker />
            <button className="discovery-submit" type="submit">
              <Search size={18} aria-hidden="true" />
              <span>Search</span>
            </button>
          </form>

          <nav className="discovery-categories" aria-label="Popular service categories">
            {serviceCategories.map((category) => (
              <Link
                href={`/services?category=${encodeURIComponent(category.value)}`}
                key={category.label}
              >
                {category.label}
              </Link>
            ))}
            <Link className="discovery-category-more" href="/services">More...</Link>
          </nav>
        </div>
      </section>
    </main>
  )
}
