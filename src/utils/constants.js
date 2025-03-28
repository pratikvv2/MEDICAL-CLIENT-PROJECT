
export const ROUTES = [
    {
        name: "Home",
        path: "/"

    },
    {
        name: "Products",
        path: "/products"
    },
    {
        name: "Services",
        path: "/services"
    },
    {
        name: "Process",
        path: "/process"
    },
    {
        name: "Your Bookings",
        path: "/bookings"
    }
];


export const TODAY = new Date().toISOString().split("T")[0];

export const COLLECTIONS = {
    bookings: "bookingDetails",
    users: "userDetails",
}

export const USER_STATUS = [
    "Cancel"
]