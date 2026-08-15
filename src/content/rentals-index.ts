import type { Listing } from "./listing-type"
import { baytownRentListings } from "./rentals-baytown"

// Central registry of scraped rental listings per area (from client IDX Broker widgets).
export const rentalsByArea: Record<string, Listing[]> = {
  baytown: baytownRentListings,
}
