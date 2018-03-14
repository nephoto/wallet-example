import { Mongo } from 'meteor/mongo';

Wallets = new Mongo.Collection('wallets');

Meteor.publish('wallets', function() {
    return Wallets.find({
        user: this.userId
    });
});

Meteor.methods({
    'addAddress'(walletAttributes) {
        var user = Meteor.user();
        if (!user)
            throw new Meteor.Error('NOT_LOGGED_IN', "needs to be logged in");

        if (!walletAttributes.name) {
            throw new Meteor.Error('NAME_EMPTY', "name empty");
        }

        var userId = Meteor.userId();
        walletAttributes._id = walletAttributes.address;
        walletAttributes.user = userId;
        walletAttributes.createAt = new Date();

        Wallets.insert(walletAttributes);

        return true;
    }
});
