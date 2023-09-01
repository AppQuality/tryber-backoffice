import { ReactComponent as Sentiment1 } from "./assets/sentiment-1.svg";
import { ReactComponent as Sentiment2 } from "./assets/sentiment-2.svg";
import { ReactComponent as Sentiment3 } from "./assets/sentiment-3.svg";
import { ReactComponent as Sentiment4 } from "./assets/sentiment-4.svg";
import { ReactComponent as Sentiment5 } from "./assets/sentiment-5.svg";

export const sentimentTypes = [
  {
    id: 1,
    name: "Molto Negativo",
    value: "1",
    icon: <Sentiment1 />,
  },
  {
    id: 2,
    name: "Negativo",
    value: "2",
    icon: <Sentiment2 />,
  },
  {
    id: 3,
    name: "Neutro",
    value: "3",
    icon: <Sentiment3 />,
  },
  {
    id: 4,
    name: "Positivo",
    value: "4",
    icon: <Sentiment4 />,
  },
  {
    id: 5,
    name: "Molto Positivo",
    value: "5",
    icon: <Sentiment5 />,
  },
];
