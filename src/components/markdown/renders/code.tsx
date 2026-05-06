import type { ComponentPropsWithoutRef } from 'react'

export function CodeRenderer({ children }: ComponentPropsWithoutRef<'code'>) {
  return <code>{children}</code>
}