import { cardsConfig } from "../../Utils/data";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
const Dashboardbox = ({ data }) => {
  if (!data) return null;

  return (
   <div className="grid grid-cols-4 gap-4 p-6 bg-slate-100">
      {cardsConfig.map((card) => {
        const Icon = card.icon;
        const value = data[card.key]?.[card.valueKey];
        const change = data[card.key]?.[card.changeKey] ?? 0;


        // For percentage-based cards
        const isPositive = change >= 0;

        return (
          <div
            key={card.key}
            className="bg-white p-4 rounded-2xl shadow"
          >
            <div className="flex gap-2 flex-col justify-center">
              <div className="flex gap-2 items-center">
                <div
                  className={`${card.iconColor} w-8 h-8 rounded-full flex items-center justify-center`}
                >
                  <Icon size={20} className="text-white" />
                </div>

                <h2 className="text-lg font-semibold">{card.title}</h2>
              </div>

              <p className="text-xl font-bold">
                {card.prefix || ""}
                {value}
              </p>
            </div>

            {/* 🔥 CHANGE DISPLAY LOGIC */}
            <div className="text-sm font-medium flex justify-end mt-2">
              {card.changeType === "percentage" && (
                <div
                  className={`flex gap-2 items-center ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? (
                    <FaArrowTrendUp size={16} />
                  ) : (
                    <FaArrowTrendDown size={16} />
                  )}
                  <span>{change}% this week</span>
                </div>
              )}

              {card.changeType === "count" && (
                <span className={`${change > 0 ? "text-green-600" : "text-red-600"}`}>
                  {change > 0 && `+${change} this week`}
                  {change < 0 && `${change} this week`}
                  {change === 0 && ``}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Dashboardbox;
