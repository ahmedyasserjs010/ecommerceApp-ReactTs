import React from 'react';

export default function Signup() {
    return (
        <div>
            <h2>Signup</h2>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}
