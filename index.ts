import * as admin from 'firebase-admin';

class Firedev {
    private setting_path: object;
    private database_url: string;
    private db!: admin.database.Database;

    constructor(setting: object, database_url: string) {
        this.setting_path = setting;
        this.database_url = database_url;

        this.connect();
    }

    private connect(): void {
        admin.initializeApp({
            credential: admin.credential.cert(this.setting_path),
            databaseURL: this.database_url
        });

        this.db = admin.database();
    }

    public close(): void {
        admin.app().delete();
    }

    public select(path: string): Promise<any> {
        const ref = this.db.ref(path)

        return ref.get().then((snapshot) => {
            const data = snapshot.val();
            return data;
        }).catch((error) => {
            throw error;
        })
    }

    public push(path: string, data: object): Promise<any> {
        const ref = this.db.ref(path);

        return ref.push(data)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            });
    }

    public set(path: string, data: object): Promise<any> {
        const ref = this.db.ref(path);

        return ref.set(data)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            });
    }

    public delete(path: string): Promise<boolean> {
        const ref = this.db.ref(path);

        return ref.remove()
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.error('Error during delete:', error);
                return false;
            });
    }

    public update(path: string, data: object): Promise<any> {
        const ref = this.db.ref(path);

        return ref.update(data)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            });
    }
}

export { Firedev };