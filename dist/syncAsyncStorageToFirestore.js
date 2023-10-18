"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAsyncStorageToFirestore = void 0;
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const rn_logging_1 = require("rn-logging");
const loadFromAsyncStorage_1 = require("./loadFromAsyncStorage");
const getStorageDetails_1 = require("./utils/getStorageDetails");
const syncAsyncStorageToFirestore = () => __awaiter(void 0, void 0, void 0, function* () {
    const details = yield (0, getStorageDetails_1.getStorageDetails)();
    rn_logging_1.Logger.info('Starting sync of AsyncStorage data to Firestore', { key: details.asyncStorageKey }, { tag: 'rn-write-firestore' });
    try {
        // Retrieve current data from AsyncStorage
        let existingDataString = yield (0, loadFromAsyncStorage_1.loadFromAsyncStorage)();
        const asyncStorageData = existingDataString || {};
        // Retrieve current data from firestore
        const documentSnapshot = yield (0, firestore_1.default)().collection(details.collection).doc(details.firestoreKey).get();
        const firestoreData = documentSnapshot.exists ? documentSnapshot.data() : {};
        // Merge firestore data with AsyncStorage data (with AsyncStorage data taking precedence)
        const mergedData = Object.assign(Object.assign(Object.assign({}, firestoreData), asyncStorageData), { updatedAt: new Date() });
        rn_logging_1.Logger.info('Attempting to write merged data to Firestore...', { mergedData }, { tag: 'rn-write-firestore' });
        // Write the merged data back to firestore
        yield (0, firestore_1.default)()
            .collection(details.collection)
            .doc(details.firestoreKey)
            .set({ data: mergedData }, { merge: true });
        rn_logging_1.Logger.info('Successfully synced AsyncStorage data to Firestore.', null, { tag: 'rn-write-firestore' });
    }
    catch (error) {
        rn_logging_1.Logger.error('Error occurred during sync of AsyncStorage to Firestore', error, { tag: 'rn-write-firestore' });
        rn_logging_1.Logger.warn(`Please ensure you have the correct Firestore rules set up.`, null, { tag: 'rn-write-firestore' });
    }
});
exports.syncAsyncStorageToFirestore = syncAsyncStorageToFirestore;
