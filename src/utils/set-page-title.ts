import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { routeTitles } from './route-titles'

const defaultTitle = 'Aplicação'

export function usePageTitle() {
  const [title, setTitle] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const newTitle = routeTitles[pathname as PrivateRoutes] || defaultTitle
    setTitle(newTitle)
  }, [pathname])

  return title
}
