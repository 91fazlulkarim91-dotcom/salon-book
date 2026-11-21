// fazlulkarim91@gmail.com
import Link from "next/link"
import {
  ArrowUpRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Scissors,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="salon-footer" id="contact">
      <div className="salon-footer-main">
        <div className="salon-footer-brand-column">
          <Link className="salon-footer-brand" href="/" aria-label="SalonBook home">
            <span className="salon-footer-brand-mark"><Scissors size={17} /></span>
            <span>Salon<span>Book</span></span>
          </Link>
          <p>Make time for feeling good. Find salon services you love and book with ease.</p>
          <Link className="salon-footer-cta" href="/services">
            Explore services <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="salon-footer-column">
          <h2>Explore</h2>
          <Link href="/">Home</Link>
          <Link href="/services">Browse services</Link>
          <Link href="/#about">About SalonBook</Link>
          <Link href="/dashboard">My appointments</Link>
        </div>

        <div className="salon-footer-column salon-footer-contact">
          <h2>Contact</h2>
          <a href="tel:+8801915622110"><Phone size={15} />+8801915622110</a>
          <a href="mailto:fazlulkarim91@gmail.com"><Mail size={15} /> fazlulkarim91@gmail.com</a>
          <p><MapPin size={15} />Adv. Fazlul Karim House,Mehedi Nogor,Baroiyarhat,Jorargonj,Chittagong </p>
          <p><Clock3 size={15} /> Mon-Sat: 9:00 AM-7:00 PM</p>
        </div>

        <div className="salon-footer-column salon-footer-social">
          <h2>Follow along</h2>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Camera size={16} /> Instagram <ArrowUpRight size={13} />
          </a>
          <a href="https://www.facebook.com/fazlul.karim.351" target="_blank" rel="noreferrer">
            Facebook <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <div className="salon-footer-bottom">
        <span>© 2026 SalonBook. All rights reserved.</span>
        <span className="salon-footer-note">Thoughtful beauty, simply booked.</span>
      </div>
    </footer>
  )
}
