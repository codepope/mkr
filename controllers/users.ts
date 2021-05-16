import { v4 } from "https://deno.land/std/uuid/mod.ts";

import User from "../interfaces/User.ts";

import users from "../stubs/users.ts";

import model from "../model/model.ts";

export default {
  getUserById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const isAvailable = await model.doesUserExistByID({ id: Number(params.id) });

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No user found",
        };
        return;
      }

      const user: User = await model.getUserByID({ id: Number(params.id) }) as User;

      response.status = 200;
      response.body = {
        success: true,
        user: user,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
  createUser: async (
    { request, response }: { request: any; response: any },
  ) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    try {
      const value=await body.value;
      await model.addUser(
        {
          name: value.name,
          email:value.email,
          lat: value.lat,
          lon: value.lon,
        },
      );
      response.body = {
        success: true,
        message: "The record was added successfully",
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
  updateUserById: async (
    { params, request, response }: {
      params: { id: string };
      request: any;
      response: any;
    },
  ) => {
    // const user: User | undefined = users.find((u) => {
    //   return u.id === params.id;
    // });

    // if (!user) {
    //   response.status = 404;
    //   response.body = { success: false, message: "No user found" };
    //   return;
    // }

    // const body = await request.body();
    // const updatedData: {
    //   name?: string;
    //   email?: string;
    //   location: [number, number];
    // } = body.value;
    // let newUsers = users.map((u) => {
    //   return u.id === params.id ? { ...u, ...updatedData } : u;
    // });
  },
  deleteUserById: async(
    { params, response }: {params: { id: string }; response: any }
  ) => {
    try {
    const isAvailable = await model.doesUserExistByID({ id: Number(params.id) });

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No user found",
        };
        return;
      }

      const deleted=await model.deleteUser({ id: Number(params.id) });

      if (deleted>0) {
        response.status = 200;
        response.body = {
        success: true,
      };
      } else {
        response.status = 500;
        response.body = {
        success: false,
      };
      }
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }


  },
};
