import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fun Block Mining',
  description: 'A Telegram Mini App for Fun Block Mining game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <div className="pb-16 max-w-md mx-auto relative z-10">
          {children}
        </div>
        
        {/* Animated background elements */}
        <div className="fixed inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `rgba(${Math.random() > 0.5 ? '86, 30, 159' : '30, 64, 175'}, ${Math.random() * 0.5 + 0.5})`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(${Math.random() > 0.5 ? '86, 30, 159' : '30, 64, 175'}, 0.8)`,
              }}
            />
          ))}
        </div>
      </body>
    </html>
  )
} 