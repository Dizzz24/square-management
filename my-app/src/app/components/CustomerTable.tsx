"use client";
import { useEffect } from 'react';
import useStore from '@/zustand/store';
import Pagination from './Pagination';
import TableRow from './TableRow';

export default function CustomerTable() {
  const {
    data: { customers, totalPages, page, search, level },
    setCustomers, setPage, setLoading, setError, error
  } = useStore();

  const fetchCustomers = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search,
        level
      }).toString();

      const response = await fetch(`http://localhost:3000/customers?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.customers.length === 0) {
        setError('No customers found.');
      } else {
        setCustomers(result.customers, result.totalPages, result.totalCustomers, page);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(page);
  }, [page, search, level]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="overflow-x-auto relative overflow-y-auto max-h-[450px] scrollbar-custom">
          <table className="min-w-full text-left">
            <thead className='bg-slate-100 font-semibold sticky top-0 z-10'>
              <tr className="text-gray-500">
                <th className="p-4 rounded-tl-lg">No.</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Level</th>
                <th className="p-4">Favorite Menu</th>
                <th className="p-4">Total Transaction</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className='text-sm font-medium' style={{ maxHeight: '400px' }}>
              {error ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No customers available.
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <TableRow key={customer.id} customer={customer} no={index + 1} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-auto bg-gray-50 rounded-lg">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
