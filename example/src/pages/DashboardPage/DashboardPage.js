import React from "react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  return (
    <>
      <div>Protected page</div>
      <p>This is a protected page.</p>

      <ul>
        <li>
          <Link to="/dashboard/invoices">Invoices</Link>
        </li>
        <li>
          <Link to="/">Return to index</Link>
        </li>
      </ul>
    </>
  )
}
