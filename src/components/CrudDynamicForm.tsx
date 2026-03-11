'use client';
import React, { ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import { ImageUploader } from "@/components/ImageUploader";
import { Toggle } from "@/components/ui/Toggle";
import { Field } from "@/types/field";
import TextAreaField from "./ui/TextAreaField";

interface CrudDynamicFormProps {
  fields: Field[];
  onSubmit?: (e: React.FormEvent) => void; 
  submitLabel?: string;
  loading?: boolean;
  headerText?: string;
  subText?: string;
  errors?: { [key: string]: string };
  layout?: "inline" | "full";
  disabled?: 'aprove';
}

export const CrudDynamicForm: React.FC<CrudDynamicFormProps> = ({
  fields,
  onSubmit,
  submitLabel = "Salvar",
  loading = false,
  headerText,
  subText,
  errors = {},
  layout = "full",
}) => {
  const Wrapper = onSubmit ? "form" : "div";

  return (
    <Wrapper
      onSubmit={onSubmit}
      className={`${
        layout === "full"
          ? "bg-bg p-10 rounded-xl shadow space-y-5"
          : "bg-neutral p-4 rounded-xl space-y-4 shadow"
      }`}
    >
      {layout === "full" && headerText && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {headerText}
          </h2>
          {subText && <p className="text-sm opacity-70 mt-1">{subText}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field, i) => {
          const errorMsg = errors?.[field.label.toLowerCase()];
          const isLongText =
            field.label.toLowerCase().includes("descrição") ||
            field.label.toLowerCase().includes("bio");

          return (
            <div
              key={i}
              className={`flex flex-col ${
                isLongText ? "col-span-1 md:col-span-2" : ""
              }`}
            >
              <label className="text-sm font-medium text-text mb-1">
                {field.label}
              </label>

              {field.type === "toggle" ? (
                <Toggle
                  checked={Boolean(field.value)}
                  onChange={(val: boolean) => field.onChange(val)}
                  label={field.label}
                />
              ) : field.label === "Imagem (URL)" ? (
                <ImageUploader
                  value={String(field.value ?? "")}
                  onChange={(v: string) => field.onChange(v)}
                />
              ) : field.options ? (
                <SelectField
                  disabled={field.disabled}
                  value={String(field.value ?? "")}
                  onChange={(v: string) => field.onChange(v)}
                  options={field.options}
                  placeholder={field.label}
                />
              ) : isLongText ? (
                <TextAreaField
                  disabled={field.disabled}
                  value={String(field.value ?? "")}
                  onChange={(value) => field.onChange(value)}
                  placeholder={field.label}
                  rows={5}
                />
              ) : (
                <InputField
                  type={field.type}
                  disabled={field.disabled}
                  value={
                    field.type === "date" && field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : String(field.value ?? "")
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (field.type === "number") {
                      field.onChange(Number(e.target.value));
                    } else if (field.type === "date") {
                      field.onChange(new Date(e.target.value));
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                  placeholder={field.label}
                  className="w-full"
                />
              )}


              {errorMsg && (
                <span className="text-red-500 text-xs mt-1">{errorMsg}</span>
              )}
            </div>
          );
        })}
      </div>

      {layout === "full" && (
        <Button
          type="submit"
          className="bg-primary text-white w-full py-3 rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Salvando..." : submitLabel}
        </Button>
      )}
    </Wrapper>
  );
};
