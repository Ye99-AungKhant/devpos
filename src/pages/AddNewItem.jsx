import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import MainLayout from '../layouts/MainLayout'

function AddNewItem() {
    const [name, setItemname] = useState('');
    const [price, setItemprice] = useState(0);
    const [image, setItemimage] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { name, price, image };

        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        }).then(() => {
            console.log("new blog added");

            //history.go(-1);
            history.push('/');
        });
    }

    return (
        <MainLayout>
            <div className='container-fluid offset-3 col-md-6'>
                <h2>Add New Item</h2>
                <form onSubmit={handleSubmit} className="form-control">
                    <label>Item Name:</label>
                    <input className="form-control" type="text" required value={name} onChange={(e) => setItemname(e.target.value)} />

                    <label>Item Price:</label>
                    <input className="form-control" type="number" required value={price} onChange={(e) => setItemprice(e.target.value)} />

                    <label>Item Photo:</label>
                    <input className="form-control" type="text" required value={image} onChange={(e) => setItemimage(e.target.value)} />

                    <button>Add Item</button>
                </form>
            </div>
        </MainLayout>
    )
}

export default AddNewItem