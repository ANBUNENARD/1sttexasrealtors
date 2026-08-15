import { baytownListings, type Listing } from './listings-baytown'

// Central registry of scraped property listings per area.
// Each area file is generated from the client's IDX Broker widgets (1sttexasrealtors.com).
export const listingsByArea: Record<string, Listing[]> = {
  baytown: baytownListings,
}
