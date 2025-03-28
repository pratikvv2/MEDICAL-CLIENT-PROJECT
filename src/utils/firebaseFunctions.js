import { FIRESTORE } from "@/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";


export const getFilteredDataFromCollection = async (collectionName, filterName, filterType) => {

    const docRef = query(collection(FIRESTORE, collectionName),
        where(filterName, '==', filterType))
    const fetchedDoc = await getDocs(docRef);
    const result = fetchedDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    return result;
};