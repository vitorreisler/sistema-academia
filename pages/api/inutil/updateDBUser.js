"use client";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("sistema-academia");
    const user = await db
      .collection("users")
      .insertOne({ name: req.body.name });
    return res.json(user);
  } catch (e) {
    console.error(e);
  }
}
