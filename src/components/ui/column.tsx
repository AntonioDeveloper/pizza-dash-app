import { useDroppable } from "@dnd-kit/core";
import { ColumnType } from "@/model/columnType";
import { OrderType } from "@/model/orderType";
import { DraggableOrderCard } from "./orderCard";

interface ColumnProps {
  column: ColumnType;
  orders: OrderType[];
  activeOrder: OrderType | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDENTE':
    case 'Pendente':
      return 'border-yellow-400 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    case 'EM_PREPARACAO':
    case 'Em preparação':
      return 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
    case 'A_CAMINHO':
    case 'A caminho':
      return 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
    case 'ENTREGUE':
    case 'Entregue':
      return 'border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    case 'CANCELADO':
    case 'Cancelado':
      return 'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    default:
      return 'border-gray-300 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800';
  }
};

const getBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDENTE':
      case 'Pendente':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300';
      case 'EM_PREPARACAO':
      case 'Em preparação':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300';
      case 'A_CAMINHO':
      case 'A caminho':
        return 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300';
      case 'ENTREGUE':
      case 'Entregue':
        return 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300';
      case 'CANCELADO':
      case 'Cancelado':
        return 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300';
    }
  };

export default function Column ({column, orders, activeOrder}: ColumnProps) {
  const {setNodeRef} = useDroppable({
    id: column.id,
  });

  const borderColorClass = getStatusColor(column.id).split(' ')[0]; // Extract just the border color
  const badgeColorClass = getBadgeColor(column.id);

  return(
    <div ref={setNodeRef} className="w-[85vw] min-w-[85vw] md:w-[350px] md:min-w-[350px] h-full max-h-full flex flex-col rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
        {/* Header */}
        <div className={`p-4 border-b-4 ${borderColorClass} rounded-t-xl flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 transition-colors`}>
            <h2 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{column.title}</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColorClass}`}>
                {orders.length}
            </span>
        </div>

        {/* Orders Container */}
        <div className="flex-1 p-3 overflow-y-auto min-h-0 space-y-3 bg-gray-50/50 dark:bg-slate-950/50 transition-colors">
            {orders.map((order) => {
                return <DraggableOrderCard key={order.cardId} order={order} isDragging={activeOrder?.cardId === order.cardId} />
            })}
            {orders.length === 0 && (
                <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
                    Sem pedidos
                </div>
            )}
        </div>
    </div>
  )
}
