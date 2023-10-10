"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customInitializeFirebase = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
const customInitializeFirebase = (firebaseConfig) => {
    try {
        if (!app_1.default.apps.length) {
            console.log(`RN Init firebase app with : ${firebaseConfig}`);
            return app_1.default.initializeApp(firebaseConfig);
        }
        else {
            console.log(`RN Found firebase app : ${JSON.stringify(app_1.default.apps)}`);
            return app_1.default.app();
        }
    }
    catch (error) {
        console.log(`RN Init firebase app ERROR : ${error}`);
        return error;
    }
};
exports.customInitializeFirebase = customInitializeFirebase;
