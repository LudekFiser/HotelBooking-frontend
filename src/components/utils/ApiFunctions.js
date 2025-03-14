import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

/*export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}
export const getHeaderPhoto = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
    }
}*/
export const getHeader = (contentType = "application/json") => {
    const token = localStorage.getItem("token");
    
    const headers = {
        Authorization: `Bearer ${token}`
    };

    // Přidáme Content-Type pouze pokud není multipart/form-data (Axios si ho nastaví sám)
    if (contentType !== "multipart/form-data") {
        headers["Content-Type"] = contentType;
    }

    return headers;
};


// This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    // send data to backend
    const response = await api.post("/rooms/add/new-room", formData, {
        headers: getHeader("multipart/form-data")
    })
    if(response.status == 201) {
        return true
    } else {
        return false
    }
}

// This function gets all room types from the database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

// This function gets all the rooms from the database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

// This function deletes a room by the Id from the database
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deleting a room ${error.message}`)
    }
}

// This function updates a room
export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

// This function gets a room by the id
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching a room ${error.message}`)
    }
}

// This function saves a new booking
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking a room : ${error.message}`)
        }
    }
}

// This function gets all the bookings from the database
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}

// This function gets a booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error finding a booking : ${error.message}`)
        }
    }
}

// This function cancels a booking
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error canceling a booking : ${error.message}`)
    }
}

// This function gets all available rooms from the database within a given date and room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result
}

// This function registers a new user
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`User registration error : ${error.message}`)
        }
    }
}

// This function logs-in a registered user
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

// This function gets the user profile
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/users/profile/${userId}`, { 
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// This function deletes a user 
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, { 
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

// This function gets a single user
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}