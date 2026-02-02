
const DB_NAME = 'kp_client_db';
const DB_VERSION = 1;
const PROTOCOL_STORE = 'permissions';

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
        return reject(new Error("IndexedDB is not supported on server side"));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("IndexedDB error:", request.error);
      reject(request.error);
    };

    request.onsuccess = (event) => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PROTOCOL_STORE)) {
        db.createObjectStore(PROTOCOL_STORE, { keyPath: 'id' });
      }
    };
  });
};

export const savePermissions = async (permissions: any[]) => {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([PROTOCOL_STORE], 'readwrite');
    const store = transaction.objectStore(PROTOCOL_STORE);
    
    // We only store one item: the list of permissions
    // We use a fixed key 'user_menu'
    const request = store.put({ id: 'user_menu', data: permissions });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getPermissions = async (): Promise<any[] | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([PROTOCOL_STORE], 'readonly');
    const store = transaction.objectStore(PROTOCOL_STORE);
    const request = store.get('user_menu');

    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.data);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

export const deleteDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => {
        console.log("IndexedDB deleted successfully");
        resolve();
    };
    request.onerror = () => reject(request.error);
    request.onblocked = () => {
        console.warn("Delete DB blocked. Please close other tabs.");
        resolve(); // We resolve anyway to allow progress, though it might fail to recreate immediately
    };
  });
};
