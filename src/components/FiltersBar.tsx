"use client";

import React from "react";
import InputField from "./ui/InputField";
import SelectField from "./ui/SelectField";

export type FilterType =
  | {
      type: "text";
      name: string;
      label?: string;
      value: string;
      placeholder?: string;
      onChange: (value: string) => void;
    }
  | {
      type: "select";
      name: string;
      label?: string;
      value: string;
      options: { value: string; label: string }[];
      onChange: (value: string) => void;
    };

interface FiltersBarProps {
  filters: FilterType[];
}

export function FiltersBar({ filters }: FiltersBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
      {filters.map((filter) => {
        if (filter.type === "text") {
          return (
            <InputField
              type="text"
              key={filter.name}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              placeholder={filter.placeholder || filter.label}
              className="w-full md:w-1/2 border rounded-lg px-3 py-2"
            />
          );
        }

        if (filter.type === "select") {
          return (
            <SelectField
              key={filter.name}
              value={filter.value}
              onChange={filter.onChange}
              options={filter.options}
              placeholder={filter.label || "Selecione"}
              className="w-full md:w-1/3"
            />
          );
        }
        return null;
      })}
    </div>
  );
}
