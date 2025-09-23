import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Home, ShoppingBag, Package, Users, BarChart2, PlusCircle, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

// --- MOCK DATA ---
// In a real application, this data would come from an API
const mockStats = {
    totalRevenue: { value: '₹5,42,320', change: '+2.5%' },
    totalSales: { value: '1,234', change: '+5.1%' },
    newCustomers: { value: '82', change: '-1.2%' },
    totalOrders: { value: '432', change: '+1.5%' },
};

const mockProducts = [
    { id: 1, name: 'Artisan Sourdough', stock: 25, price: '₹350', status: 'In Stock', image: 'https://placehold.co/400x400/F5C7A9/FFF?text=Sourdough' },
    { id: 2, name: 'Chocolate Croissant', stock: 150, price: '₹120', status: 'In Stock', image: 'https://placehold.co/400x400/BF8B67/FFF?text=Croissant' },
    { id: 3, name: 'Red Velvet Cupcake', stock: 0, price: '₹90', status: 'Out of Stock', image: 'https://placehold.co/400x400/D9534F/FFF?text=Cupcake' },
    { id: 4, name: 'Custom Wedding Cake', stock: 5, price: '₹4,500', status: 'Low Stock', image: 'https://placehold.co/400x400/EAD5DC/FFF?text=Cake' },
    { id: 5, name: 'Assorted Donuts Box', stock: 45, price: '₹600', status: 'In Stock', image: 'https://placehold.co/400x400/FFDAB9/FFF?text=Donuts' },
];

const mockOrders = [
    { id: 'ORD001', customer: 'Rohan Sharma', date: '2025-09-23', total: '₹2,500', status: 'Shipped' },
    { id: 'ORD002', customer: 'Priya Patel', date: '2025-09-23', total: '₹450', status: 'Processing' },
    { id: 'ORD003', customer: 'Amit Singh', date: '2025-09-22', total: '₹1,200', status: 'Delivered' },
    { id: 'ORD004', customer: 'Sneha Verma', date: '2025-09-21', total: '₹8,500', status: 'Delivered' },
    { id: 'ORD005', customer: 'Vikram Reddy', date: '2025-09-20', total: '₹180', status: 'Cancelled' },
];

const mockCustomers = [
    { id: 'CUST01', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', spent: '₹12,500' },
    { id: 'CUST02', name: 'Priya Patel', email: 'priya.patel@example.com', spent: '₹8,200' },
    { id: 'CUST03', name: 'Amit Singh', email: 'amit.singh@example.com', spent: '₹21,300' },
    { id: 'CUST04', name: 'Sneha Verma', email: 'sneha.verma@example.com', spent: '₹9,800' },
];


// --- UTILITY COMPONENTS ---

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        {children}
    </div>
);

// --- DASHBOARD COMPONENTS ---

const StatCard = ({ title, value, change, icon }) => (
    <Card>
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {icon}
        </div>
        <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
        </div>
    </Card>
);

const ChartPlaceholder = ({ title }) => (
    <Card className="h-full">
        <h4 className="font-bold text-lg text-gray-700">{title}</h4>
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg mt-4">
            <BarChart2 className="w-12 h-12 text-gray-300" />
            <p className="text-gray-400 ml-2">Chart data would be displayed here</p>
        </div>
    </Card>
);

const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={mockStats.totalRevenue.value} change={mockStats.totalRevenue.change} icon={<BarChart2 className="w-6 h-6 text-gray-400" />} />
        <StatCard title="Total Sales" value={mockStats.totalSales.value} change={mockStats.totalSales.change} icon={<ShoppingBag className="w-6 h-6 text-gray-400" />} />
        <StatCard title="New Customers" value={mockStats.newCustomers.value} change={mockStats.newCustomers.change} icon={<Users className="w-6 h-6 text-gray-400" />} />
        <StatCard title="Total Orders" value={mockStats.totalOrders.value} change={mockStats.totalOrders.change} icon={<Package className="w-6 h-6 text-gray-400" />} />
        
        <div className="lg:col-span-2">
            <ChartPlaceholder title="Revenue Over Time" />
        </div>
        <div className="lg:col-span-2">
            <ChartPlaceholder title="Sales by Category" />
        </div>
    </div>
);


// --- PRODUCT MANAGEMENT COMPONENTS ---

