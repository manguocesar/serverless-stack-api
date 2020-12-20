import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return { status: true };
});

// We get the storage and source from the request body. The storage variable is the number of notes the user would like to store in his account. And source is the Stripe token for the card that we are going to charge.

// We are using a calculateCost(storage) function (that we are going to add soon) to figure out how much to charge a user based on the number of notes that are going to be stored.

// We create a new Stripe object using our Stripe Secret key. We are going to get this as an environment variable. We do not want to put our secret keys in our code and commit that to Git. This is a security issue.

// Finally, we use the stripe.charges.create method to charge the user and respond to the request if everything went through successfully.