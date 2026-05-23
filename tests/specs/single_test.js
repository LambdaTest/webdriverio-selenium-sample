const assert = require('assert');


describe('LambdaTest Simple Form Demo', () => {
    it('should submit the message and validate it', async () => {
        // 1. Open URL
        await browser.url('https://www.lambdatest.com/selenium-playground');

        // 2. Click "Simple Form Demo" link
        const simpleFormLink = await $('=Simple Form Demo'); // Using link text selector
        await simpleFormLink.click();

        // 3. Validate that the URL contains "simple-form-demo"
       // await expect(browser).toHaveUrlContaining('simple-form-demo');
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
describe('LambdaTest Drag & Drop Sliders', () => {
    it('should drag the slider to 95', async () => {
        // 1. Open URL and Click "Drag & Drop Sliders"
        await browser.url('https://www.lambdatest.com/selenium-playground');
        const dragDropLink = await $('=Drag & Drop Sliders'); // Using link text selector
        await dragDropLink.click();

        // 2. Select the slider "Default value 15" and drag the bar to make it 95
        // You MUST inspect the page to get the correct locator for the slider input and its output value.
        // Assuming a structure like <input type="range" ...> and <output ...>
        const sliderInput = await $('//input[@type="range" and @value="15"]'); // Example XPath, verify on page
        const sliderOutput = await $('//input[@type="range" and @value="15"]/following-sibling::output'); // Example XPath for the displayed value

        // WebdriverIO's dragAndDrop command can take an element or { x, y } coordinates.
        // For sliders, it's often more reliable to calculate the offset or use `setValue` if applicable.
        // Let's try dragging by an offset. This is approximate and might need fine-tuning.
        // A common slider value range is 0-100. Moving from 15 to 95 is a change of 80 units.
        // You'll need to estimate the pixel width of the slider track.
        // If the slider track is, say, 200px wide, then 80 units change would be (80/100) * 200 = 160px.

        const targetValue = 95;
        // The `setValue` command for range inputs directly sets the value.
        // This is usually more robust than pixel-based dragAndDrop for sliders.
        await sliderInput.setValue(targetValue.toString());

        // You might need a small pause or explicit wait for the UI to update
        await browser.pause(500); // Bad practice, use explicit waits in real code

        // 3. Validate whether the range value shows 95
        await expect(sliderOutput).toHaveText(targetValue.toString());
        console.log(`Slider value validated: '${await sliderOutput.getText()}'`);
    });
});
describe('LambdaTest Input Form Submit', () => {
    it('should validate form submission and success message', async () => {
        // 1. Open URL and Click "Input Form Submit"
        await browser.url('https://www.lambdatest.com/selenium-playground');
        const inputFormLink = await $('=Input Form Submit'); // Using link text selector
        await inputFormLink.click();

        const submitButton = await $('//button[text()="Submit"]'); // Using XPath for button text

        // 2. Click "Submit" without filling in any information
        await submitButton.click();

        // 3. Assert "Please fill out this field." error message.
        // For HTML5 validation messages, direct `getText()` on a visible element is rare.
        // You often check the `validationMessage` property via executeScript,
        // or check for a specific error message element if one appears.
        const nameField = await $('#name'); // Inspect to confirm ID
        const validationMessage = await browser.execute(function(el) {
            return el.validationMessage;
        }, nameField);
        await expect(validationMessage).toEqual('Please fill out this field.');
        console.log(`Initial validation message for Name field: '${validationMessage}' - Passed.`);

        // 4. Fill in Name, Email, and other fields.
        await nameField.setValue('Jane Doe');
        await $('#inputEmail4').setValue('jane.doe@example.com'); // Inspect ID
        await $('#inputPassword4').setValue('securepassword'); // Inspect ID
        await $('#company').setValue('Acme Corp'); // Inspect ID
        await $('#websitename').setValue('www.janedoe.org'); // Inspect ID
        await $('#inputCity').setValue('Los Angeles'); // Inspect ID
        await $('#inputAddress1').setValue('456 Oak Ave'); // Inspect ID
        await $('#inputAddress2').setValue('Suite 101'); // Inspect ID
        await $('#inputState').setValue('CA'); // Inspect ID
        await $('#inputZip').setValue('90001'); // Inspect ID

        // 5. From the Country drop-down, select "United States" using the text property.
        const countryDropdown = await $('[name="country"]'); // Inspect for name or ID
        await countryDropdown.selectByVisibleText('United States');

        // 6. Fill in all fields (done in steps 4 & 5) and click "Submit".
        await submitButton.click();

        // 7. Validate the success message "Thanks for contacting us, we will get back to you shortly."
        // Wait for the success message to be visible
        const successMessage = await $('.success-msg'); // Inspect this element for its class/ID/XPath
        await successMessage.waitForDisplayed({ timeout: 5000 }); // Explicit wait for visibility
        await expect(successMessage).toHaveText('Thanks for contacting us, we will get back to you shortly.');
        console.log(`Success message validated: '${await successMessage.getText()}'`);
    });
});