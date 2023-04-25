// IncomesList.js
import React from 'react'
import { View } from 'react-native';
import List from "../components/List"

const incomeData = [
    {
      id: 1,
      amount: 3000,
      description: "Salary",
      date: new Date(),
    },
    {
      id: 2,
      amount: 2504,
      description: "Investments",
      date: new Date(),
    },
    {
      id: 3,
      amount: 45,
      description: "Recycle",
      date: new Date(),
    }
  
  ];
const IncomesList = () => {
  return (
    <List type= {"income"} data={incomeData} />
  )
}

export default IncomesList