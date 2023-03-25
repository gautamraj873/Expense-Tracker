const myForm = document.getElementById('my_form');
const expenseAmount = document.getElementById('expense_amount');
const description = document.getElementById('description');
const category = document.getElementById('category_select');
const expenseList = document.getElementById('expense_list');
const editBtn = document.createElement('button');
const delBtn = document.createElement('button');


myForm.addEventListener('submit', onSubmit);
function onSubmit(e){
    e.preventDefault();

    //Add expense list from local storage to the dislpay
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${expenseAmount.value} | ${description.value} | ${category.value}`));

    //Add "Edit Expense" button to the list item
    //const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    editBtn.className = 'btn btn-dark edit';
    li.appendChild(editBtn);
    editBtn.addEventListener('click', onEdit);

    //Add "Delete Expense" button to the list item
    //const delBtn = document.createElement('button');
    delBtn.textContent = 'delete';
    delBtn.className = 'btn btn-danger delete';
    li.appendChild(delBtn);
    delBtn.addEventListener('click', onDelete);
    
    //Add whole li's-expenses to ul-expenseList
    expenseList.appendChild(li);

    //////////////////////////////////////////////////////////////////////////////////////////

    //Save the expense list in local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({
        amount: expenseAmount.value,
        description: description.value,
        category: category.value
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));

    //Clear text fields
    expenseAmount.value = '';
    description.value = '';
    category.value = '';

}


//////////////////////////////////////////////////////////////////////////////////////////

function onDelete(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
            const li = e.target.parentElement;
            expenseList.removeChild(li);

            //Get the index of the expenses item to be deleted
            const index = Array.from(expenseList.children).indexOf(li);

            // Retrieve the expenses from local storage
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

            // Remove the expense item at the specified index from the expenses array
            expenses.splice(index, 1);

            // Save the updated expenses array to local storage
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////

function onEdit(e){
    e.preventDefault();
    if(e.target.classList.contains('edit')){
        const li = e.target.parentElement;
        const index=Array.from(expenseList.children).indexOf(li);
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const expense = expenses[index];

        // Create a form with input fields and a "Save Changes" button
        const form = document.createElement('form');
        const amountInput = document.createElement('input');
        const descriptionInput = document.createElement('input');
        const categorySelect = document.createElement('select');
        const saveBtn = document.createElement('button');

        // Populate input fields with existing values
        amountInput.value = expense.amount;
        descriptionInput.value = expense.description;
        categorySelect.value = expense.category;

        // Add options to category select
        const categories = ['Transportation', 'Food', 'Electricity', 'Entertainment', 'Housing', 'Shopping',  'Other'];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        saveBtn.textContent = 'save changes';
        saveBtn.type = 'submit';
        form.appendChild(amountInput);
        form.appendChild(descriptionInput);
        form.appendChild(categorySelect);
        form.appendChild(saveBtn);        
        li.appendChild(form);

        // Update expense item when the form is submitted
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            expense.amount = amountInput.value;
            expense.description = descriptionInput.value;
            expense.category = categorySelect.value;
            li.removeChild(form);
            li.textContent = `${expense.amount} | ${expense.description} | ${expense.category}`;
            li.appendChild(editBtn);
            li.appendChild(delBtn);
            localStorage.setItem('expenses', JSON.stringify(expenses));
        })
    }
}

//////////////////////////////////////////////////////////////////////////////////////////

// Retrieve expenses from local storage when the page loads
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.amount} | ${expense.description} | ${expense.category}`;

        //Add "Edit Expense" button to the list item
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        editBtn.className = 'btn btn-dark edit';
        editBtn.addEventListener('click', onEdit);
        li.appendChild(editBtn);
    
        //Add "Delete Expense" button to the list item
        const delBtn = document.createElement('button');
        delBtn.textContent = 'delete';
        delBtn.className = 'btn btn-danger delete';
        delBtn.addEventListener('click', onDelete);
        li.appendChild(delBtn);
        
        
        //Add whole li's-expenses to ul-expenseList
        expenseList.appendChild(li);        
    }); 
});
