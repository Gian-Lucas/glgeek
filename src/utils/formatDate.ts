import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export const formatDate = (date) => {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = utcToZonedTime(new Date(date), timeZone);

  const simpleDate = format(zonedDate, "PP", {
    locale: ptBR,
  });

  const fullDate = format(zonedDate, "PPPp", {
    locale: ptBR,
  });

  return {
    simpleDate,
    fullDate,
  };
};
