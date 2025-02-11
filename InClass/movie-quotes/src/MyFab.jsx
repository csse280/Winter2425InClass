import { Plus } from "lucide-react";
import PropTypes from 'prop-types';

export default function MyFab({ onClick }) {
  return (
    <button
      onClick={onClick}
    className="fixed bottom-4 right-4 flex items-center justify-center w-14 h-14 bg-rosered text-white rounded-full shadow-lg transition-all active:translate-y-0.5 active:opacity-80"
    >
       <Plus size={24} />
    </button>
  );
}

MyFab.propTypes = {
  onClick: PropTypes.func.isRequired,
};

