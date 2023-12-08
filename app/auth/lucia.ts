// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { mongoose } from "@lucia-auth/adapter-mongoose";
import mongodb from "mongoose";
import { cache } from "react";
import * as context from "next/headers";

const User = mongodb.models.User || mongodb.model(
  "User",
  new mongodb.Schema(
    {
      _id: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        unique: true
      }
    } as const,
    { _id: false }
  )
);

const Key = mongodb.models.Key || mongodb.model(
  "Key",
	new mongodb.Schema(
		{
			_id: {
				type: String,
				required: true
			},
      __v: String,
			user_id: {
				type: String,
				required: true
			},
			hashed_password: String
		} as const,
		{ _id: false }
	)
);

const Session = mongodb.models.Session || mongodb.model(
  "Session",
  new mongodb.Schema(
    {
      _id: {
        type: String,
        required: true
      },
      user_id: {
        type: String,
        required: true
      },
      active_expires: {
        type: Number,
        required: true
      },
      idle_expires: {
        type: Number,
        required: true
      }
    } as const,
    { _id: false }
  )
);

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD", // "PROD" if deployed to HTTPS
	middleware: nextjs_future(),
	sessionCookie: {
		expires: false
	},
	adapter: mongoose({
		User,
		Key,
    Session
	}),
  getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

mongodb.connect(process.env.MONGODB_URI!);

export type Auth = typeof auth;

export const getPageSession = cache(() => {
	const authRequest = auth.handleRequest("GET", context);
	return authRequest.validate();
});