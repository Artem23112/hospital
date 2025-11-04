import { SortItemConfigT } from "@/components/UI/buttons/sort-buttons/SortButtons";

export const sortConfig: SortItemConfigT[] = [
  {
    filter: "all",
    btnText: "Все",
  },
  {
    filter: "enrolled",
    btnText: "Записанные",
  },
  {
    filter: "admitted",
    btnText: "Принятые",
  },
  {
    filter: "not-admitted",
    btnText: "Не принятые",
  },
  { filter: "expired", btnText: "Просроченные" },
];
