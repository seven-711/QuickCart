import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "../models/User";
import Order from "../models/order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quick-cart-next" });

//Inngest function to save user data to a database

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };
    await dbConnect();
    await User.create(userData);
  }
);

//Inngest function to update user data in a database
export const syncUserUpdate = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };
    await dbConnect();
    await User.findByIdAndUpdate(id, userData);
  }
);

//Inngest function to delete user data from a database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnect();
    await User.findByIdAndDelete(id);
  }
);


// Function to create order in the database
export const createOrder = inngest.createFunction(
  {
    id: "create-order",
    batchEvents: {
      maxSize: 25,
      timeout: '5s'
    }
  },
  {
    event: "order.created",
  },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        address: event.data.address,
        cartItems: event.data.cartItems,
        totalAmount: event.data.totalAmount,
        date: event.data.date
      }
    })
    await dbConnect();
    await Order.insertMany(orders)

    return {
      success: true,
      processed: orders.length,
      message: "Order created successfully"
    }
    
  }
);