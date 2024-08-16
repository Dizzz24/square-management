export default function Header() {
    return (
        <div className="flex justify-between items-center p-6 bg-white shadow border-b relative">
            <div>
                <h1 className="text-3xl font-bold text-gray-700 pb-1">Customer</h1>
                <p className="text-gray-500">Manage and organize your customer data efficiently</p>
            </div>
            <div className="flex space-x-2 absolute bottom-0 right-0 text-center pr-6">
                {/* Add additional buttons or actions if needed */}
                <div className="w-48  pb-3 cursor-pointer border-b-2 border-blue-300">Customer</div>
                <div className="w-48 pb-3 cursor-pointer">Promo</div>
                <div className="w-48 pb-3 cursor-pointer">Voucher</div>
            </div>
        </div>
    );
}
