import { MongoError } from "mongodb";
import { ClientSession } from "mongoose";
// create conflict
export async function commitWithRetry(session: ClientSession) {
  try {
    await session.commitTransaction();
    console.log("Transaction committed.");
  } catch (error: any) {
  }
}

// public static <T> T transactWithRetry(Callable<T> transactional) throws Exception {
//   while (true) {
//       try {
//           return transactional.call();
//       } catch (MongoException ex) {
//           if (!ex.hasErrorLabel(MongoException.TRANSIENT_TRANSACTION_ERROR_LABEL)) throw ex;
//       }
//   }
// }

export async function transactWithRetry(txnFunc: any, session: ClientSession){
  while (true) {
    try {
        txnFunc(session);
    } catch (error) {
        console.log("Transaction aborted. Caught exception during transaction.");
        if (error instanceof Error) {
            console.log(error.message);
        } else if (
            error instanceof MongoError &&
            error.hasErrorLabel("TransientTransactionError")
        ) {
            console.log("TransientTransactionError, retrying transaction ...");
        } else {
            console.log("Error during commit ...");
            throw error;
        }
    }
}
}
