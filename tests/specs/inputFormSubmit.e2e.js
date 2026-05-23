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