"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef } from "react"

const salonRows: { id: string; title: string; images: string[] }[] = [
  {
    id: "recommended",
    title: "Recommended",
    images: [
      "photo-1600948836101-f9ffda59d250",
      "photo-1522337360788-8b13dee7a37e",
      "photo-1570172619644-dfd03ed5d881",
      "photo-1560066984-138dadb4c035",
      "photo-1521590832167-7bcbfaa6381f",
      "photo-1487412947147-5cebf100ffc2",
    ],
  },
  {
    id: "new-on-salonbook",
    title: "New to SalonBook",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1FJdrNfNYjT-lioTjKR6CkV45b9RiEpEbeoXGYXmw_rh573RtsDquCKc&s=10",
      "photo-1544161515-4ab6ce6db874",
      "photo-1616394584738-fc6e612e71b9",
      "photo-1632345031435-8727f6897d53",
      "photo-1600334129128-685c5582fd35",
      "photo-1604654894610-df63bc536371",
    ],
  },
  {
    id: "trending",
    title: "Trending",
    images: [
      "https://images.fresha.com/locations/location-profile-images/646183/2837823/65b7f65d-4983-43e3-ab31-abf6f9bec789-TrendyTrim-BD-DhakaDivision-Dhaka-Mirpur-Fresha.jpg?class=venue-gallery-large&f_width=1200&f_quality=75",
      "photo-1503951914875-452162b0f3f1",
      "photo-1560750588-73207b1ef5b8",
      "photo-1600334129128-685c5582fd35",
      "photo-1527799820374-dcf8d9d4a388",
      "photo-1512290923902-8a9f81dc236c",
    ],
  },
]

function getImageUrl(image: string) {
  if (image.startsWith("https://")) return image
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=80`
}

function SalonCarousel({ id, title, images }: { id: string; title: string; images: string[] }) {
  const railRef = useRef<HTMLDivElement>(null)

  function scrollRail(direction: "left" | "right") {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction === "left" ? -rail.clientWidth : rail.clientWidth,
      behavior: "smooth",
    })
  }

  return (
    <section className="salon-discovery-row" aria-labelledby={`${id}-title`} data-aos="fade-up">
      <div className="salon-discovery-heading">
        <h2 id={`${id}-title`}>{title}</h2>
        <div className="salon-carousel-controls">
          <button type="button" onClick={() => scrollRail("left")} aria-label={`Scroll ${title} left`}>
            <ArrowLeft size={16} />
          </button>
          <button type="button" onClick={() => scrollRail("right")} aria-label={`Scroll ${title} right`}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="salon-card-rail" ref={railRef} role="region" aria-label={`${title} salons`} tabIndex={0}>
        {images.map((image, index) => (
          <Link
            href="/salons/samis-brow-and-lashes"
            className="salon-listing-card"
            key={`${id}-${image}`}
            aria-label={`Browse salons in ${title.toLowerCase()}, image ${index + 1}`}
          >
            <div className="salon-listing-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(image)}
                alt=""
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function SalonDiscovery() {
  return (
    <div className="salon-discovery">
      {salonRows.map((row) => <SalonCarousel key={row.id} {...row} />)}
    </div>
  )
}
