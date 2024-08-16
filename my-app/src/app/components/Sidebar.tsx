import { LuLayoutDashboard, LuPackage, LuUserCog } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { BiDish } from "react-icons/bi";
import { MdDesignServices } from "react-icons/md";
import { TbReport, TbTruckDelivery } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";

const menuItems = [
    { icon: <LuLayoutDashboard />, label: "Dashboard", href: "#" },
    { icon: <LuPackage />, label: "Stock", href: "#" },
    { icon: <FiUsers />, label: "Customer", href: "#" },
    { icon: <BiDish />, label: "Restaurant", href: "#" },
    { icon: <MdDesignServices />, label: "Design", href: "#" },
    { icon: <TbReport />, label: "Report", href: "#" },
    { icon: <LuUserCog />, label: "Role & Admin", href: "#" },
    { icon: <VscSettings />, label: "Setting", href: "#" },
];

const integrationItems = [
    { icon: <AiOutlineShoppingCart />, label: "Stock", href: "#" },
    { icon: <TbTruckDelivery />, label: "Supply", href: "#" },
];

export default function Sidebar() {
    return (
        <div className="w-64 bg-[#FFFFFF] flex flex-col p-4 border-r-2">
            <h2 className="text-4xl font-bold mb-8 text-blue-500">square</h2>
            <h1 className="py-1 px-4 mb-2 text-sm text-slate-400">Menu</h1>
            <nav className="text-slate-400 flex flex-col">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="py-2 px-4 mb-2 rounded hover:bg-slate-100 flex items-center gap-2"
                    >
                        {item.icon}
                        {item.label}
                    </a>
                ))}
            </nav>
            <h1 className="pt-3 py-1 px-4 mb-2 text-sm text-slate-400">Integration</h1>
            <nav className="text-slate-400 flex flex-col">
                {integrationItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="py-2 px-4 mb-2 rounded hover:bg-slate-100 flex items-center gap-2"
                    >
                        {item.icon}
                        {item.label}
                    </a>
                ))}
            </nav>
            <div className="mt-auto border-t-2">
                <div className="flex items-center p-4">
                    <div className="size-10 bg-blue-400 rounded-full">
                        {/* <img src="" alt="Profile" className="h-10 w-10 rounded-full" /> */}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-black">Savannah N</p>
                        <p className="text-xs text-gray-400">Food Quality Manager</p>
                    </div>
                </div>
                <button className="w-full py-2 px-4 mt-2 bg-[#FEF5F6] text-[#8F0A13] rounded hover:bg-red-600 hover:text-white transition-all delay-75 ease-in-out flex justify-center items-center gap-2">
                    <SlLogout />
                    Logout
                </button>
            </div>
        </div>
    );
}