const getStatusChipClass = (status) => {
    switch (status) {
        case 'In Stock': return 'bg-green-100 text-green-800';
        case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
        case 'Out of Stock': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const ProductManagement = () => (
    <Card>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Products</h2>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
                <PlusCircle size={20} />
                Add Product
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold">Product</th>
                        <th className="p-4 font-semibold">Stock</th>
                        <th className="p-4 font-semibold">Price</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockProducts.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-4">
                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                                <span className="font-medium">{product.name}</span>
                            </td>
                            <td className="p-4">{product.stock}</td>
                            <td className="p-4">{product.price}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChipClass(product.status)}`}>
                                    {product.status}
                                </span>
                            </td>
                            <td className="p-4">
                                <button className="text-gray-500 hover:text-gray-800"><MoreVertical size={20} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

// --- ORDER MANAGEMENT COMPONENTS ---
const getOrderStatusChipClass = (status) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Processing': return 'bg-blue-100 text-blue-800';
        case 'Shipped': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const OrderManagement = () => (
    <Card>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-800">Recent Orders</h2>
             <button className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-amber-600 transition-colors">
                <PlusCircle size={20} />
                Create Order
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold">Order ID</th>
                        <th className="p-4 font-semibold">Customer</th>
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold">Total</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-mono text-sm text-gray-600">{order.id}</td>
                            <td className="p-4 font-medium">{order.customer}</td>
                            <td className="p-4">{order.date}</td>
                            <td className="p-4">{order.total}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatusChipClass(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-4">
                                <button className="text-gray-500 hover:text-gray-800"><MoreVertical size={20} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);


// --- CUSTOMER MANAGEMENT COMPONENTS ---
const CustomerManagement = () => (
    <Card>
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-teal-800">Customers</h2>
             <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition-colors">
                <PlusCircle size={20} />
                Add Customer
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold">Customer ID</th>
                        <th className="p-4 font-semibold">Name</th>
                        <th className="p-4 font-semibold">Email</th>
                        <th className="p-4 font-semibold">Total Spent</th>
                        <th className="p-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockCustomers.map(customer => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-mono text-sm text-gray-600">{customer.id}</td>
                            <td className="p-4 font-medium">{customer.name}</td>
                            <td className="p-4">{customer.email}</td>
                            <td className="p-4">{customer.spent}</td>
                            <td className="p-4">
                                <button className="text-gray-500 hover:text-gray-800"><MoreVertical size={20} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

// --- MAIN LAYOUT COMPONENTS ---

const Sidebar = ({ activeView, setActiveView, isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { name: 'Dashboard', icon: Home, color: 'rose' },
        { name: 'Products', icon: ShoppingBag, color: 'blue' },
        { name: 'Orders', icon: Package, color: 'amber' },
        { name: 'Customers', icon: Users, color: 'teal' },
    ];

    const getActiveClasses = (color) => {
        switch (color) {
            case 'rose': return 'bg-rose-500 text-white shadow-md';
            case 'blue': return 'bg-blue-500 text-white shadow-md';
            case 'amber': return 'bg-amber-500 text-white shadow-md';
            case 'teal': return 'bg-teal-500 text-white shadow-md';
            default: return 'bg-gray-500 text-white shadow-md';
        }
    };
    
    const getHoverClasses = (color) => {
         switch (color) {
            case 'rose': return 'hover:bg-rose-50';
            case 'blue': return 'hover:bg-blue-50';
            case 'amber': return 'hover:bg-amber-50';
            case 'teal': return 'hover:bg-teal-50';
            default: return 'hover:bg-gray-50';
        }
    }

    return (
        <aside className={`fixed lg:relative z-20 h-full bg-white shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex flex-col h-full w-64">
                <div className="p-6 flex items-center gap-3 border-b">
                    <div className="bg-rose-500 p-2 rounded-lg">
                        <ShoppingBag className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">HEMS Admin</h1>
                </div>
                <nav className="flex-1 px-4 py-2">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.name}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveView(item.name);
                                        if (window.innerWidth < 1024) setSidebarOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors ${activeView === item.name ? getActiveClasses(item.color) : `text-gray-600 ${getHoverClasses(item.color)}`}`}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

const Header = ({ setSidebarOpen }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600">
                    <MoreVertical />
                </button>
                <div className="relative w-full max-w-xs hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-gray-800">
                        <Bell size={22} />
                    </button>
                    <div className="flex items-center gap-2">
                        <img
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format=fit=crop"
                            alt="Admin"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="hidden md:block">
                            <p className="font-semibold text-sm">John Smith</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <ChevronDown size={16} className="text-gray-500 hidden md:block" />
                    </div>
                </div>
            </div>
        </header>
    );
};

// --- MAIN APP COMPONENT ---
const AdminPanel = () => {
    const [activeView, setActiveView] = useState('Dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (activeView) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Products':
                return <ProductManagement />;
            case 'Orders':
                return <OrderManagement />;
            case 'Customers':
                return <CustomerManagement />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex font-sans">
            <Sidebar activeView={activeView} setActiveView={setActiveView} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col">
                <Header setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 p-6">
                    <div className="container mx-auto">
                         <h1 className="text-3xl font-bold text-gray-800 mb-6">{activeView}</h1>
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;

