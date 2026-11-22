"use client"

import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { useRef } from "react"

const reviews = [
  {
    title: "Great way to discover new salons",
    text: "Recently moved to a new city and didn't know any salons. Fresha gave me a whole new list to choose from!",
    name: "Ciara",
    location: "Los Angeles, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    title: "Sleek app",
    text: "Such a sleek and powerful app. I highly recommend booking your appointments on Fresha.",
    name: "Jonny",
    location: "Melbourne, Australia",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    title: "All my clients love it",
    text: "My clients love booking appointments online with Fresha. The consultation forms and free SMS reminders are so convenient.",
    name: "Anton",
    location: "Los Angeles, USA",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    title: "So many great booking features",
    text: "Love this beauty booking app. There are so many great features to explore. The consultation forms and client reminder texts are great - best of all, it's free.",
    name: "Susan",
    location: "Brisbane, Australia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
  },
]

export function Reviews() {
  const railRef = useRef<HTMLDivElement>(null)

  function scroll(direction: "left" | "right") {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction === "left" ? -rail.clientWidth : rail.clientWidth,
      behavior: "smooth",
    })
  }

  return (
    <section className="reviews-section" aria-labelledby="reviews-title" data-aos="fade-up">
      <div className="reviews-inner">
        <div className="reviews-heading">
          <div>
            <span className="reviews-eyebrow">Client stories</span>
            <h2 id="reviews-title">Loved on SalonBook</h2>
          </div>
          <div className="reviews-rating" aria-label="Rated 5 out of 5">
            <div className="reviews-rating-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span>5.0 from verified clients</span>
          </div>
        </div>
        <div className="reviews-rail-wrap">
          <button
            className="reviews-arrow reviews-arrow-left"
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll reviews left"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="reviews-rail" ref={railRef} role="region" aria-label="Customer reviews" tabIndex={0}>
            {reviews.map((review) => (
              <article
                className="review-card"
                key={review.name}
                data-aos="fade-up"
                data-aos-delay={String(reviews.indexOf(review) * 100)}
              >
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={19} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <h3>{review.title}</h3>
                <p className="review-text">{review.text}</p>
                <div className="review-person">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={review.avatar} alt="" loading="lazy" />
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button
            className="reviews-arrow reviews-arrow-right"
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll reviews right"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
