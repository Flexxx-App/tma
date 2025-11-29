import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Field,
  FieldLabel,
  FieldContent,
  Page,
  Skeleton,
  Text,
} from "@/shared/ui";
import { GuestDetails } from "./guest-details";
import { ProductList } from "./product-list";
import { useGetGuestQuery } from "@/entities/guest/model/api";
import { TicketList } from "./ticket-list";

export const GuestInfoPage = ({ id }: { id: string }) => {
  const { data: guest, isLoading } = useGetGuestQuery(id);

  if (isLoading && !guest) {
    return (
      <Page className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-center gap-3 pt-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Field>
          <FieldLabel className="text-muted-foreground">DETAILS</FieldLabel>
          <FieldContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className="text-muted-foreground">PASSES</FieldLabel>
          <FieldContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className="text-muted-foreground">ADD-ONS</FieldLabel>
          <FieldContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </FieldContent>
        </Field>
      </Page>
    );
  }

  return (
    <Page className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-3 pt-6">
        <Avatar className="size-24">
          <AvatarImage src={guest?.avatar_url} />
          <AvatarFallback>{guest?.fullname?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
          <Text className="text-lg">{guest?.fullname}</Text>
          <Text className="text-sm text-muted-foreground">
            @{guest?.username}
          </Text>
        </div>
      </div>
      {guest && (
        <Field>
          <FieldLabel className="text-muted-foreground">DETAILS</FieldLabel>
          <FieldContent>
            <GuestDetails guest={guest!} />
          </FieldContent>
        </Field>
      )}
      {guest && guest.passes.length > 0 && (
        <Field>
          <FieldLabel className="text-muted-foreground">PASSES</FieldLabel>
          <FieldContent>
            <TicketList passes={guest?.passes || []} />
          </FieldContent>
        </Field>
      )}
      {guest && guest.products.length > 0 && (
        <Field>
          <FieldLabel className="text-muted-foreground">ADD-ONS</FieldLabel>
          <FieldContent>
            <ProductList products={guest?.products || []} />
          </FieldContent>
        </Field>
      )}
    </Page>
  );
};
