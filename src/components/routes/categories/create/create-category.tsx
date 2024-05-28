"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormRender } from "@/shared/form/form-field-dynamic/FormRender";
import { CreateCategoryType } from "@/validations/create-category-schema";
import { PlusCircle } from "lucide-react";
import { useCreateCategoryFormField } from "./create-category-form-field";
import { useCreateCategory } from "./use-create-category";

export function CreateCategory() {
  const { mutateAsync, isPending } = useCreateCategory()
  const { form, CREATE_CATEGORY_FORM_FIELD } = useCreateCategoryFormField();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white">
          <PlusCircle className="size-4 mr-2" />
          Criar categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-textPrimary">Criar categoria</DialogTitle>
        <FormRender<CreateCategoryType>
          constant={CREATE_CATEGORY_FORM_FIELD}
          form={form}
          onSubmit={mutateAsync}
        >
          <div className="w-full flex justify-end space-x-4">
            <DialogClose>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>Criar</Button>
          </div>
        </FormRender>
      </DialogContent>
    </Dialog>
  );
}
