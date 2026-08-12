import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clear Lake Tx Realtors | Realtors in Clear Lake Texas',
  description: '1st Texas Realtors in Clear Lake — local realtors, real-time listings, buying, selling, renting, and property management.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
