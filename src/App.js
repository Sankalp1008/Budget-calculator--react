// import logo from './logo.svg';
import React, {useState , useEffect} from "react";
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

// const initialExpense = [
//   { id: uuid() , charge: "rent", amount:1000 
// },
//   {
//     id: uuid(), charge: "car", amount: 3000
//   },
//   {
//     id: uuid(), charge: "college", amount: 4000
//   },
// ];

const initialExpense = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')):[];

function App() {
  const [expenses, setExpenses]= useState(initialExpense);
  const [charge,setCharge]= useState('');
  const [amount,setAmount]= useState('');
  const[alert,setAlert]= useState({show:false});
  //edit
  const[edit,setEdit]=useState(false);
  //edit item
  const [id,setId]= useState(0);

  //useEffect functionality

  useEffect(()=>{
    localStorage.setItem('expenses', JSON.stringify(expenses));
  },[expenses]);

  const handleCharge = (e)=>{
    setCharge(e.target.value);
  };

  const handleAmount = (e)=>{
    setAmount(e.target.value);
  };

  const handleAlert = ({type,text})=>{
  setAlert({show:true, type,text});
  setTimeout(()=>{
    setAlert({show:false});
  },3000)
  }
//submit button functionality 
  const handleSubmit = (e)=>{
    e.preventDefault();
  if (charge !== '' && amount > 0){
    if(edit){
      let tempExpenses=expenses.map(item=> {
        return item.id === id ? {...item,charge,amount} : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
      handleAlert({ type: 'success', text: 'item edited' });
    }
    else{
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      handleAlert({ type: 'success', text: 'item added' });

    }
   
    setCharge('');
    setAmount('');
    
   

  }
  else{
//alert
handleAlert({type: 'danger',text: 'Charge cant be an empty value and amount must not be zero'});
  }
  };

  const clearItems = () =>{
   setExpenses([]);
   handleAlert ({type: 'danger', text: 'Items deleted'});
  };
  const handleDelete =(id)=>{
 let tempExpenses = expenses.filter(item =>item.id !== id);
 setExpenses(tempExpenses);
 handleAlert({type:'danger', text:'Item deleted'});
  };

  const handleEdit =id=>{
  let expense = expenses.find(item=>item.id === id);
  let {charge,amount}= expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
  };

  return (
   <>
   {alert.show && <Alert type= {alert.type} text={alert.text}/>}
   <Alert/>
   <h1>Budget calculator</h1>
   <main className="App">
        <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount}
        handleSubmit={handleSubmit} edit={edit} />
        <ExpenseList expenses={expenses} clearItems={clearItems} 
        handleDelete={handleDelete} handleEdit={handleEdit}
        />
   </main>
   <h1>total spendings : {""}
   <span className="total">
     ${""} {expenses.reduce((acc,curr)=>{
       return( acc+= parseInt(curr.amount));
     },0)}
   </span>
   </h1>
  </>
  );
}

export default App;
