import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports/weekly')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /reports/weekly!'
}
