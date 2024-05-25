import { CreateCategory } from "@/components/routes/categories/create/create-category";
import { Card } from "@/components/ui/card";

export default async function CategoriesPage() {
  return(
    <div className="space-y-4 flex flex-col items-end">
      <CreateCategory />
      <Card className="w-full">
        Criar categoria
      </Card>
    </div>
  )
}