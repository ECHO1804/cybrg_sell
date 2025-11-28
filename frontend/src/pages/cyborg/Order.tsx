import { useState } from 'react';
import CyborgLayout from './components/CyborgLayout';
import { FiPackage, FiClock, FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    status: 'completed' as const,
    total_price: 3500,
    items_count: 2,
    created_at: '2024-01-15T10:30:00Z',
    delivery_info: {
      address: 'Neural Quarter, Sector 7',
      estimated_delivery: '2024-01-20'
    }
  },
  {
    id: 'ORD-002',
    status: 'pending' as const,
    total_price: 1650,
    items_count: 1,
    created_at: '2024-01-18T14:20:00Z',
    delivery_info: {
      address: 'Cybernetic District, Sector 3',
      estimated_delivery: '2024-01-25'
    }
  },
  {
    id: 'ORD-003',
    status: 'cancelled' as const,
    total_price: 2800,
    items_count: 1,
    created_at: '2024-01-10T09:15:00Z',
    delivery_info: {
      address: 'Bio-Tech Hub, Sector 5',
      estimated_delivery: '2024-01-18'
    }
  }
];

const statusConfig = {
  pending: {
    icon: FiClock,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    label: 'Pending'
  },
  completed: {
    icon: FiCheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    label: 'Completed'
  },
  cancelled: {
    icon: FiXCircle,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/20',
    borderColor: 'border-rose-500/30',
    label: 'Cancelled'
  }
};

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const statuses = ['all', 'pending', 'completed', 'cancelled'];

  const filteredOrders = mockOrders.filter(order => 
    selectedStatus === 'all' || order.status === selectedStatus
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <CyborgLayout cartItemsCount={0}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Order History</h1>
        <p className="text-gray-400">Track your enhancement purchases</p>
      </div>

      {/* Status Filter */}
      <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
        <div className="flex flex-wrap gap-4">
          {statuses.map(status => {
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map(order => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;
          
          return (
            <div
              key={order.id}
              className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-xl font-semibold text-white">{order.id}</h3>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${status.bgColor} ${status.borderColor} border`}>
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-sm font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Order Date:</span>
                      <p className="text-white">{formatDate(order.created_at)}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Items:</span>
                      <p className="text-white">{order.items_count} part(s)</p>
                    </div>
                    <div>
              
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <div className="text-right mb-2 lg:mb-0">
                    <div className="text-2xl font-bold text-cyan-400">
                      ${order.total_price}
                    </div>
                 
                  </div>
                  
                  <button className="flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    <FiEye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <FiPackage className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No Orders Found</h3>
          <p className="text-gray-500">
            {selectedStatus === 'all' 
              ? "You haven't placed any orders yet."
              : `No ${selectedStatus} orders found.`
            }
          </p>
        </div>
      )}
    </CyborgLayout>
  );
};

export default Orders;