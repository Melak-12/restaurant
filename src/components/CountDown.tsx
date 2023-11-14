"use client"
import React from 'react'
import Countdown from 'react-countdown'

const endingDate = new Date("2023-11-14")

const CountDown = () => {
  return (
    <Countdown className='font-bold text-5xl text-yellow-300' date={endingDate}/>
    // <span>new day </span>
    // <span>new day </span>
    // <span>new day </span>
  )
}

export default CountDown
