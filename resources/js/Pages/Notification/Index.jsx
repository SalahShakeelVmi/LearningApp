
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head,router,usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import moment from 'moment/moment'
import { FaCheckCircle } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import PrimaryButton from '@/Components/PrimaryButton';
const Index = ({auth, notifications,count_notifications}) => {

  const [loadData, setLoadData] = useState(10);
  const [loading, setLoading] = useState(false);
  const loadMore = () => {
    setLoading(true);
    setLoadData(loadData + 3);
    router.visit(route('notifications.index',{load:loadData}), {
      preserveScroll: true,
      preserveState: true,
      replace: false,
      onFinish: visit => {
        setLoading(false);
      },
    });
   
  }

    const updateNotification = (id) => {
        router.put(route('notification.update',{id:id}));
    }

    const updateAllNotification = () => {
        router.put(route('notification.update.all'));
    }

  return (
    <Authenticated user={auth.user}>
        <Head title="Notification" />
    <div className='flex items-start justify-center mt-5'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-1/2'>

        <div className="flex items-center justify-between mb-10">
    <h1 className="font-bold">Notifications</h1>

    {count_notifications.length > 0 && (
        <button
            onClick={() => updateAllNotification()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
            <FaCheckCircle className="me-2" color="green" />
            Mark as all read
        </button>
    )}
</div>


        {notifications.data.length > 0 ? (
            <>
        <ol class="relative border-s border-gray-200 dark:border-gray-700">  
      
        {notifications.data.map((n) => (
                  
            <li class="mb-10 ms-6">            
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <MdNotificationsActive size={15} color='black' />
                </span>
                <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{n.data['header']} 
              {n.read_at ? null : (
                  
             
                <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                    Unread
                </span>
                 )}
                </h3>
                <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{moment(n.created_at).fromNow()}</time>
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{n.data['message']}</p>
              {n.read_at ? null : (
                <button onClick={() => updateNotification(n.id)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                <FaCheckCircle className='me-2' color='green' />
                     Mark as read</button>
                       )}
            </li>

            ))}    
        
        </ol>
        
        {notifications.data.length < notifications.total && (
          
        
        <div className='flex justify-center'>
          <PrimaryButton disabled={loading} onClick={()=>loadMore()}  className=''>
            {loading ? 'Loading...' : 'Load More'}
            </PrimaryButton>
        </div>
        )}
        </>
        ):(<>
        <h1>No notifications found!</h1>
        </>)}
        </div>

    </div>
    </Authenticated>
  )
}

export default Index