"use client"
import { useAppSelector } from '@/app/redux/store';
import React from 'react'

const Test = () => {
    // const router=useRouter()
    // const dispatch = useDispatch<AppDispatch>();
    const username = useAppSelector((state) => state.user.userValue.username);
    const cartLength = useAppSelector((state) => state.user.userValue.cart?.length)||0;
    const orderLength = useAppSelector((state) => state.user.userValue.orders?.length)||0;
  return (
    <div>Test component
<br />

        <span>cart length: {cartLength?cartLength:""}</span><br />
        <span>user: {username?username:""}</span>
    </div>
  )
}

export default Test