import { cn } from "@/shared/lib/utils";
import { PassCard } from "@/entities/passes/ui/pass-card";
import { IPass } from "@/entities/passes/model/types";
import { EmblaCarousel, Text } from "@/shared/ui";
import { EmblaOptionsType } from "embla-carousel";

interface IProps {
  className?: string;
  passes: IPass[];
}

const OPTIONS: EmblaOptionsType = { loop: true };

export const TicketList = ({ className, passes, ...props }: IProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 justify-center items-center -mt-20",
        className,
      )}
      {...props}
    >
      <EmblaCarousel options={OPTIONS}>
        {passes.map((pass) => (
          <PassCard key={pass.id} pass={pass} />
        ))}
      </EmblaCarousel>
    </div>
  );
};
