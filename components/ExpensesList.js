// Expenselist.js
import React from 'react'
import { View } from 'react-native';
import List from "../components/List"

const expensesList = [
    {
      id: 1,
      amount: 250,
      description: "groceries",
      date: new Date(),
    },
    {
      id: 2,
      amount: 2504,
      description: "car repair",
      date: new Date(),
    },
    {
      id: 3,
      amount: 210,
      description: "night out",
      date: new Date(),
    },
    {
      id: 4,
      amount: 150,
      description: "keyboard",
      date: new Date(),
    },
  ];
const ExpensesList = () => {
  return (
    <List type= {"expense"} data={expensesList} />
  )
}

export default ExpensesList