import { X } from "lucide-react";
import "./Modal.css";

/**
 * Common Modal Wrapper
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 * @param {string} [props.maxWidth]
 */
export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className={`relative w-full ${maxWidth} bg-[#090d16] border border-[#1e294b]/50 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 modal-container`}>
        <div className="px-6 py-4 border-b border-[#1e294b]/30 flex items-center justify-between modal-header">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider font-display">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#1e294b]/30 text-gray-400 hover:text-white transition-all close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="modal-content overflow-y-auto max-h-[85vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
