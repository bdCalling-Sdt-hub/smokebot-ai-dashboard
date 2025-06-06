import { useEffect, useState } from 'react'
import SubscriptionCard from './SubscriptionCard'
import { useGetMyProfileQuery } from '../../Redux/stripeApi'

export default function Packages() {
  const { data: getData } = useGetMyProfileQuery()

  const [type, setType] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  useEffect(() => {
    if (getData?.data?.packageType) {
      setType(getData?.data?.packageType)
      setExpiryDate(getData?.data?.expiryDate)
    }
  }, [getData?.data?.packageType, getData?.data?.expiryDate])

  console.log(getData?.data?.packageType)

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'Free Trial',
      price: 0,
      validity: 'Days',
      features: [
        'Talk with chatbot',
        'Show user profile',
        'Show user chat history',
        'Add product',
        'Add feature',
      ],
    },
    {
      id: 2,
      name: 'Premium subscription',
      price: 159,
      validity: 'Monthly',
      features: [
        'Talk with chatbot',
        'Show user profile',
        'Show user chat history',
        'Add product',
        'Add feature',
      ],
    },
  ])

  return (
    <div className="p-4 h-screen mx-auto mb-20 font-poppins flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <div className="text-4xl font-bold text-center mb-5">Packages Plan</div>
        <div className="flex justify-between items-center ">
          <div className=" flex items-center justify-center mx-auto overflow-auto scroll-smooth">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  type={type}
                  expiryDate={expiryDate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
