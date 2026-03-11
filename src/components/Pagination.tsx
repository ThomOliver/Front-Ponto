"use client";

import React from "react";
import Button from "./ui/Button";

interface PaginationProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  lastPage,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button
        disabled={page <= 1}
        className="w-auto bg-primary disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
      >
        Anterior
      </Button>

      <span>
        Página {page} de {lastPage}
      </span>

      <Button
        disabled={page >= lastPage}
        onClick={() => onPageChange(page + 1)}
        className="w-auto bg-primary disabled:opacity-50"
      >
        Próximo
      </Button>
    </div>
  );
};
