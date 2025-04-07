'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CloudDownload, CloudUpload } from 'lucide-react'
import { useSpreadsheetImporter } from './use-import-products-spreadsheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const ImportProductsSpreadsheet = () => {
  const {
    fileInputRef,
    handleFileChange,
    getTemplate,
    isGetTemplatePending,
    productsData,
    openModal,
    setOpenModal,
    handleCloseModal,
  } = useSpreadsheetImporter()

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CloudUpload className="size-4" />
          Importar produtos
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-2 sm:min-w-[700px]">
        <DialogTitle>Importar produtos</DialogTitle>
        <p className="text-sm text-gray-600">
          Baixe o modelo da planilha em Excel, preencha com os dados dos
          produtos e, em seguida, importe o arquivo para que os produtos sejam
          cadastrados no sistema.
        </p>
        <div className="flex justify-between space-x-4">
          <div className="w-full">
            <Button
              isLoading={isGetTemplatePending}
              disabled={isGetTemplatePending}
              onClick={() => getTemplate()}
              variant="outline"
              className="w-full gap-2"
            >
              <CloudDownload className="size-4" />
              Baixar planilha de modelo dos produtos
            </Button>
          </div>
          <div className="w-full">
            <input
              type="file"
              accept=".xls,.xlsx, .csv"
              ref={fileInputRef}
              onChange={(event) => handleFileChange(event)}
              className="hidden"
            />
            <Button
              isLoading={isGetTemplatePending}
              disabled={isGetTemplatePending}
              variant="default"
              className="w-full gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUpload className="size-4" />
              Importar produtos
            </Button>
          </div>
        </div>
        <div>
          {productsData.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Validade (dias)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsData.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>R$ {product.finalPrice.toFixed(2)}</TableCell>
                      <TableCell>{product.quantityInStock}</TableCell>
                      <TableCell>{product.validityInDays}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <div className="flex w-full justify-end space-x-4">
          <Button
            isLoading={isGetTemplatePending}
            disabled={isGetTemplatePending}
            variant="outline"
            className="gap-2"
            onClick={handleCloseModal}
          >
            Fechar
          </Button>
          {productsData.length >= 1 && (
            <Button
              isLoading={isGetTemplatePending}
              disabled={isGetTemplatePending}
              variant="default"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Salvar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
