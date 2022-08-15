import React from 'react'
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

function HomePage() {
    return (
        <MainLayout>
            <div className="bg-light p-5 mt-4 rounded-3">
                <h1>Welcome to the smiple POS for small buiness</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nihil nobis voluptatum mollitia, cum aperiam tempore rerum exercitationem, illo voluptate deleniti architecto nemo iure, quisquam modi error facilis id odio?</p>
                <p>If you have an issue, call 444-222-xxxx anytimes</p>
                <Link to="/pos" className='btn btn-primary'>Click here to sell product</Link>
            </div>
        </MainLayout>
    )
}

export default HomePage