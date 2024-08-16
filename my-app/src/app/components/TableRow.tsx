import TypeCostumer from "../../zustand/store.ts"
import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function TableRow({ customer, no }: { customer: TypeCostumer, no: number }) {
    return (
        <tr className="text-gray-700">
            <td className="p-4">{no}.</td>
            <td className="p-4">{customer.name}</td>
            <td className="p-4 text-red-500">{customer.level}</td>
            <td className="p-4">{customer.favoriteMenuName}</td>
            <td className="p-4">{customer.totalTransaction.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace('Rp', 'IDR')}</td>
            <td className="p-4 flex gap-1">
                <div className="text-blue-500 bg-[#FAFAFA] py-2 px-4 rounded-sm flex justify-center items-center gap-1 cursor-pointer">
                    <MdOutlineRemoveRedEye size={20} />
                    Detail
                </div>
                <div className="text-black bg-[#FAFAFA] py-2 px-4 rounded-sm flex justify-center items-center cursor-pointer">
                    <TbEdit size={20} />
                </div>
                <div className="text-red-400 bg-[#FEF5F6] py-2 px-4 rounded-sm flex justify-center items-center cursor-pointer">
                    <HiOutlineTrash size={20} />
                </div>
            </td>
        </tr>
    )
}