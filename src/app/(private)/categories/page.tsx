import { CreateCategory } from "@/components/routes/categories/create/create-category";
import { TableCategories } from "@/components/routes/categories/list/table-categories";
import { Card } from "@/components/ui/card";

export default async function CategoriesPage() {
  return (
    <div className="space-y-4 flex flex-col items-end">
      <CreateCategory />
      <Card className="w-full">
        <TableCategories />
      </Card>
    </div>
  )
}