import * as React from "react";
import { format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./select";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className
}: DateRangePickerProps) {
  // Opções rápidas de seleção de período
  const handleQuickSelect = (value: string) => {
    const today = new Date();

    switch (value) {
      case "current-month": {
        const firstDay = startOfMonth(today);
        onStartDateChange(firstDay);
        onEndDateChange(today);
        break;
      }
      case "last-7-days": {
        const last7Days = new Date();
        last7Days.setDate(today.getDate() - 7);
        onStartDateChange(last7Days);
        onEndDateChange(today);
        break;
      }
      case "last-30-days": {
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);
        onStartDateChange(last30Days);
        onEndDateChange(today);
        break;
      }
      case "last-90-days": {
        const last90Days = new Date();
        last90Days.setDate(today.getDate() - 90);
        onStartDateChange(last90Days);
        onEndDateChange(today);
        break;
      }
    }
  };

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[180px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "dd/MM/yyyy") : <span>Data inicial</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDateChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <span className="hidden sm:inline">até</span>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[180px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd/MM/yyyy") : <span>Data final</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={onEndDateChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              disabled={(date) => date < startDate}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Select onValueChange={handleQuickSelect}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Período rápido" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="current-month">Mês corrente</SelectItem>
          <SelectItem value="last-7-days">Últimos 7 dias</SelectItem>
          <SelectItem value="last-30-days">Últimos 30 dias</SelectItem>
          <SelectItem value="last-90-days">Últimos 90 dias</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}