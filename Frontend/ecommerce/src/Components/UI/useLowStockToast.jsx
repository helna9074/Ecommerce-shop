import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const LowStockToast = ({ t, message, onNavigate }) => {
  return (
    <div
      style={{
        position: "relative",
        padding: "12px 16px",
        maxWidth: "320px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        cursor: "pointer",
      }}
      onClick={() => {
        toast.dismiss(t.id);
        onNavigate?.();
      }}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
          toast.dismiss(t.id);
        }}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
        }}
      >
        <IoMdClose size={16} />
      </span>

      <b>🔔 Low Stock Alert</b>
      <p>{message}</p>
    </div>
  );
};

export default LowStockToast;
