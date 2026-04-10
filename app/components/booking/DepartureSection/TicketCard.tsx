import { TicketType } from "@/app/types/departure";
import { Check, Info } from "lucide-react";
import { motion } from "motion/react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface TicketCardProps {
  /** Ticket */
  ticket: TicketType;
  /** id of departure */
  departureId: string;
  /** Field name of form input */
  fieldName: string;
  /** Whether this ticket is selected */
  isSelected: boolean;
  /** Whether any ticket in this section is selected */
  anySelected: boolean;
  /** Context object of form */
  formContext: UseFormReturn<FieldValues, any, FieldValues>;
}

/**
 * Displays a ticket card given the information.
 * @param param0
 * @returns
 */
export default function TicketCard({
  ticket,
  departureId,
  fieldName,
  isSelected,
  anySelected,
  formContext
}: TicketCardProps) {
  // Create a truly unique value for this specific ticket choice
  const combinedValue = `${departureId}|${ticket.type}`;

  const { register, watch, setValue } = formContext;

  const handleClick = () => {
    // 1. Set the main ticket value (depId + type)
    setValue(fieldName, combinedValue, { shouldValidate: true });

    // 2. Set the specific departure ID helper field
    const idField = fieldName.includes("outbound")
      ? "outboundDepartureId"
      : "returnDepartureId";
    setValue(idField, departureId, { shouldValidate: true });
  };

  const isFlex = ticket.type.toLowerCase().includes("flex");

  // A ticket is dimmed if something else in THIS journey section is selected
  const isDimmed = anySelected && !isSelected;

  return (
    <motion.div
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      animate={{
        opacity: isDimmed ? 0.4 : 1,
        filter: isDimmed
          ? "grayscale(100%) brightness(0.9)"
          : "grayscale(0%) brightness(1)",
        scale: isDimmed ? 0.97 : 1,
        borderColor: isSelected ? "var(--brand)" : "#f1f5f9",
      }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className={`
        relative flex flex-col p-4 rounded-[1.5rem] cursor-pointer border-2 h-full transition-shadow
        ${isSelected ? "bg-white shadow-lg ring-4 ring-brand/5 border-brand" : "bg-white shadow-sm border-slate-100"}
      `}
    >
      <input
        type="radio"
        {...register(fieldName)}
        value={combinedValue}
        className="sr-only"
      />

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-black text-[10px] text-slate-400 uppercase tracking-widest">
            {ticket.type}
          </h3>
          <div
            className={`text-xl font-black transition-colors ${isSelected ? "text-brand" : "text-slate-900"}`}
          >
            {ticket.price},-
          </div>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? "bg-brand border-brand text-white"
              : "border-slate-200 text-transparent"
          }`}
        >
          <Check size={14} strokeWidth={4} />
        </div>
      </div>

      <div className="space-y-1 pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
          <Check
            size={12}
            className={isSelected ? "text-emerald-500" : "text-slate-300"}
          />
          <span>Standard sete</span>
        </div>
        <div
          className={`flex items-center gap-2 text-[11px] font-bold ${isFlex ? "text-slate-600" : "text-slate-300"}`}
        >
          {isFlex ? (
            <Check
              size={12}
              className={isSelected ? "text-emerald-500" : "text-slate-300"}
            />
          ) : (
            <Info size={12} />
          )}
          <span>{isFlex ? "Full fleks" : "Ingen ref."}</span>
        </div>
      </div>
    </motion.div>
  );
}
