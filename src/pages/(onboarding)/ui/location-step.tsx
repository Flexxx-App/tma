"use client";

import { debounce } from "lodash";
import {
  Field,
  FieldContent,
  FieldLabel,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  FieldDescription,
  Spinner,
} from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { OnboardingFormData } from "./oboarding-page";
import { Ghost, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  useAutocompleteMutation,
  usePlaceDetailsQuery,
} from "@/entities/googleMap/model/api";
import { IPlacePrediction } from "@/entities/googleMap/model/api";
import { Text } from "@/shared/ui/text";

export const LocationStep = () => {
  const form = useFormContext<OnboardingFormData>();
  const [suggestions, setSuggestions] = useState<IPlacePrediction[]>([]);
  const [autocomplete, { isLoading }] = useAutocompleteMutation();
  const [searchValue, setSearchValue] = useState(form.getValues("city") ?? "");
  const [isDebounced, setIsDebounced] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlacePrediction | null>(
    null,
  );
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const { data: placeDetails } = usePlaceDetailsQuery(
    selectedPlace?.placePrediction?.placeId ?? "",
    { skip: !selectedPlace?.placePrediction?.placeId },
  );

  useEffect(() => {
    console.log("placeDetails", placeDetails);
    form.setValue("city", placeDetails?.postalAddress?.locality ?? "");
    form.setValue("country", placeDetails?.postalAddress?.regionCode ?? "");
  }, [placeDetails]);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce(
        (userInput: string) =>
          autocomplete({ input: userInput }).then((res) => {
            setSuggestions(res.data?.suggestions ?? []);
            setIsDebounced(false);
          }),
        500,
      ),
    [autocomplete, form],
  );

  const onSelectAddress = (placePrediction: IPlacePrediction) => {
    setSelectedPlace(placePrediction);
    const address = placePrediction.placePrediction?.text?.text ?? "";
    setIsAddressDropdownOpen(false);
    setSearchValue(address);
  };

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);
  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const userInput = e.target.value;
    setSearchValue(userInput);

    if (!userInput.trim()) {
      setSuggestions([]);
      setIsDebounced(false);
      setIsAddressDropdownOpen(false);
      return;
    }

    setIsAddressDropdownOpen(true);
    debouncedChangeHandler(userInput);
    setIsDebounced(true);
  }

  return (
    <Field>
      <FieldLabel>Location</FieldLabel>
      <FieldDescription>
        It will be used to show you the best matches in your area.
      </FieldDescription>
      <FieldContent className="relative w-full h-full">
        <InputGroup>
          <InputGroupInput
            placeholder="Search city..."
            value={searchValue}
            onChange={onSearch}
            onFocus={() => {
              console.log("onFocus");
              setIsAddressDropdownOpen(true);
            }}
            onBlur={() => {
              console.log("onBlur");
              setIsAddressDropdownOpen(false);
            }}
          />
          <InputGroupAddon>
            <MapPin />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {(isLoading || isDebounced) && <Spinner variant="circle" />}
          </InputGroupAddon>
        </InputGroup>
        {isAddressDropdownOpen && (
          <div
            className="absolute border-1 border-border border-solid top-full left-0 right-0 w-full z-50! min-h-54! max-h-70! h-full! overflow-y-auto p-0 bg-background rounded-md shadow-lg mt-2"
            onMouseDown={(e) => e.preventDefault()}
          >
            {(() => {
              const items = suggestions;
              if (items?.length === 0 && !isLoading) {
                return (
                  <div className="text-muted-foreground font-medium text-center px-2 py-4 h-full flex flex-col items-center justify-center gap-2">
                    <Ghost className="size-4" />
                    <Text>No results</Text>
                  </div>
                );
              }
              return items?.map((v: IPlacePrediction) => (
                <div
                  key={v.placePrediction?.placeId ?? ""}
                  className="cursor-pointer rounded px-3 py-1 hover:bg-muted"
                  onClick={() => onSelectAddress(v)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {v.placePrediction?.structuredFormat?.mainText?.text ??
                        ""}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {v.placePrediction?.structuredFormat?.secondaryText
                        ?.text ?? ""}
                    </span>
                  </div>
                </div>
              ));
            })()}
          </div>
        )}
      </FieldContent>
    </Field>
  );
};
