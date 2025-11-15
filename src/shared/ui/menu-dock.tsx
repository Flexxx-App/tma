"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Home, Briefcase, Calendar, Shield, Settings } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type IconComponentType = React.ElementType<{ className?: string }>;

export interface MenuDockItem {
  label: string;
  icon: IconComponentType;
  onClick?: () => void;
  href?: string;
}

export interface MenuDockProps {
  items?: MenuDockItem[];
  className?: string;
  variant?: "default" | "compact" | "large";
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
  animated?: boolean;
  activeIndex?: number;
}

const defaultItems: MenuDockItem[] = [
  { label: "home", icon: Home },
  { label: "work", icon: Briefcase },
  { label: "calendar", icon: Calendar },
  { label: "security", icon: Shield },
  { label: "settings", icon: Settings },
];

export const MenuDock: React.FC<MenuDockProps> = ({
  items,
  className,
  variant = "default",
  orientation = "horizontal",
  showLabels = true,
  animated = true,
  activeIndex: controlledActiveIndex,
}) => {
  const router = useRouter();
  const finalItems = useMemo(() => {
    const isValid =
      items && Array.isArray(items) && items.length >= 2 && items.length <= 8;
    if (!isValid) {
      console.warn(
        "MenuDock: 'items' prop is invalid or missing. Using default items.",
        items,
      );
      return defaultItems;
    }
    return items;
  }, [items]);

  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const activeIndex = controlledActiveIndex ?? internalActiveIndex;
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const previousActiveIndexRef = useRef(activeIndex);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [backgroundLeft, setBackgroundLeft] = useState(0);
  const [backgroundWidth, setBackgroundWidth] = useState(0);

  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (activeIndex >= finalItems.length) {
      setTimeout(() => {
        if (controlledActiveIndex === undefined) {
          setInternalActiveIndex(0);
        }
      }, 0);
    }
  }, [finalItems, activeIndex, controlledActiveIndex]);

  useEffect(() => {
    if (previousActiveIndexRef.current !== activeIndex) {
      setPreviousActiveIndex(previousActiveIndexRef.current);
      previousActiveIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  useEffect(() => {
    const updateUnderline = () => {
      const activeButton = itemRefs.current[activeIndex];
      const activeText = textRefs.current[activeIndex];

      if (activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect =
          activeButton.parentElement?.getBoundingClientRect();

        if (containerRect) {
          // Update background highlight position
          setBackgroundWidth(buttonRect.width);
          setBackgroundLeft(buttonRect.left - containerRect.left);

          // Update underline position (only if labels are shown)
          if (activeText && showLabels && orientation === "horizontal") {
            const textRect = activeText.getBoundingClientRect();
            setUnderlineWidth(textRect.width);
            setUnderlineLeft(
              buttonRect.left -
                containerRect.left +
                (buttonRect.width - textRect.width) / 2,
            );
          }
        }
      }
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeIndex, finalItems, showLabels, orientation]);

  const handleItemClick = (index: number, item: MenuDockItem) => {
    setPreviousActiveIndex(activeIndex);
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    if (item.href) {
      router.push(item.href);
    } else {
      item.onClick?.();
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container: "p-0",
          item: "p-2 min-w-12",
          icon: "h-4 w-4",
          text: "text-xs",
        };
      case "large":
        return {
          container: "p-3",
          item: "p-3 min-w-16",
          icon: "h-6 w-6",
          text: "text-base",
        };
      default:
        return {
          container: "p-2",
          item: "p-2 min-w-14",
          icon: "h-5 w-5",
          text: "text-sm",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <nav
      className={cn(
        "relative w-full mx-16! rounded-full inline-flex items-center bg-card/20 backdrop-blur-sm border shadow-sm",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        styles.container,
        className,
      )}
      role="navigation"
    >
      <motion.div
        className="absolute inset-y-0 bg-muted/50 rounded-full"
        initial={false}
        animate={{
          width: `${backgroundWidth}px`,
          left: `${backgroundLeft}px`,
          opacity: backgroundWidth > 0 ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.6,
        }}
        style={{ zIndex: 0 }}
      />

      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;

        return (
          <motion.button
            key={`${item.label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cn(
              "relative flex w-full flex-col items-center justify-center rounded-lg z-10",
              "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              styles.item,
              isActive && "text-primary",
              !isActive && "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => handleItemClick(index, item)}
            aria-label={item.label}
            type="button"
            initial={false}
            animate={{
              scale: isActive ? 1.05 : 1,
              y: isActive ? -2 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8,
            }}
            whileHover={{
              scale: 1.08,
              y: -3,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <motion.div
              key={`icon-${index}-${activeIndex}`}
              className={cn(
                "flex items-center w-full justify-center",
                orientation === "horizontal" && showLabels ? "mb-1" : "",
                orientation === "vertical" && showLabels ? "mb-1" : "",
              )}
              initial={false}
              animate={{
                scale: isActive ? 1.15 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            >
              <motion.div
                key={`rotate-${index}-${activeIndex}`}
                animate={{
                  rotate:
                    isActive && animated && previousActiveIndex !== activeIndex
                      ? [0, -12, 12, -8, 0]
                      : 0,
                }}
                transition={{
                  rotate: {
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                    times: [0, 0.25, 0.5, 0.75, 1],
                  },
                }}
              >
                <IconComponent
                  className={cn(styles.icon, "transition-colors duration-200")}
                />
              </motion.div>
            </motion.div>

            {showLabels && (
              <motion.span
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
                className={cn(
                  "font-medium capitalize",
                  styles.text,
                  "whitespace-nowrap",
                )}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  y: isActive ? 0 : 2,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                {item.label}
              </motion.span>
            )}
          </motion.button>
        );
      })}

      {showLabels && orientation === "horizontal" && (
        <motion.div
          className="absolute bottom-2 h-0.5 bg-primary rounded-full"
          initial={false}
          animate={{
            width: `${underlineWidth}px`,
            left: `${underlineLeft}px`,
            opacity: underlineWidth > 0 ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
        />
      )}
    </nav>
  );
};
