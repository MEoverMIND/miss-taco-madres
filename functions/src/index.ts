/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

let stripe: any = null;
console.log("Stripe client initialization deferred until first request.");

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

export const stripeWebhook = functions.https.onRequest(
  async (req: express.Request, res: express.Response) => {
    // Unique comment to force deployment: Updated on 2025-06-28 18:46 with lazy Stripe initialization
    console.log("Webhook function triggered, processing request...");
    const sig = req.headers["stripe-signature"];
    const webhookSecret = functions.config().stripe.webhook_secret;
    console.log("Retrieved webhook secret from config.");

    // Lazy initialization of Stripe client on first request
    if (!stripe) {
      console.log("Initializing Stripe client on first request...");
      try {
        console.log("Loading Stripe module...");
        stripe = require("stripe")(functions.config().stripe.secret);
        console.log("Stripe client initialized successfully on first request.");
      } catch (error) {
        console.error(
          "Failed to initialize Stripe client on first request:",
          (error as Error).message
        );
        res
          .status(500)
          .send(
            `Server Error: Stripe initialization failed: ${
              (error as Error).message
            }`
          );
        return;
      }
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        (req as any).rawBody,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error(
        "⚠️ Webhook signature verification failed.",
        (err as Error).message
      );
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      return;
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // TODO: update votes in Firestore based on session metadata or info using 'event.data.object'
    }

    res.status(200).end();
  }
);
