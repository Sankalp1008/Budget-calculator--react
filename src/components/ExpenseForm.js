import React from 'react';
import {MdSend} from 'react-icons/md';

export const ExpenseForm = ({charge, amount, handleCharge,handleAmount,handleSubmit, edit}) => {
    return (
        <form onSubmit={handleSubmit}>
        <div className="form-center">
            <div className="form-group">
                <label htmlFor="charge">Charge</label>
           <input type="text" className="form-control"
            id="charge" name="charge" placeholder="e.g. rent" 
            value={charge} onChange={handleCharge}></input>
            </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" className="form-control" id="Amount" name="Amount" placeholder="e.g. 100"
                    value={amount} onChange={handleAmount}
                    ></input>
                </div>
        </div>
           <button type="submit" className="btn" >
               {edit? 'edit' : 'submit'} 
           <MdSend className="btn-icon"/>
           </button>
        </form>
    );
};
 export default ExpenseForm;