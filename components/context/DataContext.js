import React, { createContext, useReducer } from "react";

export const DataContext = createContext();

const incomesList = [
  {
    id: 1,
    amount: 3000,
    description: "Salary",
    date: new Date(),
    category: "Salary",
    type: "income",
  },
  {
    id: 2,
    amount: 2504,
    description: "Crypto",
    date: new Date(),
    category: "Investments",
    type: "income",
  },
  {
    id: 3,
    amount: 45,
    description: "Recycle",
    date: new Date(),
    category: "Other",
    type: "income",
  },
  {
    id: 4,
    amount: 45,
    description: "Groceries",
    date: new Date(),
    category: "Food",
    type: "income",
  },
];
const expensesList = [
  {
    id: 6,
    amount: 250,
    description: "Toiletries",
    date: new Date(),
    category: "Utilities",
    type: "expense",
  },
  {
    id: 7,
    amount: 350,
    description: "Invest",
    date: new Date(),
    category: "Investments",
    type: "expense",
  },
  {
    id: 8,
    amount: 450,
    description: "cigarette",
    date: new Date(),
    category: "Other",
    type: "expense",
  },
  {
    id: 3535,
    amount: 550,
    description: "new pc",
    date: new Date(),
    category: "Other",
    type: "expense",
  },
  {
    id: 324,
    amount: 650,
    description: "Restaurant",
    date: new Date(),
    category: "Food",
    type: "expense",
  },
  {
    id: 1,
    amount: 250,
    description: "Doctor appointment",
    date: new Date(),
    category: "Health",
    type: "expense",
  },
  {
    id: 2,
    amount: 2504,
    description: "car repair",
    date: new Date(),
    category: "Utilities",
    type: "expense",
  },
  {
    id: 3,
    amount: 210,
    description: "night out",
    date: new Date(),
    category: "Entertainment",
    type: "expense",
  },
  {
    id: 4,
    amount: 150,
    description: "Car insurance",
    date: new Date(),
    category: "Insurance",
    type: "expense",
  },
  {
    id: 5,
    amount: 20,
    description: "Bus ride",
    date: new Date(),
    category: "Transportation",
    type: "expense",
  },
];

const initialState = {
  incomes: incomesList,
  expenses: expensesList,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_INCOME":
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "REMOVE_INCOME":
      return {
        ...state,
        incomes: state.incomes.filter(
          (income, index) => index !== action.payload
        ),
      };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense, index) => index !== action.payload
        ),
      };
    case "SET_EXPENSES":
      return action.payload;
    case "SET_INCOMES":
      return action.payload;
    default:
      return state;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addIncome = (income) => {
    dispatch({ type: "ADD_INCOME", payload: income });
  };

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: expense });
  };

  const removeIncome = (index) => {
    dispatch({ type: "REMOVE_INCOME", payload: index });
  };

  const removeExpense = (index) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: index });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET_EXPENSES", payload: expenses });
  };
  const setIncomes = (incomes) => {
    dispatch({ type: "SET_INCOMES", payload: incomes });
  };

  return (
    <DataContext.Provider
      value={{
        incomes: state.incomes,
        expenses: state.expenses,
        addIncome,
        addExpense,
        removeIncome,
        removeExpense,
        setExpenses,
        setIncomes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
