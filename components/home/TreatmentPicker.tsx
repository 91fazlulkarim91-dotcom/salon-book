"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Search, Scissors, Sparkles, UserRound } from "lucide-react"

const treatments = [
  "Haircut & styling",
  "Hair coloring",
  "Hair treatment",
  "Facial & skincare",
  "Makeup",
  "Manicure & pedicure",
  "Spa & massage",
  "Brows & lashes",
  "Waxing",
]

type SearchTab = "Treatments" | "Venues" | "Professionals"

const tabs: SearchTab[] = ["Treatments", "Venues", "Professionals"]

export function TreatmentPicker() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<SearchTab>("Treatments")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [venue, setVenue] = useState("")
  const [professional, setProfessional] = useState("")
  const [displayValue, setDisplayValue] = useState("All treatments")
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const options = activeTab === "Treatments"
    ? treatments
    : activeTab === "Venues"
      ? ["SalonBook"]
      : ["SalonBook team"]
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()))

  function chooseOption(option: string) {
    setDisplayValue(option)
    if (activeTab === "Treatments") {
      setCategory(option === "All treatments" ? "" : option)
      setVenue("")
      setProfessional("")
    } else if (activeTab === "Venues") {
      setVenue(option)
      setCategory("")
      setProfessional("")
    } else {
      setProfessional(option)
      setCategory("")
      setVenue("")
    }
    setOpen(false)
    setQuery("")
  }

  return (
    <div className="discovery-treatment-picker" ref={pickerRef}>
      <button
        className="discovery-field discovery-treatment-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-label="Choose a treatment, venue, or professional"
        aria-expanded={open}
        aria-controls="treatment-picker-popover"
        onClick={() => setOpen((current) => !current)}
      >
        <Sparkles size={16} aria-hidden="true" />
        <span>{displayValue === "All treatments" ? "Treatments" : displayValue}</span>
      </button>
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="venue" value={venue} />
      <input type="hidden" name="professional" value={professional} />

      {open && (
        <div
          className="treatment-picker-popover"
          id="treatment-picker-popover"
          role="dialog"
          aria-label="Choose a treatment, venue, or professional"
        >
          <label className="treatment-picker-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${activeTab.toLowerCase()}`}
              aria-label={`Search ${activeTab.toLowerCase()}`}
            />
          </label>
          <div className="treatment-picker-tabs" role="tablist" aria-label="Search by">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls="treatment-picker-panel"
                onClick={() => {
                  setActiveTab(tab)
                  setQuery("")
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="treatment-picker-options" id="treatment-picker-panel" role="tabpanel">
            {activeTab === "Treatments" && (
              <button
                className="treatment-picker-option"
                type="button"
                aria-pressed={!category}
                onClick={() => chooseOption("All treatments")}
              >
                <span className="treatment-option-icon"><Sparkles size={16} /></span>
                <span>All treatments</span>
              </button>
            )}
            {filteredOptions.map((option) => (
              <button
                className="treatment-picker-option"
                key={option}
                type="button"
                aria-pressed={displayValue === option}
                onClick={() => chooseOption(option)}
              >
                <span className="treatment-option-icon">
                  {activeTab === "Treatments" ? <Scissors size={16} /> : activeTab === "Venues" ? <MapPin size={16} /> : <UserRound size={16} />}
                </span>
                <span>{option}</span>
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <p className="treatment-picker-empty">No matches. Try another search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
