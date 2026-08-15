'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { allSearchListings, saleSearchListings, rentSearchListings } from '@/content/search-index'

type Mode = 'buy' | 'rent' | 'sell'

// locations for autocomplete: areas + every city in the listings
const LOCATIONS = Array.from(new Set([
  'Baytown', 'Clear Lake City', 'Clear Lake Shores', 'Deer Park', 'Dickinson',
  'El Lago', 'Friendswood', 'Galveston', 'Kemah', 'La Porte', 'League City',
  'Nassau Bay', 'Pasadena', 'Pearland', 'San Leon', 'Seabrook', 'Shoreacres',
  'Taylor Lake Village', 'Texas City', 'Tiki Island', 'Webster',
  ...allSearchListings.map(l => l.city).filter(Boolean),
])).sort()

const num = (s?: string) => parseInt((s || '').replace(/[^0-9]/g, ''), 10) || 0

export function HomeSearch() {
  const [mode, setMode] = useState<Mode>('buy')
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minSize, setMinSize] = useState('')
  const [beds, setBeds] = useState('')
  const [showSugg, setShowSugg] = useState(false)

  const pool = mode === 'rent' ? rentSearchListings : mode === 'buy' ? saleSearchListings : []
  const maxP = num(maxPrice)
  const minS = num(minSize)
  const minBeds = num(beds)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return pool
      .filter(l => !q || `${l.address} ${l.city} ${l.area} ${l.zip}`.toLowerCase().includes(q))
      .filter(l => !maxP || num(l.price) <= maxP)
      .filter(l => !minS || num(l.sqft) >= minS)
      .filter(l => !minBeds || num(l.beds) >= minBeds)
      .slice(0, 24)
  }, [pool, query, maxP, minS, minBeds])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return LOCATIONS.slice(0, 8)
    return LOCATIONS.filter(l => l.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  const priceOptions = ['Any price', '$150,000', '$200,000', '$250,000', '$300,000', '$400,000', '$500,000', '$750,000', '$1,000,000']
  const sizeOptions = ['Any size', '1,000 sqft', '1,500 sqft', '2,000 sqft', '2,500 sqft', '3,000 sqft', '4,000 sqft']
  const bedsOptions = ['Any beds', '1+', '2+', '3+', '4+', '5+']

  return <div className="home-search-wrap">
    {/* Buy / Rent / Sell choice */}
    <div className="search-mode-tabs" role="tablist" aria-label="Choose what you are looking for">
      {(['buy', 'rent', 'sell'] as Mode[]).map(m => (
        <button key={m} role="tab" aria-selected={mode === m} className={`search-mode-tab${mode === m ? ' active' : ''}`} onClick={() => setMode(m)}>
          {m === 'buy' ? 'Buying a home' : m === 'rent' ? 'Renting a home' : 'Selling a home'}
        </button>
      ))}
    </div>

    {/* Location with autocomplete */}
    <div className="search-field search-location">
      <label htmlFor="hs-location">{mode === 'sell' ? 'Where is your home?' : 'Where do you want to live?'}</label>
      <input
        id="hs-location"
        type="text"
        value={query}
        placeholder={mode === 'sell' ? 'e.g. League City, Seabrook, Friendswood…' : 'Start typing a city or area — e.g. Leag…'}
        onChange={e => { setQuery(e.target.value); setShowSugg(true) }}
        onFocus={() => setShowSugg(true)}
        onBlur={() => setTimeout(() => setShowSugg(false), 150)}
        autoComplete="off"
        role="combobox"
        aria-expanded={showSugg}
        aria-controls="hs-suggestions"
      />
      {showSugg && <ul className="search-suggestions" id="hs-suggestions" role="listbox">
        {suggestions.map(s => <li key={s} role="option" onMouseDown={() => { setQuery(s); setShowSugg(false) }}><span>📍</span>{s}</li>)}
      </ul>}
    </div>

    {/* Filters */}
    <div className="search-filters">
      <div className="search-field">
        <label htmlFor="hs-price">Maximum price</label>
        <select id="hs-price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}>
          {priceOptions.map(p => <option key={p} value={p === 'Any price' ? '' : p}>{p}</option>)}
        </select>
      </div>
      <div className="search-field">
        <label htmlFor="hs-size">House size</label>
        <select id="hs-size" value={minSize} onChange={e => setMinSize(e.target.value)}>
          {sizeOptions.map(s => <option key={s} value={s === 'Any size' ? '' : s}>{s}</option>)}
        </select>
      </div>
      <div className="search-field">
        <label htmlFor="hs-beds">Bedrooms</label>
        <select id="hs-beds" value={beds} onChange={e => setBeds(e.target.value)}>
          {bedsOptions.map(b => <option key={b} value={b === 'Any beds' ? '' : b}>{b}</option>)}
        </select>
      </div>
    </div>

    {/* Results */}
    {mode === 'sell' ? (
      <div className="search-sell-card">
        <h2>Ready to sell?</h2>
        <p>We will complete a free Market Analysis to determine the most accurate price for your home — using comparable sales, current listings, and all amenities — with no obligation.</p>
        <Link className="button button-red" href="/contact/">Get a free Market Analysis <span>↗</span></Link>
      </div>
    ) : (
      <>
        <p className="search-count" role="status">{results.length} {mode === 'rent' ? 'rental' : 'home'}{results.length === 1 ? '' : 's'} found{query && ` near ${query}`}{maxP && ` · up to ${maxPrice}`}</p>
        {results.length === 0 ? (
          <div className="search-empty"><p>No homes match those choices yet. Try a wider price, a smaller size, or a different area — or call us and we will find it for you.</p><Link className="button button-dark" href="/contact/">Ask a Realtor to find it <span>↗</span></Link></div>
        ) : (
          <div className="listing-grid">{results.map(l => <article className="listing-card" key={l.mls}>
            <div className="listing-card-media"><Image src={l.photo} alt={`${l.address}, ${l.city} TX`} fill sizes="(max-width: 700px) 100vw, 33vw" className="listing-card-img" loading="lazy" /><span className="listing-card-price">{l.price}</span></div>
            <div className="listing-card-body"><h3>{l.address}</h3><p className="listing-card-loc">{l.city}, TX {l.zip}</p><div className="listing-card-stats"><span><b>{num(l.beds) || '—'}</b> Beds</span><span><b>{num(l.baths) || '—'}</b> Baths</span>{l.sqft && <span><b>{l.sqft}</b> SqFt</span>}</div>{l.remarks && <p className="listing-card-remarks">{l.remarks}</p>}<p className="listing-card-mls">MLS#{l.mls} · {l.area} · {l.status || 'Active'}</p></div>
          </article>)}</div>
        )}
      </>
    )}
  </div>
}
