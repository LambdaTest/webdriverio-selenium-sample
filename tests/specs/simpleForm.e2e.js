describe('LambdaTest Simple Form Demo', () => {
    it('should submit the message and validate it', async () => {
        // 1. Open URL
        await browser.url('https://www.lambdatest.com/selenium-playground');

        // 2. Click "Simple Form Demo" link
        const simpleFormLink = await $('=Simple Form Demo'); // Using link text selector
        await simpleFormLink.click();

        // 3. Validate that the URL contains "simple-form-demo"
        await expect(browser).toHaveUrlContaining('simple-form-demo');
        console.log(`URL validated: ${await browser.getUrl()}`);

        // 4. Create a variable for a string value
        const messageToEnter = "Welcome to LambdaTest";

        // 5. Use this variable to enter values in the "Enter Message" text box
        const messageInput = await $('#user-message'); // Inspect the element to confirm ID
        await messageInput.setValue(messageToEnter);

        // 6. Click "Get Checked Value" button
        const getCheckedValueButton = await $('#showInput'); // Inspect the element to confirm ID
        await getCheckedValueButton.click();

        // 7. Validate whether the same text message is displayed in the right-hand panel
        const displayedMessageElement = await $('#message'); // Inspect the element to confirm ID
        await expect(displayedMessageElement).toHaveText(messageToEnter);
        console.log(`Displayed Message validated: '${await displayedMessageElement.getText()}'`);
    });
});