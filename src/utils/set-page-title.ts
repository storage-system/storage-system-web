import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PrivateRoutes } from "@/constants/routes/private-routes";

type RouteTitles = {
  [key in PrivateRoutes]: string;
};

const routeTitles: RouteTitles = {
  [PrivateRoutes.HOME]: 'Início',
  [PrivateRoutes.CATEGORY]: 'Categorias',
};

const defaultTitle = 'Aplicação';

export function usePageTitle() {
  const [title, setTitle] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const newTitle = routeTitles[pathname as PrivateRoutes] || defaultTitle;
    setTitle(newTitle);
  }, [pathname]);

  return title;
}
