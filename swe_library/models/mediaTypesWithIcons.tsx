import { MediaType } from "@prisma/client";
import { BsDisc, BsMap, BsNewspaper, BsBook } from "react-icons/bs";

export const mediaTypesWithIcons = [
  {
    enum: MediaType.BOOK,
    label: "Buch",
    icon: <BsBook className="m-2" />,
  },
  {
    enum: MediaType.CD,
    label: "CD",
    icon: <BsDisc className="m-2" />,
  },
  {
    enum: MediaType.MAGAZINE,
    label: "Magazin",
    icon: <BsNewspaper className="m-2" />,
  },
  {
    enum: MediaType.MAP,
    label: "Karte",
    icon: <BsMap className="m-2" />,
  },
];
