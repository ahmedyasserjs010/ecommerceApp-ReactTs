import React from 'react';

export default function ForgotPassword() {
    return (
        <div>
            <h2>Forgot Password</h2>
            <p>Please enter your email address to reset your password.</p>
            <input type="email" placeholder="Email" />
            <button>Send Reset Link</button>
        </div>
    );
}
