import mongoose from "mongoose";
import { startSession } from "mongoose";
import { commitWithRetry, transactWithRetry } from "./commit";

const Schema = mongoose.Schema;
const voucherSchema = new Schema({
  username: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const VoucherModel = mongoose.model("account", voucherSchema);
mongoose.connect(
  "mongodb+srv://anhchangcut:nhut.nguyenpro@cluster0.hg4krsi.mongodb.net/testDB"
);

export const createVoucher = async () => {
  const session = await startSession();
  session.startTransaction();
  try {
    //var user = await VoucherModel.find({}).session(session);
    //var age = <number>user[0].age;   ////
    //const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
    //await delay(1);

    //if (age > 0) {
    //console.log(age);
    await VoucherModel.findOneAndUpdate(
      { username: "sinhnhut" },
      { $inc: { age: -1 } },
      { session: session }
    );

    //await transactWithRetry(commitWithRetry, session);
    await commitWithRetry(session);

    //} else {
    // session.endSession();
    // console.log("not enoungh age!!!");
    //}
    //session.endSession();
  } catch (error: any) {
    console.log(error);
    //console.log("error here");
    //transactWithRetry(commitWithRetry, session);
    //session.endSession();
    //if (error.hasErrorLabel("UnknownTransactionCommitResult")) {
    //console.log(
    //  "UnknownTransactionCommitResult, retrying commit operation ..."
    //);
    //} else {
    // console.log("Error during commit ...");
    // throw error;
  } finally {
    session.endSession();
  }
};
