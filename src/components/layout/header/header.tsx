import { cn } from '@/utils/class-name'
import { useSidebar } from '@/hooks/layout/use-sidebar'
import { HeaderContent } from './header-content'
import { usePageTitle } from '@/utils/set-page-title'

export function Header() {
  const pageTitle = usePageTitle()
  const { isCollapse } = useSidebar()

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-30 w-full py-5 bg-background/60 backdrop-blur-sm',
        isCollapse
          ? 'md:ml-[80px] md:max-w-[calc(100vw_-_80px)]'
          : 'md:ml-[220px] md:max-w-[calc(100vw_-_220px)]',
      )}
    >
      <div className="flex h-12 w-full items-center justify-between px-10 pt-2">
        <div className="flex items-center justify-center">
          <div className="space-y-1">
            <p className="text-sm text-gray-300">Página / {pageTitle}</p>
            <h3 className="text-2xl font-semibold text-textPrimary">
              {pageTitle}
            </h3>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <HeaderContent />
        </nav>
      </div>
    </header>
  )
}
