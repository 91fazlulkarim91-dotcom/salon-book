import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowUpRight,
  Clock3,
  Scissors,
  Star,
} from "lucide-react"

const salonId = "samis-brow-and-lashes"

const gallery = [
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=700&q=85",
]

const serviceNames = [
  "Brow shaping & mapping",
  "Lash lift",
  "High definition brows",
  "Lash extensions",
  "Brow tint",
  "Lash lift & tint",
]

function SalonImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={src} alt={alt} />
  )
}

export default async function SalonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id !== salonId) notFound()

  return (
    <main className="salon-detail-page">
      <div className="salon-detail-container">
        <nav className="salon-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services">Browse services</Link>
          <span>/</span>
          <span>Sami&apos;s brow and lashes</span>
        </nav>

        <section className="salon-detail-gallery" aria-label="Salon photos">
          <SalonImage src={gallery[0]} alt="Salon interior" className="salon-gallery-main" />
          <SalonImage src={gallery[1]} alt="Salon styling area" className="salon-gallery-side" />
          <SalonImage src={gallery[2]} alt="Salon treatment space" className="salon-gallery-side" />
        </section>

        <div className="salon-detail-layout">
          <div className="salon-detail-main">
            <header className="salon-profile-header">
              <div>
                <p className="salon-detail-category">Brows &amp; lashes</p>
                <h1>Sami&apos;s brow and lashes</h1>
                <div className="salon-detail-rating">
                  <Star size={16} fill="currentColor" />
                  <strong>4.9</strong>
                  <a href="#salon-reviews">Reviews</a>
                </div>
              </div>
              <Link className="salon-share-link" href="#salon-services">
                View services <ArrowUpRight size={16} />
              </Link>
            </header>

            <nav className="salon-section-nav" aria-label="Salon details sections">
              <a href="#salon-services">Services</a>
              <a href="#salon-team">Team</a>
              <a href="#salon-reviews">Reviews</a>
            </nav>

            <section className="salon-detail-section" id="salon-services">
              <div className="salon-detail-section-heading">
                <div>
                  <h2>Services</h2>
                  <p>Choose a service to see available appointment times.</p>
                </div>
                <span className="salon-service-count">{serviceNames.length} services</span>
              </div>
              <div className="salon-services-list">
                {serviceNames.map((name) => (
                  <article className="salon-service-row" key={name}>
                    <span className="salon-service-icon"><Scissors size={17} /></span>
                    <div className="salon-service-copy">
                      <h3>{name}</h3>
                      <span>Brows &amp; lashes</span>
                    </div>
                    <Link href="/sign-in" className="salon-service-book">Book</Link>
                  </article>
                ))}
              </div>
            </section>

            <section className="salon-detail-section salon-team-section" id="salon-team">
              <div className="salon-detail-section-heading">
                <div>
                  <h2>Team</h2>
                  <p>Meet the people behind your appointment.</p>
                </div>
              </div>
              <p className="salon-detail-empty">Team profiles will appear here when available.</p>
            </section>

            <section className="salon-detail-section salon-reviews-section" id="salon-reviews">
              <div className="salon-detail-section-heading">
                <div>
                  <h2>Reviews</h2>
                  <p>Customer feedback for this salon.</p>
                </div>
                <Link href="/sign-in" className="salon-review-action">Write a review</Link>
              </div>
              <div className="salon-review-summary">
                <Star size={22} fill="currentColor" />
                <strong>4.9</strong>
                <span>out of 5</span>
              </div>
              <p className="salon-detail-empty">Review details will appear here when available.</p>
            </section>
          </div>

          <aside className="salon-booking-card">
            <span className="salon-booking-eyebrow">Ready for your visit?</span>
            <h2>Book an appointment</h2>
            <p>Select a service and request a time that works for you.</p>
            <Link href="/sign-in" className="salon-booking-button">Choose a service</Link>
            <div className="salon-booking-note">
              <Clock3 size={15} />
              <span>Appointment requests are confirmed by the salon.</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
