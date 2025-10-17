import React, { useState } from 'react';
import {
    Search, Bell, ChevronDown, Home, ShoppingBag, Package, Users, BarChart2, PlusCircle, MoreVertical,
    ClipboardList, Trash2, CookingPot, UserPlus, TrendingUp, DollarSign, AlertCircle, Clock, CheckCircle, XCircle, RefreshCw, Sprout
} from 'lucide-react';

// --- MOCK DATA (EXPANDED BASED ON REQUIREMENTS) ---

// 1. Dashboard Data
const mockTodaysStats = {
    salesRevenue: { value: '₹12,550', change: '+15.2%' },
    totalOrders: { value: '48', change: '+8%' },
    averageOrderValue: { value: '₹261.45', change: '+7.1%' },
    wastageCount: { value: '7 items', change: 'N/A' },
};

const mockTopSellers = [
    { name: 'Chocolate Croissant', sold: 35 },
    { name: 'Artisan Sourdough', sold: 22 },
    { name: 'Red Velvet Cupcake', sold: 18 },
];

const mockLowStockAlerts = [
    { name: 'Dark Chocolate Chips', current: '2.5 kg', threshold: '5 kg' },
    { name: 'Vanilla Extract', current: '0.8 L', threshold: '1 L' },
    { name: '12-inch Cake Boxes', current: '15 units', threshold: '20 units' },
];

const mockUpcomingOrders = [
    { id: 'ORD088', customer: 'Anjali Desai', due: 'Today, 4:00 PM', item: 'Custom Birthday Cake' },
    { id: 'ORD091', customer: 'Corporate Events Inc.', due: 'Tomorrow, 9:00 AM', item: '150 Assorted Pastries' },
];

