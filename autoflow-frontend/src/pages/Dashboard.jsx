import { Link } from 'react-router-dom';
import { ROIDashboard } from '../components/dashboard/ROIDashboard';
import { Plus, Zap, Settings, ShoppingBag, ShoppingBasket, Scissors, Utensils, Briefcase, ChevronRight, MessageSquare } from 'lucide-react';

const BusinessCard = ({ title, icon: Icon, color, description, to }) => (
    <Link
        to={to}
        className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <Icon size={28} className="text-gray-800" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="mt-auto flex items-center text-indigo-600 text-sm font-semibold group-hover:gap-2 transition-all">
            Start Automation <ChevronRight size={16} />
        </div>
    </Link>
);

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <Zap className="text-white" fill="currentColor" size={20} />
                            </div>
                            <span className="font-bold text-2xl text-gray-900 tracking-tight">AutoFlow</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/builder"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                            >
                                <Plus size={18} />
                                New Automation
                            </Link>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                                S
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Welcome Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                        What describes your business?
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Select your industry to see pre-built automations tailored for you. No tech skills required.
                    </p>
                </div>

                {/* Business Type Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <BusinessCard
                        title="Clothing Store"
                        description="Auto-reply to size queries, stock checks, and new arrival alerts."
                        icon={ShoppingBag}
                        color="bg-pink-100 text-pink-600"
                        to="/builder"
                    />
                    <BusinessCard
                        title="Grocery Shop"
                        description="Manage daily stock, order lists, and delivery updates automatically."
                        icon={ShoppingBasket}
                        color="bg-green-100 text-green-600"
                        to="/builder"
                    />
                    <BusinessCard
                        title="Beauty Salon"
                        description="Appointment bookings, reminders, and service menu replies."
                        icon={Scissors}
                        color="bg-purple-100 text-purple-600"
                        to="/builder"
                    />
                    <BusinessCard
                        title="Home Food Business"
                        description="Menu distribution, order taking, and delivery coordination."
                        icon={Utensils}
                        color="bg-orange-100 text-orange-600"
                        to="/builder"
                    />
                </div>

                {/* ROI Dashboard Section */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Your Performance</h2>
                    </div>
                    <ROIDashboard />
                </div>

                {/* Active Workflows Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Active Automations</h2>
                        <Link to="/builder" className="text-indigo-600 font-semibold hover:text-indigo-800">
                            View All
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                        {/* Item 1 */}
                        <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Product Inquiry Bot</h4>
                                    <p className="text-sm text-gray-500">Handles generic questions about products</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                                    Active
                                </span>
                                <span className="text-sm text-gray-400 font-medium">Just now</span>
                                <ChevronRight className="text-gray-300" />
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Order Status Tracker</h4>
                                    <p className="text-sm text-gray-500">Updates customers on delivery status</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                                    Active
                                </span>
                                <span className="text-sm text-gray-400 font-medium">2h ago</span>
                                <ChevronRight className="text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
