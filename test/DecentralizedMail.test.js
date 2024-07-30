const DecentralizedMail = artifacts.require("DecentralizedMail");

contract("DecentralizedMail", accounts => {
    let mail;

    before(async () => {
        mail = await DecentralizedMail.deployed();
    });

    it("should send and retrieve messages", async () => {
        const sender = accounts[0];
        const receiver = accounts[1];
        const content = "Hello, this is a test message!";
        
        // Send a message
        await mail.sendMessage(receiver, content, { from: sender });

        // Retrieve messages
        const messages = await mail.getMessages();
        const userMessages = await mail.getUserMessages(receiver);

        assert.equal(messages.length, 1, "Message count should be 1");
        assert.equal(userMessages.length, 1, "User message count should be 1");
        assert.equal(messages[0].sender, sender, "Sender should match");
        assert.equal(messages[0].receiver, receiver, "Receiver should match");
        assert.equal(messages[0].content, content, "Content should match");
    });
});
