/* eslint-disable guard-for-in */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getAverage = functions.https.onRequest(async (request, response)=>{
  try {
    const snap = await admin.firestore().doc("/config/averageDoc").get();
    response.send(snap.data());
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

export const onBunnyCreate = functions.firestore.document("/bunnies/{bunnyId}")
    .onCreate(async (snapshot, context) => {
      const bunnyId = context.params.bunnyId;
      console.log(`New bunny created ${bunnyId}`);
      await updateAvg(0, "create");
    });

export const onBunnyDelete = functions.firestore.document("/bunnies/{bunnyId}")
    .onDelete(async (snapshot, context) => {
      const bunnyId = context.params.bunnyId;
      console.log(`Bunny deleted ${bunnyId}`);
      functions.logger.log("total points", snapshot.data().totalPoints);
      await updateAvg(0-snapshot.data().totalPoints, "delete");
    });

export const onBunnyUpdate = functions.firestore.document("/bunnies/{bunnyId}")
    .onUpdate(async (change, context) => {
      if (change.after.data()===change.before.data()) return;
      const bunnyId = context.params.bunnyId;
      console.log(`Bunny updated ${bunnyId}`);
      // eslint-disable-next-line max-len
      const diff=change.after.data().totalPoints-change.before.data().totalPoints;
      await updateAvg(diff, "update");
    });

// eslint-disable-next-line max-len
export const onConfigUpdate=functions.firestore.document("/config/points")
    .onUpdate(async (change, context) =>{
      const before = change.before.data();
      const after = change.after.data();
      if (before===after) return;
      const diff = before.carrot!==after.carrot? "carrot":
      before.lettuse!==after.lettuse? "lettuse" :
      before.playFirst!==after.playFirst? "playFirst":
      "playFriend";
      functions.logger.log("diff ", diff);
      await updateAllBunnies(diff,
          before[diff], after[diff]);
    });


// export const feedBunny = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// eslint-disable-next-line max-len
// export const playsWithFBunny = functions.https.onRequest((request, response) =>{
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * updte all bunnies after cofig was updated .
 * @param {string} category the category to update by.
 * @param {number} beforePoints the previous points.
 * @param {number} afterPoints the nre points.
 */
async function updateAllBunnies(category: string,
    beforePoints: number, afterPoints: number) {
  try {
    const bunniesSnap = (await admin.firestore()
        .collection("bunnies").get()).docs;
    const promises: any[] = [];
    // let sum = 0;
    bunniesSnap.forEach(async (bunny) => {
      functions.logger.log("bunny's val is", bunny.get(category));
      functions.logger.log("prevP and newP", beforePoints, afterPoints);
      const amount = (await bunny.get(category));
      const prevtotal = (await bunny.get("totalPoints"));
      const newTotal = prevtotal+amount*(afterPoints-beforePoints);
      functions.logger.log("prev and new", prevtotal, newTotal);
      promises.push(bunny.ref.update({totalPoints: newTotal}));
    });
    Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
}

/**
 * updte the avg according to one change.
 * @param {number} change new amount of points.
 * @param {string} fix new amount of points.
 */
async function updateAvg(change:number, fix: string) {
  try {
    const avFer = admin.firestore().collection("config").doc("averageDoc");
    const currAverage = (await avFer.get()).data()?.average;
    const amountOfBunnies = (await admin.firestore()
        .collection("bunnies").get()).size;
    // eslint-disable-next-line max-len
    functions.logger.log("inside updateAvg ", change, amountOfBunnies, currAverage, fix);
    try {
      // eslint-disable-next-line space-before-blocks
      let newAv = 0;
      if (amountOfBunnies==0 ) {
        await avFer.update({average: 0});
        return;
      }
      switch (fix) {
        case "update": {
          newAv=(((amountOfBunnies*currAverage)+change) / amountOfBunnies);
          break;
        }
        case "delete": {
          newAv=((((amountOfBunnies+1)*currAverage)+change) / amountOfBunnies);
          break;
        }
        case "create": {
          newAv= ((amountOfBunnies-1)*currAverage)/amountOfBunnies;
          break;
        }
      }

      await avFer.update({average: newAv});
      // eslint-disable-next-line max-len
      functions.logger.log("new average after update", (await avFer.get())?.data()?.average);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}


