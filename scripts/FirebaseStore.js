(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class FirebaseStore {
        constructor() {
            console.log('running the FirebStore function');
            firebase.initializeApp(window.FireBaseConfig);
            this.db = firebase.firestore();
            this.getAll()
                .then(d => {
                    console.log(`d: ${JSON.stringify(d)}`)
                });
        }
        async add(key, val) { return this.db.collection(`CoffeeOrders`).add(val); }
        async get(email, cb)  { 
            const docRef = this.db.collection(`CoffeeOrders`);
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            return await snapshot.docs.map(e => e.data());
        }
        async getAll(cb)    { 
            const docRef = this.db.collection(`CoffeeOrders`);
            const snapshot = await docRef.get();
            return await snapshot.docs.map(e => e.data());
        }
        async remove(email)   { 
            const docRef = await this.db.collection(`CoffeeOrders`);
            const batch = this.db.batch();
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
    }
    App.FirebaseStore = FirebaseStore;
    window.App = App;

})(window);