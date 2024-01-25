import "@/styles/globals.css"

import * as React from "react"
import type { Metadata } from "next"

import { fontInter } from "@/config/fonts"

export const metadata: Metadata = {
  title: "TicketThing",
  description: "Event tickets resale marketplace",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={fontInter.className}>{children}</body>
    </html>
  )
}
