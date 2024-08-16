export default function RightSide() {
    return (
        <>
            <div className="w-80 h-full py-5 pr-5 flex flex-col">
                {/* Panel Analitik */}
                <div className="bg-blue-600 p-4 h-72 rounded-lg shadow mb-6 flex justify-between flex-col">
                    <h2 className="text-2xl text-white font-light flex-1 leading-10">See analitytc of the Customer Clearly</h2>
                    <div className="">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            See Analytics
                        </button>
                    </div>
                </div>

                {/* Panel Top Menu */}
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow flex-1">
                    <h2 className="text-lg font-semibold pb-2">Top Menu <br /> <span className="text-orange-500">This Week</span></h2>
                    <p className="text-xs">10 - 12 Agustus 2024</p>
                    <ul className="mt-4 space-y-2 text-gray-700">
                        <li className="w-full rounded-lg bg-[#FFFFFF] p-2 relative font-bold">Nasi Goreng Jamur Special Resto Pak Min
                            <div className="absolute -top-2  right-0 size-8 bg-orange-500 flex justify-center items-center -translate-x-1 z-10 font-semibold text-white rotate-12">1</div>
                            <div className="absolute -top-2 right-0 size-8 bg-black flex justify-center items-center translate-y-1 opacity-80 rotate-12"></div>
                        </li>
                        <li>2. Tongseng Sapi Gurih</li>
                        <li>3. Nasi Gudeg Telur Ceker</li>
                        <li>4. Nasi Ayam Serundeng</li>
                        <li>5. Nasi Goreng Seafood</li>
                    </ul>
                </div>
            </div>
        </>
    )
}