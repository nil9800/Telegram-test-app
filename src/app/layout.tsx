import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lamion - Puzzle Mining Game',
  description: 'A fun puzzle mining game where you arrange blocks to mine levels',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-[#0f0f23] to-[#1a1a3a]">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
} 