// 2. Sales & Order Data
const mockOrders = [
    { id: 'ORD088', customer: 'Anjali Desai', date: '2025-10-14', total: '₹3,500', status: 'In Production', type: 'Custom Cake', paymentMethod: 'UPI', paymentStatus: 'Paid' },
    { id: 'ORD087', customer: 'Rohan Sharma', date: '2025-10-14', total: '₹2,500', status: 'Ready for Pickup', type: 'Online', paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
    { id: 'ORD086', customer: 'Priya Patel', date: '2025-10-14', total: '₹450', status: 'Completed', type: 'In-Store', paymentMethod: 'Cash', paymentStatus: 'Paid' },
    { id: 'ORD085', customer: 'Amit Singh', date: '2025-10-13', total: '₹1,200', status: 'Completed', type: 'Phone-in', paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
    { id: 'ORD084', customer: 'Sneha Verma', date: '2025-10-13', total: '₹8,500', status: 'Completed', type: 'Wholesale', paymentMethod: 'Bank Transfer', paymentStatus: 'Unpaid' },
    { id: 'ORD083', customer: 'Vikram Reddy', date: '2025-10-12', total: '₹180', status: 'Cancelled', type: 'Online', paymentMethod: 'N/A', paymentStatus: 'N/A' },
];

// 3. Inventory Data
const mockIngredients = [
    { id: 'ING001', name: 'All-Purpose Flour', sku: 'APF-1KG', supplier: 'GrainMasters Inc.', quantity: '55 kg', unit: 'kg', cost: '₹50/kg', threshold: '20 kg', expiry: '2026-03-01' },
    { id: 'ING002', name: 'Caster Sugar', sku: 'CSG-1KG', supplier: 'SweetSupply Co.', quantity: '32 kg', unit: 'kg', cost: '₹65/kg', threshold: '15 kg', expiry: '2026-08-15' },
    { id: 'ING003', name: 'Dark Chocolate Chips', sku: 'DCC-500G', supplier: 'ChocoWorld', quantity: '2.5 kg', unit: 'kg', cost: '₹800/kg', threshold: '5 kg', expiry: '2025-12-20' },
    { id: 'ING004', name: 'Fresh Cream', sku: 'FRC-1L', supplier: 'DailyDairy', quantity: '8 L', unit: 'L', cost: '₹250/L', threshold: '5 L', expiry: '2025-10-18' },
    { id: 'ING005', name: 'Vanilla Extract', sku: 'VNE-100ML', supplier: 'FlavourHouse', quantity: '0.8 L', unit: 'L', cost: '₹3000/L', threshold: '1 L', expiry: '2027-01-01' },
];

const mockProducts = [
    { id: 1, name: 'Artisan S sourdough', sku: 'BRD-SD-01', category: 'Bread', stock: 25, price: '₹350', cost: '₹120.50', status: 'In Stock', image: 'https://placehold.co/400x400/F5C7A9/FFF?text=Sourdough' },
    { id: 2, name: 'Chocolate Croissant', sku: 'PST-CC-01', category: 'Pastry', stock: 150, price: '₹120', cost: '₹45.75', status: 'In Stock', image: 'https://placehold.co/400x400/BF8B67/FFF?text=Croissant' },
    { id: 3, name: 'Red Velvet Cupcake', sku: 'CKE-RV-01', category: 'Cake', stock: 0, price: '₹90', cost: '₹32.00', status: 'Out of Stock', image: 'https://placehold.co/400x400/D9534F/FFF?text=Cupcake' },
    { id: 4, name: 'Custom Wedding Cake', sku: 'CKE-CW-01', category: 'Custom', stock: 5, price: '₹4,500', cost: '₹1850.00', status: 'Low Stock', image: 'https://placehold.co/400x400/EAD5DC/FFF?text=Cake' },
    { id: 5, name: 'Assorted Donuts Box', sku: 'PST-DN-12', category: 'Pastry', stock: 45, price: '₹600', cost: '₹210.25', status: 'In Stock', image: 'https://placehold.co/400x400/FFDAB9/FFF?text=Donuts' },
];

// 4. Production Data
const mockBakeSheet = [
    { product: 'Chocolate Croissant', target: 200, actual: 200, baker: 'Ravi', status: 'Completed' },
    { product: 'Artisan Sourdough', target: 50, actual: 50, baker: 'Sunita', status: 'Completed' },
    { product: 'Red Velvet Cupcake', target: 100, actual: 100, baker: 'Ravi', status: 'Completed' },
    { product: 'Baguette', target: 80, actual: 0, baker: 'Sunita', status: 'To-Do' },
];

// 5. Customer Data
const mockCustomers = [
    { id: 'CUST01', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', spent: '₹12,500', loyaltyPoints: 125, notes: 'Prefers whole wheat' },
    { id: 'CUST02', name: 'Priya Patel', email: 'priya.patel@example.com', spent: '₹8,200', loyaltyPoints: 82, notes: 'Allergy: Peanuts' },
    { id: 'CUST03', name: 'Amit Singh', email: 'amit.singh@example.com', spent: '₹21,300', loyaltyPoints: 213, notes: 'Birthday: Nov 15' },
    { id: 'CUST04', name: 'Sneha Verma', email: 'sneha.verma@example.com', spent: '₹9,800', loyaltyPoints: 98, notes: 'Wholesale client' },
];

// 6. Employee Data
const mockEmployees = [
    { id: 'EMP01', name: 'Sunita Gupta', role: 'Head Baker', status: 'Active' },
    { id: 'EMP02', name: 'Ravi Kumar', role: 'Baker', status: 'Active' },
    { id: 'EMP03', name: 'Meera Iyer', role: 'Cashier', status: 'On Leave' },
    { id: 'EMP04', name: 'Rajesh Shah', role: 'Manager', status: 'Active' },
];

// 7. NEW: Consolidated Waste Data
const mockWasteData = [
    { id: 'WST001', item: 'Cinnamon Roll', type: 'Finished Product', quantity: 3, unit: 'units', reason: 'Unsold', date: '2025-10-16', loggedBy: 'Manager', estimatedCost: '₹150.00' },
    { id: 'WST002', item: 'Sourdough Loaf', type: 'Finished Product', quantity: 1, unit: 'unit', reason: 'Production Error', date: '2025-10-16', loggedBy: 'Sunita', estimatedCost: '₹120.50' },
    { id: 'WST003', item: 'Fresh Cream', type: 'Ingredient', quantity: '2', unit: 'L', reason: 'Expired', date: '2025-10-15', loggedBy: 'Manager', estimatedCost: '₹500.00' },
    { id: 'WST004', item: 'Red Velvet Cupcake', type: 'Finished Product', quantity: 5, unit: 'units', reason: 'Damaged during transit', date: '2025-10-14', loggedBy: 'Meera Iyer', estimatedCost: '₹160.00' },
    { id: 'WST005', item: 'All-Purpose Flour', type: 'Ingredient', quantity: '1.5', unit: 'kg', reason: 'Contamination', date: '2025-10-13', loggedBy: 'Ravi Kumar', estimatedCost: '₹75.00' },
];


// --- UTILITY COMPONENTS ---

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        {children}
    </div>
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

// --- NEW DATE FILTER COMPONENT ---
const DateRangeFilter = ({ onFilter }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilterClick = () => {
        onFilter({ startDate, endDate });
    };

    return (
        <div className="bg-gray-100 p-3 rounded-lg border my-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
                <label htmlFor="startDate" className="text-sm font-medium text-gray-700">From:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm text-sm p-2"
                />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="endDate" className="text-sm font-medium text-gray-700">To:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm text-sm p-2"
                />
            </div>
            <button
                onClick={handleFilterClick}
                className="bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-rose-600 transition-colors text-sm"
            >
                Apply Filter
            </button>
        </div>
    );
};


// --- DASHBOARD COMPONENTS ---

const StatCard = ({ title, value, change, icon }) => (
    <Card>
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {icon}
        </div>
        <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            {change !== 'N/A' && (
                <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
            )}
        </div>
    </Card>
);

const Dashboard = () => {
    const handleDateFilter = (dates) => {
        console.log("Filtering Dashboard data for:", dates);
        // TODO: Add logic here to refetch or filter dashboard stats based on the date range.
    };

    return (
        <>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Main Stats */}
                <StatCard title="Today's Sales Revenue" value={mockTodaysStats.salesRevenue.value} change={mockTodaysStats.salesRevenue.change} icon={<DollarSign className="w-6 h-6 text-gray-400" />} />
                <StatCard title="Total Orders Today" value={mockTodaysStats.totalOrders.value} change={mockTodaysStats.totalOrders.change} icon={<Package className="w-6 h-6 text-gray-400" />} />
                <StatCard title="Average Order Value" value={mockTodaysStats.averageOrderValue.value} change={mockTodaysStats.averageOrderValue.change} icon={<TrendingUp className="w-6 h-6 text-gray-400" />} />
                <StatCard title="Wastage Count (Today)" value={mockTodaysStats.wastageCount.value} change={mockTodaysStats.wastageCount.change} icon={<Trash2 className="w-6 h-6 text-gray-400" />} />

                {/* Actionable Insights */}
                <Card className="lg:col-span-2">
                    <h4 className="font-bold text-lg text-gray-700">🚨 Low Stock Alerts</h4>
                    <ul className="mt-4 space-y-3">
                        {mockLowStockAlerts.map(item => (
                            <li key={item.name} className="flex justify-between items-center text-sm p-2 rounded-md bg-yellow-50">
                                <span className="font-semibold text-yellow-800">{item.name}</span>
                                <span className="text-yellow-600">
                                    {item.current} <span className="text-gray-400">/ {item.threshold}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="lg:col-span-2">
                    <h4 className="font-bold text-lg text-gray-700">🎂 Upcoming Custom Orders</h4>
                     <ul className="mt-4 space-y-3">
                        {mockUpcomingOrders.map(order => (
                            <li key={order.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-blue-50">
                                <div>
                                     <span className="font-semibold text-blue-800">{order.item}</span>
                                     <p className="text-xs text-blue-600">{order.customer} ({order.id})</p>
                                </div>
                                <span className="font-medium text-blue-700">{order.due}</span>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Chart Placeholders */}
                <div className="lg:col-span-3">
                    <ChartPlaceholder title="Revenue Over Time" />
                </div>
                <Card className="lg:col-span-1">
                     <h4 className="font-bold text-lg text-gray-700">⭐ Top Selling Products (Today)</h4>
                     <ul className="mt-4 space-y-4">
                        {mockTopSellers.map(item => (
                            <li key={item.name} className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-700">{item.name}</span>
                                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">{item.sold} sold</span>
                            </li>
                        ))}
                     </ul>
                </Card>
            </div>
        </>
    );
};


// --- PRODUCT & INVENTORY COMPONENTS ---

const getStatusChipClass = (status) => {
    switch (status) {
        case 'In Stock': return 'bg-green-100 text-green-800';
        case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
        case 'Out of Stock': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const ProductManagement = () => {
    const handleDateFilter = (dates) => {
        console.log("Filtering Products for:", dates);
        // TODO: Filter products by date added, last sold date, etc.
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-800">Finished Products</h2>
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
                    <PlusCircle size={20} />
                    Add Product
                </button>
            </div>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4 font-semibold text-gray-600">Product</th>
                            <th className="p-4 font-semibold text-gray-600">Category</th>
                            <th className="p-4 font-semibold text-gray-600">Stock</th>
                            <th className="p-4 font-semibold text-gray-600">Selling Price</th>
                            <th className="p-4 font-semibold text-gray-600">Production Cost</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.map(product => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-4">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                                    <div>
                                        <span className="font-medium">{product.name}</span>
                                        <p className="text-xs text-gray-500 font-mono">{product.sku}</p>
                                    </div>
                                </td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4">{product.price}</td>
                                <td className="p-4">{product.cost}</td>
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
};

const IngredientManagement = () => {
    const handleDateFilter = (dates) => {
        console.log("Filtering Ingredients for:", dates);
        // TODO: Filter ingredients by expiry date, last restock date, etc.
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-800">Raw Materials / Ingredients</h2>
                <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
                    <PlusCircle size={20} />
                    Add Ingredient
                </button>
            </div>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4 font-semibold text-gray-600">Ingredient</th>
                            <th className="p-4 font-semibold text-gray-600">Supplier</th>
                            <th className="p-4 font-semibold text-gray-600">Quantity on Hand</th>
                            <th className="p-4 font-semibold text-gray-600">Low-Stock Threshold</th>
                            <th className="p-4 font-semibold text-gray-600">Cost per Unit</th>
                            <th className="p-4 font-semibold text-gray-600">Expiry Date</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockIngredients.map(item => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <span className="font-medium">{item.name}</span>
                                    <p className="text-xs text-gray-500 font-mono">{item.sku}</p>
                                </td>
                                <td className="p-4">{item.supplier}</td>
                                <td className="p-4 font-medium">{item.quantity}</td>
                                <td className="p-4 text-sm text-gray-600">{item.threshold}</td>
                                <td className="p-4">{item.cost}</td>
                                <td className="p-4">{item.expiry}</td>
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
};

const InventoryView = () => (
    <div className="space-y-6">
        <ProductManagement />
        <IngredientManagement />
    </div>
);

// --- ORDER MANAGEMENT COMPONENTS ---
const getOrderStatusChipClass = (status) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'In Production': return 'bg-purple-100 text-purple-800';
        case 'Ready for Pickup': return 'bg-blue-100 text-blue-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const getPaymentStatusChipClass = (status) => {
    switch (status) {
        case 'Paid': return 'bg-green-100 text-green-800';
        case 'Unpaid': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const OrderManagement = () => {
    const handleDateFilter = (dates) => {
        console.log("Filtering Orders for:", dates);
        // TODO: Add logic here to filter the 'mockOrders' array based on the selected date range.
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-amber-800">Order Management</h2>
                 <button className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-amber-600 transition-colors">
                    <PlusCircle size={20} />
                    Create Order
                </button>
            </div>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-4 font-semibold text-gray-600">Order ID</th>
                            <th className="p-4 font-semibold text-gray-600">Customer</th>
                            <th className="p-4 font-semibold text-gray-600">Date</th>
                            <th className="p-4 font-semibold text-gray-600">Type</th>
                            <th className="p-4 font-semibold text-gray-600">Total</th>
                            <th className="p-4 font-semibold text-gray-600">Payment</th>
                            <th className="p-4 font-semibold text-gray-600">Order Status</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockOrders.map(order => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm text-gray-600">{order.id}</td>
                                <td className="p-4 font-medium">{order.customer}</td>
                                <td className="p-4">{order.date}</td>
                                <td className="p-4">{order.type}</td>
                                <td className="p-4">{order.total}</td>
                                 <td className="p-4">
                                     <div className="flex flex-col">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full w-min ${getPaymentStatusChipClass(order.paymentStatus)}`}>
                                            {order.paymentStatus}
                                        </span>
                                         <span className="text-xs text-gray-500 mt-1">{order.paymentMethod}</span>
                                     </div>
                                </td>
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
};


// --- CUSTOMER MANAGEMENT COMPONENTS ---
const CustomerManagement = () => {
    const handleDateFilter = (dates) => {
        console.log("Filtering Customers for:", dates);
        // TODO: Filter customers by signup date or last order date.
    };

    return (
        <Card>
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-teal-800">Customers</h2>
                 <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition-colors">
                    <PlusCircle size={20} />
                    Add Customer
                </button>
            </div>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4 font-semibold text-gray-600">Customer ID</th>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Email</th>
                            <th className="p-4 font-semibold text-gray-600">Total Spent</th>
                            <th className="p-4 font-semibold text-gray-600">Loyalty Points</th>
                            <th className="p-4 font-semibold text-gray-600">Notes</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCustomers.map(customer => (
                            <tr key={customer.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm text-gray-600">{customer.id}</td>
                                <td className="p-4 font-medium">{customer.name}</td>
                                <td className="p-4">{customer.email}</td>
                                <td className="p-4">{customer.spent}</td>
                                <td className="p-4">{customer.loyaltyPoints}</td>
                                <td className="p-4 text-sm text-gray-600">{customer.notes}</td>
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
};

// --- PRODUCTION MANAGEMENT COMPONENTS (REVISED) ---
const ProductionManagement = () => {
    const handleBakeSheetFilter = (dates) => {
        console.log("Filtering Bake Sheet for:", dates);
        // TODO: Filter bake sheet items by date.
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-teal-800">Daily Bake Sheet</h2>
                <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition-colors">
                    <PlusCircle size={20} />
                    Plan New Bake
                </button>
            </div>
            <DateRangeFilter onFilter={handleBakeSheetFilter} />
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-4 font-semibold text-gray-600">Product</th>
                        <th className="p-4 font-semibold text-gray-600">Target Qty</th>
                        <th className="p-4 font-semibold text-gray-600">Actual Qty</th>
                        <th className="p-4 font-semibold text-gray-600">Baker</th>
                        <th className="p-4 font-semibold text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockBakeSheet.map(item => (
                        <tr key={item.product} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium">{item.product}</td>
                            <td className="p-4">{item.target}</td>
                            <td className="p-4">{item.actual}</td>
                            <td className="p-4">{item.baker}</td>
                            <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};


// --- NEW WASTE MANAGEMENT COMPONENT ---
const getWasteTypeChipClass = (type) => {
    switch (type) {
        case 'Finished Product': return 'bg-orange-100 text-orange-800';
        case 'Ingredient': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const WasteManagement = () => {
    const handleDateFilter = (dates) => {
        console.log("Filtering Waste Log for:", dates);
        // TODO: Add logic here to filter the 'mockWasteData' array based on the selected date range.
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-800">Waste Management & Spoilage</h2>
                <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors">
                    <PlusCircle size={20} />
                    Log New Waste
                </button>
            </div>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4 font-semibold text-gray-600">Item</th>
                            <th className="p-4 font-semibold text-gray-600">Type</th>
                            <th className="p-4 font-semibold text-gray-600">Quantity</th>
                            <th className="p-4 font-semibold text-gray-600">Reason</th>
                            <th className="p-4 font-semibold text-gray-600">Date Logged</th>
                            <th className="p-4 font-semibold text-gray-600">Estimated Cost</th>
                            <th className="p-4 font-semibold text-gray-600">Logged By</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockWasteData.map(waste => (
                            <tr key={waste.id} className="border-b hover:bg-red-50">
                                <td className="p-4 font-medium">{waste.item}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getWasteTypeChipClass(waste.type)}`}>
                                        {waste.type}
                                    </span>
                                </td>
                                <td className="p-4">{waste.quantity} {waste.unit}</td>
                                <td className="p-4 text-sm text-gray-600">{waste.reason}</td>
                                <td className="p-4">{waste.date}</td>
                                <td className="p-4 font-medium text-red-700">{waste.estimatedCost}</td>
                                <td className="p-4">{waste.loggedBy}</td>
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
};


// --- EMPLOYEE & REPORTING COMPONENTS (PLACEHOLDERS) ---

const EmployeeManagement = () => {
    const handleDateFilter = (dates) => {
        console.log("Filtering Employees for:", dates);
        // TODO: Filter employees by hire date.
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-indigo-800">Employee Management</h2>
                 <button className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition-colors">
                    <UserPlus size={20} />
                    Add Employee
                </button>
            </div>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4 font-semibold text-gray-600">Employee ID</th>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Role</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockEmployees.map(emp => (
                            <tr key={emp.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm text-gray-600">{emp.id}</td>
                                <td className="p-4 font-medium">{emp.name}</td>
                                <td className="p-4">{emp.role}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${emp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {emp.status}
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
};

const Reporting = () => {
    const handleDateFilter = (dates) => {
        console.log("Generating Reports for date range:", dates);
        // TODO: Logic to update charts with data from the selected date range.
    };

    return (
        <>
            <DateRangeFilter onFilter={handleDateFilter} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartPlaceholder title="Sales by Product/Category" />
                <ChartPlaceholder title="Profit & Loss Report" />
                <ChartPlaceholder title="Wastage Report" />
                <ChartPlaceholder title="Sales by Order Type" />
            </div>
        </>
    );
};


// --- MAIN LAYOUT COMPONENTS ---

const Sidebar = ({ activeView, setActiveView, isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { name: 'Dashboard', icon: Home, color: 'rose' },
        { name: 'Orders', icon: Package, color: 'amber' },
        { name: 'Inventory', icon: ClipboardList, color: 'green' },
        { name: 'Production', icon: CookingPot, color: 'purple' },
        { name: 'Waste', icon: Trash2, color: 'red' },
        { name: 'Customers', icon: Users, color: 'teal' },
        { name: 'Employees', icon: UserPlus, color: 'indigo' },
        { name: 'Reports', icon: BarChart2, color: 'gray' },
    ];

    const getActiveClasses = (color) => `bg-${color}-500 text-white shadow-md`;
    const getHoverClasses = (color) => `hover:bg-${color}-50`;

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
                        placeholder="Search orders, products, customers..."
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
            case 'Dashboard': return <Dashboard />;
            case 'Orders': return <OrderManagement />;
            case 'Inventory': return <InventoryView />;
            case 'Production': return <ProductionManagement />;
            case 'Waste': return <WasteManagement />;
            case 'Customers': return <CustomerManagement />;
            case 'Employees': return <EmployeeManagement />;
            case 'Reports': return <Reporting />;
            default: return <Dashboard />;
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