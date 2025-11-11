import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui";

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
}

interface IProductListProps {
  products: IProduct[];
}

interface ITicketItemProps {
  name: string;
  quantity: number;
}

const TicketItem = ({ name, quantity }: ITicketItemProps) => {
  return (
    <div className={cn("flex justify-between")}>
      <Text className="text-sm">{name}</Text>
      <Text className="text-sm text-muted-foreground">x{quantity}</Text>
    </div>
  );
};

export const ProductList = ({ products }: IProductListProps) => {
  return (
    <div className="flex flex-col gap-2 bg-card rounded-md p-4">
      {products.map((product) => (
        <TicketItem
          key={product.id}
          name={product.name}
          quantity={product.quantity || 1}
        />
      ))}
    </div>
  );
};
