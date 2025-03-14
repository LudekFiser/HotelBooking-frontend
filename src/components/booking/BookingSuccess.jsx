/*import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from "../common/Header"


const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error
  return (
    <div className='container'>
        <Header title="Booking Success"/>
        <div className='mt-5'>
            {message ? (
                <div>
                    <h3 className='text-success'>Booking Successfull!</h3>
                    <p className='text-success'>{message}</p>
                </div>
            ) : (
                <div>
                    <h3 className='text-danger'>Error Booking a Room!</h3>
                    <p className='text-danger'>{error}</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default BookingSuccess*/

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
    const location = useLocation();
    const message = location.state?.message; // Backend už tuto zprávu posílá
    const error = location.state?.error;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Zobrazí "Copied!" na 2s
        }).catch(err => {
            console.error("❌ Copy failed", err);
        });
    };

    return (
        <div className="container">
            <Header title="Booking Success" />
            <div className="mt-5">
                {message ? (
                    <div>
                        <h3 className="text-success">Booking Successful!</h3>
                        <p className="text-success">
                            {message.split(":")[0]}:{" "}
                            <span
                                className="copyable text-success fw-bold position-relative"
                                style={{ cursor: "pointer" }}
                                onClick={() => copyToClipboard(message.split(":")[1].trim())} 
                            >
                                {message.split(":")[1]}
                                {copied && (
                                    <span
                                        className="position-absolute bg-black text-white px-1 py-0.5 rounded shadow-sm"
                                        style={{
                                            top: "-20px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            whiteSpace: "nowrap",
                                            fontSize: "10px",
                                        }}
                                    >
                                        Copied!
                                    </span>
                                )}
                            </span>
                        </p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-danger">Error Booking a Room!</h3>
                        <p className="text-danger">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingSuccess

