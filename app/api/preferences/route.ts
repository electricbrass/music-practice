import { auth } from "../../auth/lucia";
import * as context from "next/headers";
import mongodb from "mongoose";

import type { NextRequest } from "next/server";

const Preferences = mongodb.models.Preferences || mongodb.model(
  "Preferences",
  new mongodb.Schema({
    _id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  })
);

export const GET = () => {

}

export const POST = (req: NextRequest) => {

}